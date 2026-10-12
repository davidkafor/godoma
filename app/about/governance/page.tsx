import type { Metadata } from 'next'
import { boardMembers } from '@/lib/site-data'
import { Block, ContentLayout, PageHero, PersonCard } from '@/components/site/page-shell'

export const metadata: Metadata = {
  title: 'Governance | Godoma TTI',
  description: 'The Board of Governors of Godoma Technical Training Institute.',
}

const roles = [
  'Approve the strategic plan, annual budget and development projects of the Institute.',
  'Oversee prudent management of finances and institutional resources.',
  'Ensure compliance with the TVET Act and Ministry of Education policies.',
  'Promote quality training, discipline and the welfare of trainees and staff.',
]

export default function GovernancePage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Governance"
        description="The Board of Governors provides strategic oversight and ensures accountability across the Institute."
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Governance' }]}
      />
      <ContentLayout group="About Us" current="/about/governance">
        <Block title="Board of Governors" id="board">
          <p className="leading-relaxed text-muted-foreground">
            Godoma TTI is governed by a Board appointed under the TVET Act 2013. The Board brings together expertise
            from education, industry and the community to steer the Institute towards its vision.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {boardMembers.map((m) => (
              <li key={m.name}>
                <PersonCard name={m.name} role={m.role} />
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Role of the Board" id="role">
          <ul className="flex flex-col gap-3">
            {roles.map((r) => (
              <li key={r} className="flex items-start gap-3 rounded-lg bg-secondary p-4 leading-relaxed text-foreground">
                <span className="mt-2 size-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {r}
              </li>
            ))}
          </ul>
        </Block>
      </ContentLayout>
    </>
  )
}
