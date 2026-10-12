import type { Metadata } from 'next'
import { FileDown } from 'lucide-react'
import { OFFICIAL_SITE } from '@/lib/site-data'
import { Block, ContentLayout, PageHero } from '@/components/site/page-shell'

export const metadata: Metadata = {
  title: 'Students Downloads | Godoma TTI',
  description: 'Download admission letters, forms, fee structures and service charters from Godoma TTI.',
}

const downloads = [
  { title: 'Admission Letter', type: 'PDF', category: 'Admissions', href: OFFICIAL_SITE },
  { title: 'Joining Instructions', type: 'PDF', category: 'Admissions', href: OFFICIAL_SITE },
  { title: 'Fee Structure', type: 'PDF', category: 'Finance', href: OFFICIAL_SITE },
  { title: 'Medical Examination Form', type: 'PDF', category: 'Admissions', href: OFFICIAL_SITE },
  { title: 'HELB TVET Loan Flier', type: 'JPG', category: 'Finance', href: '/images/tvet-flier.jpg' },
  { title: 'Service Charter (English)', type: 'JPG', category: 'General', href: '/images/service-charter-en.jpg' },
]

export default function DownloadsPage() {
  return (
    <>
      <PageHero
        eyebrow="Trainees"
        title="Students Downloads"
        description="Forms and documents for new and continuing trainees."
        crumbs={[{ label: 'Trainees', href: '/trainees' }, { label: 'Students Downloads' }]}
      />
      <ContentLayout group="Trainees" current="/trainees/downloads">
        <Block title="Documents" id="documents">
          <ul className="overflow-hidden rounded-lg border">
            {downloads.map((d) => (
              <li key={d.title} className="border-t first:border-0">
                <a
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 transition-colors hover:bg-secondary"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <FileDown className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-foreground group-hover:text-primary">{d.title}</span>
                    <span className="text-sm text-muted-foreground">{d.category}</span>
                  </span>
                  <span className="rounded bg-accent px-2 py-1 text-xs font-bold text-accent-foreground">{d.type}</span>
                </a>
              </li>
            ))}
          </ul>
        </Block>
      </ContentLayout>
    </>
  )
}
