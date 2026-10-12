import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { contact } from '@/lib/site-data'

export function ContactDetails() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      <li className="rounded-lg border bg-card p-5">
        <Phone className="size-6 text-primary" aria-hidden="true" />
        <p className="mt-3 font-bold text-foreground">Call us</p>
        <div className="mt-1 flex flex-col">
          {contact.phones.map((p) => (
            <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="text-sm text-muted-foreground hover:text-primary">
              {p}
            </a>
          ))}
        </div>
      </li>
      <li className="rounded-lg border bg-card p-5">
        <Mail className="size-6 text-primary" aria-hidden="true" />
        <p className="mt-3 font-bold text-foreground">Email us</p>
        <a href={`mailto:${contact.email}`} className="mt-1 block text-sm text-muted-foreground hover:text-primary">
          {contact.email}
        </a>
      </li>
      <li className="rounded-lg border bg-card p-5">
        <MapPin className="size-6 text-primary" aria-hidden="true" />
        <p className="mt-3 font-bold text-foreground">Visit us</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{contact.address}</p>
      </li>
      <li className="rounded-lg border bg-card p-5">
        <Clock className="size-6 text-primary" aria-hidden="true" />
        <p className="mt-3 font-bold text-foreground">Office hours</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Monday – Friday, 8:00am – 5:00pm</p>
      </li>
    </ul>
  )
}

export function ContactMap() {
  return (
    <div className="aspect-video overflow-hidden rounded-lg border">
      <iframe
        title="Map showing Godoma Technical Training Institute"
        src={contact.mapEmbed}
        className="size-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
