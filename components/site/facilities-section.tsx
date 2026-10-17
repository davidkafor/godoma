import Image from 'next/image'
import { BookOpen, Cpu, Wifi, Wrench, BedDouble, HeartPulse } from 'lucide-react'
import { SectionHeading } from './section-heading'

const facilities = [
  {
    icon: Wrench,
    title: 'Modern Workshops',
    text: 'The 26-acre institute has two electrical engineering workshops, four building technology labs and four fully equipped building technology workshops.',
  },
  {
    icon: Cpu,
    title: 'State-of-the-art ICT Lab',
    text: 'A well-equipped computer lab supporting ICT training for trainees and staff across all departments.',
  },
  {
    icon: Wifi,
    title: 'Campus-wide Internet',
    text: 'Strategically located wireless access points, plus online student portal, results, fee statements and E-Learning.',
  },
  {
    icon: BedDouble,
    title: 'Accommodation',
    text: 'A serene, welcoming learning environment in Vitengeni, bordering the famous Dida forest.',
  },
  {
    icon: HeartPulse,
    title: 'Student Welfare',
    text: 'The Dean of Students office, Aids Control Unit, sports & games and guidance programmes support every trainee.',
  },
]

export function FacilitiesSection() {
  return (
    <section id="facilities" aria-labelledby="facilities-heading" className="bg-muted py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          id="facilities-heading"
          eyebrow="Facilities & Amenities"
          title="Everything You Need to Learn by Doing"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <article className="relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-lg shadow-lg lg:row-span-2">
            <Image
              src="/images/library.png"
              alt="Trainees studying in the institution library"
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/40 to-transparent" />
            <div className="relative p-8 text-primary-foreground">
              <BookOpen className="size-9 text-accent" aria-hidden="true" />
              <h3 className="mt-3 text-2xl font-extrabold">Institution Library</h3>
              <p className="mt-2 leading-relaxed text-primary-foreground/85">
                A quiet study space with reference materials for every department, supporting proper learning and
                research for our trainees.
              </p>
            </div>
          </article>

          <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
            {facilities.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="group rounded-lg bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex size-12 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
