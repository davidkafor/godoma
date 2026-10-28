import type { Metadata } from 'next'
import { requireSession } from '@/lib/auth/session'
import { listMessages, messageStatuses } from '@/lib/admin/submission-queries'
import { SubmissionList } from '@/components/admin/submission-list'

export const metadata: Metadata = { title: 'Contact messages' }
export const dynamic = 'force-dynamic'

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)
const labels: Record<string, string> = { NEW: 'New', READ: 'Read', REPLIED: 'Replied', ARCHIVED: 'Archived' }
const statusOptions = messageStatuses.map((value) => ({ value, label: labels[value] }))

export default async function MessagesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireSession('submissions:read')
  const sp = await searchParams
  const query = { q: first(sp.q), status: first(sp.status), emailStatus: first(sp.emailStatus) }
  const { items, total, page, pages } = await listMessages({ ...query, page: Number(first(sp.page)) || 1 })

  return (
    <SubmissionList
      basePath="/admin/messages"
      title="Contact messages"
      description="Messages sent through the website contact form."
      statuses={statusOptions}
      rows={items.map((m) => ({ id: m.id, reference: m.reference, createdAt: m.createdAt, status: m.status, emailStatus: m.emailStatus, primary: m.name, secondary: m.email, detail: m.subject }))}
      total={total}
      page={page}
      pages={pages}
      query={query}
    />
  )
}
