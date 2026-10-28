'use client'

import { useRef, useState, useTransition } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FileText, Loader2, Trash2, Upload } from 'lucide-react'
import { deleteMedia } from '@/lib/admin/media-actions'
import { useCsrfToken } from './csrf-context'
import { Notice } from './page-header'
import { btnDanger, btnGhost, btnPrimary, btnSecondary } from './styles'

export type MediaItem = { id: string; url: string; name: string; kind: 'IMAGE' | 'DOCUMENT'; sizeLabel: string }

export function Uploader() {
  const router = useRouter()
  const csrf = useCsrfToken()
  const input = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<{ tone: 'success' | 'error'; text: string } | null>(null)

  async function upload(files: FileList) {
    setBusy(true)
    setMessage(null)
    let done = 0
    try {
      for (const file of Array.from(files)) {
        const body = new FormData()
        body.set('file', file)
        const response = await fetch('/api/admin/upload', { method: 'POST', body, headers: { 'x-csrf-token': csrf } })
        const result = await response.json().catch(() => ({}))
        if (!response.ok) throw new Error(`${file.name}: ${result.error || 'Upload failed.'}`)
        done += 1
      }
      setMessage({ tone: 'success', text: `${done} file${done === 1 ? '' : 's'} uploaded.` })
      router.refresh()
    } catch (err) {
      setMessage({ tone: 'error', text: err instanceof Error ? err.message : 'Upload failed.' })
      if (done) router.refresh()
    } finally {
      setBusy(false)
      if (input.current) input.current.value = ''
    }
  }

  return (
    <div className="mb-6 rounded-lg border border-dashed border-border bg-card p-4 sm:p-6">
      <input ref={input} id="media-upload" type="file" multiple className="sr-only" accept="image/jpeg,image/png,image/webp,image/gif,.pdf,.doc,.docx,.xls,.xlsx" onChange={(e) => e.target.files?.length && upload(e.target.files)} />
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className={btnPrimary} disabled={busy} onClick={() => input.current?.click()}>
          {busy ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Upload className="size-4" aria-hidden="true" />}
          {busy ? 'Uploading…' : 'Upload files'}
        </button>
        <p className="text-sm text-muted-foreground">JPG, PNG, WebP, GIF, PDF, DOC(X) and XLS(X). Files are checked before they are stored.</p>
      </div>
      <div aria-live="polite" className="mt-3 empty:hidden">
        {message && <Notice tone={message.tone}>{message.text}</Notice>}
      </div>
    </div>
  )
}

export function MediaGrid({ items, canDelete }: { items: MediaItem[]; canDelete: boolean }) {
  const router = useRouter()
  const dialog = useRef<HTMLDialogElement>(null)
  const [target, setTarget] = useState<MediaItem | null>(null)
  const [error, setError] = useState('')
  const [pending, start] = useTransition()

  const remove = () =>
    start(async () => {
      if (!target) return
      const result = await deleteMedia(target.id)
      if (result.error) setError(result.error)
      else {
        dialog.current?.close()
        router.refresh()
      }
    })

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((item) => (
          <li key={item.id} className="overflow-hidden rounded-lg border border-border bg-card">
            <div className="relative aspect-[4/3] bg-muted">
              {item.kind === 'IMAGE' ? (
                <Image src={item.url} alt="" fill sizes="(min-width: 1280px) 15vw, (min-width: 640px) 30vw, 50vw" className="object-cover" unoptimized />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <FileText className="size-10" aria-hidden="true" />
                </span>
              )}
            </div>
            <div className="p-2.5">
              <p className="truncate text-sm font-semibold" title={item.name}>
                {item.name}
              </p>
              <p className="text-xs text-muted-foreground">{item.sizeLabel}</p>
              <div className="mt-2 flex items-center justify-between gap-1">
                <a href={item.url} target="_blank" rel="noreferrer" className="text-xs font-semibold text-primary underline-offset-2 hover:underline">
                  Open<span className="sr-only"> {item.name}</span>
                </a>
                {canDelete && (
                  <button
                    type="button"
                    className={`${btnGhost} text-destructive`}
                    aria-label={`Delete ${item.name}`}
                    onClick={() => {
                      setTarget(item)
                      setError('')
                      dialog.current?.showModal()
                    }}
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <dialog ref={dialog} aria-labelledby="del-media" className="m-auto w-[min(92vw,26rem)] rounded-lg border border-border bg-card p-6 text-foreground backdrop:bg-foreground/50">
        <h2 id="del-media" className="text-lg font-extrabold">
          Delete this file?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          <strong className="text-foreground">{target?.name}</strong> will be removed permanently. Any page still using it will show a missing file.
        </p>
        {error && (
          <p role="alert" className="mt-3 text-sm font-semibold text-destructive">
            {error}
          </p>
        )}
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" className={btnSecondary} onClick={() => dialog.current?.close()}>
            Cancel
          </button>
          <button type="button" className={btnDanger} onClick={remove} disabled={pending}>
            {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
            Delete
          </button>
        </div>
      </dialog>
    </>
  )
}
