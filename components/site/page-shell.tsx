import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Mail, Phone } from 'lucide-react'
import { contact, navigation } from '@/lib/site-data'
import { cn } from '@/lib/utils'

type Crumb = { label: string; href?: string }

export function PageHero({
  title,
  eyebrow,
  description,
  image = '/images/hero-campus.png',
  crumbs,
}: {
  title: string
  eyebrow?: string
  description?: string
  image?: string
  crumbs: Crumb[]
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-deep text-primary-foreground">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-deep via-brand-deep/85 to-brand-deep/40" />
      <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-primary-foreground/75">
            <li>
              <Link href="/" className="hover:text-primary-foreground">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5" aria-hidden="true" />
                {c.href ? (
                  <Link href={c.href} className="hover:text-primary-foreground">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-semibold text-primary-foreground">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && (
          <p className="mt-6 text-sm font-bold uppercase tracking-widest text-primary-foreground/70">{eyebrow}</p>
        )}
        <h1 className="mt-2 max-w-3xl text-balance text-3xl font-extrabold leading-tight md:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-primary-foreground/85 md:text-lg">{description}</p>
        )}
      </div>
    </section>
  )
}

export function SectionSidebar({ group, current }: { group: string; current: string }) {
  const nav = navigation.find((g) => g.label === group)
  return (
    <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
      {nav?.items && (
        <nav aria-label={`${group} pages`} className="overflow-hidden rounded-lg border">
          <p className="bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground">
            {group}
          </p>
          <ul>
            {nav.items.map((item) => (
              <li key={item.href} className="border-t first:border-0">
                <Link
                  href={item.href}
                  aria-current={item.href === current ? 'page' : undefined}
                  className={cn(
                    'flex items-center justify-between gap-2 border-l-4 px-5 py-3 text-sm transition-colors hover:bg-secondary hover:text-primary',
                    item.href === current
                      ? 'border-accent bg-secondary font-semibold text-primary'
                      : 'border-transparent text-foreground',
                  )}
                >
                  {item.label}
                  <ChevronRight className="size-4 opacity-50" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <div className="rounded-lg bg-secondary p-5">
        <p className="font-bold text-secondary-foreground">Need help?</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Our team is available Monday to Friday, 8:00am – 5:00pm.
        </p>
        <div className="mt-4 flex flex-col gap-2 text-sm">
          {contact.phones.map((p) => (
            <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="flex items-center gap-2 font-semibold text-primary hover:text-accent">
              <Phone className="size-4" aria-hidden="true" />
              {p}
            </a>
          ))}
          <a href={`mailto:${contact.email}`} className="flex items-center gap-2 font-semibold text-primary hover:text-accent">
            <Mail className="size-4" aria-hidden="true" />
            {contact.email}
          </a>
        </div>
      </div>
    </aside>
  )
}

export function ContentLayout({
  group,
  current,
  children,
}: {
  group: string
  current: string
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1fr_300px] lg:py-20">
      <div className="flex min-w-0 flex-col gap-12">{children}</div>
      <SectionSidebar group={group} current={current} />
    </div>
  )
}

export function Block({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-4">
      <div>
        <h2 id={id} className="text-balance text-2xl font-extrabold text-foreground md:text-3xl">
          {title}
        </h2>
        <div className="mt-3 h-1 w-14 rounded-full bg-accent" aria-hidden="true" />
      </div>
      {children}
    </section>
  )
}

export function PersonCard({ name, role }: { name: string; role: string }) {
  const initials = name
    .replace(/^(Mr|Mrs|Miss|Madam|Dr|Prof)\.?\s+/i, '')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
  return (
    <div className="flex items-center gap-4 rounded-lg border bg-card p-4">
      <span
        aria-hidden="true"
        className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground"
      >
        {initials}
      </span>
      <div className="min-w-0">
        <p className="font-bold text-foreground">{name}</p>
        <p className="text-sm text-accent">{role}</p>
      </div>
    </div>
  )
}
