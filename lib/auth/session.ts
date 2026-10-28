import 'server-only'
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto'
import { cache } from 'react'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { can, type Permission, type RoleName } from './permissions'

const ABSOLUTE_LIFETIME_MS = 8 * 60 * 60 * 1000
const IDLE_LIFETIME_MS = 2 * 60 * 60 * 1000
const TOUCH_INTERVAL_MS = 5 * 60 * 1000

const secureCookies = () => process.env.NODE_ENV === 'production' && (process.env.APP_URL || '').startsWith('https://')

// The __Host- prefix makes browsers reject the cookie unless it is Secure, host-only and Path=/.
export const sessionCookieName = () => (secureCookies() ? '__Host-godoma_session' : 'godoma_session')

const hashToken = (token: string) => createHash('sha256').update(token).digest('hex')

export async function clientInfo() {
  const h = await headers()
  const forwarded = h.get('x-forwarded-for')?.split(',')[0]?.trim()
  const ip = (forwarded || h.get('x-real-ip') || 'unknown').slice(0, 64)
  return { ip, userAgent: (h.get('user-agent') || '').slice(0, 255) }
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString('base64url')
  const csrfToken = randomBytes(32).toString('base64url')
  const { ip, userAgent } = await clientInfo()
  const expiresAt = new Date(Date.now() + ABSOLUTE_LIFETIME_MS)
  await prisma.session.create({ data: { tokenHash: hashToken(token), csrfToken, userId, ip, userAgent, expiresAt } })
  const jar = await cookies()
  jar.set(sessionCookieName(), token, {
    httpOnly: true,
    secure: secureCookies(),
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  })
  // Opportunistic cleanup keeps the table small without needing a cron job.
  await prisma.session.deleteMany({ where: { expiresAt: { lt: new Date() } } }).catch(() => undefined)
}

export async function destroySession() {
  const jar = await cookies()
  const token = jar.get(sessionCookieName())?.value
  if (token) await prisma.session.deleteMany({ where: { tokenHash: hashToken(token) } }).catch(() => undefined)
  jar.delete(sessionCookieName())
}

export type CurrentSession = {
  sessionId: string
  csrfToken: string
  user: { id: string; email: string; name: string; role: RoleName }
}

// Cached per request so layouts, pages and actions share one lookup.
export const getSession = cache(async (): Promise<CurrentSession | null> => {
  const jar = await cookies()
  const token = jar.get(sessionCookieName())?.value
  if (!token) return null
  const session = await prisma.session.findUnique({ where: { tokenHash: hashToken(token) }, include: { user: true } })
  if (!session || !session.user.active) return null
  const now = Date.now()
  if (session.expiresAt.getTime() < now || now - session.lastSeenAt.getTime() > IDLE_LIFETIME_MS) {
    await prisma.session.delete({ where: { id: session.id } }).catch(() => undefined)
    return null
  }
  if (now - session.lastSeenAt.getTime() > TOUCH_INTERVAL_MS) {
    await prisma.session.update({ where: { id: session.id }, data: { lastSeenAt: new Date() } }).catch(() => undefined)
  }
  const { id, email, name, role } = session.user
  return { sessionId: session.id, csrfToken: session.csrfToken, user: { id, email, name, role } }
})

/** For pages and layouts: redirects to the login page when there is no valid session. */
export async function requireSession(permission?: Permission) {
  const session = await getSession()
  if (!session) redirect('/admin/login')
  if (permission && !can(session.user.role, permission)) redirect('/admin?denied=1')
  return session
}

export class AuthorizationError extends Error {}

/** For server actions and route handlers: throws instead of redirecting. */
export async function assertPermission(permission?: Permission) {
  const session = await getSession()
  if (!session) throw new AuthorizationError('Your session has expired. Please sign in again.')
  if (permission && !can(session.user.role, permission)) throw new AuthorizationError('You do not have permission to do that.')
  return session
}

export function csrfMatches(expected: string, provided: string | null | undefined) {
  if (!provided) return false
  const a = Buffer.from(expected)
  const b = Buffer.from(provided)
  return a.length === b.length && timingSafeEqual(a, b)
}

/** Same-origin check for state-changing route handlers (server actions are checked by Next.js itself). */
export async function assertSameOrigin() {
  const h = await headers()
  const origin = h.get('origin')
  const host = h.get('x-forwarded-host') || h.get('host')
  if (!origin || !host) throw new AuthorizationError('Cross-site request blocked.')
  if (new URL(origin).host !== host) throw new AuthorizationError('Cross-site request blocked.')
}
