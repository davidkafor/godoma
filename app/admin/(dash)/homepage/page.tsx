import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, RotateCcw } from 'lucide-react'
import { requireSession } from '@/lib/auth/session'
import { can } from '@/lib/auth/permissions'
import { getHome } from '@/lib/content'
import { resetHome } from '@/lib/admin/home-actions'
import { PageHeader } from '@/components/admin/page-header'
import { HomeForm } from '@/components/admin/home-form'
import { btnSecondary } from '@/components/admin/styles'

export const metadata: Metadata = { title: 'Homepage' }
export const dynamic = 'force-dynamic'

export default async function HomepageEditor() {
  const session = await requireSession('content:write')
  const home = await getHome()
  return (
    <>
      <PageHeader
        title="Homepage"
        description="Edit the text, images and video of every homepage section, and choose their order."
        actions={
          <>
            <Link href="/" target="_blank" className={btnSecondary}>
              <ExternalLink className="size-4" aria-hidden="true" />
              View site
            </Link>
            {can(session.user.role, 'content:publish') && (
              <form action={resetHome}>
                <button type="submit" className={`${btnSecondary} text-destructive`}>
                  <RotateCcw className="size-4" aria-hidden="true" />
                  Reset to defaults
                </button>
              </form>
            )}
          </>
        }
      />
      <HomeForm home={home} />
    </>
  )
}
