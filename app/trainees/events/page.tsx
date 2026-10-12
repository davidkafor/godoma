import type { Metadata } from 'next'
import Image from 'next/image'
import { Block, ContentLayout, PageHero } from '@/components/site/page-shell'

export const metadata: Metadata = {
  title: 'Events Calendar | Godoma TTI',
  description: 'Term dates, examinations and institutional events at Godoma TTI.',
}

const terms = [
  { term: 'January Intake', period: 'January – April', items: ['Reporting & registration', 'Orientation week', 'End of term exams'] },
  { term: 'May Intake', period: 'May – August', items: ['Reporting & registration', 'Industrial attachment', 'End of term exams'] },
  { term: 'September Intake', period: 'September – December', items: ['Reporting & registration', 'KNEC examinations (Nov)', 'Graduation ceremony'] },
]

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Trainees"
        title="Events Calendar"
        description="Plan your year around term dates, examinations and campus events."
        image="/images/hero-graduation.png"
        crumbs={[{ label: 'Trainees', href: '/trainees' }, { label: 'Events Calendar' }]}
      />
      <ContentLayout group="Trainees" current="/trainees/events">
        <Block title="Academic Year" id="terms">
          <p className="text-sm text-muted-foreground">Exact dates are communicated through the notice board each term.</p>
          <ol className="grid gap-4 md:grid-cols-3">
            {terms.map((t) => (
              <li key={t.term} className="overflow-hidden rounded-lg border bg-card">
                <div className="bg-primary px-5 py-3 text-primary-foreground">
                  <p className="font-bold">{t.term}</p>
                  <p className="text-sm text-primary-foreground/80">{t.period}</p>
                </div>
                <ul className="flex flex-col gap-2 p-5 text-sm text-foreground">
                  {t.items.map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                      {i}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Block>
        <Block title="Past Event" id="past">
          <article className="grid gap-5 rounded-lg border bg-card p-5 sm:grid-cols-[200px_1fr]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-muted">
              <Image src="/images/motivational-talk.jpg" alt="Motivational talk flier" fill sizes="200px" className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-accent">18 March 2020</p>
              <h3 className="mt-1 text-lg font-extrabold text-foreground">
                Motivational Talk: The Bridge Between Goals and Accomplishment is Discipline
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                The Office of the Dean of Students hosted all staff and students for a talk on Corona Virus, HIV/AIDS,
                drugs, mental health and discipline at GTTI Phase II.
              </p>
            </div>
          </article>
        </Block>
      </ContentLayout>
    </>
  )
}
