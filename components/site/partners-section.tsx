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
              className="flex flex-col items-center justify-center rounded-lg border bg-card px-4 py-6 text-center grayscale transition-all hover:-translate-y-0.5 hover:shadow-md hover:grayscale-0"
            >
              <span className="text-2xl font-extrabold tracking-tight text-primary">{p.acronym}</span>
              <span className="mt-1 text-xs leading-snug text-muted-foreground">{p.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
