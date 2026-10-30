import { getMenuPages } from '@/lib/content'
import { SiteBanner } from '@/components/site/site-banner'
import { SiteHeaderClient } from '@/components/site/site-header-client'

export async function SiteHeader() {
  const extraPages = await getMenuPages()
  return (
    <>
      <SiteBanner />
      <SiteHeaderClient extraPages={extraPages} />
    </>
  )
}
