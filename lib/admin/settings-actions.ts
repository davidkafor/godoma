'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { assertPermission, AuthorizationError } from '@/lib/auth/session'
import { audit } from '@/lib/audit'
import { cleanText } from './validation'
import type { FormState } from './crud'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^\+?[0-9][0-9\s-]{5,24}$/

function httpsUrl(value: string) {
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

export async function saveSettings(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const session = await assertPermission('settings:write')
    const errors: Record<string, string> = {}

    const phones = cleanText(String(formData.get('phones') ?? ''))
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean)
    if (phones.length === 0) errors.phones = 'Add at least one phone number.'
    else if (phones.length > 6) errors.phones = 'Add six phone numbers at most.'
    else if (phones.some((p) => !phonePattern.test(p))) errors.phones = 'Use digits, spaces and an optional leading + (one number per line).'

    const email = cleanText(String(formData.get('email') ?? '')).toLowerCase()
    if (!emailPattern.test(email) || email.length > 191) errors.email = 'Enter a valid email address.'

    const address = cleanText(String(formData.get('address') ?? ''))
    if (!address || address.length > 300) errors.address = 'Enter the address (up to 300 characters).'
    const postalAddress = cleanText(String(formData.get('postalAddress') ?? ''))
    if (postalAddress.length > 200) errors.postalAddress = 'Postal address is too long.'
    const locationNote = cleanText(String(formData.get('locationNote') ?? ''))
    if (locationNote.length > 600) errors.locationNote = 'Location note is too long.'
    const mapEmbed = cleanText(String(formData.get('mapEmbed') ?? ''))
    if (mapEmbed && (!httpsUrl(mapEmbed) || mapEmbed.length > 1000)) errors.mapEmbed = 'Enter a map link that starts with https://'

    const names = formData.getAll('socialName').map((v) => cleanText(String(v)))
    const hrefs = formData.getAll('socialHref').map((v) => cleanText(String(v)))
    const socials: { name: string; href: string }[] = []
    names.forEach((name, i) => {
      const href = hrefs[i] ?? ''
      if (!name && !href) return
      if (!name || name.length > 40 || !httpsUrl(href) || href.length > 1000) errors.socials = 'Each social link needs a name and a link that starts with https://'
      else socials.push({ name, href })
    })
    if (socials.length > 10) errors.socials = 'Add ten social links at most.'

    if (Object.keys(errors).length) return { error: 'Please correct the highlighted fields.', fieldErrors: errors }

    const contact = { phones, email, address, postalAddress, locationNote, mapEmbed }
    await prisma.$transaction([
      prisma.siteSetting.upsert({ where: { key: 'contact' }, update: { value: contact }, create: { key: 'contact', value: contact } }),
      prisma.siteSetting.upsert({ where: { key: 'socials' }, update: { value: socials }, create: { key: 'socials', value: socials } }),
    ])
    await audit(session.user.id, 'update', 'settings', 'contact', 'Contact and social links')
    revalidatePath('/', 'layout')
    return { ok: true, message: 'Contact details and social links saved.' }
  } catch (error) {
    if (error instanceof AuthorizationError) return { error: error.message }
    console.error('[admin] saveSettings failed', error)
    return { error: 'Something went wrong while saving. Please try again.' }
  }
}
