import Link from 'next/link'
import { Search } from 'lucide-react'
import { EmptyState, PageHeader } from '@/components/admin/page-header'
import { btnPrimary, btnSecondary, inputClass } from '@/components/admin/styles'

export const emailTone: Record<string, string> = {
  SENT: 'bg-secondary text-secondary-foreground',
  PENDING: 'bg-muted text-muted-foreground ring-1 ring-inset ring-border',
  FAILED: 'bg-destructive/15 text-destructive ring-1 ring-inset ring-destructive/40',
}
export const emailLabel: Record<string, string> = { SENT: 'Sent', PENDING: 'Pending', FAILED: 'Failed' }

export function Pill({ tone, children }: { tone?: string; children: React.ReactNode }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${tone ?? 'bg-muted text-foreground ring-1 ring-inset ring-border'}`}>{children}</span>
}

const dateTime = new Intl.DateTimeFormat('en-KE', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Africa/Nairobi' })
export const formatDateTime = (date: Date | null | undefined) => (date ? dateTime.format(date) : '—')

type Row = { id: string; reference: string; createdAt: Date; status: string; emailStatus: string; primary: string; secondary: string; detail: string }

export function SubmissionList({
  basePath,
  title,
  description,
  statuses,
  rows,
  total,
  page,
  pages,
  query,
}: {
  basePath: string
  title: string
  description: string
  statuses: { value: string; label: string }[]
  rows: Row[]
  total: number
  page: number
  pages: number
  query: { q?: string; status?: string; emailStatus?: string }
}) {
  const statusLabel = Object.fromEntries(statuses.map((s) => [s.value, s.label]))
  const hrefFor = (target: number) => {
    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(query)) if (value) params.set(key, value)
    if (target > 1) params.set('page', String(target))
    const qs = params.toString()
    return `${basePath}${qs ? `?${qs}` : ''}`
  }
  const filtered = Boolean(query.q || query.status || query.emailStatus)

  return (
    <>
      <PageHeader title={title} description={description} />
      <form method="get" className="mb-5 grid gap-3 rounded-lg border bg-card p-4 sm:grid-cols-[1fr_auto_auto_auto]" role="search" aria-label={`Filter ${title.toLowerCase()}`}>
        <div>
          <label htmlFor="q" className="sr-only">
            Search
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input id="q" name="q" defaultValue={query.q} maxLength={100} placeholder="Search reference, name, email…" className={`${inputClass} pl-9`} />
          </div>
        </div>
        <div>
          <label htmlFor="status" className="sr-only">
            Status
          </label>
          <select id="status" name="status" defaultValue={query.status ?? ''} className={inputClass}>
            <option value="">All statuses</option>
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="emailStatus" className="sr-only">
            Email delivery
          </label>
          <select id="emailStatus" name="emailStatus" defaultValue={query.emailStatus ?? ''} className={inputClass}>
            <option value="">Any email status</option>
            <option value="PENDING">Email pending</option>
            <option value="SENT">Email sent</option>
            <option value="FAILED">Email failed</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button type="submit" className={btnPrimary}>
            Filter
          </button>
          {filtered && (
            <Link href={basePath} className={btnSecondary}>
              Clear
            </Link>
          )}
        </div>
      </form>

      {rows.length === 0 ? (
        <EmptyState title={filtered ? 'Nothing matches those filters' : 'Nothing here yet'}>{filtered ? 'Try a different search or clear the filters.' : 'New submissions from the website will appear here.'}</EmptyState>
      ) : (
        <div className="overflow-x-auto rounded-lg border bg-card">
          <table className="w-full min-w-[44rem] text-left text-sm">
            <caption className="sr-only">{title}</caption>
            <thead className="border-b bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th scope="col" className="px-4 py-3">Reference</th>
                <th scope="col" className="px-4 py-3">From</th>
                <th scope="col" className="px-4 py-3">Details</th>
                <th scope="col" className="px-4 py-3">Submitted</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((row) => (
                <tr key={row.id} className="align-top">
                  <td className="px-4 py-3 font-mono text-xs">
                    <Link href={`${basePath}/${row.id}`} className="font-bold text-primary underline-offset-4 hover:underline">
                      {row.reference}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold">{row.primary}</p>
                    <p className="text-xs text-muted-foreground">{row.secondary}</p>
                  </td>
                  <td className="px-4 py-3"><span className="line-clamp-2">{row.detail}</span></td>
                  <td className="whitespace-nowrap px-4 py-3">{formatDateTime(row.createdAt)}</td>
                  <td className="px-4 py-3"><Pill>{statusLabel[row.status] ?? row.status}</Pill></td>
                  <td className="px-4 py-3"><Pill tone={emailTone[row.emailStatus]}>{emailLabel[row.emailStatus] ?? row.emailStatus}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <nav aria-label="Pagination" className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <p className="text-muted-foreground">
          {total} {total === 1 ? 'record' : 'records'} · page {page} of {pages}
        </p>
        <div className="flex gap-2">
          {page > 1 && (
            <Link href={hrefFor(page - 1)} className={btnSecondary} rel="prev">
              Previous
            </Link>
          )}
          {page < pages && (
            <Link href={hrefFor(page + 1)} className={btnSecondary} rel="next">
              Next
            </Link>
          )}
        </div>
      </nav>
    </>
  )
}
