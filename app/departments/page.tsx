import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, Users } from 'lucide-react'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { TopBar } from '@/components/site/top-bar'
import { departments, totalCourses } from '@/lib/site-data'

export default function DepartmentsPage() {
  return (
    <>
      <TopBar />
      <SiteHeader />
      <main>
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Academic departments</p>
            <h1 className="mt-3 max-w-3xl text-balance text-4xl font-extrabold sm:text-5xl">Explore our departments and courses</h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/80">Choose a department to discover its courses, entry requirements, durations, and TVET CDACC assessment pathways.</p>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Godoma TTI</p>
                <h2 className="mt-2 text-3xl font-extrabold text-primary">All departments</h2>
              </div>
              <p className="text-sm font-semibold text-muted-foreground">{departments.length} departments · {totalCourses} courses</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {departments.map((department) => (
                <article key={department.id} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg">
                  <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                    <Image src={department.image} alt={`${department.name} department`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                      <BookOpen className="size-6" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-primary">{department.name}</h3>
                  <p className="mt-3 line-clamp-3 flex-1 leading-relaxed text-muted-foreground">{department.summary}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm">
                    <span className="inline-flex items-center gap-2 font-semibold text-muted-foreground"><Users className="size-4" aria-hidden="true" />{department.courses.length} courses</span>
                    <Link href={`/departments/${department.id}`} className="inline-flex items-center gap-1 font-bold text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      View department
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
