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
import { getDepartments, getHeroSlides, getTotalCourses } from '@/lib/content'

export default async function Page() {
  const [departments, totalCourses, slides] = await Promise.all([getDepartments(), getTotalCourses(), getHeroSlides()])
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Godoma Technical Training Institute',
    alternateName: 'Godoma TTI',
    description: 'Public TVET college offering TVET CDACC technical and vocational training in Kilifi County, Kenya.',
    telephone: '+254 743 661 423',
    email: 'godomatti.gtti@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Matanomanne Market, Vitengeni Road',
      addressLocality: 'Vitengeni',
      addressRegion: 'Kilifi County',
      addressCountry: 'KE',
    },
    sameAs: ['https://www.facebook.com/search/top?q=Godoma%20Technical%20Training%20Institute', 'https://x.com/GodomaTTI'],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <TopBar />
      <SiteHeader />
      <main id="top">
        <HeroSlider slides={slides} />
        <NewsTicker />

        <PrincipalMessage />
        <section className="border-y border-border/70 bg-card py-16 sm:py-20"><div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)] lg:items-start lg:px-8"><IntroductionVideo /><LatestNewsCard /></div></section>
        <AboutSection />
        <StatsSection totalCourses={totalCourses} departmentCount={departments.length} />
          <AdmissionsSection />
        <FacilitiesSection />
        <TestimonialsSection />
        <PartnersSection />
      </main>
      <SiteFooter />
    </>
  )
}
