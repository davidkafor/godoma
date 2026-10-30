'use client'

import { useEffect, useRef, useState } from 'react'
import { BookOpen, Building2, CalendarCheck, Hash, Users } from 'lucide-react'
import type { HomeStat } from '@/lib/home-defaults'

const iconFor = (stat: HomeStat) => {
  if (stat.source === 'courses') return BookOpen
  if (stat.source === 'departments') return Building2
  if (/year|since|established/i.test(stat.label)) return CalendarCheck
  if (/level|trainee|student/i.test(stat.label)) return Users
  return Hash
}

const buildStats = (stats: HomeStat[], totalCourses: number, departmentCount: number) =>
  stats.map((stat) => ({
    icon: iconFor(stat),
    value: stat.source === 'courses' ? totalCourses : stat.source === 'departments' ? departmentCount : stat.value,
    suffix: '',
    label: stat.label,
    noAnimate: /year/i.test(stat.label) && stat.value > 1000,
  }))

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

export function StatsSection({ stats: configured, totalCourses, departmentCount }: { stats: HomeStat[]; totalCourses: number; departmentCount: number }) {
  const stats = buildStats(configured, totalCourses, departmentCount)
  if (!stats.length) return null
  return (
    <section aria-label="Godoma TTI in numbers" className="bg-primary py-14 text-primary-foreground">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 lg:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]">
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
