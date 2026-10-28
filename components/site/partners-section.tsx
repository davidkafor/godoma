import { getPartners } from '@/lib/content'

export async function PartnersSection() {
  const partners = await getPartners()
  if (partners.length === 0) return null
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
              <div className="flex h-24 w-full items-center justify-center transition group-hover:scale-105"><img src={p.logo} alt={`${p.name} logo`} className="max-h-20 max-w-36 object-contain" /></div>
              <span className="mt-3 text-xs leading-snug text-muted-foreground">{p.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
