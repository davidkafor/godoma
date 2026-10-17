'use client'

import { useState } from 'react'

export function IntroductionVideo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoUrl = `https://www.youtube.com/embed/99wCSA5pWp8?controls=0&rel=0&modestbranding=1${isPlaying ? '&autoplay=1' : ''}`

  return (
    <section aria-labelledby="introduction-video-heading" className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
      <div className="flex items-center justify-between gap-4 bg-primary px-5 py-4 text-primary-foreground sm:px-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Discover Godoma TTI</p>
          <h2 id="introduction-video-heading" className="mt-1 text-2xl font-extrabold">Welcome to our institute</h2>
        </div>
        <span className="hidden rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wide text-secondary-foreground sm:inline-flex">Watch</span>
      </div>
      <div className="p-4 sm:p-5">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-muted shadow-inner">
          <iframe
            className="h-full w-full"
            src={videoUrl}
            title="Introduction video for Godoma Technical Training Institute"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          {!isPlaying && (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="group absolute inset-0 flex items-center justify-center bg-primary/20 transition-colors hover:bg-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
              aria-label="Play introduction video"
            >
              <span className="relative flex size-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-xl transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110 sm:size-20">
                <span className="absolute inset-0 rounded-full bg-accent/40" aria-hidden="true" />
                <span className="relative ml-1 text-2xl sm:text-3xl" aria-hidden="true">▶</span>
              </span>
            </button>
          )}
        </div>
        <div className="mt-4 flex items-end justify-between gap-4">
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">Explore our practical training environment, departments, and the opportunities available to every learner.</p>
          <a href="/about" className="shrink-0 text-sm font-bold text-primary underline-offset-4 hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">About us</a>
        </div>
      </div>
    </section>
  )
}
