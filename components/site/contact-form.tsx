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
    const phone = String(form.get('phone') ?? '')
    const programme = String(form.get('programme') ?? '')
    const grade = String(form.get('grade') ?? '')
    const message = String(form.get('message') ?? '')
    const subject = `Admission application - ${programme || 'GTTI programme'}`
    const body = `Applicant name: ${name}\nEmail: ${email}\nPhone: ${phone}\nProgramme: ${programme}\nHighest qualification/grade: ${grade}\n\nAdditional information:\n${message}`
    window.location.href = `mailto:godomatti.gtti@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg sm:p-8">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Admissions application</p>
        <h2 className="mt-2 text-2xl font-extrabold text-primary">Apply to Godoma TTI</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">Complete the application form and your email app will open with your details addressed to the Admissions Office.</p>
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
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-phone" className="text-sm font-semibold text-primary">Phone number</label>
            <input id="contact-phone" name="phone" type="tel" required autoComplete="tel" className="min-h-11 rounded-md border bg-background px-3 text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" placeholder="+254 743 661 423" />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-programme" className="text-sm font-semibold text-primary">Programme of interest</label>
            <select id="contact-programme" name="programme" required defaultValue="" className="min-h-11 rounded-md border bg-background px-3 text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring">
              <option value="" disabled>Select a programme</option>
              <option>Electrical and Electronics Engineering</option>
              <option>Building and Civil Engineering</option>
              <option>Computing and Informatics</option>
              <option>Automotive and Mechanical Engineering</option>
              <option>Agricultural Studies</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-grade" className="text-sm font-semibold text-primary">Highest qualification / grade</label>
            <input id="contact-grade" name="grade" required className="min-h-11 rounded-md border bg-background px-3 text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" placeholder="e.g. KCSE C-" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-message" className="text-sm font-semibold text-primary">Additional information</label>
          <textarea id="contact-message" name="message" rows={5} className="rounded-md border bg-background px-3 py-3 text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" placeholder="Tell us anything else about your application..." />
        </div>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit">Submit application</Button>
          {submitted && <p className="text-sm font-medium text-muted-foreground" role="status">Your email app should now be open.</p>}
        </div>
      </form>
    </div>
  )
}
