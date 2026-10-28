'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, RefreshCw } from 'lucide-react'
import { retryNotification, setSubmissionStatus } from '@/lib/admin/submission-actions'
import { btnSecondary, inputClass, labelClass } from './styles'

type Kind = 'application' | 'contact'

export function SubmissionControls({
  kind,
  id,
  status,
  statuses,
  emailStatus,
  canManage,
}: {
  kind: Kind
  id: string
  status: string
  statuses: { value: string; label: string }[]
  emailStatus: 'PENDING' | 'SENT' | 'FAILED'
  canManage: boolean
}) {
  const router = useRouter()
  const [pending, start] = useTransition()
  const [notice, setNotice] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null)

  if (!canManage) return null

  const changeStatus = (value: string) =>
    start(async () => {
      const result = await setSubmissionStatus(kind, id, value)
      setNotice(result.error ? { tone: 'error', text: result.error } : { tone: 'ok', text: result.message ?? 'Saved.' })
      router.refresh()
    })

  const retry = () =>
    start(async () => {
      const result = await retryNotification(kind, id)
      setNotice(result.error ? { tone: 'error', text: result.error } : { tone: 'ok', text: result.message ?? 'Sent.' })
      router.refresh()
    })

  return (
    <div className="flex flex-col gap-4">
      <div className="max-w-xs">
        <label htmlFor={`status-${id}`} className={labelClass}>
          Status
        </label>
        <select id={`status-${id}`} className={inputClass} value={status} disabled={pending} onChange={(event) => changeStatus(event.target.value)}>
          {statuses.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {emailStatus !== 'SENT' && (
        <div>
          <button type="button" onClick={retry} disabled={pending} className={btnSecondary}>
            {pending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <RefreshCw className="size-4" aria-hidden="true" />}
            Retry email notification
          </button>
          <p className="mt-2 max-w-md text-xs text-muted-foreground">Only failed or interrupted notifications can be retried. A notification that was already sent is never sent twice.</p>
        </div>
      )}
      <div aria-live="polite">
        {notice && (
          <p role={notice.tone === 'error' ? 'alert' : 'status'} className={`text-sm font-semibold ${notice.tone === 'error' ? 'text-destructive' : 'text-foreground'}`}>
            {notice.text}
          </p>
        )}
      </div>
    </div>
  )
}
