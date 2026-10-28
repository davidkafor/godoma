'use client'

import { useActionState, useState } from 'react'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import { saveSettings } from '@/lib/admin/settings-actions'
import type { FormState } from '@/lib/admin/crud'
import { Notice } from './page-header'
import { btnGhost, btnPrimary, btnSecondary, inputClass, labelClass } from './styles'

type Props = {
  contact: { phones: string[]; email: string; address: string; postalAddress: string; locationNote: string; mapEmbed: string }
  socials: { name: string; href: string }[]
}

function FieldError({ message }: { message?: string }) {
  return message ? (
    <p role="alert" className="mt-1 text-xs font-semibold text-destructive">
      {message}
    </p>
  ) : null
}

export function SettingsForm({ contact, socials: initial }: Props) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveSettings, {})
  const [socials, setSocials] = useState(() => initial.map((s, key) => ({ key, ...s })))
  const [nextKey, setNextKey] = useState(initial.length)
  const err = state.fieldErrors ?? {}

  return (
    <form action={action} noValidate className="max-w-3xl space-y-6">
      {state.error && <Notice tone="error">{state.error}</Notice>}
      {state.ok && state.message && <Notice>{state.message}</Notice>}

      <fieldset className="space-y-5 rounded-lg border border-border bg-card p-4 sm:p-6">
        <legend className="px-1 text-lg font-extrabold text-primary">Contact and location</legend>
        <div>
          <label htmlFor="phones" className={labelClass}>
            Phone numbers <span className="text-destructive">*</span>
          </label>
          <textarea id="phones" name="phones" rows={3} defaultValue={contact.phones.join('\n')} className={inputClass} aria-invalid={err.phones ? true : undefined} aria-describedby="phones-help" />
          <p id="phones-help" className="mt-1 text-xs text-muted-foreground">
            One number per line.
          </p>
          <FieldError message={err.phones} />
        </div>
        {(
          [
            ['email', 'Email address', contact.email, 'email'],
            ['address', 'Physical address', contact.address, 'text'],
            ['postalAddress', 'Postal address', contact.postalAddress, 'text'],
          ] as const
        ).map(([name, label, value, type]) => (
          <div key={name}>
            <label htmlFor={name} className={labelClass}>
              {label}
            </label>
            <input id={name} name={name} type={type} defaultValue={value} className={inputClass} aria-invalid={err[name] ? true : undefined} />
            <FieldError message={err[name]} />
          </div>
        ))}
        <div>
          <label htmlFor="locationNote" className={labelClass}>
            Directions note
          </label>
          <textarea id="locationNote" name="locationNote" rows={3} defaultValue={contact.locationNote} className={inputClass} aria-invalid={err.locationNote ? true : undefined} />
          <FieldError message={err.locationNote} />
        </div>
        <div>
          <label htmlFor="mapEmbed" className={labelClass}>
            Map link
          </label>
          <input id="mapEmbed" name="mapEmbed" type="url" defaultValue={contact.mapEmbed} className={inputClass} placeholder="https://" aria-invalid={err.mapEmbed ? true : undefined} />
          <FieldError message={err.mapEmbed} />
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-border bg-card p-4 sm:p-6">
        <legend className="px-1 text-lg font-extrabold text-primary">Social media links</legend>
        <FieldError message={err.socials} />
        <ul className="space-y-3">
          {socials.map((s, index) => (
            <li key={s.key} className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="sr-only" htmlFor={`sn-${s.key}`}>
                Platform name {index + 1}
              </label>
              <input id={`sn-${s.key}`} name="socialName" defaultValue={s.name} placeholder="Platform" maxLength={40} className={`${inputClass} sm:w-40`} />
              <label className="sr-only" htmlFor={`sh-${s.key}`}>
                Link {index + 1}
              </label>
              <input id={`sh-${s.key}`} name="socialHref" type="url" defaultValue={s.href} placeholder="https://" className={`${inputClass} min-w-0 flex-1`} />
              <button type="button" className={`${btnGhost} text-destructive`} onClick={() => setSocials((l) => l.filter((x) => x.key !== s.key))} aria-label={`Remove ${s.name || `link ${index + 1}`}`}>
                <Trash2 className="size-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={`${btnSecondary} mt-4`}
          onClick={() => {
            setSocials((l) => [...l, { key: nextKey, name: '', href: '' }])
            setNextKey((k) => k + 1)
          }}
        >
          <Plus className="size-4" aria-hidden="true" />
          Add link
        </button>
      </fieldset>

      <button type="submit" disabled={pending} className={btnPrimary}>
        {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
        {pending ? 'Saving…' : 'Save changes'}
      </button>
    </form>
  )
}
