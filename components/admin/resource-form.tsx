'use client'

import { useActionState, useId } from 'react'
import Link from 'next/link'
import { Eye, Loader2 } from 'lucide-react'
import { saveItem, type FormState } from '@/lib/admin/crud'
import type { Field, Resource } from '@/lib/admin/resources'
import { MediaField } from './media-field'
import { Notice } from './page-header'
import { btnPrimary, btnSecondary, inputClass, labelClass } from './styles'

type Props = {
  resource: Resource
  id: string | null
  values: Record<string, string | number | boolean | null>
  status: 'DRAFT' | 'PUBLISHED'
  publishedAt: string
  options: { departments: { value: string; label: string }[] }
  canPublish: boolean
}

function FieldControl({ field, value, error, options }: { field: Field; value: unknown; error?: string; options: Props['options'] }) {
  const id = useId()
  const describedBy = error ? `${id}-error` : field.help ? `${id}-help` : undefined

  if (field.type === 'image' || field.type === 'file') {
    return (
      <MediaField
        name={field.name}
        label={field.label}
        kind={field.type === 'image' ? 'IMAGE' : 'DOCUMENT'}
        defaultValue={(value as string) ?? ''}
        required={field.required}
        help={field.help}
        error={error}
      />
    )
  }

  if (field.type === 'boolean') {
    return (
      <div className="flex items-start gap-3">
        <input id={id} name={field.name} type="checkbox" defaultChecked={Boolean(value)} className="mt-1 size-4 accent-primary" />
        <label htmlFor={id} className="text-sm font-semibold text-foreground">
          {field.label}
          {field.help && <span className="block text-xs font-normal text-muted-foreground">{field.help}</span>}
        </label>
      </div>
    )
  }

  const common = {
    id,
    name: field.name,
    className: inputClass,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    required: field.required && !field.autoSlugFrom,
  } as const

  let control: React.ReactNode
  if (field.type === 'textarea') {
    control = <textarea {...common} rows={field.rows ?? 4} maxLength={field.max} defaultValue={(value as string) ?? ''} />
  } else if (field.type === 'select') {
    const list = field.optionsFrom === 'departments' ? options.departments : (field.options ?? [])
    control = (
      <select {...common} defaultValue={(value as string) ?? list[0]?.value ?? ''}>
        {list.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    )
  } else if (field.type === 'number') {
    control = <input {...common} type="number" step={1} min={-9999} max={9999} defaultValue={(value as number) ?? 0} />
  } else {
    control = <input {...common} type="text" maxLength={field.max} placeholder={field.placeholder} defaultValue={(value as string) ?? ''} />
  }

  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {field.label}
        {field.required && !field.autoSlugFrom && <span className="text-destructive"> *</span>}
      </label>
      {control}
      {field.help && !error && (
        <p id={`${id}-help`} className="mt-1 text-xs text-muted-foreground">
          {field.help}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs font-semibold text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export function ResourceForm({ resource, id, values, status, publishedAt, options, canPublish }: Props) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveItem.bind(null, resource.key, id), {})
  const statusId = useId()
  const dateId = useId()

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]" noValidate>
      <div className="min-w-0 space-y-5 rounded-lg border border-border bg-card p-4 sm:p-6">
        {state.error && <Notice tone="error">{state.error}</Notice>}
        {state.ok && state.message && <Notice>{state.message}</Notice>}
        {resource.fields.map((field) => (
          <FieldControl key={field.name} field={field} value={values[field.name]} error={state.fieldErrors?.[field.name]} options={options} />
        ))}
      </div>

      <aside className="h-fit space-y-4 rounded-lg border border-border bg-card p-4 lg:sticky lg:top-20">
        <h2 className="text-sm font-extrabold uppercase tracking-wide text-primary">Publishing</h2>
        <div>
          <label htmlFor={statusId} className={labelClass}>
            Status
          </label>
          <select id={statusId} name="status" defaultValue={status} className={inputClass}>
            <option value="DRAFT">Draft (hidden from the website)</option>
            <option value="PUBLISHED" disabled={!canPublish}>
              Published (visible on the website)
            </option>
          </select>
        </div>
        <div>
          <label htmlFor={dateId} className={labelClass}>
            Publication date (EAT)
          </label>
          <input id={dateId} name="publishedAt" type="datetime-local" defaultValue={publishedAt} className={inputClass} aria-invalid={state.fieldErrors?.publishedAt ? true : undefined} />
          <p className="mt-1 text-xs text-muted-foreground">Leave blank to use the time you publish. A future date schedules the item.</p>
          {state.fieldErrors?.publishedAt && (
            <p role="alert" className="mt-1 text-xs font-semibold text-destructive">
              {state.fieldErrors.publishedAt}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button type="submit" disabled={pending} className={btnPrimary}>
            {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
            {pending ? 'Saving…' : id ? 'Save changes' : `Create ${resource.singular}`}
          </button>
          {id && (
            <Link href={`/admin/preview/${resource.key}/${id}`} target="_blank" className={btnSecondary}>
              <Eye className="size-4" aria-hidden="true" />
              Preview
            </Link>
          )}
          <Link href={`/admin/${resource.key}`} className={btnSecondary}>
            Back to list
          </Link>
        </div>
      </aside>
    </form>
  )
}
