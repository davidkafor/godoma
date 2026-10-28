'use client'

import { useEffect, useRef, useState } from 'react'
import type { FieldErrors, ValidationResult } from '@/lib/forms/validation'

export const fieldClass =
  'min-h-11 rounded-md border bg-background px-3 text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive'

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="text-sm font-medium text-destructive">
      {message}
    </p>
  )
}

/** Off-screen trap for bots. Real visitors never reach it (hidden from assistive tech and the tab order). */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor="website-url">Leave this field empty</label>
      <input id="website-url" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  )
}

function newKey() {
  const webCrypto: Crypto = globalThis.crypto
  if (typeof webCrypto.randomUUID === 'function') return webCrypto.randomUUID()
  const bytes = webCrypto.getRandomValues(new Uint8Array(16))
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
}

export type SubmissionOutcome = { reference: string | null; duplicate: boolean }

export function useFormSubmission(endpoint: string) {
  const keyRef = useRef<string | null>(null)
  const startedRef = useRef(0)
  const busyRef = useRef(false)
  const [sending, setSending] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [error, setError] = useState('')
  const [outcome, setOutcome] = useState<SubmissionOutcome | null>(null)

  useEffect(() => {
    startedRef.current = Date.now()
  }, [])

  function focusFirstInvalid(form: HTMLFormElement, errors: FieldErrors) {
    for (const element of Array.from(form.elements)) {
      const name = (element as HTMLInputElement).name
      if (name && errors[name]) {
        ;(element as HTMLElement).focus()
        return
      }
    }
  }

  /** Returns true only when the server confirms the submission was saved. */
  async function submit(form: HTMLFormElement, values: Record<string, unknown>, validate: (raw: Record<string, unknown>) => ValidationResult<unknown>) {
    if (busyRef.current) return false
    busyRef.current = true
    setSending(true)
    setError('')
    setOutcome(null)

    const checked = validate(values)
    if (!checked.ok) {
      setFieldErrors(checked.fieldErrors)
      setError('Please correct the highlighted fields and submit again.')
      focusFirstInvalid(form, checked.fieldErrors)
      busyRef.current = false
      setSending(false)
      return false
    }
    setFieldErrors({})

    // One key per attempt: if the request is repeated (double click, refresh, retry after a timeout) the server returns the original result.
    keyRef.current ??= newKey()
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 20_000)
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, website: values.website ?? '', submissionId: keyRef.current, elapsedMs: Date.now() - startedRef.current }),
        signal: controller.signal,
      })
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string; reference?: string | null; duplicate?: boolean; fieldErrors?: FieldErrors }
      if (!response.ok || !result.ok) {
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors)
          focusFirstInvalid(form, result.fieldErrors)
        }
        setError(result.error || 'Something went wrong. Nothing was submitted, please try again.')
        return false
      }
      keyRef.current = null
      startedRef.current = Date.now()
      setOutcome({ reference: result.reference ?? null, duplicate: Boolean(result.duplicate) })
      return true
    } catch {
      setError('We could not confirm that your submission was received. Please check your connection and press submit again; it will not be recorded twice.')
      return false
    } finally {
      clearTimeout(timer)
      busyRef.current = false
      setSending(false)
    }
  }

  return { sending, fieldErrors, error, outcome, submit, clearOutcome: () => setOutcome(null) }
}

export function SubmissionStatus({ error, children }: { error: string; children?: React.ReactNode }) {
  return (
    <div aria-live="polite" aria-atomic="true" className="min-h-0">
      {error && (
        <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm font-semibold text-destructive">
          {error}
        </p>
      )}
      {children}
    </div>
  )
}
