import { TopBar } from '@/components/site/top-bar'
import { SiteHeader } from '@/components/site/site-header'
import { HeroSlider } from '@/components/site/hero-slider'
import { NewsTicker } from '@/components/site/news-ticker'
import { LatestNewsCard } from '@/components/site/latest-news-card'
import { IntroductionVideo } from '@/components/site/introduction-video'
import { AboutSection } from '@/components/site/about-section'
import { PrincipalMessage } from '@/components/site/principal-message'
import { AdmissionsSection } from '@/components/site/admissions-section'
import { FacilitiesSection } from '@/components/site/facilities-section'
import { StatsSection } from '@/components/site/stats-section'
import { TestimonialsSection } from '@/components/site/testimonials-section'
import { PartnersSection } from '@/components/site/partners-section'
import { SiteFooter } from '@/components/site/site-footer'

export default function Page() {
  return (
    <>
      <TopBar />
      <SiteHeader />
      <main id="top">
        <HeroSlider />
        <NewsTicker />
        <PrincipalMessage />
        <section className="border-t bg-background py-12"><div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)] lg:items-start"><IntroductionVideo /><LatestNewsCard /></div></section>
        <AboutSection />
        <StatsSection />
          <AdmissionsSection />
        <FacilitiesSection />
        <TestimonialsSection />
        <PartnersSection />
      </main>
      <SiteFooter />
    </>
  )
}
