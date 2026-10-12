import type { Metadata } from 'next'
import { CalendarDays, Download, HeartHandshake, LaptopMinimal, UserRound } from 'lucide-react'
import { ContentLayout, PageHero } from '@/components/site/page-shell'
import { LinkCard } from '@/components/site/link-card'

export const metadata: Metadata = {
  title: 'Trainees | Godoma TTI',
  description: 'Student portal, e-learning, downloads, welfare and events for Godoma TTI trainees.',
}

const links = [
  { href: '/trainees/portal', title: 'Students Portal', text: 'Check results, fee statements and unit registration.', icon: UserRound },
  { href: '/trainees/e-learning', title: 'E-Learning', text: 'Access course notes, assignments and online classes.', icon: LaptopMinimal },
  { href: '/trainees/downloads', title: 'Students Downloads', text: 'Admission letters, forms, fee structures and timetables.', icon: Download },
  { href: '/trainees/aids-control-unit', title: 'Aids Control Unit', text: 'HIV/AIDS awareness, counselling and peer support.', icon: HeartHandshake },
  { href: '/trainees/events', title: 'Events Calendar', text: 'Term dates, exams, talks and institutional events.', icon: CalendarDays },
]

export default function TraineesPage() {
  return (
    <>
      <PageHero
        eyebrow="Trainees"
        title="Trainee Resources"
        description="Everything you need during your training at Godoma TTI, in one place."
        image="/images/hero-graduation.png"
        crumbs={[{ label: 'Trainees' }]}
      />
      <ContentLayout group="Trainees" current="/trainees">
        <ul className="grid gap-4 sm:grid-cols-2">
          {links.map((l) => (
            <li key={l.href}>
              <LinkCard {...l} />
            </li>
          ))}
        </ul>
      </ContentLayout>
    </>
  )
}
