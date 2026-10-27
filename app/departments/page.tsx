import type { Metadata } from 'next'
import { DepartmentsSection } from '@/components/site/departments-section'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { TopBar } from '@/components/site/top-bar'

export const metadata: Metadata = {
  title: 'Academic Departments | Godoma TTI',
  description:
    'Explore the academic departments at Godoma Technical Training Institute and the KNEC-examined Diploma, Craft Certificate and Artisan courses each one offers.',
}

export default function DepartmentsPage() {
  return (
    <>
      <TopBar />
      <SiteHeader />
      <main>
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Academics</p>
            <h1 className="mt-3 max-w-3xl text-balance text-4xl font-extrabold sm:text-5xl">Academic departments</h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/80">
              Choose a department to see its courses, entry requirements and training facilities.
            </p>
          </div>
        </section>
        <DepartmentsSection />
      </main>
      <SiteFooter />
    </>
  )
}
