'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'

// Sample stories — godomatti.ac.ke does not publish testimonials; replace with real alumni quotes.
const testimonials = [
  {
    quote:
      'The electrical workshops gave me real practice, not just theory. By the time I sat my KNEC exams I had already wired installations on my own.',
    name: 'Alumnus',
    role: 'Diploma in Electrical & Electronics (Power)',
  },
  {
    quote:
      'The ICT lab and campus Wi-Fi meant I could practice any time. The trainers are patient and always ready to help with projects.',
    name: 'Trainee',
    role: 'Diploma in Information & Communication Technology',
  },
  {
    quote:
      'Through the HELB TVET loan I was able to focus on my studies. Godoma TTI prepared me for work in the coastal hospitality industry.',
    name: 'Alumna',
    role: 'Certificate in Food & Beverage Production',
  },
  {
    quote:
      'As a student leader I saw how the Dean of Students office supports trainees — from motivational talks to mentorship and welfare.',
    name: 'Student Leader',
    role: 'Diploma in Business Management',
  },
]

export function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const go = (dir: number) => setIndex((i) => (i + dir + testimonials.length) % testimonials.length)
  const visible = [testimonials[index], testimonials[(index + 1) % testimonials.length]]

  return (
    <section aria-labelledby="testimonials-heading" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Student Success Stories"
          title="Hear From Our Trainees"
        />

        <div className="grid gap-6 md:grid-cols-2" aria-live="polite">
          {visible.map((t, i) => (
            <figure
              key={`${t.role}-${index}`}
              className={cn(
                'relative rounded-lg border bg-card p-8 shadow-sm animate-in fade-in duration-500',
                i === 1 && 'hidden md:block',
              )}
            >
              <Quote className="absolute right-6 top-6 size-10 text-accent/30" aria-hidden="true" />
              <blockquote className="text-pretty text-lg leading-relaxed text-foreground">
                {`"${t.quote}"`}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t pt-5">
                <span className="h-10 w-1 rounded-full bg-accent" aria-hidden="true" />
                <span>
                  <span className="block font-bold text-primary">{t.name}</span>
                  <span className="block text-sm text-muted-foreground">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <span className="text-sm font-medium text-muted-foreground tabular-nums">
            {index + 1} / {testimonials.length}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
