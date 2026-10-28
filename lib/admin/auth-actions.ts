'use server'

import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { createSession, destroySession, clientInfo, getSession } from '@/lib/auth/session'
import { dummyVerify, verifyPassword } from '@/lib/auth/password'
import { isLoginBlocked, recordLoginAttempt } from '@/lib/auth/rate-limit'
import { audit } from '@/lib/audit'
import type { FormState } from './crud'

const genericError = 'Incorrect email or password.'

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase().slice(0, 191)
  const password = String(formData.get('password') ?? '').slice(0, 200)
  if (!email || !password) return { error: 'Enter your email and password.' }

  try {
    const { ip } = await clientInfo()
    if (await isLoginBlocked(ip, email)) {
      return { error: 'Too many failed attempts. Please wait 15 minutes and try again.' }
    }

    const user = await prisma.adminUser.findUnique({ where: { email } })
    const valid = user && user.active ? await verifyPassword(password, user.passwordHash) : await dummyVerify(password)
    await recordLoginAttempt(ip, email, Boolean(valid && user))
    if (!user || !valid) return { error: genericError }

    await createSession(user.id)
    await prisma.adminUser.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } })
    await audit(user.id, 'login', 'session', user.id)
  } catch (error) {
    console.error('[admin] login failed', error)
    return { error: 'Sign-in is temporarily unavailable. Please try again shortly.' }
  }
  redirect('/admin')
}

export async function logout() {
  const session = await getSession()
  await destroySession()
  if (session) await audit(session.user.id, 'logout', 'session', session.user.id)
  redirect('/admin/login')
}
