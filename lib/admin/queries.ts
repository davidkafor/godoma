import 'server-only'
import { prisma } from '@/lib/prisma'
import type { Resource } from './resources'

type Delegate = {
  findMany: (args: unknown) => Promise<Record<string, unknown>[]>
  findUnique: (args: unknown) => Promise<Record<string, unknown> | null>
  count: (args: unknown) => Promise<number>
}

const delegateFor = (resource: Resource) => (prisma as unknown as Record<string, Delegate>)[resource.model]

export const PAGE_SIZE = 15

export type ListParams = { q?: string; status?: string; page?: number; filters?: Record<string, string> }

export async function listItems(resource: Resource, params: ListParams) {
  const delegate = delegateFor(resource)
  const and: Record<string, unknown>[] = []

  const q = params.q?.trim().slice(0, 100)
  if (q) and.push({ OR: resource.search.map((field) => ({ [field]: { contains: q } })) })
  if (params.status === 'DRAFT' || params.status === 'PUBLISHED') and.push({ status: params.status })
  for (const filter of resource.filters ?? []) {
    const value = params.filters?.[filter.name]
    if (value && filter.options.some((o) => o.value === value)) and.push({ [filter.name]: value })
  }
  const where = and.length ? { AND: and } : {}

  const total = await delegate.count({ where })
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const page = Math.min(Math.max(1, params.page ?? 1), pages)
  const items = await delegate.findMany({
    where,
    orderBy: resource.orderBy,
    include: resource.include,
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  })
  return { items, total, page, pages }
}

export async function getItem(resource: Resource, id: string) {
  if (!/^[a-z0-9]{20,40}$/i.test(id)) return null
  return delegateFor(resource).findUnique({ where: { id } })
}

export async function departmentOptions() {
  const departments = await prisma.department.findMany({ orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }], select: { id: true, name: true } })
  return departments.map((d) => ({ value: d.id, label: d.name }))
}
