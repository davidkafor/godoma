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
import { getDepartments, getHeroSlides, getHome, getTotalCourses } from '@/lib/content'
import { parseVideo } from '@/lib/video'

export default async function Page() {
  const [departments, totalCourses, slides, home] = await Promise.all([getDepartments(), getTotalCourses(), getHeroSlides(), getHome()])
  const hasVideo = Boolean(parseVideo(home.video.url))
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

        {home.layout
          .filter((section) => section.visible)
          .map(({ key }) => {
            switch (key) {
              case 'principal':
                return <PrincipalMessage key={key} content={home.principal} />
              case 'videoNews':
                return (
                  <section key={key} className="border-y border-border/70 bg-card py-16 sm:py-20">
                    <div className={`mx-auto grid max-w-7xl gap-10 px-4 lg:px-8 ${hasVideo ? 'lg:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)] lg:items-start' : ''}`}>
                      <IntroductionVideo content={home.video} />
                      <LatestNewsCard />
                    </div>
                  </section>
                )
              case 'about':
                return <AboutSection key={key} content={home.about} />
              case 'stats':
                return <StatsSection key={key} stats={home.stats} totalCourses={totalCourses} departmentCount={departments.length} />
              case 'admissions':
                return <AdmissionsSection key={key} content={home.admissions} />
              case 'facilities':
                return <FacilitiesSection key={key} />
              case 'testimonials':
                return <TestimonialsSection key={key} />
              case 'partners':
                return <PartnersSection key={key} />
            }
          })}
      </main>
      <SiteFooter />
    </>
  )
}
