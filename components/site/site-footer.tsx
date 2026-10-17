import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { contact } from '@/lib/site-data'
import { SocialIcons } from './social-icons'
import { NewsletterForm } from './newsletter-form'

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Academic Departments', href: '/departments' },
  { label: 'Library', href: '/library' },
  { label: 'Notice Board', href: '/#news' },
]

const importantPages = [
  { label: 'Administration', href: '/administration' },
  { label: 'Student Funding', href: '/funding' },
  { label: 'Recognition of Prior Learning', href: '/recognition-of-prior-learning' },
  { label: 'Industrial Liaison Office', href: '/industrial-liaison-office' },
  { label: 'Events Calendar', href: '/trainees#events' },
  { label: 'Contact Us', href: '/contact' },
]

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="inline-block rounded-md bg-background p-2">
            <Image src="/images/godoma-main-logo.png" alt="Godoma Technical Training Institute" width={960} height={261} className="h-auto w-full max-w-sm" />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-primary-foreground/75">
            A centre of excellence in technical training, research and business incubation in Kilifi County.
          </p>
          <SocialIcons className="mt-5" iconClassName="size-9 bg-primary-foreground/10" />
        </div>

        <nav aria-labelledby="footer-quick">
          <h2 id="footer-quick" className="text-base font-bold">
            Quick Links
          </h2>
          <div className="mt-2 h-0.5 w-10 bg-accent" aria-hidden="true" />
          <ul className="mt-5 space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-primary-foreground/75 transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-pages">
          <h2 id="footer-pages" className="text-base font-bold">
            Important Pages
          </h2>
          <div className="mt-2 h-0.5 w-10 bg-accent" aria-hidden="true" />
          <ul className="mt-5 space-y-2.5 text-sm">
            {importantPages.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-primary-foreground/75 transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-base font-bold">Contact Us</h2>
          <div className="mt-2 h-0.5 w-10 bg-accent" aria-hidden="true" />
          <address className="mt-5 space-y-3 text-sm not-italic text-primary-foreground/75">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{contact.address}</span>
            </p>
            <p className="pl-7">{contact.postalAddress}</p>
            <p className="pl-7 text-xs leading-relaxed text-primary-foreground/60">{contact.locationNote}</p>
            {contact.phones.map((phone) => (
              <p key={phone} className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-accent">
                  {phone}
                </a>
              </p>
            ))}
            <p className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <a href={`mailto:${contact.email}`} className="hover:text-accent">
                {contact.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 lg:grid-cols-2">
        <div className="flex min-h-64 flex-col justify-between rounded-lg border border-primary-foreground/10 bg-secondary p-6 text-secondary-foreground">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Visit us</p>
            <h2 className="mt-2 text-2xl font-bold">Godoma Technical Training Institute</h2>
            <p className="mt-3 leading-relaxed">Vitengeni, Kilifi County, Kenya</p>
          </div>
          <a
            href={contact.mapEmbed}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex w-fit items-center rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Open location map
          </a>
        </div>
        <div className="flex flex-col justify-center rounded-lg bg-primary-foreground/5 p-8">
          <h2 className="text-xl font-bold">Sign up for our newsletter</h2>
          <p className="mt-2 text-sm text-primary-foreground/75">
            Get admissions updates, notices and events from Godoma TTI straight to your inbox.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-xs text-primary-foreground/60">
          <p>{`© ${new Date().getFullYear()} Godoma Technical Training Institute. All Rights Reserved.`}</p>
          <p>Regulated by TVETA</p>
        </div>
      </div>
    </footer>
  )
}
