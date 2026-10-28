import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireSession } from '@/lib/auth/session'
import { can } from '@/lib/auth/permissions'
import { toInputValue } from '@/lib/admin/dates'
import { PageHeader } from '@/components/admin/page-header'
import { PageForm } from '@/components/admin/page-form'
import { StatusBadge } from '@/components/admin/status-badge'

export const metadata: Metadata = { title: 'Edit page' }

export default async function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const session = await requireSession('content:write')
  const page = await prisma.contentPage.findUnique({ where: { slug } })
  if (!page) notFound()

  const raw = Array.isArray(page.sections) ? (page.sections as unknown[]) : []
  const sections = raw
    .filter((s): s is string[] => Array.isArray(s) && s.every((x) => typeof x === 'string'))
    .map(([heading, ...rest]) => ({ heading, body: rest.join('\n\n') }))

  return (
    <>
      <PageHeader
        title={page.title}
        description={`Public address: /${page.slug}`}
        crumbs={[{ href: '/admin', label: 'Dashboard' }, { href: '/admin/pages', label: 'Pages' }, { label: 'Edit' }]}
        actions={<StatusBadge value={page.status} publishedAt={page.publishedAt} />}
      />
      <PageForm
        slug={slug}
        values={{ title: page.title, eyebrow: page.eyebrow, intro: page.intro }}
        sections={sections}
        status={page.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT'}
        publishedAt={toInputValue(page.publishedAt)}
        canPublish={can(session.user.role, 'content:publish')}
      />
    </>
  )
}
