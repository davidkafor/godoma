import type { Metadata } from 'next'
import { AdminShell, type NavGroup } from '@/components/admin/sidebar'
import { CsrfProvider } from '@/components/admin/csrf-context'
import { requireSession } from '@/lib/auth/session'
import { can, roleLabels } from '@/lib/auth/permissions'
import { resources } from '@/lib/admin/resources'

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s | Godoma admin' },
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

const link = (key: string) => {
  const r = resources.find((x) => x.key === key)!
  return { href: `/admin/${r.key}`, label: r.label }
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession()
  const role = session.user.role

  const groups: NavGroup[] = [
    { heading: 'Overview', items: [{ href: '/admin', label: 'Dashboard' }] },
    {
      heading: 'Website',
      items: [link('hero'), { href: '/admin/pages', label: 'Pages' }, link('posts'), link('testimonials'), link('partners')],
    },
    { heading: 'Academics', items: [link('departments'), link('courses')] },
    { heading: 'People & campus', items: [link('staff'), link('facilities'), link('gallery')] },
    { heading: 'Files', items: [link('downloads'), { href: '/admin/media', label: 'Media library' }] },
  ]
  if (can(role, 'submissions:read')) {
    groups.splice(1, 0, {
      heading: 'Enquiries',
      items: [
        { href: '/admin/applications', label: 'Student applications' },
        { href: '/admin/messages', label: 'Contact messages' },
      ],
    })
  }
  const settings: NavGroup['items'] = []
  if (can(role, 'settings:write')) settings.push({ href: '/admin/settings', label: 'Contact & social links' })
  if (can(role, 'users:manage')) settings.push({ href: '/admin/users', label: 'Administrators' })
  if (can(role, 'audit:read')) settings.push({ href: '/admin/activity', label: 'Activity log' })
  settings.push({ href: '/admin/account', label: 'My account' })
  groups.push({ heading: 'Settings', items: settings })

  return (
    <CsrfProvider token={session.csrfToken}>
      <a href="#admin-main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <AdminShell groups={groups} user={{ name: session.user.name, email: session.user.email, roleLabel: roleLabels[role] }}>
        {children}
      </AdminShell>
    </CsrfProvider>
  )
}
