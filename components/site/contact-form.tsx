'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '')
    const email = String(form.get('email') ?? '')
    const subject = String(form.get('subject') ?? 'General enquiry')
    const message = String(form.get('message') ?? '')
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`
    window.location.href = `mailto:godomatti.gtti@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg sm:p-8">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Send an enquiry</p>
        <h2 className="mt-2 text-2xl font-extrabold text-primary">Contact the institute</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">Complete the form and your email app will open with the enquiry addressed to Godoma TTI.</p>
      </div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-sm font-semibold text-primary">Full name</label>
            <input id="contact-name" name="name" required autoComplete="name" className="min-h-11 rounded-md border bg-background px-3 text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" placeholder="Your full name" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-sm font-semibold text-primary">Email address</label>
            <input id="contact-email" name="email" type="email" required autoComplete="email" className="min-h-11 rounded-md border bg-background px-3 text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" placeholder="you@example.com" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-subject" className="text-sm font-semibold text-primary">Subject</label>
          <input id="contact-subject" name="subject" required className="min-h-11 rounded-md border bg-background px-3 text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" placeholder="How can we help?" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-message" className="text-sm font-semibold text-primary">Message</label>
          <textarea id="contact-message" name="message" required rows={6} className="rounded-md border bg-background px-3 py-3 text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" placeholder="Write your message here..." />
        </div>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit">Send enquiry</Button>
          {submitted && <p className="text-sm font-medium text-muted-foreground" role="status">Your email app should now be open.</p>}
        </div>
      </form>
    </div>
  )
}
