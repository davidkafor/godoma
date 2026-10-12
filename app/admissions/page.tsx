import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { departments } from '@/lib/site-data'
import { Block, ContentLayout, PageHero } from '@/components/site/page-shell'

export const metadata: Metadata = {
  title: 'Entry Requirements | Admissions | Godoma TTI',
  description: 'Minimum entry requirements for Diploma, Certificate and Artisan courses at Godoma TTI.',
}

const levels = [
  { level: 'Diploma', grade: 'KCSE C- (minus)', duration: '3 Years', note: 'Or a relevant Craft Certificate pass.' },
  { level: 'Craft Certificate', grade: 'KCSE D (plain)', duration: '2 Years', note: 'Or a relevant Artisan Certificate pass.' },
  { level: 'Artisan Certificate', grade: 'Open entry', duration: '1 Year', note: 'KCPE / KCSE certificate or equivalent.' },
  { level: 'Short Courses', grade: 'Open entry', duration: '3 Months', note: 'e.g. Computer Packages.' },
]

const steps = [
  'Choose your course and confirm you meet the minimum entry requirement.',
  'Apply through KUCCPS or obtain an application form from the Admissions office.',
  'Download and print your admission letter from the Students Downloads page.',
  'Report with original and copies of certificates, ID / birth certificate and passport photos.',
]

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Entry Requirements"
        description="Admissions are ongoing for Diploma, Craft Certificate and Artisan courses across all five departments."
        image="/images/hero-graduation.png"
        crumbs={[{ label: 'Admissions' }]}
      />
      <ContentLayout group="Admissions" current="/admissions">
        <Block title="Minimum Requirements" id="requirements">
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Level</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Minimum Grade</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Duration</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {levels.map((l) => (
                  <tr key={l.level} className="border-t even:bg-secondary/50">
                    <th scope="row" className="px-4 py-3 font-bold text-foreground">{l.level}</th>
                    <td className="px-4 py-3 text-foreground">{l.grade}</td>
                    <td className="px-4 py-3 text-foreground">{l.duration}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Block>

        <Block title="How to Apply" id="apply">
          <ol className="flex flex-col gap-3">
            {steps.map((s, i) => (
              <li key={s} className="flex items-start gap-4 rounded-lg bg-secondary p-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <span className="pt-1 leading-relaxed text-foreground">{s}</span>
              </li>
            ))}
          </ol>
        </Block>

        <Block title="Browse Courses by Department" id="departments">
          <ul className="grid gap-3 sm:grid-cols-2">
            {departments.map((d) => (
              <li key={d.id}>
                <Link
                  href={`/academics/${d.id}`}
                  className="group flex items-center justify-between gap-3 rounded-lg border bg-card p-4 transition-colors hover:border-primary"
                >
                  <span>
                    <span className="block font-bold text-foreground group-hover:text-primary">{d.name}</span>
                    <span className="text-sm text-muted-foreground">{d.courses.length} programmes</span>
                  </span>
                  <ArrowRight className="size-4 text-accent transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Block>
      </ContentLayout>
    </>
  )
}
