import type { Metadata } from 'next'
import { contact } from '@/lib/site-data'
import { Block, PageHero } from '@/components/site/page-shell'
import { ContactDetails, ContactMap } from '@/components/site/contact-details'

export const metadata: Metadata = {
  title: 'Contact Us | Godoma TTI',
  description: `Contact Godoma Technical Training Institute — ${contact.address}.`,
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Get in Touch"
        description="We'd love to hear from you. Reach us by phone, email, or visit us at Vitengeni."
        crumbs={[{ label: 'Contact Us' }]}
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 lg:grid-cols-2 lg:py-20">
        <Block title="Contact Information" id="info">
          <ContactDetails />
        </Block>
        <Block title="Our Location" id="location">
          <ContactMap />
        </Block>
      </div>
    </>
  )
}
