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
        <HeroSlider />
        <NewsTicker />
        <section className="border-b border-border bg-card">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border">
            <div className="sm:px-8 sm:first:pl-0"><p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Public TVET institution</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Practical training designed around Kenya&apos;s workforce and enterprise needs.</p></div>
            <div className="sm:px-8"><p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">TVET CDACC pathways</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Progress through Levels 4, 5 and 6 with clear, competency-based routes.</p></div>
            <div className="sm:px-8 sm:last:pr-0"><p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Kilifi County, Kenya</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">A local institution preparing learners for national opportunity.</p></div>
          </div>
        </section>
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
