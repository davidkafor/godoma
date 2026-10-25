'use client'

import { FormEvent, useState } from 'react'

export function ApplicationForm() {
  const [status, setStatus] = useState<string>('')
  const [sending, setSending] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSending(true)
    setStatus('')
    const form = event.currentTarget
    const response = await fetch('/api/applications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) })
    const result = await response.json()
    setSending(false)
    if (!response.ok) return setStatus(result.error || 'Unable to send application.')
    form.reset()
    setStatus('Application enquiry sent. Admissions will contact you shortly.')
  }

  return <form onSubmit={submit} className="mt-8 space-y-4" aria-label="Application enquiry form">
    <div className="grid gap-4 sm:grid-cols-2">
      <input name="fullName" required placeholder="Full name" aria-label="Full name" className="h-12 rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-4 text-primary-foreground placeholder:text-primary-foreground/60" />
      <input name="email" required type="email" placeholder="Email address" aria-label="Email address" className="h-12 rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-4 text-primary-foreground placeholder:text-primary-foreground/60" />
      <input name="phone" required placeholder="Phone number" aria-label="Phone number" className="h-12 rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-4 text-primary-foreground placeholder:text-primary-foreground/60" />
      <input name="course" required placeholder="Course of interest" aria-label="Course of interest" className="h-12 rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-4 text-primary-foreground placeholder:text-primary-foreground/60" />
    </div>
    <textarea name="message" required placeholder="Tell us how we can help" aria-label="Message" rows={4} className="w-full rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/60" />
    <button type="submit" disabled={sending} className="h-12 rounded-md bg-accent px-6 font-bold text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60">{sending ? 'Sending…' : 'Send application enquiry'}</button>
    {status && <p role="status" className="text-sm text-primary-foreground/85">{status}</p>}
  </form>
}
