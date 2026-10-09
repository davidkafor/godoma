import Image from 'next/image'
import { Eye, Target, CheckCircle2, MapPin } from 'lucide-react'
import { coreValues, mandate, leadership } from '@/lib/site-data'
import { SectionHeading } from './section-heading'

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-muted py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/images/hero-campus.png"
                alt="Godoma TTI campus in Vitengeni, Kilifi"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 right-4 rounded-lg bg-primary p-5 text-primary-foreground shadow-xl sm:right-8">
              <p className="text-4xl font-extrabold text-accent">2016</p>
              <p className="text-sm font-semibold">Commissioned in November</p>
            </div>
          </div>

          <div id="history">
            <SectionHeading
              id="about-heading"
              eyebrow="About Godoma TTI"
              title="A Pillar of Vision 2030 in Kilifi County"
              align="left"
            />
            <div className="-mt-6 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                Godoma Technical Training Institute is the first public sub-county technical training institute,
                located in Vitengeni. The institute was commissioned in November 2016 and is a major pillar in the
                realization of Vision 2030 by providing skilled manpower to the growing economy of the Republic.
              </p>
              <p>
                GTTI is a leading technical institute in the vast Kilifi County, located in the serene suburbs of
                Kilifi town bordering the famous Dida forest. The hospitality of the locals is welcoming and makes
                GTTI a haven for learners, promoting peaceful coexistence.
              </p>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary">
              <MapPin className="size-4 text-accent" aria-hidden="true" />
              Matanomane, Vitengeni Rd, Kilifi
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border-t-4 border-accent bg-card p-8 shadow-sm">
            <Eye className="size-9 text-accent" aria-hidden="true" />
            <h3 className="mt-4 text-xl font-bold text-primary">Our Vision</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              A Centre of excellence in technical training, research and business incubation.
            </p>
          </div>
          <div className="rounded-lg border-t-4 border-primary bg-card p-8 shadow-sm">
            <Target className="size-9 text-primary" aria-hidden="true" />
            <h3 className="mt-4 text-xl font-bold text-primary">Our Mission</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              To produce quality technical and entrepreneurial skills and competencies to satisfy the middle level
              manpower needs of the local and international markets through practical, hands-on training, and
              research.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-lg bg-primary p-8 text-primary-foreground lg:col-span-1">
            <h3 className="text-xl font-bold">Core Values</h3>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
              Enduring values that guide us through changing times and shape our Mission, Vision, and Goals.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {coreValues.map((v) => (
                <li
                  key={v}
                  className="rounded-full border border-accent/60 bg-accent/15 px-3 py-1 text-sm font-semibold text-primary-foreground"
                >
                  {v}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-card p-8 shadow-sm lg:col-span-2">
            <h3 className="text-xl font-bold text-primary">Our Mandate</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Established by the Ministry of Education under the Directorate of Technical and Vocational Education
              and Training (TVET) with a specific mandate to:
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {mandate.map((m) => (
                <li key={m} className="flex gap-3 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-card p-8 shadow-sm">
          <h3 className="text-xl font-bold text-primary">Governance & Leadership</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            The institute is headed by a Board of Management (BOM) operating under the Education Act. The Principal
            is the Chief Executive of the Institute and Secretary to the Board.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((p) => (
              <li key={p.name} className="flex items-center gap-3 rounded-md border p-4">
                <span
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary"
                  aria-hidden="true"
                >
                  {p.name
                    .replace(/^(Mrs?|Miss|Madam|Dr|Prof)\.?\s/, '')
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
                <div>
                  <p className="text-sm font-bold text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
