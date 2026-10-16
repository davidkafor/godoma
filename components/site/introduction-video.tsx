'use client'

import { useState } from 'react'

export function IntroductionVideo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoUrl = `https://www.youtube.com/embed/99wCSA5pWp8?controls=0&rel=0&modestbranding=1${isPlaying ? '&autoplay=1' : ''}`

  return (
    <div className="relative aspect-video overflow-hidden rounded-md bg-muted">
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
          className="group absolute inset-0 flex items-center justify-center bg-primary/10 transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
          aria-label="Play introduction video"
        >
          <span className="relative flex size-20 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-xl transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent/60" aria-hidden="true" />
            <span className="relative ml-1 text-3xl" aria-hidden="true">▶</span>
          </span>
        </button>
      )}
    </div>
  )
}
