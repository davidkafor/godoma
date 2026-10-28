import type { Metadata } from 'next'
import { requireSession } from '@/lib/auth/session'
import { roleLabels } from '@/lib/auth/permissions'
import { PageHeader } from '@/components/admin/page-header'
import { ChangePasswordForm } from '@/components/admin/user-forms'

export const metadata: Metadata = { title: 'My account' }

export default async function AccountPage() {
  const { user } = await requireSession()
  return (
    <>
      <PageHeader title="My account" />
      <dl className="mb-6 grid max-w-xl gap-3 rounded-lg border border-border bg-card p-4 text-sm sm:grid-cols-[8rem_1fr] sm:p-6">
        <dt className="font-semibold text-muted-foreground">Name</dt>
        <dd>{user.name}</dd>
        <dt className="font-semibold text-muted-foreground">Email</dt>
        <dd>{user.email}</dd>
        <dt className="font-semibold text-muted-foreground">Role</dt>
        <dd>{roleLabels[user.role]}</dd>
      </dl>
      <ChangePasswordForm />
    </>
  )
}
