export type VideoSource = { kind: 'embed'; src: string } | { kind: 'file'; src: string }

/** Accepts YouTube, Vimeo, or a direct https .mp4/.webm link. Returns null for anything else. */
export function parseVideo(input: string | null | undefined, autoplay = false): VideoSource | null {
  const value = (input ?? '').trim()
  if (!value) return null
  let url: URL
  try {
    url = new URL(value)
  } catch {
    return null
  }
  if (url.protocol !== 'https:') return null
  const host = url.hostname.replace(/^www\./, '')

  let youtubeId: string | null = null
  if (host === 'youtu.be') youtubeId = url.pathname.slice(1).split('/')[0]
  else if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
    if (url.pathname === '/watch') youtubeId = url.searchParams.get('v')
    else {
      const match = url.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]{6,20})/)
      youtubeId = match?.[1] ?? null
    }
  }
  if (youtubeId && /^[\w-]{6,20}$/.test(youtubeId)) {
    return { kind: 'embed', src: `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1${autoplay ? '&autoplay=1' : ''}` }
  }

  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const id = url.pathname.match(/(\d{5,})/)?.[1]
    if (id) return { kind: 'embed', src: `https://player.vimeo.com/video/${id}${autoplay ? '?autoplay=1' : ''}` }
  }

  if (/\.(mp4|webm|ogg)$/i.test(url.pathname)) return { kind: 'file', src: url.toString() }
  return null
}
