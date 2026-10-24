'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { departments } from '@/lib/site-data'

export function ContactForm() {
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const selectedDepartmentData = departments.find((department) => department.id === selectedDepartment)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSending(true)
    setStatus('')
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form))
    const response = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: values.name,
        email: values.email,
        phone: values.phone,
        course: values.programme,
        message: `Department: ${values.department}\\nHighest qualification/grade: ${values.grade}\\n\\n${values.message || 'None provided'}`,
      }),
    })
    const result = await response.json()
    setSending(false)
    if (!response.ok) {
      setStatus(result.error || 'Unable to send application.')
      return
    }
    form.reset()
    setSelectedDepartment('')
    setStatus('Application submitted successfully. Admissions will contact you shortly.')
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg sm:p-8">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Admissions application</p>
        <h2 className="mt-2 text-2xl font-extrabold text-primary">Apply to Godoma TTI</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">Complete the form and submit your application enquiry directly to the Admissions Office.</p>
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
            <label htmlFor="contact-department" className="text-sm font-semibold text-primary">Department</label>
            <select
              id="contact-department"
              name="department"
              required
              value={selectedDepartment}
              onChange={(event) => setSelectedDepartment(event.target.value)}
              className="min-h-11 rounded-md border bg-background px-3 text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="" disabled>Select a department</option>
              {departments.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-programme" className="text-sm font-semibold text-primary">Programme of interest</label>
            <select id="contact-programme" name="programme" required defaultValue="" disabled={!selectedDepartmentData} className="min-h-11 rounded-md border bg-background px-3 text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60">
              <option value="" disabled>{selectedDepartmentData ? 'Select a programme' : 'Select a department first'}</option>
              {selectedDepartmentData?.courses.map((course) => <option key={course.name} value={course.name}>{course.name}</option>)}
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
          <Button type="submit" disabled={sending}>{sending ? 'Submitting…' : 'Submit application'}</Button>
          {status && <p className="text-sm font-medium text-secondary" role="status">{status}</p>}
        </div>
      </form>
    </div>
  )
}
