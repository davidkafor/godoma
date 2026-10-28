'use client'

import { useId, useRef, useState } from 'react'
import { FileText, ImageIcon, Loader2, Upload, X } from 'lucide-react'
import { useCsrfToken } from './csrf-context'
import { btnSecondary, inputClass, labelClass } from './styles'

type Item = { id: string; url: string; name: string; alt: string | null }

type Props = {
  name: string
  label: string
  kind: 'IMAGE' | 'DOCUMENT'
  defaultValue?: string | null
  required?: boolean
  help?: string
  error?: string
}

export function MediaField({ name, label, kind, defaultValue, required, help, error }: Props) {
  const id = useId()
  const csrf = useCsrfToken()
  const fileInput = useRef<HTMLInputElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const [value, setValue] = useState(defaultValue ?? '')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [items, setItems] = useState<Item[] | null>(null)

  const accept = kind === 'IMAGE' ? 'image/jpeg,image/png,image/webp,image/gif' : '.pdf,.doc,.docx,.xls,.xlsx'

  async function upload(file: File) {
    setBusy(true)
    setMessage('')
    try {
      const body = new FormData()
      body.set('file', file)
      const response = await fetch('/api/admin/upload', { method: 'POST', body, headers: { 'x-csrf-token': csrf } })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Upload failed.')
      setValue(result.url)
      setItems(null)
      setMessage(`Uploaded ${result.name}.`)
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Upload failed.')
    } finally {
      setBusy(false)
      if (fileInput.current) fileInput.current.value = ''
    }
  }

  async function openLibrary() {
    dialog.current?.showModal()
    if (items) return
    try {
      const response = await fetch(`/api/admin/media?kind=${kind}`)
      const result = await response.json()
      setItems(response.ok ? result.items : [])
    } catch {
      setItems([])
    }
  }

  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-muted">
          {value && kind === 'IMAGE' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="size-full object-cover" />
          ) : kind === 'IMAGE' ? (
            <ImageIcon className="size-8 text-muted-foreground" aria-hidden="true" />
          ) : (
            <FileText className="size-8 text-muted-foreground" aria-hidden="true" />
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <input
            id={id}
            name={name}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className={inputClass}
            aria-invalid={error ? true : undefined}
            aria-describedby={`${id}-help`}
            placeholder="/uploads/… or https://…"
          />
          <div className="flex flex-wrap gap-2">
            <button type="button" className={btnSecondary} disabled={busy} onClick={() => fileInput.current?.click()}>
              {busy ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Upload className="size-4" aria-hidden="true" />}
              {busy ? 'Uploading…' : 'Upload new'}
            </button>
            <button type="button" className={btnSecondary} onClick={openLibrary}>
              Choose from library
            </button>
            {value && (
              <button type="button" className={btnSecondary} onClick={() => setValue('')}>
                <X className="size-4" aria-hidden="true" />
                Remove
              </button>
            )}
          </div>
          <input
            ref={fileInput}
            type="file"
            accept={accept}
            className="sr-only"
            tabIndex={-1}
            aria-label={`Upload ${label}`}
            onChange={(event) => event.target.files?.[0] && upload(event.target.files[0])}
          />
          <p id={`${id}-help`} className="text-xs text-muted-foreground">
            {help ?? (kind === 'IMAGE' ? 'JPG, PNG, WebP or GIF up to 10 MB.' : 'PDF, Word or Excel up to 10 MB.')}
          </p>
          {message && (
            <p role="status" className="text-xs font-semibold text-foreground">
              {message}
            </p>
          )}
          {error && (
            <p role="alert" className="text-xs font-semibold text-destructive">
              {error}
            </p>
          )}
        </div>
      </div>

      <dialog ref={dialog} className="m-auto w-[min(92vw,44rem)] rounded-lg border border-border bg-card p-0 text-foreground backdrop:bg-foreground/50" aria-label="Media library">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="font-bold">Media library</h2>
          <button type="button" className={btnSecondary} onClick={() => dialog.current?.close()}>
            Close
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {items === null ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing uploaded yet. Use “Upload new” to add a file.</p>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="block w-full overflow-hidden rounded-md border border-border bg-background text-left hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={() => {
                      setValue(item.url)
                      dialog.current?.close()
                    }}
                  >
                    {kind === 'IMAGE' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.url} alt={item.alt ?? ''} className="aspect-square w-full object-cover" />
                    ) : (
                      <FileText className="mx-auto my-6 size-10 text-muted-foreground" aria-hidden="true" />
                    )}
                    <span className="block truncate px-2 py-1.5 text-xs font-semibold">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </dialog>
    </div>
  )
}
