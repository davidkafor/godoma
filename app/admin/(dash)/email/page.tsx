import type { Metadata } from 'next'
import { requireSession } from '@/lib/auth/session'
import { readMailConfig, recipientFor } from '@/lib/mail/config'
import { getEmailSettings } from '@/lib/mail/settings'
import { PageHeader } from '@/components/admin/page-header'
import { EmailForm } from '@/components/admin/email-form'

export const metadata: Metadata = { title: 'Email delivery' }

export default async function EmailSettingsPage() {
  const session = await requireSession('settings:write')
  const settings = await getEmailSettings()
  const mail = readMailConfig()

  return (
    <>
      <PageHeader title="Email delivery" description="Choose who is emailed when a student applies or someone sends a message through the website." />

      <section aria-labelledby="smtp-status" className="mb-6 max-w-3xl rounded-lg border border-border bg-card p-4 sm:p-6">
        <h2 id="smtp-status" className="text-lg font-extrabold text-primary">
          Mail server
        </h2>
        {mail.ok ? (
          <p role="status" className="mt-2 text-sm text-foreground">
            Connected to <strong>{mail.config.host}</strong> on port {mail.config.port} ({mail.config.secure ? 'SSL' : 'STARTTLS'}), sending from <strong>{mail.config.from}</strong>.
          </p>
        ) : (
          <p role="alert" className="mt-2 text-sm font-semibold text-destructive">
            Email is not set up on the server yet. Missing or invalid: {mail.problems.join(', ')}.
          </p>
        )}
        <p className="mt-2 text-xs text-muted-foreground">
          The mail account and password are kept in the server&apos;s environment variables for security, so they are not editable here. Contact the website host to change them.
        </p>
      </section>

      <EmailForm
        settings={settings}
        defaults={{ application: recipientFor('application'), contact: recipientFor('contact') }}
        adminEmail={session.user.email}
      />
    </>
  )
}
