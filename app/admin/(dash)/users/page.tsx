import type { Metadata } from 'next'
import Link from 'next/link'
import { Pencil, Plus } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { requireSession } from '@/lib/auth/session'
import { roleLabels } from '@/lib/auth/permissions'
import { formatDate } from '@/lib/admin/dates'
import { Notice, PageHeader } from '@/components/admin/page-header'
import { StatusBadge } from '@/components/admin/status-badge'
import { btnGhost, btnPrimary } from '@/components/admin/styles'

export const metadata: Metadata = { title: 'Administrators' }

export default async function UsersPage({ searchParams }: { searchParams: Promise<{ notice?: string }> }) {
  const session = await requireSession('users:manage')
  const { notice } = await searchParams
  const users = await prisma.adminUser.findMany({ orderBy: [{ active: 'desc' }, { name: 'asc' }] })

  return (
    <>
      <PageHeader
        title="Administrators"
        description="People who can sign in to this dashboard."
        actions={
          <Link href="/admin/users/new" className={btnPrimary}>
            <Plus className="size-4" aria-hidden="true" />
            Add administrator
          </Link>
        }
      />
      {notice === 'created' && <Notice>The administrator account was created.</Notice>}
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <caption className="sr-only">Administrator accounts</caption>
          <thead className="border-b border-border bg-muted text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-2.5 font-bold">Name</th>
              <th scope="col" className="px-4 py-2.5 font-bold">Role</th>
              <th scope="col" className="px-4 py-2.5 font-bold">Last sign-in</th>
              <th scope="col" className="px-4 py-2.5 font-bold">Status</th>
              <th scope="col" className="px-4 py-2.5 text-right font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-4 py-3">
                  <span className="block font-semibold">
                    {u.name}
                    {u.id === session.user.id && <span className="ml-2 text-xs font-normal text-muted-foreground">(you)</span>}
                  </span>
                  <span className="text-muted-foreground">{u.email}</span>
                </td>
                <td className="px-4 py-3">{roleLabels[u.role]}</td>
                <td className="px-4 py-3 text-muted-foreground">{u.lastLoginAt ? formatDate(u.lastLoginAt) : 'Never'}</td>
                <td className="px-4 py-3">
                  <StatusBadge value={u.active ? 'PUBLISHED' : 'DRAFT'} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/users/${u.id}`} className={btnGhost} aria-label={`Edit ${u.name}`}>
                    <Pencil className="size-4" aria-hidden="true" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
