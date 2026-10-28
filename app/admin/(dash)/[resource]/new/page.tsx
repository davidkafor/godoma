import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { requireSession } from '@/lib/auth/session'
import { can } from '@/lib/auth/permissions'
import { resourceByKey } from '@/lib/admin/resources'
import { departmentOptions } from '@/lib/admin/queries'
import { PageHeader } from '@/components/admin/page-header'
import { ResourceForm } from '@/components/admin/resource-form'

type Props = { params: Promise<{ resource: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resource = resourceByKey[(await params).resource]
  return { title: resource ? `New ${resource.singular}` : 'Not found' }
}

export default async function NewItemPage({ params }: Props) {
  const resource = resourceByKey[(await params).resource]
  if (!resource) notFound()
  const session = await requireSession('content:write')

  const values: Record<string, string | number | boolean | null> = {}
  for (const field of resource.fields) values[field.name] = field.type === 'boolean' ? false : field.type === 'number' ? 0 : ''

  return (
    <>
      <PageHeader
        title={`New ${resource.singular}`}
        crumbs={[{ href: '/admin', label: 'Dashboard' }, { href: `/admin/${resource.key}`, label: resource.label }, { label: `New ${resource.singular}` }]}
      />
      <ResourceForm
        resource={resource}
        id={null}
        values={values}
        status="DRAFT"
        publishedAt=""
        options={{ departments: resource.fields.some((f) => f.optionsFrom === 'departments') ? await departmentOptions() : [] }}
        canPublish={can(session.user.role, 'content:publish')}
      />
    </>
  )
}
