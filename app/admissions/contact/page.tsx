import type { Metadata } from 'next'
import { Block, ContentLayout, PageHero } from '@/components/site/page-shell'
import { ContactDetails, ContactMap } from '@/components/site/contact-details'

export const metadata: Metadata = {
  title: 'Contact Admissions | Godoma TTI',
  description: 'Get in touch with the Godoma TTI admissions office.',
}

export default function AdmissionsContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Contact Admissions"
        description="Questions about courses, requirements or reporting? Our admissions office is here to help."
        crumbs={[{ label: 'Admissions', href: '/admissions' }, { label: 'Contact Admissions' }]}
      />
      <ContentLayout group="Admissions" current="/admissions/contact">
        <Block title="Admissions Office" id="office">
          <p className="leading-relaxed text-muted-foreground">
            The Academic Registrar&apos;s office handles applications, admission letters and enquiries about course
            placement. Reach out by phone or email, or visit us on campus.
          </p>
          <ContactDetails />
        </Block>
        <Block title="Find Us" id="map">
          <ContactMap />
        </Block>
      </ContentLayout>
    </>
  )
}
