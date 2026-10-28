import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { requireSession } from '@/lib/auth/session'
import { contact as defaultContact, socials as defaultSocials } from '@/lib/site-data'
import { PageHeader } from '@/components/admin/page-header'
import { SettingsForm } from '@/components/admin/settings-form'

export const metadata: Metadata = { title: 'Contact & social links' }

export default async function SettingsPage() {
  await requireSession('settings:write')
  const rows = await prisma.siteSetting.findMany({ where: { key: { in: ['contact', 'socials'] } } })
  const stored = Object.fromEntries(rows.map((r) => [r.key, r.value]))
  const contact = { ...defaultContact, ...(stored.contact as object | undefined) } as typeof defaultContact
  const socials = (Array.isArray(stored.socials) ? stored.socials : defaultSocials) as { name: string; href: string }[]

  return (
    <>
      <PageHeader title="Contact & social links" description="These details appear in the header, footer and Contact page." />
      <SettingsForm contact={{ ...contact, phones: [...contact.phones] }} socials={socials.map((s) => ({ name: s.name, href: s.href }))} />
    </>
  )
}
