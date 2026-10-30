'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { assertPermission, AuthorizationError } from '@/lib/auth/session'
import { audit } from '@/lib/audit'
import { cleanText, isSafeLink, slugify, slugPattern } from './validation'
import { parseVideo } from '@/lib/video'
import { fromInputValue } from './dates'
import type { FormState } from './crud'

const MAX_SECTIONS = 40
const RESERVED_SLUGS = new Set(['admin', 'api', 'new', 'admissions', 'apply', 'departments', 'events', 'uploads', 'news', 'robots.txt', 'sitemap.xml', 'login'])

function mediaLink(value: string, label: string, fieldErrors: Record<string, string>, field: string) {
  if (!value) return null
  if (value.length > 500 || !(value.startsWith('/') || value.startsWith('https://')) || !isSafeLink(value)) fieldErrors[field] = `${label} must be an uploaded file or an https:// link.`
  return value
}

export async function savePage(slug: string, _prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const session = await assertPermission('content:write')
    const existing = await prisma.contentPage.findUnique({ where: { slug } })
    if (!existing) return { error: 'That page no longer exists.' }

    const fieldErrors: Record<string, string> = {}
    const title = cleanText(String(formData.get('title') ?? ''))
    const eyebrow = cleanText(String(formData.get('eyebrow') ?? ''))
    const intro = cleanText(String(formData.get('intro') ?? ''))
    if (!title) fieldErrors.title = 'Title is required.'
    else if (title.length > 255) fieldErrors.title = 'Title must be 255 characters or fewer.'
    if (!eyebrow) fieldErrors.eyebrow = 'Small heading is required.'
    else if (eyebrow.length > 255) fieldErrors.eyebrow = 'Small heading must be 255 characters or fewer.'
    if (!intro) fieldErrors.intro = 'Introduction is required.'
    else if (intro.length > 5000) fieldErrors.intro = 'Introduction must be 5,000 characters or fewer.'

    const headings = formData.getAll('sectionHeading').map((v) => cleanText(String(v)))
    const bodies = formData.getAll('sectionBody').map((v) => cleanText(String(v)))
    const sections: string[][] = []
    headings.forEach((heading, i) => {
      const body = bodies[i] ?? ''
      if (!heading && !body) return
      if (!heading || !body) fieldErrors.sections = 'Every section needs both a heading and text.'
      else if (heading.length > 255 || body.length > 20000) fieldErrors.sections = 'A section heading or text is too long.'
      else sections.push([heading, ...body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)])
    })
    if (sections.length > MAX_SECTIONS) fieldErrors.sections = `A page can have at most ${MAX_SECTIONS} sections.`

    const heroImage = mediaLink(cleanText(String(formData.get('heroImage') ?? '')), 'Image', fieldErrors, 'heroImage')
    const videoUrl = cleanText(String(formData.get('videoUrl') ?? '')) || null
    if (videoUrl && !parseVideo(videoUrl)) fieldErrors.videoUrl = 'Use a YouTube or Vimeo link, or a direct https link to an .mp4 or .webm file.'
    const inMenu = formData.get('inMenu') === 'on'

    const status = formData.get('status') === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT'
    if (status === 'PUBLISHED' && existing.status !== 'PUBLISHED') await assertPermission('content:publish')
    if (status === 'DRAFT' && existing.status === 'PUBLISHED') await assertPermission('content:publish')

    const requested = String(formData.get('publishedAt') ?? '')
    const publishedAt = fromInputValue(requested)
    if (requested && !publishedAt) fieldErrors.publishedAt = 'Enter a valid publication date and time.'

    if (Object.keys(fieldErrors).length) return { error: 'Please correct the highlighted fields.', fieldErrors }

    await prisma.contentPage.update({
      where: { slug },
      data: { title, eyebrow, intro, sections, heroImage, videoUrl, inMenu, status, publishedAt: publishedAt ?? existing.publishedAt ?? (status === 'PUBLISHED' ? new Date() : null) },
    })
    await audit(session.user.id, 'update', 'pages', existing.id, title)
    revalidatePath('/', 'layout')
    return { ok: true, message: status === 'PUBLISHED' ? 'Saved and live on the website.' : 'Saved as a draft.' }
  } catch (error) {
    if (error instanceof AuthorizationError) return { error: error.message }
    console.error('[admin] savePage failed', error)
    return { error: 'Something went wrong while saving. Please try again.' }
  }
}

export async function createPage(_prev: FormState, formData: FormData): Promise<FormState> {
  let slug = ''
  try {
    const session = await assertPermission('content:write')
    const fieldErrors: Record<string, string> = {}
    const title = cleanText(String(formData.get('title') ?? ''))
    const requested = cleanText(String(formData.get('slug') ?? ''))
    slug = slugify(requested || title)
    const intro = cleanText(String(formData.get('intro') ?? ''))
    if (!title) fieldErrors.title = 'Title is required.'
    else if (title.length > 255) fieldErrors.title = 'Title must be 255 characters or fewer.'
    if (!slug || !slugPattern.test(slug) || slug.length > 100) fieldErrors.slug = 'Use letters, numbers and hyphens only.'
    else if (RESERVED_SLUGS.has(slug)) fieldErrors.slug = 'That address is used by the system. Choose another.'
    else if (await prisma.contentPage.findUnique({ where: { slug }, select: { id: true } })) fieldErrors.slug = 'A page with that address already exists.'
    if (!intro) fieldErrors.intro = 'Introduction is required.'
    else if (intro.length > 5000) fieldErrors.intro = 'Introduction must be 5,000 characters or fewer.'
    if (Object.keys(fieldErrors).length) return { error: 'Please correct the highlighted fields.', fieldErrors }

    const page = await prisma.contentPage.create({ data: { slug, title, eyebrow: 'Godoma TTI', intro, sections: [], status: 'DRAFT' } })
    await audit(session.user.id, 'create', 'pages', page.id, title)
    revalidatePath('/admin/pages')
  } catch (error) {
    if (error instanceof AuthorizationError) return { error: error.message }
    console.error('[admin] createPage failed', error)
    return { error: 'Something went wrong while creating the page. Please try again.' }
  }
  redirect(`/admin/pages/${slug}`)
}

export async function deletePage(slug: string): Promise<void> {
  const session = await assertPermission('content:publish')
  const existing = await prisma.contentPage.findUnique({ where: { slug } })
  if (!existing) redirect('/admin/pages')
  await prisma.contentPage.delete({ where: { slug } })
  await audit(session.user.id, 'delete', 'pages', existing.id, existing.title)
  revalidatePath('/', 'layout')
  redirect('/admin/pages')
}
