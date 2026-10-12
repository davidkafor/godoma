'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Clock, GraduationCap, User } from 'lucide-react'
import { departments } from '@/lib/site-data'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'

export function DepartmentsSection() {
  const [activeId, setActiveId] = useState(departments[0].id)
  const active = departments.find((d) => d.id === activeId) ?? departments[0]

  return (
    <section id="departments" aria-labelledby="departments-heading" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          id="departments-heading"
          eyebrow="Professional Training Courses"
          title="Academic Departments"
          description="All Diploma, Craft Certificate and Artisan programmes are examined by the Kenya National Examinations Council (KNEC)."
        />

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {departments.map((d) => (
            <li key={d.id}>
              <button
                type="button"
                onClick={() => {
                  setActiveId(d.id)
                  document.getElementById('department-details')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                aria-controls="department-details"
                aria-pressed={d.id === activeId}
                className={cn(
                  'group relative flex h-64 w-full flex-col justify-end overflow-hidden rounded-lg text-left shadow-md outline-offset-4 transition-all',
                  d.id === activeId && 'ring-4 ring-accent',
                )}
              >
                <Image
                  src={d.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/50 to-transparent" />
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
              </button>
            </li>
          ))}
        </ul>

        <div
          id="department-details"
          aria-live="polite"
          className="mt-12 scroll-mt-28 overflow-hidden rounded-lg border bg-card shadow-sm"
        >
          <div className="grid gap-6 bg-primary p-8 text-primary-foreground lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-extrabold">Department of {active.name}</h3>
              <p className="mt-3 leading-relaxed text-primary-foreground/80">{active.summary}</p>
            </div>
            <div className="flex flex-col justify-center gap-2 rounded-md bg-primary-foreground/10 p-5 text-sm">
              <p className="flex items-center gap-2">
                <User className="size-4 text-accent" aria-hidden="true" />
                <span>
                  <span className="text-primary-foreground/70">Head: </span>
                  <span className="font-semibold">{active.head}</span>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <GraduationCap className="size-4 text-accent" aria-hidden="true" />
                <span className="font-semibold">{active.courses.length} programmes offered</span>
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">Courses offered by the {active.name} department</caption>
              <thead className="bg-secondary text-xs uppercase tracking-wide text-secondary-foreground">
                <tr>
                  <th scope="col" className="px-6 py-3 font-bold">
                    Programme
                  </th>
                  <th scope="col" className="px-6 py-3 font-bold">
                    Min. Requirement
                  </th>
                  <th scope="col" className="px-6 py-3 font-bold">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3 font-bold">
                    Examiner
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {active.courses.map((course) => (
                  <tr key={course.name} className="border-t transition-colors hover:bg-muted">
                    <th scope="row" className="px-6 py-4 font-semibold text-foreground">
                      {course.name}
                    </th>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-bold text-accent-foreground">
                        {course.requirement}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-4" aria-hidden="true" />
                        {course.duration}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-muted-foreground">{course.examiner}</td>
                    <td className="px-6 py-4 text-right">
                      <a href="/admissions" className="font-bold text-primary hover:text-accent">
                        Apply
                        <span className="sr-only"> for {course.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t p-4 text-right">
            <a
              href={`/academics/${active.id}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-accent"
            >
              Full department profile
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
