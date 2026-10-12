'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react'
import { heroSlides } from '@/lib/site-data'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = heroSlides.length

  useEffect(() => {
    if (paused) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000)
    return () => clearInterval(id)
  }, [paused, count])

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count)

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative isolate h-[560px] overflow-hidden bg-primary sm:h-[620px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {heroSlides.map((slide, i) => (
        <div
          key={slide.title}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${count}`}
          aria-hidden={i !== index}
          className={cn('absolute inset-0 transition-opacity duration-1000', i === index ? 'opacity-100' : 'opacity-0')}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={cn('object-cover transition-transform duration-[7000ms]', i === index && 'scale-105')}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/95 via-brand-deep/70 to-transparent" />
          <div className="relative mx-auto flex h-full max-w-7xl items-center px-4">
            <div className="max-w-2xl text-primary-foreground">
              <p className="mb-3 inline-block rounded-sm bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">
                {slide.eyebrow}
              </p>
              <h2 className="text-balance text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                {slide.title}
              </h2>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
                {slide.text}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/admissions"
                  tabIndex={i === index ? 0 : -1}
                  className={cn(buttonVariants(), 'h-12 bg-accent px-6 text-base font-bold text-accent-foreground hover:bg-accent/90')}
                >
                  Apply Now
                </a>
                <a
                  href="/academics"
                  tabIndex={i === index ? 0 : -1}
                  className={cn(buttonVariants({ variant: 'outline' }), 'h-12 border-primary-foreground/60 bg-transparent px-6 text-base font-semibold text-primary-foreground hover:bg-primary-foreground hover:text-primary')}
                >
                  Explore Courses
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      <h1 className="sr-only">Godoma Technical Training Institute</h1>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-4 px-4 pb-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="flex size-10 items-center justify-center rounded-full border border-primary-foreground/40 text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="flex size-10 items-center justify-center rounded-full border border-primary-foreground/40 text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
            <div className="ml-3 flex gap-2">
              {heroSlides.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    i === index ? 'w-8 bg-accent' : 'w-4 bg-primary-foreground/50 hover:bg-primary-foreground',
                  )}
                />
              ))}
            </div>
          </div>

          <div className="hidden max-w-xs rounded-lg border-l-4 border-accent bg-background/95 p-4 shadow-xl md:block">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
              <CalendarDays className="size-4" aria-hidden="true" />
              Intake Now Open
            </p>
            <p className="mt-1 text-sm font-semibold text-foreground">
              Admissions ongoing for Diploma, Craft & Artisan courses. HELB TVET loans available.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
