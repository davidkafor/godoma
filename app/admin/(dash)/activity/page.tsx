import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { requireSession } from '@/lib/auth/session'
import { EmptyState, PageHeader } from '@/components/admin/page-header'
import { btnSecondary } from '@/components/admin/styles'

export const metadata: Metadata = { title: 'Activity log' }

const SIZE = 30
const stamp = new Intl.DateTimeFormat('en-KE', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Africa/Nairobi' })

export default async function ActivityPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  await requireSession('audit:read')
  const page = Math.max(1, Number((await searchParams).page) || 1)
  const [total, entries] = await Promise.all([
    prisma.auditLog.count(),
    prisma.auditLog.findMany({ orderBy: { createdAt: 'desc' }, skip: (page - 1) * SIZE, take: SIZE, include: { user: { select: { name: true } } } }),
  ])
  const pages = Math.max(1, Math.ceil(total / SIZE))

  return (
    <>
      <PageHeader title="Activity log" description="Sign-ins and content changes made in the dashboard." />
      {entries.length === 0 ? (
        <EmptyState title="No activity yet" />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <caption className="sr-only">Recent administrator activity</caption>
            <thead className="border-b border-border bg-muted text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-bold">When (EAT)</th>
                <th scope="col" className="px-4 py-2.5 font-bold">Who</th>
                <th scope="col" className="px-4 py-2.5 font-bold">Action</th>
                <th scope="col" className="px-4 py-2.5 font-bold">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {entries.map((e) => (
                <tr key={e.id}>
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{stamp.format(e.createdAt)}</td>
                  <td className="px-4 py-3">{e.user?.name ?? 'Removed user'}</td>
                  <td className="px-4 py-3 font-semibold">
                    {e.action} · {e.entity}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{e.detail ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {pages > 1 && (
        <nav aria-label="Pagination" className="mt-4 flex items-center justify-between text-sm">
          <p className="text-muted-foreground">
            Page {page} of {pages}
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link href={`/admin/activity?page=${page - 1}`} className={btnSecondary}>
                Newer
              </Link>
            )}
            {page < pages && (
              <Link href={`/admin/activity?page=${page + 1}`} className={btnSecondary}>
                Older
              </Link>
            )}
          </div>
        </nav>
      )}
    </>
  )
}
