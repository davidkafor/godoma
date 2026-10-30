'use client'

import { useState } from 'react'
import Link from 'next/link'
import { parseVideo } from '@/lib/video'
import type { HomeContent } from '@/lib/home-defaults'

export function IntroductionVideo({ content }: { content: HomeContent['video'] }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const source = parseVideo(content.url, isPlaying)
  if (!source) return null

  return (
    <section aria-labelledby="introduction-video-heading" className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
      <div className="flex items-center justify-between gap-4 bg-primary px-5 py-4 text-primary-foreground sm:px-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{content.eyebrow}</p>
          <h2 id="introduction-video-heading" className="mt-1 text-2xl font-extrabold">
            {content.heading}
          </h2>
        </div>
        {content.badge && (
          <span className="hidden rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wide text-secondary-foreground sm:inline-flex">{content.badge}</span>
        )}
      </div>
      <div className="p-4 sm:p-5">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-muted shadow-inner">
          {source.kind === 'file' ? (
            <video className="h-full w-full bg-black object-cover" src={source.src} poster={content.poster || undefined} controls preload="metadata" playsInline />
          ) : (
            <>
              {isPlaying || !content.poster ? (
                <iframe
                  className="h-full w-full"
                  src={source.src}
                  title={content.heading || 'Introduction video'}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={content.poster} alt="" className="h-full w-full object-cover" />
              )}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="group absolute inset-0 flex items-center justify-center bg-primary/20 transition-colors hover:bg-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
                  aria-label="Play introduction video"
                >
                  <span className="relative flex size-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-xl transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110 sm:size-20">
                    <span className="absolute inset-0 rounded-full bg-accent/40" aria-hidden="true" />
                    <span className="relative ml-1 text-2xl sm:text-3xl" aria-hidden="true">
                      ▶
                    </span>
                  </span>
                </button>
              )}
            </>
          )}
        </div>
        <div className="mt-4 flex items-end justify-between gap-4">
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">{content.description}</p>
          {content.linkLabel && content.linkHref && (
            <Link href={content.linkHref} className="shrink-0 text-sm font-bold text-primary underline-offset-4 hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {content.linkLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
