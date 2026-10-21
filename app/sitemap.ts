import type { MetadataRoute } from 'next'
import { departments } from '@/lib/site-data'

const staticRoutes = ['/', '/about', '/admissions', '/departments', '/events', '/notice-board', '/governance', '/administration', '/funding', '/trainees', '/library', '/downloads', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    ...staticRoutes.map((url) => ({ url, lastModified: now, changeFrequency: 'weekly' as const, priority: url === '/' ? 1 : 0.7 })),
    ...departments.map((department) => ({ url: `/departments/${department.id}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 })),
  ]
}
