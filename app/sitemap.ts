import type { MetadataRoute } from 'next'
import { getDepartments } from '@/lib/content'

const staticRoutes = ['/', '/about', '/admissions', '/apply', '/departments', '/events', '/notice-board', '/governance', '/administration', '/funding', '/trainees', '/library', '/downloads', '/contact']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const departments = await getDepartments()
  const now = new Date()
  return [
    ...staticRoutes.map((url) => ({ url, lastModified: now, changeFrequency: 'weekly' as const, priority: url === '/' ? 1 : 0.7 })),
    ...departments.map((department) => ({ url: `/departments/${department.id}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 })),
  ]
}
