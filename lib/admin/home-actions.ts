'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { assertPermission, AuthorizationError } from '@/lib/auth/session'
import { audit } from '@/lib/audit'
import { cleanText } from './validation'
import { parseVideo } from '@/lib/video'
import { defaultHome, homeSectionKeys, type HomeContent, type HomeSectionKey, type StatSource } from '@/lib/home-defaults'
import type { FormState } from './crud'

const text = (data: FormData, name: string, max = 500) => cleanText(String(data.get(name) ?? '')).slice(0, max)
const lines = (data: FormData, name: string, maxItems = 30) =>
  String(data.get(name) ?? '')
    .split(/\r?\n/)
    .map((v) => cleanText(v))
    .filter(Boolean)
    .slice(0, maxItems)
const paragraphs = (data: FormData, name: string) =>
  String(data.get(name) ?? '')
    .split(/\n{2,}/)
    .map((v) => cleanText(v))
    .filter(Boolean)
    .slice(0, 20)

function mediaValue(data: FormData, name: string, fieldErrors: Record<string, string>, label: string) {
  const value = text(data, name)
  if (value && !(value.startsWith('/') || value.startsWith('https://'))) fieldErrors[name] = `${label} must be an uploaded file or an https:// link.`
  return value
}

function linkValue(data: FormData, name: string, fieldErrors: Record<string, string>) {
  const value = text(data, name)
  if (value && !(value.startsWith('/') || value.startsWith('https://') || value.startsWith('#'))) fieldErrors[name] = 'Use a page address such as /about or a full https:// link.'
  return value
}

export async function saveHome(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const session = await assertPermission('content:write')
    const fieldErrors: Record<string, string> = {}

    const layoutKeys = formData.getAll('layoutKey').map(String).filter((k): k is HomeSectionKey => (homeSectionKeys as readonly string[]).includes(k))
    const hidden = new Set(formData.getAll('layoutHidden').map(String))
    const layout = layoutKeys.map((key) => ({ key, visible: !hidden.has(key) }))

    const statLabels = formData.getAll('statLabel').map((v) => cleanText(String(v)))
    const statSources = formData.getAll('statSource').map(String)
    const statValues = formData.getAll('statValue').map((v) => Number(String(v)))
    const stats = statLabels
      .map((label, i) => ({
        label: label.slice(0, 80),
        source: (['courses', 'departments', 'custom'].includes(statSources[i]) ? statSources[i] : 'custom') as StatSource,
        value: Number.isFinite(statValues[i]) ? Math.max(0, Math.min(1_000_000, Math.round(statValues[i]))) : 0,
      }))
      .filter((s) => s.label)
      .slice(0, 8)

    const videoUrl = text(formData, 'video.url')
    if (videoUrl && !parseVideo(videoUrl)) fieldErrors['video.url'] = 'Use a YouTube or Vimeo link, or a direct https link to an .mp4 or .webm file.'

    const home: HomeContent = {
      layout,
      principal: {
        photo: mediaValue(formData, 'principal.photo', fieldErrors, 'Photo'),
        name: text(formData, 'principal.name', 120),
        role: text(formData, 'principal.role', 120),
        eyebrow: text(formData, 'principal.eyebrow', 160),
        heading: text(formData, 'principal.heading', 200),
        paragraphs: paragraphs(formData, 'principal.paragraphs'),
        linkLabel: text(formData, 'principal.linkLabel', 120),
        linkHref: linkValue(formData, 'principal.linkHref', fieldErrors),
      },
      video: {
        eyebrow: text(formData, 'video.eyebrow', 160),
        heading: text(formData, 'video.heading', 200),
        badge: text(formData, 'video.badge', 40),
        url: videoUrl,
        poster: mediaValue(formData, 'video.poster', fieldErrors, 'Cover image'),
        description: text(formData, 'video.description', 600),
        linkLabel: text(formData, 'video.linkLabel', 80),
        linkHref: linkValue(formData, 'video.linkHref', fieldErrors),
      },
      about: {
        image: mediaValue(formData, 'about.image', fieldErrors, 'Image'),
        badgeValue: text(formData, 'about.badgeValue', 20),
        badgeText: text(formData, 'about.badgeText', 80),
        eyebrow: text(formData, 'about.eyebrow', 160),
        heading: text(formData, 'about.heading', 200),
        historyTitle: text(formData, 'about.historyTitle', 120),
        history: paragraphs(formData, 'about.history'),
        location: text(formData, 'about.location', 200),
        visionTitle: text(formData, 'about.visionTitle', 80),
        vision: text(formData, 'about.vision', 1000),
        missionTitle: text(formData, 'about.missionTitle', 80),
        mission: text(formData, 'about.mission', 2000),
        valuesTitle: text(formData, 'about.valuesTitle', 80),
        valuesIntro: text(formData, 'about.valuesIntro', 500),
        values: lines(formData, 'about.values'),
        mandateTitle: text(formData, 'about.mandateTitle', 80),
        mandateIntro: text(formData, 'about.mandateIntro', 600),
        mandate: lines(formData, 'about.mandate'),
      },
      stats,
      admissions: {
        eyebrow: text(formData, 'admissions.eyebrow', 80),
        heading: text(formData, 'admissions.heading', 200),
        intro: text(formData, 'admissions.intro', 2000),
        helbTitle: text(formData, 'admissions.helbTitle', 120),
        helbText: text(formData, 'admissions.helbText', 500),
        applyLabel: text(formData, 'admissions.applyLabel', 60),
        portalLabel: text(formData, 'admissions.portalLabel', 60),
        tableTitle: text(formData, 'admissions.tableTitle', 120),
        tableNote: text(formData, 'admissions.tableNote', 300),
        footnote: text(formData, 'admissions.footnote', 500),
      },
      footer: { tagline: text(formData, 'footer.tagline', 300) },
    }

    if (!home.principal.heading) fieldErrors['principal.heading'] = 'Heading is required.'
    if (!home.about.heading) fieldErrors['about.heading'] = 'Heading is required.'
    if (!home.admissions.heading) fieldErrors['admissions.heading'] = 'Heading is required.'
    if (Object.keys(fieldErrors).length) return { error: 'Please correct the highlighted fields.', fieldErrors }

    await prisma.siteSetting.upsert({ where: { key: 'home' }, update: { value: home }, create: { key: 'home', value: home } })
    await audit(session.user.id, 'update', 'homepage', 'home', 'Homepage')
    revalidatePath('/', 'layout')
    return { ok: true, message: 'Homepage saved and live on the website.' }
  } catch (error) {
    if (error instanceof AuthorizationError) return { error: error.message }
    console.error('[admin] saveHome failed', error)
    return { error: 'Something went wrong while saving. Please try again.' }
  }
}

export async function resetHome(): Promise<void> {
  const session = await assertPermission('content:publish')
  await prisma.siteSetting.deleteMany({ where: { key: 'home' } })
  await audit(session.user.id, 'reset', 'homepage', 'home', 'Homepage reset to defaults')
  revalidatePath('/', 'layout')
  revalidatePath('/admin/homepage')
}
