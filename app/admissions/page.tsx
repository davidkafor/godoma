import type { Metadata } from 'next'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { TopBar } from '@/components/site/top-bar'

export const metadata: Metadata = {
  title: 'Admissions and Entry Requirements',
  description: 'Apply to Godoma TTI in Kilifi County. View TVET CDACC Level 4, 5 and 6 entry requirements, course information and admissions guidance.',
  alternates: { canonical: '/admissions' },
}

const levels = [
  { level: 'TVET CDACC Level 6', requirement: 'KCSE C- (minus)', duration: 'As prescribed' },
  { level: 'TVET CDACC Level 5', requirement: 'KCSE D (plain)', duration: 'As prescribed' },
  { level: 'TVET CDACC Level 4', requirement: 'KCSE', duration: 'As prescribed' },
  { level: 'Short Courses', requirement: 'Open entry', duration: '6 Months' },
]

export default function AdmissionsPage() {
  return (
    <>
      <TopBar />
      <SiteHeader />
      <main>
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Admissions</p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold sm:text-5xl">Entry Requirements</h1>
            <p className="mt-5 max-w-3xl text-pretty text-lg leading-relaxed text-primary-foreground/80">
              Review the current minimum entry requirements for programmes at Godoma Technical Training Institute.
            </p>
          </div>
        </section>
        <section id="entry-requirements" className="py-16">
          <div className="mx-auto max-w-4xl px-4">
            <div className="rounded-lg border bg-card p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-primary">Programme entry requirements</h2>
              <p className="mt-2 text-muted-foreground">Current minimum requirements for Godoma TTI programmes.</p>
              <div className="mt-8 grid grid-cols-[1fr_auto] gap-x-4 border-b pb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <span>Programme level</span>
                <span>Minimum requirement</span>
              </div>
              <ul className="divide-y">
                {levels.map((item) => (
                  <li key={item.level} className="grid grid-cols-[1fr_auto] items-center gap-4 py-5">
                    <div>
                      <p className="font-bold text-foreground">{item.level}</p>
                      <p className="text-sm text-muted-foreground">Duration: {item.duration}</p>
                    </div>
                    <span className="rounded-full bg-accent/15 px-3 py-1 text-right text-sm font-bold text-accent-foreground">
                      {item.requirement}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Applicants should submit the required identification and academic documents during the application process.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
