'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Honeypot, FieldError, SubmissionStatus, fieldClass, useFormSubmission } from '@/components/site/form-kit'
import { validateApplication } from '@/lib/forms/validation'
import type { Department } from '@/lib/site-data'

const describe = (id: string, error?: string) => (error ? id : undefined)

export function ContactForm({ departments }: { departments: Department[] }) {
  const { sending, fieldErrors, error, outcome, submit, clearOutcome } = useFormSubmission('/api/applications')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const selectedDepartmentData = departments.find((department) => department.id === selectedDepartment)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form)) as Record<string, unknown>
    const saved = await submit(form, values, validateApplication)
    if (saved) {
      form.reset()
      setSelectedDepartment('')
    }
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg sm:p-8">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Admissions application</p>
        <h2 className="mt-2 text-2xl font-extrabold text-primary">Apply to Godoma TTI</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">Complete the form and submit your application enquiry directly to the Admissions Office.</p>
      </div>
      <form className="relative flex flex-col gap-5" onSubmit={handleSubmit} onChange={clearOutcome} noValidate aria-busy={sending}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-sm font-semibold text-primary">Full name</label>
            <input id="contact-name" name="name" required maxLength={100} autoComplete="name" aria-invalid={Boolean(fieldErrors.name)} aria-describedby={describe('contact-name-error', fieldErrors.name)} className={fieldClass} placeholder="Your full name" />
            <FieldError id="contact-name-error" message={fieldErrors.name} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-sm font-semibold text-primary">Email address</label>
            <input id="contact-email" name="email" type="email" required maxLength={254} autoComplete="email" aria-invalid={Boolean(fieldErrors.email)} aria-describedby={describe('contact-email-error', fieldErrors.email)} className={fieldClass} placeholder="you@example.com" />
            <FieldError id="contact-email-error" message={fieldErrors.email} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-phone" className="text-sm font-semibold text-primary">Phone number</label>
            <input id="contact-phone" name="phone" type="tel" required maxLength={24} autoComplete="tel" inputMode="tel" aria-invalid={Boolean(fieldErrors.phone)} aria-describedby={describe('contact-phone-error', fieldErrors.phone)} className={fieldClass} placeholder="+254 743 661 423" />
            <FieldError id="contact-phone-error" message={fieldErrors.phone} />
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
              aria-invalid={Boolean(fieldErrors.department)}
              aria-describedby={describe('contact-department-error', fieldErrors.department)}
              className={fieldClass}
            >
              <option value="" disabled>Select a department</option>
              {departments.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}
            </select>
            <FieldError id="contact-department-error" message={fieldErrors.department} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-programme" className="text-sm font-semibold text-primary">Programme of interest</label>
            <select id="contact-programme" name="programme" required defaultValue="" disabled={!selectedDepartmentData} aria-invalid={Boolean(fieldErrors.programme)} aria-describedby={describe('contact-programme-error', fieldErrors.programme)} className={`${fieldClass} disabled:cursor-not-allowed disabled:opacity-60`}>
              <option value="" disabled>{selectedDepartmentData ? 'Select a programme' : 'Select a department first'}</option>
              {selectedDepartmentData?.courses.map((course) => <option key={course.name} value={course.name}>{course.name}</option>)}
            </select>
            <FieldError id="contact-programme-error" message={fieldErrors.programme} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-grade" className="text-sm font-semibold text-primary">Highest qualification / grade</label>
            <input id="contact-grade" name="grade" required maxLength={100} aria-invalid={Boolean(fieldErrors.grade)} aria-describedby={describe('contact-grade-error', fieldErrors.grade)} className={fieldClass} placeholder="e.g. KCSE C-" />
            <FieldError id="contact-grade-error" message={fieldErrors.grade} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-message" className="text-sm font-semibold text-primary">Additional information</label>
          <textarea id="contact-message" name="message" rows={5} maxLength={2000} aria-invalid={Boolean(fieldErrors.message)} aria-describedby={describe('contact-message-error', fieldErrors.message)} className={`${fieldClass} py-3`} placeholder="Tell us anything else about your application..." />
          <FieldError id="contact-message-error" message={fieldErrors.message} />
        </div>
        <Honeypot />
        <div className="flex flex-col items-start gap-3">
          <Button type="submit" disabled={sending} aria-disabled={sending}>
            {sending && <Loader2 className="animate-spin" aria-hidden="true" />}
            {sending ? 'Submitting…' : 'Submit application'}
          </Button>
          <SubmissionStatus error={error}>
            {outcome && (
              <div className="rounded-md border border-secondary/40 bg-secondary/10 px-4 py-3 text-sm text-foreground" role="status">
                <p className="font-bold text-primary">{outcome.duplicate ? 'We already have this application.' : 'Application received.'}</p>
                {outcome.reference ? (
                  <p className="mt-1">
                    Your reference number is <strong className="font-mono text-base">{outcome.reference}</strong>. Please keep it for your records. The Admissions Office will contact you using the details you provided.
                  </p>
                ) : (
                  <p className="mt-1">Thank you. The Admissions Office will contact you shortly.</p>
                )}
              </div>
            )}
          </SubmissionStatus>
        </div>
      </form>
    </div>
  )
}
