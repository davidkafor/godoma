'use client'

import { useEffect, useRef, useState } from 'react'
import { BookOpen, Building2, CalendarCheck, Users } from 'lucide-react'
import { departments, totalCourses } from '@/lib/site-data'

const stats = [
  { icon: BookOpen, value: totalCourses, suffix: '', label: 'Courses Offered' },
  { icon: Building2, value: departments.length, suffix: '', label: 'Academic Departments' },
  { icon: Users, value: 3, suffix: '', label: 'Training Levels' },
  { icon: CalendarCheck, value: 2016, suffix: '', label: 'Year Established', noAnimate: true },
]

function Counter({ value, suffix, animate }: { value: number; suffix: string; animate: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(animate ? 0 : value)

  useEffect(() => {
    if (!animate || !ref.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }
    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1500, 1)
          setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))))
          if (p < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [animate, value])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section aria-label="Godoma TTI in numbers" className="bg-primary py-14 text-primary-foreground">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 lg:grid-cols-4">
        {stats.map(({ icon: Icon, value, suffix, label, noAnimate }) => (
          <li key={label} className="flex flex-col items-center text-center sm:flex-row sm:text-left">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-full border-2 border-accent text-accent">
              <Icon className="size-7" aria-hidden="true" />
            </span>
            <div className="mt-3 sm:ml-4 sm:mt-0">
              <p className="text-4xl font-extrabold">
                <Counter value={value} suffix={suffix} animate={!noAnimate} />
              </p>
              <p className="text-sm font-medium text-primary-foreground/80">{label}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
