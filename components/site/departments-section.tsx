'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { departments } from '@/lib/site-data'
import { SectionHeading } from './section-heading'

export function DepartmentsSection() {
  return (
    <section id="departments" aria-labelledby="departments-heading" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          id="departments-heading"
          eyebrow="Professional Training Courses"
          title="Academic Departments"
          description="Our competency-based programmes are assessed and certified through CBET-CDACC at Levels 3, 4, 5 and 6."
        />

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {departments.map((d) => (
            <li key={d.id}>
              <Link
                href={`/departments/${d.id}`}
                className="group relative flex h-64 w-full flex-col justify-end overflow-hidden rounded-lg text-left shadow-md outline-offset-4 transition-all hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Image
                  src={d.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[oklch(0.2_0.08_260)] via-[oklch(0.2_0.08_260)]/50 to-transparent" />
                <span className="relative p-5 text-primary-foreground">
                  <span className="block text-xs font-bold uppercase tracking-wider text-accent">
                    {d.courses.length} courses
                  </span>
                  <span className="mt-1 block text-lg font-bold leading-tight">{d.name}</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-foreground/90 group-hover:text-accent">
                    View Details
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>


      </div>
    </section>
  )
}
