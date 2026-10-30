import { getMenuPages } from '@/lib/content'
import { SiteBanner } from '@/components/site/site-banner'
import { SiteHeaderClient } from '@/components/site/site-header-client'

export async function SiteHeader() {
  const extraPages = await getMenuPages()
  return (
    <div className="sticky top-0 z-50">
      <SiteBanner />
      <SiteHeaderClient extraPages={extraPages} />
    </div>
  )
}
