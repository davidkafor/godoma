import { TopBar } from '@/components/site/top-bar'
import { SiteHeader } from '@/components/site/site-header'
import { HeroSlider } from '@/components/site/hero-slider'
import { NewsTicker } from '@/components/site/news-ticker'
import { NewsSection } from '@/components/site/news-section'
import { AboutSection } from '@/components/site/about-section'
import { PrincipalMessage } from '@/components/site/principal-message'
import { DepartmentsSection } from '@/components/site/departments-section'
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
        <NewsSection />
        <AboutSection />
        <StatsSection />
        <DepartmentsSection />
        <AdmissionsSection />
        <FacilitiesSection />
        <TestimonialsSection />
        <PartnersSection />
      </main>
      <SiteFooter />
    </>
  )
}
