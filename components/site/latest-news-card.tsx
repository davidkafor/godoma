import { ArrowRight, CalendarDays } from 'lucide-react'
import { news } from '@/lib/site-data'

export function LatestNewsCard() {
  return (
    <aside aria-labelledby="latest-news-heading" className="rounded-lg border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Notice Board</p>
          <h2 id="latest-news-heading" className="mt-2 text-2xl font-extrabold text-primary">Latest News</h2>
        </div>
        <a href="/notice-board" className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-primary hover:text-accent">
          View all
          <ArrowRight className="size-4" aria-hidden="true" />
          <span className="sr-only">latest news</span>
        </a>
      </div>
      <ul className="mt-6 divide-y divide-border">
        {news.map((item) => (
          <li key={item.title} className="py-4 first:pt-0 last:pb-0">
            <a href={item.href} className="group block rounded-md outline-offset-4 focus-visible:ring-2 focus-visible:ring-ring">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent">
                <CalendarDays className="size-4" aria-hidden="true" />
                {item.date}
              </p>
              <h3 className="mt-2 text-base font-bold leading-snug text-primary group-hover:text-accent">{item.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
