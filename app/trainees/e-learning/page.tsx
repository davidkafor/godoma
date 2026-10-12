import type { Metadata } from 'next'
import { BookOpen, LaptopMinimal, MessagesSquare, Video } from 'lucide-react'
import { OFFICIAL_SITE } from '@/lib/site-data'
import { Block, ContentLayout, PageHero } from '@/components/site/page-shell'
import { LinkCard } from '@/components/site/link-card'

export const metadata: Metadata = {
  title: 'E-Learning | Godoma TTI',
  description: 'The Godoma TTI e-learning platform for notes, assignments and online classes.',
}

const features = [
  { icon: BookOpen, title: 'Course Notes', text: 'Download notes and reading materials for every unit.' },
  { icon: Video, title: 'Online Classes', text: 'Join virtual lessons and watch recorded sessions.' },
  { icon: MessagesSquare, title: 'Discussion', text: 'Ask questions and collaborate with trainers and classmates.' },
]

export default function ELearningPage() {
  return (
    <>
      <PageHero
        eyebrow="Trainees"
        title="E-Learning"
        description="Open and Distance Learning that keeps your training going wherever you are."
        image="/images/dept-ict.png"
        crumbs={[{ label: 'Trainees', href: '/trainees' }, { label: 'E-Learning' }]}
      />
      <ContentLayout group="Trainees" current="/trainees/e-learning">
        <Block title="Learn Anywhere" id="platform">
          <p className="leading-relaxed text-muted-foreground">
            The recently introduced E-Learning platform, managed by the ICT department, supports blended learning
            across all departments. Use your student credentials to sign in.
          </p>
          <div className="max-w-sm">
            <LinkCard href={OFFICIAL_SITE} external title="Open E-Learning" text="Continue to the Godoma TTI learning platform." icon={LaptopMinimal} />
          </div>
        </Block>
        <ul className="grid gap-4 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-lg bg-secondary p-5">
              <Icon className="size-6 text-primary" aria-hidden="true" />
              <p className="mt-3 font-bold text-foreground">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </ContentLayout>
    </>
  )
}
