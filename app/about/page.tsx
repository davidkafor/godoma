import type { Metadata } from 'next'
import { Eye, Target } from 'lucide-react'
import { coreValues, mandate } from '@/lib/site-data'
import { Block, ContentLayout, PageHero } from '@/components/site/page-shell'

export const metadata: Metadata = {
  title: 'Vision, Mission & Core Values | Godoma TTI',
  description: 'The vision, mission, core values and mandate of Godoma Technical Training Institute.',
}

const valueNotes: Record<string, string> = {
  Respect: 'We value every trainee, staff member and stakeholder.',
  Quality: 'We deliver training that meets national standards.',
  Excellence: 'We strive for the best in everything we do.',
  Integrity: 'We act honestly and transparently.',
  Discipline: 'We uphold order, punctuality and responsibility.',
  Equity: 'We give fair opportunity to all learners.',
  'Team-work': 'We achieve more by working together.',
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Vision, Mission & Core Values"
        description="The values that guide the Godoma TTI community and shape our goals."
        crumbs={[{ label: 'About Us' }]}
      />
      <ContentLayout group="About Us" current="/about">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-primary p-8 text-primary-foreground">
            <Eye className="size-8" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-extrabold">Our Vision</h2>
            <p className="mt-3 leading-relaxed text-primary-foreground/90">
              A centre of excellence in technical training, research and business incubation.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-8 text-accent-foreground">
            <Target className="size-8" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-extrabold">Our Mission</h2>
            <p className="mt-3 leading-relaxed text-accent-foreground/90">
              To produce quality technical and entrepreneurial skills and competencies to satisfy the middle level
              manpower needs of the local and international markets through practical, hands-on training, and research.
            </p>
          </div>
        </div>

        <Block title="Core Values" id="values">
          <p className="leading-relaxed text-muted-foreground">
            The Godoma TTI community is committed to a set of enduring core values. They focus on the sustainable
            development of the institution, guide us through changing times and shape our mission, vision and goals.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {coreValues.map((v) => (
              <li key={v} className="rounded-lg border bg-card p-5">
                <p className="font-bold text-primary">{v}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{valueNotes[v]}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Our Mandate" id="mandate">
          <p className="leading-relaxed text-muted-foreground">
            Like other Technical Training Institutes, Godoma TTI was established by the Ministry of Education through
            the Directorate of Technical and Vocational Education and Training (TVET) with a specific mandate to:
          </p>
          <ol className="flex flex-col gap-3">
            {mandate.map((m, i) => (
              <li key={m} className="flex items-start gap-4 rounded-lg bg-secondary p-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <span className="pt-1 leading-relaxed text-foreground">{m}</span>
              </li>
            ))}
          </ol>
        </Block>
      </ContentLayout>
    </>
  )
}
