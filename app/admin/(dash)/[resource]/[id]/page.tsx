import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { requireSession } from '@/lib/auth/session'
import { can } from '@/lib/auth/permissions'
import { resourceByKey } from '@/lib/admin/resources'
import { departmentOptions, getItem } from '@/lib/admin/queries'
import { toInputValue } from '@/lib/admin/dates'
import { PageHeader } from '@/components/admin/page-header'
import { ResourceForm } from '@/components/admin/resource-form'
import { StatusBadge } from '@/components/admin/status-badge'

type Props = { params: Promise<{ resource: string; id: string }> }

export const metadata: Metadata = { title: 'Edit' }

export default async function EditItemPage({ params }: Props) {
  const { resource: key, id } = await params
  const resource = resourceByKey[key]
  if (!resource) notFound()
  const session = await requireSession('content:write')
  const item = await getItem(resource, id)
  if (!item) notFound()

  const values: Record<string, string | number | boolean | null> = {}
  for (const field of resource.fields) {
    const v = item[field.name]
    values[field.name] = field.type === 'boolean' ? Boolean(v) : field.type === 'number' ? Number(v ?? 0) : ((v as string | null) ?? '')
  }
  const publishedAt = (item.publishedAt as Date | null) ?? null

  return (
    <>
      <PageHeader
        title={`Edit ${resource.singular}`}
        description={String(item[resource.titleField])}
        crumbs={[{ href: '/admin', label: 'Dashboard' }, { href: `/admin/${resource.key}`, label: resource.label }, { label: 'Edit' }]}
        actions={<StatusBadge value={String(item.status)} publishedAt={publishedAt} />}
      />
      <ResourceForm
        resource={resource}
        id={id}
        values={values}
        status={item.status as 'DRAFT' | 'PUBLISHED'}
        publishedAt={toInputValue(publishedAt)}
        options={{ departments: resource.fields.some((f) => f.optionsFrom === 'departments') ? await departmentOptions() : [] }}
        canPublish={can(session.user.role, 'content:publish')}
      />
    </>
  )
}
