import 'server-only'
import { prisma } from '@/lib/prisma'
import { recipientFor, type MailKind } from './config'

export type EmailSettings = {
  applicationRecipients: string[]
  contactRecipients: string[]
  fromName: string
  notifyApplications: boolean
  notifyContact: boolean
}

export const emailSettingsKey = 'email'
export const maxRecipients = 5

export const defaultEmailSettings: EmailSettings = {
  applicationRecipients: [],
  contactRecipients: [],
  fromName: '',
  notifyApplications: true,
  notifyContact: true,
}

const EMAIL = /^[^\s<>@,;"'()]+@[^\s<>@,;"'()]+\.[^\s<>@,;"'()]+$/

export const isEmail = (value: string) => value.length <= 191 && EMAIL.test(value)

/** Splits a comma, semicolon or line separated list and drops blanks and duplicates. */
export function splitRecipients(text: string): string[] {
  const seen = new Set<string>()
  const list: string[] = []
  for (const part of text.split(/[\n,;]+/)) {
    const address = part.trim().toLowerCase()
    if (address && !seen.has(address)) {
      seen.add(address)
      list.push(address)
    }
  }
  return list
}

function cleanList(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((v): v is string => typeof v === 'string' && isEmail(v)).slice(0, maxRecipients)
}

/** Reads the saved settings. If the database is unavailable the defaults apply, so form submissions are never blocked by this lookup. */
export async function getEmailSettings(): Promise<EmailSettings> {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key: emailSettingsKey } })
    const value = (row?.value ?? {}) as Partial<EmailSettings>
    return {
      applicationRecipients: cleanList(value.applicationRecipients),
      contactRecipients: cleanList(value.contactRecipients),
      fromName: typeof value.fromName === 'string' ? value.fromName.slice(0, 80) : '',
      notifyApplications: value.notifyApplications !== false,
      notifyContact: value.notifyContact !== false,
    }
  } catch (error) {
    console.error('[mail] could not read email settings', { name: (error as Error)?.name })
    return defaultEmailSettings
  }
}

export const notificationsEnabled = (settings: EmailSettings, kind: MailKind) => (kind === 'application' ? settings.notifyApplications : settings.notifyContact)

/** The addresses a notification goes to: the ones saved in the dashboard, or the server default when none are saved. */
export function recipientsFor(settings: EmailSettings, kind: MailKind): string {
  const saved = kind === 'application' ? settings.applicationRecipients : settings.contactRecipients
  return saved.length ? saved.join(', ') : recipientFor(kind)
}
