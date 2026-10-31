import { Headphones } from 'lucide-react'

const tracks = [
  {
    id: 'english',
    lang: 'en',
    label: 'English',
    description: 'Listen to the Service Delivery Charter read in English.',
    src: '/audio/service-charter-english.mp4',
  },
  {
    id: 'kiswahili',
    lang: 'sw',
    label: 'Kiswahili',
    description: 'Sikiliza Mkataba wa Utoaji Huduma kwa Kiswahili.',
    src: '/audio/service-charter-swahili.mp4',
  },
]

export function CharterAudio() {
  return (
    <section aria-labelledby="charter-audio-heading" className="rounded-lg border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Headphones className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h2 id="charter-audio-heading" className="text-xl font-extrabold text-primary sm:text-2xl">
            Listen to the Service Charter
          </h2>
          <p className="text-sm text-muted-foreground">Audio versions of the charter in English and Kiswahili.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {tracks.map((track) => (
          <div key={track.id} lang={track.lang} className="rounded-md border bg-background p-4">
            <h3 className="font-bold text-primary">{track.label}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{track.description}</p>
            <audio controls preload="none" className="mt-3 w-full" aria-label={`Service Charter audio in ${track.label}`}>
              <source src={track.src} type="audio/mp4" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </section>
  )
}
