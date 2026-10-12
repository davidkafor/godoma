import type { Metadata } from 'next'
import Image from 'next/image'
import { BedDouble, ShieldCheck, Utensils, Wifi } from 'lucide-react'
import { Block, ContentLayout, PageHero } from '@/components/site/page-shell'

export const metadata: Metadata = {
  title: 'Accommodation | Admissions | Godoma TTI',
  description: 'Student accommodation and welfare at Godoma Technical Training Institute, Vitengeni, Kilifi.',
}

const features = [
  { icon: BedDouble, title: 'Nearby Housing', text: 'Affordable private hostels and rentals are available within walking distance of campus.' },
  { icon: ShieldCheck, title: 'Safe Community', text: 'The welcoming Vitengeni community promotes peaceful coexistence and student safety.' },
  { icon: Utensils, title: 'Meals', text: 'Affordable meals are available from the institute cafeteria and local eateries.' },
  { icon: Wifi, title: 'Campus Wi-Fi', text: 'Campus-wide wireless internet supports learning beyond class hours.' },
]

export default function AccommodationPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Accommodation"
        description="Serene surroundings bordering the famous Dida forest — a haven for learners."
        crumbs={[{ label: 'Admissions', href: '/admissions' }, { label: 'Accommodation' }]}
      />
      <ContentLayout group="Admissions" current="/admissions/accommodation">
        <Block title="Living at Godoma" id="living">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image src="/images/hero-campus.png" alt="Godoma TTI campus surroundings" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
          </div>
          <p className="leading-relaxed text-muted-foreground">
            Trainees can find comfortable, affordable accommodation close to the institute. The Office of the Dean of
            Students guides new trainees in identifying suitable housing and supports student welfare throughout their
            stay.
          </p>
        </Block>
        <ul className="grid gap-4 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-lg border bg-card p-5">
              <Icon className="size-6 text-primary" aria-hidden="true" />
              <p className="mt-3 font-bold text-foreground">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </ContentLayout>
    </>
  )
}
