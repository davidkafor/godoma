import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireSession } from '@/lib/auth/session'
import { can } from '@/lib/auth/permissions'
import { PageHeader } from '@/components/admin/page-header'
import { Pill, emailLabel, emailTone, formatDateTime } from '@/components/admin/submission-list'
import { SubmissionControls } from '@/components/admin/submission-controls'
import { messageStatuses } from '@/lib/admin/submission-queries'

export const metadata: Metadata = { title: 'Message' }
export const dynamic = 'force-dynamic'

const labels: Record<string, string> = { NEW: 'New', READ: 'Read', REPLIED: 'Replied', ARCHIVED: 'Archived' }

export default async function MessageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireSession('submissions:read')
  const { id } = await params
  const message = await prisma.contactMessage.findUnique({ where: { id } })
  if (!message) notFound()

  return (
    <>
      <PageHeader title={message.subject} description={`${message.reference} · from ${message.name}`} crumbs={[{ href: '/admin/messages', label: 'Contact messages' }, { label: message.reference }]} />
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section aria-labelledby="message" className="rounded-lg border bg-card p-5">
          <h2 id="message" className="mb-4 text-lg font-extrabold text-primary">Message</h2>
          <dl className="mb-5 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">From</dt>
              <dd className="mt-1 break-words text-sm">{message.name}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Email</dt>
              <dd className="mt-1 break-words text-sm">
                <a href={`mailto:${message.email}`} className="font-semibold text-primary underline-offset-4 hover:underline">{message.email}</a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Received</dt>
              <dd className="mt-1 text-sm">{formatDateTime(message.createdAt)}</dd>
            </div>
          </dl>
          <p className="whitespace-pre-wrap break-words rounded-md bg-muted/50 p-4 text-sm">{message.message}</p>
        </section>
        <div className="flex flex-col gap-6">
          <section aria-labelledby="delivery" className="rounded-lg border bg-card p-5">
            <h2 id="delivery" className="mb-3 text-lg font-extrabold text-primary">Email notification</h2>
            <p className="mb-3"><Pill tone={emailTone[message.emailStatus]}>{emailLabel[message.emailStatus]}</Pill></p>
            <dl className="space-y-2 text-sm">
              <div><dt className="inline font-semibold">Attempts: </dt><dd className="inline">{message.emailAttempts}</dd></div>
              <div><dt className="inline font-semibold">Last attempt: </dt><dd className="inline">{formatDateTime(message.emailAttemptedAt)}</dd></div>
              <div><dt className="inline font-semibold">Accepted by mail server: </dt><dd className="inline">{formatDateTime(message.emailSentAt)}</dd></div>
              {message.emailError && <div><dt className="inline font-semibold">Last error: </dt><dd className="inline text-destructive">{message.emailError}</dd></div>}
            </dl>
            <p className="mt-3 text-xs text-muted-foreground">&ldquo;Sent&rdquo; means the mail server accepted the message. It does not guarantee the message reached the inbox.</p>
          </section>
          <section aria-labelledby="manage" className="rounded-lg border bg-card p-5">
            <h2 id="manage" className="mb-3 text-lg font-extrabold text-primary">Manage</h2>
            <SubmissionControls
              kind="contact"
              id={message.id}
              status={message.status}
              statuses={messageStatuses.map((value) => ({ value, label: labels[value] }))}
              emailStatus={message.emailStatus}
              canManage={can(session.user.role, 'submissions:manage')}
            />
          </section>
        </div>
      </div>
    </>
  )
}
