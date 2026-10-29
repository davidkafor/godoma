import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { getContact } from '@/lib/content'
import { SocialIcons } from './social-icons'

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Academic Departments', href: '/departments' },
  { label: 'Library', href: '/library' },
  { label: 'Notice Board', href: '/notice-board' },
]

const importantPages = [
  { label: 'Administration', href: '/administration' },
  { label: 'Student Funding', href: '/funding' },
  { label: 'Recognition of Prior Learning', href: '/recognition-of-prior-learning' },
  { label: 'Industrial Liaison Office', href: '/industrial-liaison-office' },
  { label: 'Events Calendar', href: '/events' },
  { label: 'Contact Us', href: '/contact' },
]

export async function SiteFooter() {
  const contact = await getContact()
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-8">
        <div>
          <div className="inline-block bg-primary-foreground p-3 shadow-sm">
            <Image src="/images/godoma-main-logo.webp" alt="Godoma Technical Training Institute" width={960} height={261} className="h-auto w-full max-w-sm" />
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

      <div className="mx-auto max-w-7xl px-4 pb-16">
        <div className="overflow-hidden rounded-lg border border-primary-foreground/10 bg-secondary">
          <iframe
            title="Map showing Godoma Technical Training Institute in Vitengeni, Kilifi"
            src="https://www.openstreetmap.org/export/embed.html?bbox=39.7600%2C-3.8200%2C39.8400%2C-3.7400&layer=mapnik&marker=-3.7800%2C39.8000"
            className="h-64 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="flex items-center justify-between gap-4 p-4 text-secondary-foreground">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Visit us</p>
              <p className="mt-1 text-sm">Vitengeni, Kilifi County, Kenya</p>
            </div>
            <a
              href={contact.mapEmbed}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Directions
            </a>
          </div>
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
