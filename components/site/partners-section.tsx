import { partners } from '@/lib/site-data'

export function PartnersSection() {
  return (
    <section aria-labelledby="partners-heading" className="border-t bg-muted py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2
          id="partners-heading"
          className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground"
        >
          Partners, Regulators & Affiliations
        </h2>
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((p) => (
            <li
              key={p.acronym}
              className="group flex min-h-36 flex-col items-center justify-center rounded-lg border bg-card px-4 py-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <span
                aria-label={`${p.name} logo`}
                className="flex min-h-14 min-w-14 items-center justify-center rounded-full bg-primary px-3 text-center text-sm font-extrabold tracking-tight text-primary-foreground shadow-sm transition group-hover:scale-105"
              >
                {p.acronym}
              </span>
              <span className="mt-3 text-xs leading-snug text-muted-foreground">{p.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
