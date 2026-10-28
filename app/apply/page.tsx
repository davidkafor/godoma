import type { Metadata } from 'next'
import { ContactForm } from '@/components/site/contact-form'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { TopBar } from '@/components/site/top-bar'
import { getDepartments } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Online Application',
  description: 'Apply online to Godoma Technical Training Institute in Kilifi County. Submit your application directly to the Admissions Office.',
  alternates: { canonical: '/apply' },
}

export default async function ApplyPage() {
  const departments = await getDepartments()

  return (
    <>
      <TopBar />
      <SiteHeader />
      <main>
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Admissions</p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold sm:text-5xl">Online Application</h1>
            <p className="mt-5 max-w-3xl text-pretty text-lg leading-relaxed text-primary-foreground/80">
              Apply to Godoma Technical Training Institute. Complete the form below and the Admissions Office will respond to you.
            </p>
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4">
            <ContactForm departments={departments} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
