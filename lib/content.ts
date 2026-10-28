import { databaseConfigured, prisma } from '@/lib/prisma'
import * as fallback from '@/lib/site-data'
import type { Department } from '@/lib/site-data'

/**
 * Server-side readers for the public website. Only published content is returned.
 * If the database cannot be reached the static copy in site-data.ts is used, so the
 * public site never goes blank because of a database outage.
 */

const published = () => ({
  status: 'PUBLISHED' as const,
  OR: [{ publishedAt: null }, { publishedAt: { lte: new Date() } }],
})

const DB_RETRY_AFTER_MS = 30_000
let databaseDownUntil = 0
let warnedUnconfigured = false

async function safe<T>(label: string, read: () => Promise<T>, backup: T): Promise<T> {
  if (!databaseConfigured()) {
    if (!warnedUnconfigured) {
      warnedUnconfigured = true
      console.warn('[content] database is not configured (DB_NAME, DB_USER, DB_PASSWORD); serving built-in copy')
    }
    return backup
  }
  // After a connection failure, skip the database briefly so every page render does not wait on the pool timeout.
  if (Date.now() < databaseDownUntil) return backup
  try {
    return await read()
  } catch (error) {
    databaseDownUntil = Date.now() + DB_RETRY_AFTER_MS
    const e = error as { name?: string; code?: string }
    console.warn(`[content] ${label} unavailable, serving built-in copy`, { name: e?.name, code: e?.code })
    return backup
  }
}

const monthYear = new Intl.DateTimeFormat('en-KE', { month: 'long', year: 'numeric', timeZone: 'Africa/Nairobi' })

export type HeroSlideView = { image: string; alt: string; eyebrow: string; title: string; text: string }
export type NewsView = { title: string; date: string; image: string; excerpt: string; href: string; featured: boolean; type: string; slug: string }
export type FacilityView = { icon: string; title: string; text: string; image: string | null }
export type TestimonialView = { quote: string; name: string; role: string }
export type PartnerView = { acronym: string; name: string; logo: string }

export function getHeroSlides(): Promise<HeroSlideView[]> {
  return safe(
    'hero',
    async () => {
      const rows = await prisma.heroSlide.findMany({ where: published(), orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] })
      return rows.map(({ image, alt, eyebrow, title, text }) => ({ image, alt, eyebrow, title, text }))
    },
    [...fallback.heroSlides],
  )
}

const toNews = (p: {
  title: string
  slug: string
  type: string
  dateLabel: string | null
  publishedAt: Date | null
  image: string | null
  excerpt: string
  href: string | null
  featured: boolean
}): NewsView => ({
  title: p.title,
  slug: p.slug,
  type: p.type,
  date: p.dateLabel || (p.publishedAt ? monthYear.format(p.publishedAt) : ''),
  image: p.image || '/images/logo.png',
  excerpt: p.excerpt,
  href: p.href || `/notice-board#${p.slug}`,
  featured: p.featured,
})

export function getNews(limit?: number): Promise<NewsView[]> {
  return safe(
    'news',
    async () => {
      const rows = await prisma.post.findMany({
        where: published(),
        orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }, { createdAt: 'desc' }],
        take: limit,
      })
      return rows.map(toNews)
    },
    fallback.news.slice(0, limit).map((n) => ({ ...n, featured: false, type: 'NEWS', slug: '' })),
  )
}

export async function getTicker(): Promise<string[]> {
  return safe(
    'ticker',
    async () => {
      const setting = await prisma.siteSetting.findUnique({ where: { key: 'ticker' } })
      const items = Array.isArray(setting?.value) ? (setting.value as unknown[]).filter((v): v is string => typeof v === 'string' && v.length > 0) : []
      if (items.length > 0) return items
      const recent = await prisma.post.findMany({ where: { ...published(), type: { in: ['NEWS', 'ANNOUNCEMENT'] } }, orderBy: { publishedAt: 'desc' }, take: 6, select: { title: true } })
      return recent.length ? recent.map((p) => p.title) : [...fallback.tickerItems]
    },
    [...fallback.tickerItems],
  )
}

