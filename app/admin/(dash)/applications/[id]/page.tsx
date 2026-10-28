import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireSession } from '@/lib/auth/session'
import { can } from '@/lib/auth/permissions'
import { PageHeader } from '@/components/admin/page-header'
import { Pill, emailLabel, emailTone, formatDateTime } from '@/components/admin/submission-list'
import { SubmissionControls } from '@/components/admin/submission-controls'
import { applicationStatuses } from '@/lib/admin/submission-queries'

export const metadata: Metadata = { title: 'Application' }
export const dynamic = 'force-dynamic'

const labels: Record<string, string> = { NEW: 'New', IN_REVIEW: 'In review', CONTACTED: 'Contacted', ADMITTED: 'Admitted', DECLINED: 'Declined', ARCHIVED: 'Archived' }

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireSession('submissions:read')
  const { id } = await params
  const application = await prisma.application.findUnique({ where: { id } })
  if (!application) notFound()

  const rows: [string, React.ReactNode][] = [
    ['Full name', application.fullName],
    ['Email', application.email],
    ['Phone', application.phone],
    ['Department', application.department],
    ['Programme', application.programme],
    ['Highest qualification / grade', application.qualification],
    ['Submitted', formatDateTime(application.createdAt)],
  ]

  return (
    <>
      <PageHeader title={application.reference} description={`Application from ${application.fullName}`} crumbs={[{ href: '/admin/applications', label: 'Student applications' }, { label: application.reference }]} />
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section aria-labelledby="applicant" className="rounded-lg border bg-card p-5">
          <h2 id="applicant" className="mb-4 text-lg font-extrabold text-primary">Applicant</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            {rows.map(([term, value]) => (
              <div key={term}>
                <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{term}</dt>
                <dd className="mt-1 break-words text-sm">{value}</dd>
              </div>
            ))}
          </dl>
          <h3 className="mb-1 mt-6 text-xs font-bold uppercase tracking-wide text-muted-foreground">Additional information</h3>
          <p className="whitespace-pre-wrap break-words text-sm">{application.notes || '—'}</p>
        </section>
        <div className="flex flex-col gap-6">
          <section aria-labelledby="delivery" className="rounded-lg border bg-card p-5">
            <h2 id="delivery" className="mb-3 text-lg font-extrabold text-primary">Email notification</h2>
            <p className="mb-3"><Pill tone={emailTone[application.emailStatus]}>{emailLabel[application.emailStatus]}</Pill></p>
            <dl className="space-y-2 text-sm">
              <div><dt className="inline font-semibold">Attempts: </dt><dd className="inline">{application.emailAttempts}</dd></div>
              <div><dt className="inline font-semibold">Last attempt: </dt><dd className="inline">{formatDateTime(application.emailAttemptedAt)}</dd></div>
              <div><dt className="inline font-semibold">Accepted by mail server: </dt><dd className="inline">{formatDateTime(application.emailSentAt)}</dd></div>
              {application.emailError && <div><dt className="inline font-semibold">Last error: </dt><dd className="inline text-destructive">{application.emailError}</dd></div>}
            </dl>
            <p className="mt-3 text-xs text-muted-foreground">&ldquo;Sent&rdquo; means the mail server accepted the message. It does not guarantee the message reached the inbox.</p>
          </section>
          <section aria-labelledby="manage" className="rounded-lg border bg-card p-5">
            <h2 id="manage" className="mb-3 text-lg font-extrabold text-primary">Manage</h2>
            <SubmissionControls
              kind="application"
              id={application.id}
              status={application.status}
              statuses={applicationStatuses.map((value) => ({ value, label: labels[value] }))}
              emailStatus={application.emailStatus}
              canManage={can(session.user.role, 'submissions:manage')}
            />
          </section>
        </div>
      </div>
    </>
  )
}
