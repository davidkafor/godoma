import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { departments, totalCourses } from '@/lib/site-data'
import { ContentLayout, PageHero } from '@/components/site/page-shell'

export const metadata: Metadata = {
  title: 'Academics | Godoma TTI',
  description: `Explore ${totalCourses} KNEC-examined programmes across five academic departments at Godoma TTI.`,
}

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="Academic Departments"
        description={`${totalCourses} nationally examined programmes across five departments, delivered through practical, hands-on training.`}
        image="/images/hero-workshop.png"
        crumbs={[{ label: 'Academics' }]}
      />
      <ContentLayout group="Academics" current="/academics">
        <ul className="grid gap-6 md:grid-cols-2">
          {departments.map((d) => (
            <li key={d.id}>
              <Link href={`/academics/${d.id}`} className="group flex h-full flex-col overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-lg">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={d.image} alt="" fill sizes="(min-width: 768px) 35vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded bg-accent px-2 py-1 text-xs font-bold text-accent-foreground">
                    {d.courses.length} programmes
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h2 className="text-lg font-extrabold text-foreground group-hover:text-primary">{d.name}</h2>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{d.summary}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    View department
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </ContentLayout>
    </>
  )
}
