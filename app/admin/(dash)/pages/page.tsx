import type { Metadata } from 'next'
import Link from 'next/link'
import { Pencil, Search } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { requireSession } from '@/lib/auth/session'
import { EmptyState, PageHeader } from '@/components/admin/page-header'
import { StatusBadge } from '@/components/admin/status-badge'
import { btnGhost, btnSecondary, inputClass } from '@/components/admin/styles'

export const metadata: Metadata = { title: 'Pages' }

export default async function PagesList({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  await requireSession()
  const raw = (await searchParams).q
  const q = (Array.isArray(raw) ? raw[0] : raw)?.trim().slice(0, 100)
  const pages = await prisma.contentPage.findMany({
    where: q ? { OR: [{ title: { contains: q } }, { slug: { contains: q } }, { intro: { contains: q } }] } : undefined,
    orderBy: { title: 'asc' },
  })

  return (
    <>
      <PageHeader title="Pages" description="Edit the text of informational pages such as About, Governance, Admissions and Contact." />
      <form method="get" role="search" aria-label="Search pages" className="mb-4 flex gap-2">
        <div className="relative min-w-0 flex-1">
          <label htmlFor="q" className="sr-only">
            Search pages
          </label>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input id="q" name="q" type="search" defaultValue={q} placeholder="Search pages…" className={`${inputClass} pl-9`} />
        </div>
        <button type="submit" className={btnSecondary}>
          Search
        </button>
      </form>
      {pages.length === 0 ? (
        <EmptyState title="No pages found" />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <caption className="sr-only">Website pages</caption>
            <thead className="border-b border-border bg-muted text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-bold">Page</th>
                <th scope="col" className="px-4 py-2.5 font-bold">Address</th>
                <th scope="col" className="px-4 py-2.5 font-bold">Status</th>
                <th scope="col" className="px-4 py-2.5 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pages.map((page) => (
                <tr key={page.id}>
                  <td className="px-4 py-3 font-semibold">{page.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">/{page.slug}</td>
                  <td className="px-4 py-3">
                    <StatusBadge value={page.status} publishedAt={page.publishedAt} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/pages/${page.slug}`} className={btnGhost} aria-label={`Edit ${page.title}`}>
                      <Pencil className="size-4" aria-hidden="true" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
