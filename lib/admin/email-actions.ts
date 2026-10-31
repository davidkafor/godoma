'use server'

import { prisma } from '@/lib/prisma'
import { assertPermission, AuthorizationError } from '@/lib/auth/session'
import { audit } from '@/lib/audit'
import { sendNotification } from '@/lib/mail/transport'
import { emailSettingsKey, isEmail, maxRecipients, splitRecipients, type EmailSettings } from '@/lib/mail/settings'
import { cleanText } from './validation'
import type { FormState } from './crud'

function parseList(raw: string, field: string, errors: Record<string, string>) {
  const list = splitRecipients(cleanText(raw))
  if (list.length > maxRecipients) errors[field] = `Add ${maxRecipients} addresses at most.`
  else if (list.some((address) => !isEmail(address))) errors[field] = 'Every address must be a valid email, for example name@example.com.'
  return list
}

export async function saveEmailSettings(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const session = await assertPermission('settings:write')
    const errors: Record<string, string> = {}

    const applicationRecipients = parseList(String(formData.get('applicationRecipients') ?? ''), 'applicationRecipients', errors)
    const contactRecipients = parseList(String(formData.get('contactRecipients') ?? ''), 'contactRecipients', errors)
    const fromName = cleanText(String(formData.get('fromName') ?? '')).replace(/[\r\n"<>\\]/g, ' ').trim()
    if (fromName.length > 80) errors.fromName = 'Use 80 characters at most.'

    if (Object.keys(errors).length) return { error: 'Please correct the highlighted fields.', fieldErrors: errors }

    const value: EmailSettings = {
      applicationRecipients,
      contactRecipients,
      fromName,
      notifyApplications: formData.get('notifyApplications') === 'on',
      notifyContact: formData.get('notifyContact') === 'on',
    }
    await prisma.siteSetting.upsert({ where: { key: emailSettingsKey }, update: { value }, create: { key: emailSettingsKey, value } })
    await audit(session.user.id, 'update', 'settings', 'email', 'Email delivery settings')
    return { ok: true, message: 'Email delivery settings saved.' }
  } catch (error) {
    if (error instanceof AuthorizationError) return { error: error.message }
    console.error('[admin] saveEmailSettings failed', error)
    return { error: 'Something went wrong while saving. Please try again.' }
  }
}

// One test email per administrator every 30 seconds, so the button cannot be used to flood an inbox.
const lastTest = new Map<string, number>()

export async function sendTestEmail(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const session = await assertPermission('settings:write')
    const to = cleanText(String(formData.get('testAddress') ?? '')).toLowerCase()
    if (!isEmail(to)) return { error: 'Enter a valid email address to send the test to.', fieldErrors: { testAddress: 'Enter a valid email address.' } }

    const now = Date.now()
    if (now - (lastTest.get(session.user.id) ?? 0) < 30_000) return { error: 'Please wait 30 seconds before sending another test email.' }
    lastTest.set(session.user.id, now)

    const stored = await prisma.siteSetting.findUnique({ where: { key: emailSettingsKey } })
    const fromName = typeof (stored?.value as { fromName?: unknown } | null)?.fromName === 'string' ? (stored!.value as { fromName: string }).fromName : ''

    const outcome = await sendNotification({
      kind: 'contact',
      reference: 'ADMIN-TEST',
      to,
      fromName,
      subject: 'Godoma TTI: email delivery test',
      text: 'This is a test message from the Godoma TTI website dashboard. If you can read it, the server can send mail.',
      html: '<p>This is a test message from the Godoma TTI website dashboard. If you can read it, the server can send mail.</p>',
    })
    await audit(session.user.id, 'test', 'settings', 'email', outcome.ok ? 'Sent a test email' : 'Test email failed')
    if (!outcome.ok) return { error: outcome.error }
    return { ok: true, message: `The mail server accepted the test message for ${to}. Check that inbox and its spam folder to confirm it arrived.` }
  } catch (error) {
    if (error instanceof AuthorizationError) return { error: error.message }
    console.error('[admin] sendTestEmail failed', error)
    return { error: 'The test email could not be sent. Please try again.' }
  }
}
