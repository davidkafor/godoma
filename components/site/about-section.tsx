import Image from 'next/image'
import { Eye, Target, CheckCircle2, MapPin } from 'lucide-react'
import type { HomeContent } from '@/lib/home-defaults'
import { SectionHeading } from './section-heading'

export function AboutSection({ content }: { content: HomeContent['about'] }) {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-muted py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className={content.image ? 'grid items-center gap-12 lg:grid-cols-2' : 'grid gap-12'}>
          {content.image && (
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
                <Image src={content.image} alt={content.heading} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
              {(content.badgeValue || content.badgeText) && (
                <div className="absolute -bottom-6 right-4 rounded-lg bg-primary p-5 text-primary-foreground shadow-xl sm:right-8">
                  <p className="text-4xl font-extrabold text-accent">{content.badgeValue}</p>
                  <p className="text-sm font-semibold">{content.badgeText}</p>
                </div>
              )}
            </div>
          )}

          <div id="history">
            <SectionHeading id="about-heading" eyebrow={content.eyebrow} title={content.heading} align="left" />
            <div className="-mt-6 space-y-4 leading-relaxed text-muted-foreground">
              <h3 className="text-xl font-bold text-primary">{content.historyTitle}</h3>
              {content.history.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            {content.location && (
              <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary">
                <MapPin className="size-4 text-accent" aria-hidden="true" />
                {content.location}
              </p>
            )}
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border-t-4 border-accent bg-card p-8 shadow-sm">
            <Eye className="size-9 text-accent" aria-hidden="true" />
            <h3 className="mt-4 text-xl font-bold text-primary">{content.visionTitle}</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">{content.vision}</p>
          </div>
          <div className="rounded-lg border-t-4 border-primary bg-card p-8 shadow-sm">
            <Target className="size-9 text-primary" aria-hidden="true" />
            <h3 className="mt-4 text-xl font-bold text-primary">{content.missionTitle}</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">{content.mission}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-lg bg-primary p-8 text-primary-foreground lg:col-span-1">
            <h3 className="text-xl font-bold">{content.valuesTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">{content.valuesIntro}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {content.values.map((v) => (
                <li key={v} className="rounded-full border border-accent/60 bg-accent/15 px-3 py-1 text-sm font-semibold text-primary-foreground">
                  {v}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-card p-8 shadow-sm lg:col-span-2">
            <h3 className="text-xl font-bold text-primary">{content.mandateTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{content.mandateIntro}</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {content.mandate.map((m) => (
                <li key={m} className="flex gap-3 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
