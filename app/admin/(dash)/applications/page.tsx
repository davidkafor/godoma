import type { Metadata } from 'next'
import { requireSession } from '@/lib/auth/session'
import { listApplications, applicationStatuses } from '@/lib/admin/submission-queries'
import { SubmissionList } from '@/components/admin/submission-list'

export const metadata: Metadata = { title: 'Student applications' }
export const dynamic = 'force-dynamic'

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)
const labels: Record<string, string> = { NEW: 'New', IN_REVIEW: 'In review', CONTACTED: 'Contacted', ADMITTED: 'Admitted', DECLINED: 'Declined', ARCHIVED: 'Archived' }
export const applicationStatusOptions = applicationStatuses.map((value) => ({ value, label: labels[value] }))

export default async function ApplicationsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireSession('submissions:read')
  const sp = await searchParams
  const query = { q: first(sp.q), status: first(sp.status), emailStatus: first(sp.emailStatus) }
  const { items, total, page, pages } = await listApplications({ ...query, page: Number(first(sp.page)) || 1 })

  return (
    <SubmissionList
      basePath="/admin/applications"
      title="Student applications"
      description="Applications submitted through the website. Contains personal information, so access is limited to administrators."
      statuses={applicationStatusOptions}
      rows={items.map((a) => ({ id: a.id, reference: a.reference, createdAt: a.createdAt, status: a.status, emailStatus: a.emailStatus, primary: a.fullName, secondary: a.email, detail: a.programme }))}
      total={total}
      page={page}
      pages={pages}
      query={query}
    />
  )
}
