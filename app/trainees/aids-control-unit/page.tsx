import type { Metadata } from 'next'
import { HeartHandshake, MessageCircleHeart, ShieldPlus, Users } from 'lucide-react'
import { Block, ContentLayout, PageHero } from '@/components/site/page-shell'

export const metadata: Metadata = {
  title: 'Aids Control Unit | Godoma TTI',
  description: 'HIV/AIDS awareness, confidential counselling and peer support at Godoma TTI.',
}

const services = [
  { icon: ShieldPlus, title: 'Awareness & Prevention', text: 'Talks and campaigns on HIV/AIDS, drugs and substance abuse.' },
  { icon: MessageCircleHeart, title: 'Confidential Counselling', text: 'Private guidance and referral for testing and care.' },
  { icon: Users, title: 'Peer Educators', text: 'Trained trainees who support fellow students.' },
  { icon: HeartHandshake, title: 'Mental Health', text: 'Support for stress, wellbeing and personal challenges.' },
]

export default function AcuPage() {
  return (
    <>
      <PageHero
        eyebrow="Trainees"
        title="Aids Control Unit"
        description="Promoting a healthy, informed and supportive campus community."
        crumbs={[{ label: 'Trainees', href: '/trainees' }, { label: 'Aids Control Unit' }]}
      />
      <ContentLayout group="Trainees" current="/trainees/aids-control-unit">
        <Block title="About the Unit" id="about">
          <p className="leading-relaxed text-muted-foreground">
            Working with the Office of the Dean of Students, the Aids Control Unit (ACU) coordinates HIV/AIDS
            prevention, care and support programmes in line with national TVET policy. All services are confidential
            and free for trainees and staff.
          </p>
        </Block>
        <ul className="grid gap-4 sm:grid-cols-2">
          {services.map(({ icon: Icon, title, text }) => (
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
