import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, GraduationCap, User } from 'lucide-react'
import { SiteHeader } from '@/components/site/site-header'
import { TopBar } from '@/components/site/top-bar'
import { SiteFooter } from '@/components/site/site-footer'
import { departments } from '@/lib/site-data'

export function generateStaticParams() {
  return departments.map((department) => ({ slug: department.id }))
}

export default async function DepartmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const department = departments.find((item) => item.id === slug)
  if (!department) notFound()

  return <><TopBar /><SiteHeader /><main><section className="bg-primary py-16 text-primary-foreground"><div className="mx-auto max-w-7xl px-4"><Link href="/departments" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/75 hover:text-accent"><ArrowLeft className="size-4" aria-hidden="true" />All departments</Link><p className="mt-10 text-sm font-bold uppercase tracking-[0.2em] text-accent">Academic department</p><h1 className="mt-3 max-w-3xl text-balance text-4xl font-extrabold sm:text-5xl">{department.name}</h1><p className="mt-5 max-w-3xl text-pretty leading-relaxed text-primary-foreground/80">{department.summary}</p></div></section><section className="py-16"><div className="mx-auto max-w-7xl px-4"><div className="mb-10 grid gap-4 sm:grid-cols-3"><div className="rounded-lg border bg-card p-5"><User className="size-5 text-accent" aria-hidden="true" /><p className="mt-3 text-sm text-muted-foreground">Head of department</p><p className="font-bold">{department.head}</p></div><div className="rounded-lg border bg-card p-5"><GraduationCap className="size-5 text-accent" aria-hidden="true" /><p className="mt-3 text-sm text-muted-foreground">Programmes</p><p className="font-bold">{department.courses.length} courses</p></div><div className="rounded-lg border bg-card p-5"><Clock className="size-5 text-accent" aria-hidden="true" /><p className="mt-3 text-sm text-muted-foreground">Examining body</p><p className="font-bold">KNEC</p></div></div><div className="overflow-hidden rounded-lg border bg-card"><div className="border-b p-6"><h2 className="text-2xl font-extrabold text-primary">Courses offered</h2><p className="mt-2 text-muted-foreground">Choose a programme that matches your goals and entry qualification.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-secondary text-xs uppercase tracking-wide text-secondary-foreground"><tr><th className="px-6 py-3">Programme</th><th className="px-6 py-3">Requirement</th><th className="px-6 py-3">Duration</th><th className="px-6 py-3">Examiner</th></tr></thead><tbody>{department.courses.map((course) => <tr key={course.name} className="border-t"><th scope="row" className="px-6 py-5 font-semibold">{course.name}</th><td className="px-6 py-5"><span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-bold">{course.requirement}</span></td><td className="px-6 py-5 text-muted-foreground">{course.duration}</td><td className="px-6 py-5 text-muted-foreground">{course.examiner}</td></tr>)}</tbody></table></div><div className="flex flex-wrap items-center justify-between gap-4 border-t p-6"><p className="text-sm text-muted-foreground">Ready to begin your training?</p><Link href="/admissions" className="rounded-md bg-accent px-5 py-3 font-bold text-accent-foreground hover:bg-accent/90">Apply for admission</Link></div></div></div></section></main><SiteFooter /></>
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const department = departments.find((item) => item.id === slug); return { title: department ? `${department.name} | Godoma TTI` : 'Department | Godoma TTI', description: department?.summary } }
