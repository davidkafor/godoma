import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import { departmentDetails, departments } from '@/lib/site-data'
import { Block, ContentLayout, PageHero } from '@/components/site/page-shell'

type Props = { params: Promise<{ department: string }> }

export function generateStaticParams() {
  return departments.map((d) => ({ department: d.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { department } = await params
  const dept = departments.find((d) => d.id === department)
  if (!dept) return {}
  return { title: `${dept.name} | Godoma TTI`, description: dept.summary }
}

export default async function DepartmentPage({ params }: Props) {
  const { department } = await params
  const dept = departments.find((d) => d.id === department)
  if (!dept) notFound()
  const details = departmentDetails[dept.id]

  return (
    <>
      <PageHero
        eyebrow="Department of"
        title={dept.name}
        description={dept.summary}
        image={dept.image}
        crumbs={[{ label: 'Academics', href: '/academics' }, { label: dept.short }]}
      />
      <ContentLayout group="Academics" current={`/academics/${dept.id}`}>
        <Block title="About the Department" id="about">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image src={dept.image} alt={`${dept.name} trainees at work`} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
          </div>
          <p className="leading-relaxed text-muted-foreground">{details?.intro ?? dept.summary}</p>
          <p className="text-sm text-foreground">
            <span className="font-bold">Head of Department:</span> {dept.head}
          </p>
        </Block>

        {details?.objectives && (
          <Block title="Objectives" id="objectives">
            <ul className="flex flex-col gap-3">
              {details.objectives.map((o) => (
                <li key={o} className="flex items-start gap-3 leading-relaxed text-foreground">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                  {o}
                </li>
              ))}
            </ul>
          </Block>
        )}

        <Block title="Courses Offered" id="courses">
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Course</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Requirement</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Duration</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Examiner</th>
                </tr>
              </thead>
              <tbody>
                {dept.courses.map((c) => (
                  <tr key={c.name} className="border-t even:bg-secondary/50">
                    <th scope="row" className="px-4 py-3 font-semibold text-foreground">{c.name}</th>
                    <td className="px-4 py-3 text-foreground">{c.requirement}</td>
                    <td className="px-4 py-3 text-foreground">{c.duration}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.examiner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Block>

        {details?.staff && (
          <Block title="Teaching Staff" id="staff">
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="bg-secondary text-secondary-foreground">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Name</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Section</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Designation</th>
                  </tr>
                </thead>
                <tbody>
                  {details.staff.map((s) => (
                    <tr key={s.name} className="border-t">
                      <th scope="row" className="px-4 py-3 font-semibold text-foreground">{s.name}</th>
                      <td className="px-4 py-3 text-foreground">{s.section}</td>
                      <td className="px-4 py-3 text-muted-foreground">{s.designation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Block>
        )}
      </ContentLayout>
    </>
  )
}
