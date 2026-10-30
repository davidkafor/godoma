'use client'

import { useActionState, useId } from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { createPage } from '@/lib/admin/page-actions'
import type { FormState } from '@/lib/admin/crud'
import { Notice } from './page-header'
import { btnPrimary, btnSecondary, inputClass, labelClass } from './styles'

export function NewPageForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(createPage, {})
  const ids = { title: useId(), slug: useId(), intro: useId() }
  const err = state.fieldErrors ?? {}
  const fieldError = (key: string) =>
    err[key] ? (
      <p role="alert" className="mt-1 text-xs font-semibold text-destructive">
        {err[key]}
      </p>
    ) : null

  return (
    <form action={action} noValidate className="max-w-2xl space-y-5 rounded-lg border border-border bg-card p-4 sm:p-6">
      {state.error && <Notice tone="error">{state.error}</Notice>}
      <div>
        <label htmlFor={ids.title} className={labelClass}>
          Page title <span className="text-destructive">*</span>
        </label>
        <input id={ids.title} name="title" maxLength={255} className={inputClass} aria-invalid={err.title ? true : undefined} />
        {fieldError('title')}
      </div>
      <div>
        <label htmlFor={ids.slug} className={labelClass}>
          Web address (optional)
        </label>
        <input id={ids.slug} name="slug" maxLength={100} placeholder="generated-from-title" className={inputClass} aria-invalid={err.slug ? true : undefined} />
        <p className="mt-1 text-xs text-muted-foreground">The page will live at godomatti.ac.ke/your-address. Leave blank to use the title.</p>
        {fieldError('slug')}
      </div>
      <div>
        <label htmlFor={ids.intro} className={labelClass}>
          Introduction <span className="text-destructive">*</span>
        </label>
        <textarea id={ids.intro} name="intro" rows={4} maxLength={5000} className={inputClass} aria-invalid={err.intro ? true : undefined} />
        {fieldError('intro')}
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={pending} className={btnPrimary}>
          {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {pending ? 'Creating…' : 'Create page'}
        </button>
        <Link href="/admin/pages" className={btnSecondary}>
          Cancel
        </Link>
      </div>
    </form>
  )
}
