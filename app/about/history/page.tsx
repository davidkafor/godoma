import type { Metadata } from 'next'
import Image from 'next/image'
import { Block, ContentLayout, PageHero } from '@/components/site/page-shell'

export const metadata: Metadata = {
  title: 'Brief History | Godoma TTI',
  description: 'How Godoma Technical Training Institute became the first public sub-county TTI in Kilifi County.',
}

const milestones = [
  { year: '2016', text: 'Institute commissioned in November as the first public sub-county TTI in Kilifi County.' },
  { year: '2016', text: 'Department of Electrical & Electronics Engineering established.' },
  { year: 'Today', text: 'Five academic departments offering 32 KNEC-examined programmes.' },
  { year: 'Next', text: 'Plans underway to become a NITA Exam Centre.' },
]

export default function HistoryPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Brief History"
        description="A major pillar in realising Kenya Vision 2030 by providing skilled manpower to a growing economy."
        image="/images/hero-graduation.png"
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Brief History' }]}
      />
      <ContentLayout group="About Us" current="/about/history">
        <Block title="Our Story" id="story">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src="/images/hero-campus.png"
              alt="Godoma TTI campus"
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
          <p className="leading-relaxed text-muted-foreground">
            Godoma Technical Training Institute is the first public sub-county technical training institute, located in
            Vitengeni, Kilifi County. The institute was commissioned in November 2016 and is a major pillar in the
            realisation of Vision 2030, providing skilled manpower to the growing economy of the republic.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            GTTI is a leading technical institute in the vast Kilifi County, located in serene surroundings bordering
            the famous Dida forest. The welcoming hospitality of the local community makes GTTI a haven and the best
            place for learners, promoting peaceful coexistence.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            The institute boasts rich and sufficient resources for learning and research, with modern workshops, modern
            ICT labs and able teaching and non-teaching staff to foster learning and innovation.
          </p>
        </Block>

        <Block title="Milestones" id="milestones">
          <ol className="relative flex flex-col gap-6 border-l-2 border-primary/30 pl-6">
            {milestones.map((m) => (
              <li key={m.text} className="relative">
                <span className="absolute -left-[33px] top-1 size-4 rounded-full border-4 border-background bg-accent" aria-hidden="true" />
                <p className="text-sm font-bold uppercase tracking-wider text-accent">{m.year}</p>
                <p className="mt-1 leading-relaxed text-foreground">{m.text}</p>
              </li>
            ))}
          </ol>
        </Block>
      </ContentLayout>
    </>
  )
}
