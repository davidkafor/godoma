import { FileText, Phone, Wallet } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { contact } from '@/lib/site-data'

const levels = [
  { level: 'TVET CDACC Level 6', requirement: 'KCSE C- (minus)', duration: 'As prescribed' },
  { level: 'TVET CDACC Level 5', requirement: 'KCSE D (plain)', duration: 'As prescribed' },
  { level: 'TVET CDACC Level 4', requirement: 'Open entry', duration: 'As prescribed' },
  { level: 'Short Courses', requirement: 'Open entry', duration: '6 Months' },
]

export function AdmissionsSection() {
  return (
    <section
      id="admissions"
      aria-labelledby="admissions-heading"
      className="relative overflow-hidden bg-[oklch(0.25_0.09_260)] py-20 text-primary-foreground"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-accent">Admissions</p>
          <h2 id="admissions-heading" className="mt-2 text-balance text-3xl font-extrabold sm:text-4xl">
            Start Your Technical Career at Godoma TTI
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-accent" aria-hidden="true" />
            <p className="mt-5 leading-relaxed text-primary-foreground/80">
            Applications are accepted online and offline for the January, May and September intakes. Submit photocopies
            of your National ID, birth certificate, KCSE and KCPE result slips, and leaving certificate addressed to
            the Principal, Godoma Technical Training Institute.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex gap-4">
              <FileText className="size-6 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="font-bold">Admission letters & forms</p>
                <a
                  href="/downloads"
                  className="text-sm text-primary-foreground/80 underline underline-offset-4 hover:text-accent"
                >
                  Visit Students Downloads
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <Wallet className="size-6 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="font-bold">HELB TVET loans & bursaries</p>
                <p className="text-sm text-primary-foreground/80">
                  Up to Kshs. 40,000 per year, upkeep inclusive, for eligible TVET CDACC trainees.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <Phone className="size-6 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="font-bold">Admissions enquiries</p>
                <p className="text-sm text-primary-foreground/80">
                  {contact.phones.join(' / ')} · {contact.email}
                </p>
              </div>
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:admissionsgtti@gmail.com?subject=Admission%20Application"
              className={cn(buttonVariants(), 'h-12 bg-accent px-6 text-base font-bold text-accent-foreground hover:bg-accent/90')}
            >
              Apply Now!
            </a>
            <a
              href="/trainees#portal"
              className={cn(buttonVariants({ variant: 'outline' }), 'h-12 border-primary-foreground/50 bg-transparent px-6 text-base font-semibold text-primary-foreground hover:bg-primary-foreground hover:text-primary')}
            >
              Students Portal
            </a>
          </div>
        </div>

        <div id="entry-requirements" className="scroll-mt-24 rounded-lg bg-background p-6 text-foreground shadow-2xl sm:p-8">
          <h3 className="text-xl font-bold text-primary">Entry Requirements</h3>
          <p className="mt-1 text-sm text-muted-foreground">Current minimum entry requirements for Godoma TTI programmes.</p>
          <div className="mt-6 grid grid-cols-[1fr_auto] gap-x-4 border-b pb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <span>Programme level</span>
            <span>Minimum requirement</span>
          </div>
          <ul className="divide-y">
            {levels.map((l) => (
              <li key={l.level} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 py-4">
                <div>
                  <p className="font-bold text-foreground">{l.level}</p>
                  <p className="text-sm text-muted-foreground">Duration: {l.duration}</p>
                </div>
                <span className="rounded-full bg-accent/15 px-3 py-1 text-right text-sm font-bold text-accent-foreground">
                  {l.requirement}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">Applicants should also submit the required identification and academic documents listed on this page.</p>
        </div>
      </div>
    </section>
  )
}
