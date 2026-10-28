'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'
import type { TestimonialView } from '@/lib/content'

export function TestimonialsCarousel({ testimonials }: { testimonials: TestimonialView[] }) {
  const [index, setIndex] = useState(0)
  const count = testimonials.length
  const go = (dir: number) => setIndex((i) => (i + dir + count) % count)

  useEffect(() => {
    if (count < 2) return
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % count)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [count])

  const visible = count > 1 ? [testimonials[index], testimonials[(index + 1) % count]] : [testimonials[0]]

  return (
    <section aria-labelledby="testimonials-heading" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Student Success Stories"
          title="Hear From Our Trainees"
        />

        <div className="grid gap-6 md:grid-cols-2" aria-live="polite">
          {visible.map((t, i) => (
            <figure
              key={`${t.role}-${index}-${i}`}
              className={cn(
                'relative rounded-lg border bg-card p-8 shadow-sm animate-in fade-in duration-500',
                i === 1 && 'hidden md:block',
              )}
            >
              <Quote className="absolute right-6 top-6 size-10 text-accent/30" aria-hidden="true" />
              <blockquote className="text-pretty text-lg leading-relaxed text-foreground">
                {`"${t.quote}"`}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t pt-5">
                <span className="h-10 w-1 rounded-full bg-accent" aria-hidden="true" />
                <span>
                  <span className="block font-bold text-primary">{t.name}</span>
                  <span className="block text-sm text-muted-foreground">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {count > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <span className="text-sm font-medium text-muted-foreground tabular-nums">
              {index + 1} / {count}
            </span>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
