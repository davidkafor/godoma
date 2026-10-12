import type { Metadata } from 'next'
import Image from 'next/image'
import { BookMarked, Clock, Globe, Monitor } from 'lucide-react'
import { Block, PageHero } from '@/components/site/page-shell'

export const metadata: Metadata = {
  title: 'Library | Godoma TTI',
  description: 'Library services, resources and opening hours at Godoma Technical Training Institute.',
}

const services = [
  { icon: BookMarked, title: 'Book Lending', text: 'Borrow course texts and reference books with your student ID.' },
  { icon: Monitor, title: 'Digital Resources', text: 'Computers for research and access to e-books and past papers.' },
  { icon: Globe, title: 'Free Wi-Fi', text: 'Campus-wide wireless internet for research and e-learning.' },
]

const hours = [
  { day: 'Monday – Friday', time: '8:00am – 8:00pm' },
  { day: 'Saturday', time: '9:00am – 1:00pm' },
  { day: 'Sunday & Public Holidays', time: 'Closed' },
]

export default function LibraryPage() {
  return (
    <>
      <PageHero
        eyebrow="Library"
        title="Library & Resource Centre"
        description="A quiet space with rich resources for learning, research and innovation."
        image="/images/library.png"
        crumbs={[{ label: 'Library' }]}
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 lg:grid-cols-[1fr_340px] lg:py-20">
        <div className="flex min-w-0 flex-col gap-12">
          <Block title="About the Library" id="about">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image src="/images/library.png" alt="Students studying in the Godoma TTI library" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
            </div>
            <p className="leading-relaxed text-muted-foreground">
              The Godoma TTI library supports teaching, learning and research across all departments with textbooks,
              reference materials, KNEC past papers and digital resources. Trainees and staff are welcome to study and
              borrow materials during opening hours.
            </p>
          </Block>
          <Block title="Services" id="services">
            <ul className="grid gap-4 sm:grid-cols-3">
              {services.map(({ icon: Icon, title, text }) => (
                <li key={title} className="rounded-lg bg-secondary p-5">
                  <Icon className="size-6 text-primary" aria-hidden="true" />
                  <p className="mt-3 font-bold text-foreground">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </li>
              ))}
            </ul>
          </Block>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-lg border">
            <p className="flex items-center gap-2 bg-primary px-5 py-3 font-bold text-primary-foreground">
              <Clock className="size-4" aria-hidden="true" />
              Opening Hours
            </p>
            <dl>
              {hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4 border-t px-5 py-3 text-sm first:border-0">
                  <dt className="text-foreground">{h.day}</dt>
                  <dd className="font-semibold text-primary">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </>
  )
}
