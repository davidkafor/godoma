import { getMenuPages } from '@/lib/content'
import { SiteHeaderClient } from '@/components/site/site-header-client'

export async function SiteHeader() {
  const extraPages = await getMenuPages()
  return <SiteHeaderClient extraPages={extraPages} />
}
