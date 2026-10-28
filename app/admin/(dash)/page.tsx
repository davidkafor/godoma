import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { requireSession } from '@/lib/auth/session'
import { can } from '@/lib/auth/permissions'
import { resources } from '@/lib/admin/resources'
import { PageHeader } from '@/components/admin/page-header'
import { btnPrimary, btnSecondary } from '@/components/admin/styles'

export const metadata: Metadata = { title: 'Dashboard' }

const stamp = new Intl.DateTimeFormat('en-KE', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Africa/Nairobi' })

type Delegate = { count: (args?: { where?: { status: 'PUBLISHED' | 'DRAFT' } }) => Promise<number> }

export default async function DashboardHome() {
  const session = await requireSession()
  const db = prisma as unknown as Record<string, Delegate>

  const counts = await Promise.all(
    resources.map(async (r) => {
      const [published, draft] = await Promise.all([db[r.model].count({ where: { status: 'PUBLISHED' } }), db[r.model].count({ where: { status: 'DRAFT' } })])
      return { resource: r, published, draft }
    }),
  )
  const [pagesLive, pagesDraft, media] = await Promise.all([
    prisma.contentPage.count({ where: { status: 'PUBLISHED' } }),
    prisma.contentPage.count({ where: { status: 'DRAFT' } }),
    prisma.mediaAsset.count(),
  ])
  const recent = can(session.user.role, 'audit:read')
    ? await prisma.auditLog.findMany({ orderBy: { createdAt: 'desc' }, take: 6, include: { user: { select: { name: true } } } })
    : []

  return (
    <>
      <PageHeader
        title={`Welcome, ${session.user.name.split(' ')[0]}`}
        description="Everything you publish here appears on the public website straight away."
        actions={
          <>
            <Link href="/" target="_blank" className={btnSecondary}>
              <ExternalLink className="size-4" aria-hidden="true" />
              View website
            </Link>
            <Link href="/admin/posts/new" className={btnPrimary}>
              Write a news post
            </Link>
          </>
        }
      />

      <section aria-labelledby="content-heading">
        <h2 id="content-heading" className="mb-3 text-sm font-extrabold uppercase tracking-wide text-muted-foreground">
          Content
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {[{ href: '/admin/pages', label: 'Pages', published: pagesLive, draft: pagesDraft }, ...counts.map((c) => ({ href: `/admin/${c.resource.key}`, label: c.resource.label, published: c.published, draft: c.draft }))].map((card) => (
            <li key={card.href}>
              <Link href={card.href} className="group flex h-full items-center justify-between gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <span>
                  <span className="block font-bold text-primary">{card.label}</span>
                  <span className="text-sm text-muted-foreground">
                    {card.published} published · {card.draft} draft
                  </span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </li>
          ))}
          <li>
            <Link href="/admin/media" className="group flex h-full items-center justify-between gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span>
                <span className="block font-bold text-primary">Media library</span>
                <span className="text-sm text-muted-foreground">{media} files</span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </section>

      {recent.length > 0 && (
        <section aria-labelledby="recent-heading" className="mt-8">
          <h2 id="recent-heading" className="mb-3 text-sm font-extrabold uppercase tracking-wide text-muted-foreground">
            Recent activity
          </h2>
          <ul className="divide-y divide-border rounded-lg border border-border bg-card text-sm">
            {recent.map((e) => (
              <li key={e.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3">
                <span>
                  <strong>{e.user?.name ?? 'Removed user'}</strong> {e.action} {e.entity}
                  {e.detail ? <span className="text-muted-foreground"> — {e.detail}</span> : null}
                </span>
                <time dateTime={e.createdAt.toISOString()} className="text-xs text-muted-foreground">
                  {stamp.format(e.createdAt)}
                </time>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
