import type { Metadata } from 'next'
import { requireSession } from '@/lib/auth/session'
import { PageHeader } from '@/components/admin/page-header'
import { CreateUserForm } from '@/components/admin/user-forms'

export const metadata: Metadata = { title: 'Add administrator' }

export default async function NewUserPage() {
  await requireSession('users:manage')
  return (
    <>
      <PageHeader title="Add administrator" crumbs={[{ href: '/admin', label: 'Dashboard' }, { href: '/admin/users', label: 'Administrators' }, { label: 'Add' }]} />
      <CreateUserForm />
    </>
  )
}
