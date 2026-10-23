'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Megaphone } from 'lucide-react'
import { tickerItems } from '@/lib/site-data'

export function NewsTicker() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (tickerItems.length < 2) return
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % tickerItems.length)
    }, 5000)
    return () => window.clearInterval(interval)
  }, [])

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + tickerItems.length) % tickerItems.length)
  }

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % tickerItems.length)
  }

  return (
    <section className="border-b bg-secondary" aria-label="Latest updates">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-5">
        <div className="flex shrink-0 items-center gap-2 text-sm font-bold uppercase tracking-wide text-secondary-foreground">
          <Megaphone className="size-4 text-accent" aria-hidden="true" />
          <span className="hidden sm:inline">Updates</span>
        </div>
        <div className="min-w-0 flex-1" aria-live="polite">
          <p key={activeIndex} className="animate-in fade-in slide-in-from-right-2 truncate text-sm font-medium text-secondary-foreground duration-500">
            {tickerItems[activeIndex]}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" onClick={showPrevious} aria-label="Previous update" className="inline-flex size-8 items-center justify-center rounded-full text-secondary-foreground transition-colors hover:bg-secondary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <span className="hidden text-xs tabular-nums text-secondary-foreground/70 sm:inline">{activeIndex + 1}/{tickerItems.length}</span>
          <button type="button" onClick={showNext} aria-label="Next update" className="inline-flex size-8 items-center justify-center rounded-full text-secondary-foreground transition-colors hover:bg-secondary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
