import { Mail, Phone, Download } from 'lucide-react'
import { contact } from '@/lib/site-data'
import { SocialIcons } from './social-icons'

export function TopBar() {
  return (
    <div className="bg-brand-deep text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 text-xs sm:text-sm">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          {contact.phones.map((phone) => (
            <a
              key={phone}
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 hover:text-accent"
            >
              <Phone className="size-3.5 text-accent" aria-hidden="true" />
              {phone}
            </a>
          ))}
          <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 hover:text-accent">
            <Mail className="size-3.5 text-accent" aria-hidden="true" />
            {contact.email}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/trainees/downloads"
            className="hidden items-center gap-1.5 hover:text-accent md:flex"
          >
            <Download className="size-3.5 text-accent" aria-hidden="true" />
            Download Admission Letter
          </a>
          <SocialIcons />
        </div>
      </div>
    </div>
  )
}
