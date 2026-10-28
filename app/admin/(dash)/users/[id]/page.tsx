import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireSession } from '@/lib/auth/session'
import { PageHeader } from '@/components/admin/page-header'
import { EditUserForm } from '@/components/admin/user-forms'

export const metadata: Metadata = { title: 'Edit administrator' }

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireSession('users:manage')
  const { id } = await params
  const user = await prisma.adminUser.findUnique({ where: { id } })
  if (!user) notFound()
  return (
    <>
      <PageHeader title={user.name} crumbs={[{ href: '/admin', label: 'Dashboard' }, { href: '/admin/users', label: 'Administrators' }, { label: 'Edit' }]} />
      <EditUserForm id={user.id} isSelf={user.id === session.user.id} values={{ name: user.name, email: user.email, role: user.role, active: user.active }} />
    </>
  )
}
