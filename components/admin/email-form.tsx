'use client'

import { useActionState } from 'react'
import { Loader2, Send } from 'lucide-react'
import { saveEmailSettings, sendTestEmail } from '@/lib/admin/email-actions'
import type { FormState } from '@/lib/admin/crud'
import { Notice } from './page-header'
import { btnPrimary, btnSecondary, inputClass, labelClass } from './styles'

type Props = {
  settings: { applicationRecipients: string[]; contactRecipients: string[]; fromName: string; notifyApplications: boolean; notifyContact: boolean }
  defaults: { application: string; contact: string }
  adminEmail: string
}

function FieldError({ message }: { message?: string }) {
  return message ? (
    <p role="alert" className="mt-1 text-xs font-semibold text-destructive">
      {message}
    </p>
  ) : null
}

function Toggle({ name, label, help, checked }: { name: string; label: string; help: string; checked: boolean }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-background p-3">
      <input type="checkbox" name={name} defaultChecked={checked} className="mt-1 size-4 accent-primary" />
      <span>
        <span className="block text-sm font-semibold text-foreground">{label}</span>
        <span className="block text-xs text-muted-foreground">{help}</span>
      </span>
    </label>
  )
}

export function EmailForm({ settings, defaults, adminEmail }: Props) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveEmailSettings, {})
  const [testState, testAction, testing] = useActionState<FormState, FormData>(sendTestEmail, {})
  const err = state.fieldErrors ?? {}

  return (
    <div className="max-w-3xl space-y-6">
      <form action={action} noValidate className="space-y-6">
        {state.error && <Notice tone="error">{state.error}</Notice>}
        {state.ok && state.message && <Notice>{state.message}</Notice>}

        <fieldset className="space-y-5 rounded-lg border border-border bg-card p-4 sm:p-6">
          <legend className="px-1 text-lg font-extrabold text-primary">Who receives notifications</legend>
          <div>
            <label htmlFor="applicationRecipients" className={labelClass}>
              Student application notifications
            </label>
            <textarea
              id="applicationRecipients"
              name="applicationRecipients"
              rows={2}
              defaultValue={settings.applicationRecipients.join('\n')}
              className={inputClass}
              aria-invalid={err.applicationRecipients ? true : undefined}
              aria-describedby="application-help"
            />
            <p id="application-help" className="mt-1 text-xs text-muted-foreground">
              One address per line, up to 5. Leave empty to use the server default{defaults.application ? ` (${defaults.application})` : ' (none set)'}.
            </p>
            <FieldError message={err.applicationRecipients} />
          </div>
          <div>
            <label htmlFor="contactRecipients" className={labelClass}>
              Contact form notifications
            </label>
            <textarea
              id="contactRecipients"
              name="contactRecipients"
              rows={2}
              defaultValue={settings.contactRecipients.join('\n')}
              className={inputClass}
              aria-invalid={err.contactRecipients ? true : undefined}
              aria-describedby="contact-help"
            />
            <p id="contact-help" className="mt-1 text-xs text-muted-foreground">
              One address per line, up to 5. Leave empty to use the server default{defaults.contact ? ` (${defaults.contact})` : ' (none set)'}.
            </p>
            <FieldError message={err.contactRecipients} />
          </div>
          <div>
            <label htmlFor="fromName" className={labelClass}>
              Sender name
            </label>
            <input id="fromName" name="fromName" defaultValue={settings.fromName} maxLength={80} placeholder="Godoma TTI Website" className={inputClass} aria-invalid={err.fromName ? true : undefined} />
            <p className="mt-1 text-xs text-muted-foreground">The name shown in the inbox. The sending address is set on the server and cannot be changed here.</p>
            <FieldError message={err.fromName} />
          </div>
        </fieldset>

        <fieldset className="space-y-3 rounded-lg border border-border bg-card p-4 sm:p-6">
          <legend className="px-1 text-lg font-extrabold text-primary">When to send</legend>
          <Toggle name="notifyApplications" label="Email me when a student application is submitted" help="Applications are always saved in the dashboard, even when this is off." checked={settings.notifyApplications} />
          <Toggle name="notifyContact" label="Email me when someone uses the contact form" help="Messages are always saved in the dashboard, even when this is off." checked={settings.notifyContact} />
        </fieldset>

        <button type="submit" disabled={pending} className={btnPrimary}>
          {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {pending ? 'Saving…' : 'Save changes'}
        </button>
      </form>

      <form action={testAction} noValidate className="space-y-4 rounded-lg border border-border bg-card p-4 sm:p-6">
        <h2 className="text-lg font-extrabold text-primary">Send a test email</h2>
        <p className="text-sm text-muted-foreground">Checks that the server can reach the mail provider and deliver a message. It does not use the addresses above.</p>
        {testState.error && <Notice tone="error">{testState.error}</Notice>}
        {testState.ok && testState.message && <Notice>{testState.message}</Notice>}
        <div>
          <label htmlFor="testAddress" className={labelClass}>
            Send the test to
          </label>
          <input id="testAddress" name="testAddress" type="email" defaultValue={adminEmail} className={inputClass} aria-invalid={testState.fieldErrors?.testAddress ? true : undefined} />
          <FieldError message={testState.fieldErrors?.testAddress} />
        </div>
        <button type="submit" disabled={testing} className={btnSecondary}>
          {testing ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Send className="size-4" aria-hidden="true" />}
          {testing ? 'Sending…' : 'Send test email'}
        </button>
      </form>
    </div>
  )
}
