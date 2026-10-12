import type { Metadata } from 'next'
import { managementTeam } from '@/lib/site-data'
import { Block, ContentLayout, PageHero, PersonCard } from '@/components/site/page-shell'

export const metadata: Metadata = {
  title: 'Administration | Godoma TTI',
  description: 'Meet the management team of Godoma Technical Training Institute.',
}

export default function AdministrationPage() {
  const [principal, ...team] = managementTeam
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Administration"
        description="The management team responsible for the day-to-day running of the Institute."
        image="/images/hero-workshop.png"
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Administration' }]}
      />
      <ContentLayout group="About Us" current="/about/administration">
        <Block title="Principal's Message" id="principal">
          <figure className="rounded-lg border-t-4 border-accent bg-secondary p-6 md:p-8">
            <blockquote className="text-pretty text-lg leading-relaxed text-foreground">
              {
                '"Welcome to Godoma Technical Training Institute. We are committed to providing practical, hands-on training that equips our youth with the skills, attitudes and entrepreneurial spirit needed to thrive in the local and international job market. Karibu Godoma."'
              }
            </blockquote>
            <figcaption className="mt-4">
              <p className="font-bold text-primary">{principal.name}</p>
              <p className="text-sm text-muted-foreground">{principal.role}</p>
            </figcaption>
          </figure>
        </Block>

        <Block title="Management Team" id="team">
          <ul className="grid gap-4 sm:grid-cols-2">
            {team.map((m) => (
              <li key={m.name + m.role}>
                <PersonCard name={m.name} role={m.role} />
              </li>
            ))}
          </ul>
        </Block>
      </ContentLayout>
    </>
  )
}
