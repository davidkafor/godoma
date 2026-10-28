'use client'

import { useRef, useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, Pencil, Trash2 } from 'lucide-react'
import { deleteItem, setItemStatus } from '@/lib/admin/crud'
import { btnDanger, btnGhost, btnSecondary } from './styles'

type Props = {
  resourceKey: string
  id: string
  title: string
  status: 'DRAFT' | 'PUBLISHED'
  canPublish: boolean
  canDelete: boolean
  deleteWarning?: string
}

export function RowActions({ resourceKey, id, title, status, canPublish, canDelete, deleteWarning }: Props) {
  const router = useRouter()
  const dialog = useRef<HTMLDialogElement>(null)
  const [pending, start] = useTransition()
  const [error, setError] = useState('')

  const toggle = () =>
    start(async () => {
      const result = await setItemStatus(resourceKey, id, status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED')
      if (result.error) setError(result.error)
      else router.refresh()
    })

  const remove = () =>
    start(async () => {
      const result = await deleteItem(resourceKey, id)
      if (result.error) setError(result.error)
      else {
        dialog.current?.close()
        router.refresh()
      }
    })

  return (
    <div className="flex flex-wrap items-center justify-end gap-1">
      <Link href={`/admin/${resourceKey}/${id}`} className={btnGhost} aria-label={`Edit ${title}`}>
        <Pencil className="size-4" aria-hidden="true" />
      </Link>
      {canPublish && (
        <button type="button" onClick={toggle} disabled={pending} className={btnGhost} aria-label={`${status === 'PUBLISHED' ? 'Unpublish' : 'Publish'} ${title}`} title={status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}>
          {pending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : status === 'PUBLISHED' ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
        </button>
      )}
      {canDelete && (
        <>
          <button type="button" onClick={() => dialog.current?.showModal()} className={`${btnGhost} text-destructive`} aria-label={`Delete ${title}`}>
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
          <dialog ref={dialog} className="m-auto w-[min(92vw,26rem)] rounded-lg border border-border bg-card p-6 text-left text-foreground backdrop:bg-foreground/50" aria-labelledby={`del-${id}`}>
            <h2 id={`del-${id}`} className="text-lg font-extrabold">
              Delete this item?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              <strong className="text-foreground">{title}</strong> will be permanently removed from the website. This cannot be undone.
              {deleteWarning && <span className="mt-2 block font-semibold text-destructive">{deleteWarning}</span>}
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
      )}
      {error && !canDelete && (
        <span role="alert" className="sr-only">
          {error}
        </span>
      )}
    </div>
  )
}
