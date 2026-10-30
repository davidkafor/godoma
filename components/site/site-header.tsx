import { getMenuPages } from '@/lib/content'
import { SiteBanner } from '@/components/site/site-banner'
import { SiteHeaderClient } from '@/components/site/site-header-client'

export async function SiteHeader() {
  const extraPages = await getMenuPages()
  return (
    <>
      <SiteBanner />
      <div className="sticky top-0 z-50">
        <SiteHeaderClient extraPages={extraPages} />
      </div>
    </>
  )
}
