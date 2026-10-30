import type { Metadata } from 'next'
import { requireSession } from '@/lib/auth/session'
import { PageHeader } from '@/components/admin/page-header'
import { NewPageForm } from '@/components/admin/new-page-form'

export const metadata: Metadata = { title: 'New page' }

export default async function NewPage() {
  await requireSession('content:write')
  return (
    <>
      <PageHeader
        title="New page"
        description="Start with a title and introduction. You can add sections, an image and a video on the next screen."
        crumbs={[{ href: '/admin', label: 'Dashboard' }, { href: '/admin/pages', label: 'Pages' }, { label: 'New' }]}
      />
      <NewPageForm />
    </>
  )
}
