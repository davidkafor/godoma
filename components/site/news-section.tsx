import Image from 'next/image'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { getNews } from '@/lib/content'
import { SectionHeading } from './section-heading'

export async function NewsSection() {
  const news = await getNews(6)
  if (news.length === 0) return null
  return (
    <section id="news" aria-labelledby="news-heading" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            id="news-heading"
            eyebrow="Notice Board"
            title="Latest News & Announcements"
            align="left"
          />
          <a
            href="/notice-board"
            className="mb-12 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-accent"
          >
            View all notices
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
        <ul className="grid gap-8 md:grid-cols-3">
          {news.map((item) => (
            <li key={item.title}>
              <article className="group flex h-full flex-col overflow-hidden rounded-lg border bg-card shadow-sm outline-offset-4 transition-all hover:-translate-y-1 hover:shadow-xl focus-within:ring-2 focus-within:ring-ring">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent">
                    <CalendarDays className="size-4" aria-hidden="true" />
                    {item.date}
                  </p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-primary">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>
                  <a
                    href={item.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-accent"
                  >
                    Read more
                    <span className="sr-only">about {item.title}</span>
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
