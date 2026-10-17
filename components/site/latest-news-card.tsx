import Image from 'next/image'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { news } from '@/lib/site-data'

export function LatestNewsCard() {
  const [featured, ...secondary] = news.slice(0, 3)

  return (
    <aside aria-labelledby="latest-news-heading" className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
      <div className="flex items-center justify-between gap-4 bg-primary px-5 py-4 text-primary-foreground sm:px-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Notice Board</p>
          <h2 id="latest-news-heading" className="mt-1 text-2xl font-extrabold">Latest News</h2>
        </div>
        <a href="/notice-board" className="inline-flex shrink-0 items-center gap-1 rounded-md border border-primary-foreground/30 px-3 py-2 text-sm font-bold transition-colors hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          View all
          <ArrowRight className="size-4" aria-hidden="true" />
          <span className="sr-only">latest news</span>
        </a>
      </div>

      {featured && (
        <a href={featured.href} className="group block border-b border-border p-4 outline-offset-4 focus-visible:ring-2 focus-visible:ring-ring sm:p-5">
          <div className="relative aspect-[16/8] overflow-hidden rounded-lg bg-muted">
            <Image src={featured.image} alt="" fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(min-width: 1024px) 32vw, 100vw" />
            <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wide text-secondary-foreground">Featured</span>
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent">
            <CalendarDays className="size-4" aria-hidden="true" />
            {featured.date}
          </p>
          <h3 className="mt-2 text-lg font-bold leading-snug text-primary group-hover:text-accent">{featured.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{featured.excerpt}</p>
        </a>
      )}

      <ul className="divide-y divide-border px-4 sm:px-5">
        {secondary.map((item) => (
          <li key={item.title}>
            <a href={item.href} className="group flex gap-3 py-4 outline-offset-4 focus-visible:ring-2 focus-visible:ring-ring">
              <div className="relative mt-0.5 size-16 shrink-0 overflow-hidden rounded-md bg-muted">
                <Image src={item.image} alt="" fill className="object-cover" sizes="64px" />
              </div>
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-wide text-accent">
                  <CalendarDays className="size-3.5" aria-hidden="true" />
                  {item.date}
                </p>
                <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-primary group-hover:text-accent">{item.title}</h3>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
