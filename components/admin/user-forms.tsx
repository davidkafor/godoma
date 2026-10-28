'use client'

import { useActionState, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Trash2 } from 'lucide-react'
import { changeOwnPassword, createUser, deleteUser, updateUser } from '@/lib/admin/user-actions'
import type { FormState } from '@/lib/admin/crud'
import { Notice } from './page-header'
import { btnDanger, btnPrimary, btnSecondary, inputClass, labelClass } from './styles'

const roleOptions = [
  { value: 'EDITOR', label: 'Editor — create and publish content' },
  { value: 'ADMIN', label: 'Administrator — also delete content and edit settings' },
  { value: 'SUPER_ADMIN', label: 'Super administrator — also manage administrators' },
]

function Field({ id, label, error, help, children }: { id: string; label: string; error?: string; help?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
      {help && !error && <p className="mt-1 text-xs text-muted-foreground">{help}</p>}
      {error && (
        <p role="alert" className="mt-1 text-xs font-semibold text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

function Submit({ pending, children }: { pending: boolean; children: React.ReactNode }) {
  return (
    <button type="submit" disabled={pending} className={btnPrimary}>
      {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  )
}

export function CreateUserForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(createUser, {})
  const err = state.fieldErrors ?? {}
  return (
    <form action={action} noValidate className="max-w-xl space-y-5 rounded-lg border border-border bg-card p-4 sm:p-6">
      {state.error && <Notice tone="error">{state.error}</Notice>}
      <Field id="name" label="Full name" error={err.name}>
        <input id="name" name="name" autoComplete="off" className={inputClass} maxLength={191} aria-invalid={err.name ? true : undefined} />
      </Field>
      <Field id="email" label="Email address" error={err.email}>
        <input id="email" name="email" type="email" autoComplete="off" className={inputClass} aria-invalid={err.email ? true : undefined} />
      </Field>
      <Field id="role" label="Role" error={err.role}>
        <select id="role" name="role" defaultValue="EDITOR" className={inputClass}>
          {roleOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>
      <Field id="password" label="Temporary password" error={err.password} help="At least 12 characters with upper-case, lower-case and a number. Share it securely; they can change it under My account.">
        <input id="password" name="password" type="password" autoComplete="new-password" className={inputClass} aria-invalid={err.password ? true : undefined} />
      </Field>
      <Submit pending={pending}>{pending ? 'Creating…' : 'Create administrator'}</Submit>
    </form>
  )
}

type EditProps = { id: string; isSelf: boolean; values: { name: string; email: string; role: string; active: boolean } }

export function EditUserForm({ id, isSelf, values }: EditProps) {
  const router = useRouter()
  const [state, action, pending] = useActionState<FormState, FormData>(updateUser.bind(null, id), {})
  const err = state.fieldErrors ?? {}
  const dialog = useRef<HTMLDialogElement>(null)
  const [deleting, startDelete] = useTransition()
  const [deleteError, setDeleteError] = useState('')

  const remove = () =>
    startDelete(async () => {
      const result = await deleteUser(id)
      if (result.error) setDeleteError(result.error)
      else router.replace('/admin/users')
    })

  return (
    <div className="max-w-xl space-y-6">
      <form action={action} noValidate className="space-y-5 rounded-lg border border-border bg-card p-4 sm:p-6">
        {state.error && <Notice tone="error">{state.error}</Notice>}
        {state.ok && state.message && <Notice>{state.message}</Notice>}
        <Field id="email" label="Email address" help="The email address cannot be changed.">
          <input id="email" value={values.email} readOnly className={`${inputClass} bg-muted`} />
        </Field>
        <Field id="name" label="Full name" error={err.name}>
          <input id="name" name="name" defaultValue={values.name} className={inputClass} maxLength={191} aria-invalid={err.name ? true : undefined} />
        </Field>
        <Field id="role" label="Role" error={err.role} help={isSelf ? 'You cannot change your own role.' : undefined}>
          {isSelf && <input type="hidden" name="role" value={values.role} />}
          <select id="role" name={isSelf ? undefined : 'role'} defaultValue={values.role} disabled={isSelf} className={inputClass}>
            {roleOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <div className="flex items-start gap-3">
          <input id="active" name="active" type="checkbox" defaultChecked={values.active} disabled={isSelf} className="mt-1 size-4 accent-primary" />
          {isSelf && values.active && <input type="hidden" name="active" value="on" />}
          <label htmlFor="active" className="text-sm">
            <span className="font-semibold">Account is active</span>
            <span className="block text-muted-foreground">Inactive accounts cannot sign in.</span>
          </label>
        </div>
        <Field id="password" label="Reset password (optional)" error={err.password} help="Leave blank to keep the current password. Resetting signs the person out everywhere.">
          <input id="password" name="password" type="password" autoComplete="new-password" className={inputClass} aria-invalid={err.password ? true : undefined} />
        </Field>
        <Submit pending={pending}>{pending ? 'Saving…' : 'Save changes'}</Submit>
      </form>

      {!isSelf && (
        <div className="rounded-lg border border-destructive/40 bg-card p-4 sm:p-6">
          <h2 className="font-extrabold text-destructive">Delete account</h2>
          <p className="mt-1 text-sm text-muted-foreground">Their content stays on the website. Consider deactivating instead if you may need the audit trail.</p>
          <button type="button" className={`${btnDanger} mt-4`} onClick={() => dialog.current?.showModal()}>
            <Trash2 className="size-4" aria-hidden="true" />
            Delete account
          </button>
          <dialog ref={dialog} aria-labelledby="del-user" className="m-auto w-[min(92vw,26rem)] rounded-lg border border-border bg-card p-6 text-foreground backdrop:bg-foreground/50">
            <h2 id="del-user" className="text-lg font-extrabold">
              Delete {values.name}?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{values.email} will no longer be able to sign in. This cannot be undone.</p>
            {deleteError && (
              <p role="alert" className="mt-3 text-sm font-semibold text-destructive">
                {deleteError}
              </p>
            )}
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" className={btnSecondary} onClick={() => dialog.current?.close()}>
                Cancel
              </button>
              <button type="button" className={btnDanger} onClick={remove} disabled={deleting}>
                {deleting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
                Delete
              </button>
            </div>
          </dialog>
        </div>
      )}
    </div>
  )
}

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(changeOwnPassword, {})
  const err = state.fieldErrors ?? {}
  return (
    <form action={action} noValidate className="max-w-xl space-y-5 rounded-lg border border-border bg-card p-4 sm:p-6" key={state.ok ? 'done' : 'form'}>
      <h2 className="text-lg font-extrabold text-primary">Change password</h2>
      {state.error && <Notice tone="error">{state.error}</Notice>}
      {state.ok && state.message && <Notice>{state.message}</Notice>}
      <Field id="current" label="Current password" error={err.current}>
        <input id="current" name="current" type="password" autoComplete="current-password" className={inputClass} aria-invalid={err.current ? true : undefined} />
      </Field>
      <Field id="next" label="New password" error={err.next} help="At least 12 characters with upper-case, lower-case and a number.">
        <input id="next" name="next" type="password" autoComplete="new-password" className={inputClass} aria-invalid={err.next ? true : undefined} />
      </Field>
      <Field id="confirm" label="Confirm new password" error={err.confirm}>
        <input id="confirm" name="confirm" type="password" autoComplete="new-password" className={inputClass} aria-invalid={err.confirm ? true : undefined} />
      </Field>
      <Submit pending={pending}>{pending ? 'Changing…' : 'Change password'}</Submit>
    </form>
  )
}
