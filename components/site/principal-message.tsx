import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Quote } from 'lucide-react'
import type { HomeContent } from '@/lib/home-defaults'

export function PrincipalMessage({ content }: { content: HomeContent['principal'] }) {
  const [first, ...rest] = content.paragraphs
  return (
    <section aria-labelledby="principal-message-heading" className="bg-secondary py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        {content.photo && (
          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-lg bg-primary p-3 shadow-xl">
            <Image src={content.photo} alt={`${content.role} ${content.name}`.trim() || 'Principal'} width={640} height={800} className="aspect-[4/5] w-full object-cover" />
            <div className="px-3 py-4 text-primary-foreground">
              <p className="text-lg font-bold">{content.name}</p>
              <p className="text-sm text-primary-foreground/75">{content.role}</p>
            </div>
          </div>
        )}
        <div className={content.photo ? undefined : 'lg:col-span-2'}>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent-foreground">{content.eyebrow}</p>
          <h2 id="principal-message-heading" className="mt-3 text-balance text-3xl font-extrabold text-primary sm:text-4xl">
            {content.heading}
          </h2>
          <Quote className="mt-6 size-10 text-accent" aria-hidden="true" />
          {first && <p className="mt-4 text-pretty text-lg leading-relaxed text-white">{first}</p>}
          {rest.map((paragraph, index) => (
            <p key={index} className="mt-4 text-pretty leading-relaxed text-white">
              {paragraph}
            </p>
          ))}
          {content.linkLabel && content.linkHref && (
            <Link href={content.linkHref} className="mt-7 inline-flex items-center gap-2 font-bold text-primary hover:text-accent">
              {content.linkLabel} <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
