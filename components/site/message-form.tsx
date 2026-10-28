'use client'

import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Honeypot, FieldError, SubmissionStatus, fieldClass, useFormSubmission } from '@/components/site/form-kit'
import { validateContact } from '@/lib/forms/validation'

const describe = (id: string, error?: string) => (error ? id : undefined)

export function MessageForm() {
  const { sending, fieldErrors, error, outcome, submit, clearOutcome } = useFormSubmission('/api/contact')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form)) as Record<string, unknown>
    if (await submit(form, values, validateContact)) form.reset()
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg sm:p-8">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Send us a message</p>
        <h2 className="mt-2 text-2xl font-extrabold text-primary">Contact Godoma TTI</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">Have a question? Send us a message and our staff will reply to the email address you provide.</p>
      </div>
      <form className="relative flex flex-col gap-5" onSubmit={handleSubmit} onChange={clearOutcome} noValidate aria-busy={sending}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="message-name" className="text-sm font-semibold text-primary">Your name</label>
            <input id="message-name" name="name" required maxLength={100} autoComplete="name" aria-invalid={Boolean(fieldErrors.name)} aria-describedby={describe('message-name-error', fieldErrors.name)} className={fieldClass} placeholder="Your full name" />
            <FieldError id="message-name-error" message={fieldErrors.name} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message-email" className="text-sm font-semibold text-primary">Email address</label>
            <input id="message-email" name="email" type="email" required maxLength={254} autoComplete="email" aria-invalid={Boolean(fieldErrors.email)} aria-describedby={describe('message-email-error', fieldErrors.email)} className={fieldClass} placeholder="you@example.com" />
            <FieldError id="message-email-error" message={fieldErrors.email} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message-subject" className="text-sm font-semibold text-primary">Subject</label>
          <input id="message-subject" name="subject" required maxLength={150} aria-invalid={Boolean(fieldErrors.subject)} aria-describedby={describe('message-subject-error', fieldErrors.subject)} className={fieldClass} placeholder="How can we help?" />
          <FieldError id="message-subject-error" message={fieldErrors.subject} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message-body" className="text-sm font-semibold text-primary">Message</label>
          <textarea id="message-body" name="message" required rows={6} maxLength={5000} aria-invalid={Boolean(fieldErrors.message)} aria-describedby={describe('message-body-error', fieldErrors.message)} className={`${fieldClass} py-3`} placeholder="Write your message here..." />
          <FieldError id="message-body-error" message={fieldErrors.message} />
        </div>
        <Honeypot />
        <div className="flex flex-col items-start gap-3">
          <Button type="submit" disabled={sending} aria-disabled={sending}>
            {sending && <Loader2 className="animate-spin" aria-hidden="true" />}
            {sending ? 'Sending…' : 'Send message'}
          </Button>
          <SubmissionStatus error={error}>
            {outcome && (
              <div className="rounded-md border border-secondary/40 bg-secondary/10 px-4 py-3 text-sm text-foreground" role="status">
                <p className="font-bold text-primary">{outcome.duplicate ? 'We already have this message.' : 'Message received.'}</p>
                <p className="mt-1">
                  {outcome.reference ? (
                    <>
                      Your reference number is <strong className="font-mono text-base">{outcome.reference}</strong>. Our staff will reply to the email address you provided.
                    </>
                  ) : (
                    'Thank you. Our staff will reply to the email address you provided.'
                  )}
                </p>
              </div>
            )}
          </SubmissionStatus>
        </div>
      </form>
    </div>
  )
}
