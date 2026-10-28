import 'server-only'
import { prisma } from '@/lib/prisma'

export const SUBMISSION_PAGE_SIZE = 15

export const emailStatuses = ['PENDING', 'SENT', 'FAILED'] as const
export const applicationStatuses = ['NEW', 'IN_REVIEW', 'CONTACTED', 'ADMITTED', 'DECLINED', 'ARCHIVED'] as const
export const messageStatuses = ['NEW', 'READ', 'REPLIED', 'ARCHIVED'] as const

export type SubmissionQuery = { q?: string; status?: string; emailStatus?: string; page?: number }

const pick = <T extends readonly string[]>(list: T, value?: string): T[number] | undefined => (value && (list as readonly string[]).includes(value) ? (value as T[number]) : undefined)

function paging(page?: number) {
  const current = Math.max(1, Math.floor(page || 1))
  return { current, skip: (current - 1) * SUBMISSION_PAGE_SIZE, take: SUBMISSION_PAGE_SIZE }
}

export async function listApplications({ q, status, emailStatus, page }: SubmissionQuery) {
  const term = q?.trim().slice(0, 100)
  const where = {
    ...(pick(applicationStatuses, status) && { status: pick(applicationStatuses, status) }),
    ...(pick(emailStatuses, emailStatus) && { emailStatus: pick(emailStatuses, emailStatus) }),
    ...(term && {
      OR: [{ reference: { contains: term } }, { fullName: { contains: term } }, { email: { contains: term } }, { phone: { contains: term } }, { programme: { contains: term } }],
    }),
  }
  const { current, skip, take } = paging(page)
  const [total, items] = await Promise.all([
    prisma.application.count({ where }),
    prisma.application.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take,
      select: { id: true, reference: true, fullName: true, email: true, programme: true, status: true, emailStatus: true, createdAt: true },
    }),
  ])
  return { items, total, page: current, pages: Math.max(1, Math.ceil(total / SUBMISSION_PAGE_SIZE)) }
}

export async function listMessages({ q, status, emailStatus, page }: SubmissionQuery) {
  const term = q?.trim().slice(0, 100)
  const where = {
    ...(pick(messageStatuses, status) && { status: pick(messageStatuses, status) }),
    ...(pick(emailStatuses, emailStatus) && { emailStatus: pick(emailStatuses, emailStatus) }),
    ...(term && { OR: [{ reference: { contains: term } }, { name: { contains: term } }, { email: { contains: term } }, { subject: { contains: term } }] }),
  }
  const { current, skip, take } = paging(page)
  const [total, items] = await Promise.all([
    prisma.contactMessage.count({ where }),
    prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take,
      select: { id: true, reference: true, name: true, email: true, subject: true, status: true, emailStatus: true, createdAt: true },
    }),
  ])
  return { items, total, page: current, pages: Math.max(1, Math.ceil(total / SUBMISSION_PAGE_SIZE)) }
}
