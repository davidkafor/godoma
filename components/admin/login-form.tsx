'use client'

import { useActionState } from 'react'
import { Loader2 } from 'lucide-react'
import { login } from '@/lib/admin/auth-actions'
import type { FormState } from '@/lib/admin/crud'
import { btnPrimary, inputClass, labelClass } from './styles'

export function LoginForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(login, {})

  return (
    <form action={action} className="space-y-4" noValidate>
      {state.error && (
        <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}
      <div>
        <label htmlFor="email" className={labelClass}>
          Email address
        </label>
        <input id="email" name="email" type="email" autoComplete="username" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={inputClass} />
      </div>
      <button type="submit" disabled={pending} className={`${btnPrimary} w-full`}>
        {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
