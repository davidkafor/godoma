import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Plus, Search } from 'lucide-react'
import { requireSession } from '@/lib/auth/session'
import { can } from '@/lib/auth/permissions'
import { resourceByKey, type Column, type Resource } from '@/lib/admin/resources'
import { listItems } from '@/lib/admin/queries'
import { EmptyState, Notice, PageHeader } from '@/components/admin/page-header'
import { RowActions } from '@/components/admin/row-actions'
import { StatusBadge } from '@/components/admin/status-badge'
import { btnPrimary, btnSecondary, inputClass } from '@/components/admin/styles'

type Props = {
  params: Promise<{ resource: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resource = resourceByKey[(await params).resource]
  return { title: resource?.label ?? 'Not found' }
}

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)

const dateFormat = new Intl.DateTimeFormat('en-KE', { dateStyle: 'medium', timeZone: 'Africa/Nairobi' })

function read(item: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, part) => (acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[part] : undefined), item)
}

function Cell({ column, item }: { column: Column; item: Record<string, unknown> }) {
  const value = read(item, column.key)
  if (column.kind === 'image') {
    return value ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={String(value)} alt="" className="size-10 rounded object-cover" loading="lazy" />
    ) : (
      <span className="block size-10 rounded bg-muted" aria-hidden="true" />
    )
  }
  if (column.kind === 'badge') return <StatusBadge value={String(value)} publishedAt={column.key === 'status' ? (item.publishedAt as Date | null) : null} />
  if (column.kind === 'date') return <>{value instanceof Date ? dateFormat.format(value) : '—'}</>
  return <span className="line-clamp-2">{value === null || value === undefined || value === '' ? '—' : String(value)}</span>
}

function pageHref(resource: Resource, query: Record<string, string | undefined>, page: number) {
  const params = new URLSearchParams()
  for (const [k, v] of Object.entries(query)) if (v) params.set(k, v)
  if (page > 1) params.set('page', String(page))
  const qs = params.toString()
  return `/admin/${resource.key}${qs ? `?${qs}` : ''}`
}

export default async function ResourceListPage({ params, searchParams }: Props) {
  const resource = resourceByKey[(await params).resource]
  if (!resource) notFound()
  const session = await requireSession()
  const sp = await searchParams

  const query: Record<string, string | undefined> = { q: first(sp.q), status: first(sp.status) }
  const filters: Record<string, string> = {}
  for (const f of resource.filters ?? []) {
    const v = first(sp[f.name])
    if (v) {
      filters[f.name] = v
      query[f.name] = v
    }
  }
  const { items, total, page, pages } = await listItems(resource, { q: query.q, status: query.status, page: Number(first(sp.page)) || 1, filters })

  const canWrite = can(session.user.role, 'content:write')
  const canPublish = can(session.user.role, 'content:publish')
  const canDelete = can(session.user.role, 'content:delete')
  const filtered = Boolean(query.q || query.status || Object.keys(filters).length)
  const notice = first(sp.notice)

  return (
    <>
      <PageHeader
        title={resource.label}
        description={resource.description}
        actions={
          canWrite && (
            <Link href={`/admin/${resource.key}/new`} className={btnPrimary}>
              <Plus className="size-4" aria-hidden="true" />
              New {resource.singular}
            </Link>
          )
        }
      />
      {notice === 'created' && <Notice>The {resource.singular} was created.</Notice>}

      <form method="get" className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end" role="search" aria-label={`Search ${resource.label}`}>
        <div className="min-w-0 flex-1">
          <label htmlFor="q" className="sr-only">
            Search {resource.label}
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input id="q" name="q" type="search" defaultValue={query.q} placeholder={`Search ${resource.label.toLowerCase()}…`} className={`${inputClass} pl-9`} />
          </div>
        </div>
        {resource.filters?.map((f) => (
          <div key={f.name}>
            <label htmlFor={`f-${f.name}`} className="sr-only">
              {f.label}
            </label>
            <select id={`f-${f.name}`} name={f.name} defaultValue={filters[f.name] ?? ''} className={inputClass}>
              <option value="">All {f.label.toLowerCase()}s</option>
              {f.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        ))}
        <div>
          <label htmlFor="status" className="sr-only">
            Status
          </label>
          <select id="status" name="status" defaultValue={query.status ?? ''} className={inputClass}>
            <option value="">All statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>
        <button type="submit" className={btnSecondary}>
          Filter
        </button>
        {filtered && (
          <Link href={`/admin/${resource.key}`} className={btnSecondary}>
            Clear
          </Link>
        )}
      </form>

      {items.length === 0 ? (
        <EmptyState title={filtered ? 'No matching items' : `No ${resource.label.toLowerCase()} yet`}>
          {filtered ? 'Try a different search or clear the filters.' : canWrite ? `Use “New ${resource.singular}” to add the first one.` : 'Nothing has been added yet.'}
        </EmptyState>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <caption className="sr-only">
              {resource.label}: {total} item{total === 1 ? '' : 's'}
            </caption>
            <thead className="border-b border-border bg-muted text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                {resource.columns.map((c) => (
                  <th key={c.key} scope="col" className="px-4 py-2.5 font-bold">
                    {c.label}
                  </th>
                ))}
                <th scope="col" className="px-4 py-2.5 text-right font-bold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((item) => (
                <tr key={String(item.id)} className="align-middle">
                  {resource.columns.map((c) => (
                    <td key={c.key} className="px-4 py-3">
                      <Cell column={c} item={item} />
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    {canWrite && (
                      <RowActions
                        resourceKey={resource.key}
                        id={String(item.id)}
                        title={String(item[resource.titleField])}
                        status={item.status as 'DRAFT' | 'PUBLISHED'}
                        canPublish={canPublish}
                        canDelete={canDelete}
                        deleteWarning={resource.key === 'departments' ? 'Courses in this department will be deleted too.' : undefined}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pages > 1 && (
        <nav aria-label="Pagination" className="mt-4 flex items-center justify-between text-sm">
          <p className="text-muted-foreground">
            Page {page} of {pages} · {total} items
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link href={pageHref(resource, query, page - 1)} className={btnSecondary} rel="prev">
                Previous
              </Link>
            )}
            {page < pages && (
              <Link href={pageHref(resource, query, page + 1)} className={btnSecondary} rel="next">
                Next
              </Link>
            )}
          </div>
        </nav>
      )}
    </>
  )
}
