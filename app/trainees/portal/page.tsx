import type { Metadata } from 'next'
import { ClipboardList, FileText, Receipt, UserRound } from 'lucide-react'
import { OFFICIAL_SITE } from '@/lib/site-data'
import { Block, ContentLayout, PageHero } from '@/components/site/page-shell'
import { LinkCard } from '@/components/site/link-card'

export const metadata: Metadata = {
  title: 'Students Portal | Godoma TTI',
  description: 'Log in to the Godoma TTI students portal to view results, fees and registration.',
}

const features = [
  { icon: FileText, title: 'Exam Results', text: 'View your internal and KNEC examination results.' },
  { icon: Receipt, title: 'Fee Statements', text: 'Check balances and download fee statements.' },
  { icon: ClipboardList, title: 'Unit Registration', text: 'Register for units at the start of each term.' },
]

export default function PortalPage() {
  return (
    <>
      <PageHero
        eyebrow="Trainees"
        title="Students Portal"
        description="Your personal gateway to results, fee statements and academic records."
        image="/images/dept-ict.png"
        crumbs={[{ label: 'Trainees', href: '/trainees' }, { label: 'Students Portal' }]}
      />
      <ContentLayout group="Trainees" current="/trainees/portal">
        <Block title="Access the Portal" id="access">
          <p className="leading-relaxed text-muted-foreground">
            Log in with your admission number and password issued by the Registrar&apos;s office. If you have
            forgotten your password, visit the ICT department for a reset.
          </p>
          <div className="max-w-sm">
            <LinkCard href={OFFICIAL_SITE} external title="Open Students Portal" text="Continue to the official Godoma TTI portal." icon={UserRound} />
          </div>
        </Block>
        <Block title="What You Can Do" id="features">
          <ul className="grid gap-4 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-lg bg-secondary p-5">
                <Icon className="size-6 text-primary" aria-hidden="true" />
                <p className="mt-3 font-bold text-foreground">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </Block>
      </ContentLayout>
    </>
  )
}
