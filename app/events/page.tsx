import { CalendarDays, Clock3, MapPin } from 'lucide-react'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { TopBar } from '@/components/site/top-bar'

const events = [
  { month: 'JAN', day: '05', title: 'January intake orientation', type: 'Academic', time: '8:00 AM – 4:00 PM', location: 'Main campus' },
  { month: 'FEB', day: '14', title: 'Student wellness and mentorship forum', type: 'Trainee support', time: '10:00 AM – 1:00 PM', location: 'Assembly hall' },
  { month: 'MAR', day: '21', title: 'Innovation and skills showcase', type: 'Institute event', time: '9:00 AM – 3:00 PM', location: 'Workshop courtyard' },
  { month: 'MAY', day: '06', title: 'May intake reporting and registration', type: 'Admissions', time: '8:00 AM – 4:00 PM', location: 'Administration block' },
  { month: 'JUN', day: '18', title: 'Career and industry engagement day', type: 'Industry', time: '9:00 AM – 2:00 PM', location: 'Main campus' },
  { month: 'SEP', day: '02', title: 'September intake orientation', type: 'Academic', time: '8:00 AM – 4:00 PM', location: 'Main campus' },
]

export default function EventsPage() {
  return (
    <>
      <TopBar />
      <SiteHeader />
      <main>
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Trainee services</p>
            <h1 className="mt-3 max-w-3xl text-balance text-4xl font-extrabold sm:text-5xl">Events calendar</h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/80">
              Stay informed about academic milestones, trainee support activities, intake dates, and institute events at Godoma TTI.
            </p>
          </div>
        </section>

        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Plan ahead</p>
                <h2 className="mt-2 text-3xl font-extrabold text-primary">Upcoming institute dates</h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">Dates may be updated by the institute. Check official notices for final details.</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <article key={`${event.month}-${event.day}`} className="group rounded-lg border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <span className="text-xs font-bold tracking-widest text-accent">{event.month}</span>
                      <span className="text-2xl font-extrabold leading-none">{event.day}</span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold uppercase tracking-wider text-accent">{event.type}</span>
                      <h3 className="mt-1 text-lg font-bold leading-snug text-primary">{event.title}</h3>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-2 border-t pt-4 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2"><Clock3 className="size-4 text-accent" aria-hidden="true" />{event.time}</p>
                    <p className="flex items-center gap-2"><MapPin className="size-4 text-accent" aria-hidden="true" />{event.location}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-center">
            <CalendarDays className="size-8 text-accent" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-primary">Keep connected</h2>
            <p className="max-w-2xl leading-relaxed text-muted-foreground">For changes, additional activities, or official event notices, follow institute announcements and check with your department or the Dean of Students.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
