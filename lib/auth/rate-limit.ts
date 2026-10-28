import 'server-only'
import { prisma } from '@/lib/prisma'

const WINDOW_MS = 15 * 60 * 1000
const LIMITS = { ip: 20, email: 5 } as const

export async function isLoginBlocked(ip: string, email: string) {
  const since = new Date(Date.now() - WINDOW_MS)
  const [byIp, byEmail] = await Promise.all([
    prisma.loginAttempt.count({ where: { key: ip, kind: 'ip', success: false, createdAt: { gte: since } } }),
    prisma.loginAttempt.count({ where: { key: email, kind: 'email', success: false, createdAt: { gte: since } } }),
  ])
  return byIp >= LIMITS.ip || byEmail >= LIMITS.email
}

export async function recordLoginAttempt(ip: string, email: string, success: boolean) {
  await prisma.loginAttempt.createMany({
    data: [
      { key: ip, kind: 'ip', success },
      { key: email, kind: 'email', success },
    ],
  })
  if (success) {
    // A successful sign-in clears the failure counters for that account.
    await prisma.loginAttempt.deleteMany({ where: { key: email, kind: 'email', success: false } })
  }
  await prisma.loginAttempt.deleteMany({ where: { createdAt: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } } })
}