/** Returns null when the database is unreachable so callers can show their built-in copy. */
export function getFacilities(): Promise<FacilityView[] | null> {
  return safe<FacilityView[] | null>(
    'facilities',
    async () => {
      const rows = await prisma.facility.findMany({ where: published(), orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }] })
      return rows.map(({ icon, title, text, image }) => ({ icon, title, text, image }))
    },
    null,
  )
}

export function getTestimonials(): Promise<TestimonialView[] | null> {
  return safe<TestimonialView[] | null>(
    'testimonials',
    async () => {
      const rows = await prisma.testimonial.findMany({ where: published(), orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] })
      return rows.map(({ quote, name, role }) => ({ quote, name, role }))
    },
    null,
  )
}

export function getPartners(): Promise<PartnerView[]> {
  return safe(
    'partners',
    async () => {
      const rows = await prisma.partner.findMany({ where: published(), orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }] })
      return rows.map(({ acronym, name, logo }) => ({ acronym, name, logo }))
    },
    [...fallback.partners],
  )
}

export function getGallery() {
  return safe(
    'gallery',
    async () => {
      const rows = await prisma.galleryImage.findMany({ where: published(), orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] })
      return rows.map(({ id, image, alt, caption }) => ({ id, image, alt, caption }))
    },
    [] as { id: string; image: string; alt: string; caption: string | null }[],
  )
}

export function getDownloads() {
  return safe(
    'downloads',
    async () => {
      const rows = await prisma.download.findMany({ where: published(), orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }, { title: 'asc' }] })
      return rows.map(({ id, title, category, file }) => ({ id, title, category, file }))
    },
    [] as { id: string; title: string; category: string; file: string }[],
  )
}

export function getDepartments(): Promise<Department[]> {
  return safe(
    'departments',
    async () => {
      const rows = await prisma.department.findMany({
        where: published(),
        orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
        include: { courses: { where: published(), orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }] } },
      })
      return rows.map((d) => ({
        id: d.slug,
        name: d.name,
        short: d.shortName,
        image: d.image,
        head: d.head,
        summary: d.summary,
        courses: d.courses.map(({ name, requirement, duration, examiner }) => ({ name, requirement, duration, examiner })),
      }))
    },
    fallback.departments,
  )
}

export async function getTotalCourses() {
  const departments = await getDepartments()
  return departments.reduce((sum, d) => sum + d.courses.length, 0)
}

export type ContactView = {
  phones: string[]
  email: string
  address: string
  postalAddress: string
  locationNote: string
  mapEmbed: string
}
export type SocialView = { name: string; href: string }

async function setting<T>(key: string, backup: T): Promise<T> {
  return safe(
    `setting:${key}`,
    async () => {
      const row = await prisma.siteSetting.findUnique({ where: { key } })
      return row ? ({ ...(typeof backup === 'object' && !Array.isArray(backup) ? backup : {}), ...(row.value as object) } as T) : backup
    },
    backup,
  )
}

export function getContact(): Promise<ContactView> {
  return setting<ContactView>('contact', { ...fallback.contact, phones: [...fallback.contact.phones] })
}

export function getSocials(): Promise<SocialView[]> {
  return safe(
    'socials',
    async () => {
      const row = await prisma.siteSetting.findUnique({ where: { key: 'socials' } })
      return Array.isArray(row?.value) ? (row.value as SocialView[]) : [...fallback.socials]
    },
    [...fallback.socials],
  )
}

export function getStaff(group: 'BOARD' | 'MANAGEMENT' | 'STAFF') {
  return safe(
    `staff:${group}`,
    async () => {
      const rows = await prisma.staffProfile.findMany({ where: { ...published(), group }, orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }] })
      return rows.map(({ id, name, role, bio, photo }) => ({ id, name, role, bio, photo }))
    },
    [] as { id: string; name: string; role: string; bio: string | null; photo: string | null }[],
  )
}

/** Published editable page (About, Admissions text, etc.) or null if missing/unpublished. */
export async function getContentPage(slug: string) {
  return safe(
    `page:${slug}`,
    async () => {
      const page = await prisma.contentPage.findFirst({ where: { slug, ...published() } })
      return page ? { ...page, sections: (Array.isArray(page.sections) ? page.sections : []) as string[][] } : null
    },
    null,
  )
}
