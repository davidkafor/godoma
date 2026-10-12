import type { Metadata } from 'next'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { Block, ContentLayout, PageHero } from '@/components/site/page-shell'

export const metadata: Metadata = {
  title: 'HELB TVET Loans | Admissions | Godoma TTI',
  description: 'Apply for HELB TVET loans and bursaries of up to Kshs. 40,000 per year at Godoma TTI.',
}

const steps = [
  'Get your admission letter from Godoma TTI.',
  'Register on the HELB student portal and complete the TVET loan application.',
  'Print, sign and have the form stamped as required.',
  'Submit the form at any Huduma Centre or HELB office before the deadline.',
]

export default function HelbPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="HELB TVET Loans & Bursaries"
        description="HELB finances TVET students in over 200 technical institutes — up to Kshs. 40,000 per year, upkeep inclusive."
        crumbs={[{ label: 'Admissions', href: '/admissions' }, { label: 'HELB TVET Loans' }]}
      />
      <ContentLayout group="Admissions" current="/admissions/helb-loans">
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg border bg-muted">
            <Image src="/images/tvet-flier.jpg" alt="HELB TVET loan flier" fill sizes="(min-width: 768px) 30vw, 100vw" className="object-contain" />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-extrabold text-foreground">Finance your training</h2>
            <p className="leading-relaxed text-muted-foreground">
              Students admitted to Diploma and Certificate courses at Godoma TTI qualify for HELB TVET loans and
              bursaries. Funds cover tuition and upkeep, paid directly to the institute and the student.
            </p>
            <dl className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-primary p-4 text-primary-foreground">
                <dt className="text-sm text-primary-foreground/80">Per year, up to</dt>
                <dd className="text-2xl font-extrabold">Kshs 40,000</dd>
              </div>
              <div className="rounded-lg bg-accent p-4 text-accent-foreground">
                <dt className="text-sm text-accent-foreground/80">Eligible levels</dt>
                <dd className="text-lg font-extrabold">Diploma & Certificate</dd>
              </div>
            </dl>
            <a
              href="https://www.helb.co.ke"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Apply on HELB
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

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
      </ContentLayout>
    </>
  )
}
