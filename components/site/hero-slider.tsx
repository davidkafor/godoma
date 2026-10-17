'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { heroSlides } from '@/lib/site-data'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = heroSlides.length

  useEffect(() => {
    if (paused || count < 2) return

    const id = window.setInterval(() => {
      setIndex((currentIndex) => (currentIndex + 1) % count)
    }, 6000)

    return () => window.clearInterval(id)
  }, [paused, count])

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count)

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative isolate h-[560px] overflow-hidden bg-primary sm:h-[620px]"
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
            <div className={cn('max-w-2xl text-primary-foreground', i === index && 'animate-reveal-up')}>
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

      <aside className="animate-reveal-scale absolute right-4 top-1/2 z-20 hidden w-72 -translate-y-1/2 rounded-lg border border-border/70 bg-card/95 p-5 text-card-foreground shadow-xl backdrop-blur-sm lg:block" aria-label="College intake information">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Admissions open</p>
        <h2 className="mt-2 text-2xl font-extrabold text-primary">College intakes</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Start your journey at Godoma Technical Training Institute in any of our three annual intakes.</p>
        <div className="mt-5 grid grid-cols-3 gap-2" aria-label="Annual intake months">
          {['January', 'May', 'September'].map((month) => (
            <div key={month} className="rounded-md bg-muted px-2 py-3 text-center">
              <span className="block text-sm font-bold text-primary">{month}</span>
            </div>
          ))}
        </div>
        <a href="#admissions" className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent/90">Apply now</a>
      </aside>

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
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-label={paused ? 'Resume automatic slideshow' : 'Pause automatic slideshow'}
              aria-pressed={paused}
              className="flex size-10 items-center justify-center rounded-full border border-primary-foreground/40 text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
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

        </div>
      </div>
    </section>
  )
}
