import 'server-only'
import { prisma } from '@/lib/prisma'
import { sendNotification } from '@/lib/mail/transport'
import { applicationMail, contactMail } from '@/lib/mail/templates'
import { getEmailSettings, notificationsEnabled, recipientsFor } from '@/lib/mail/settings'

export type NotifyKind = 'application' | 'contact'
export type NotifyResult = 'sent' | 'failed' | 'skipped'

// A notification that has been "PENDING" for longer than this is assumed to have been interrupted (for example a restart).
const STALE_PENDING_MS = 5 * 60 * 1000

function claimWhere(id: string) {
  return {
    id,
    OR: [
      { emailStatus: 'FAILED' as const },
      { emailStatus: 'PENDING' as const, emailAttemptedAt: null },
      { emailStatus: 'PENDING' as const, emailAttemptedAt: { lt: new Date(Date.now() - STALE_PENDING_MS) } },
    ],
  }
}

const claimData = () => ({ emailStatus: 'PENDING' as const, emailAttemptedAt: new Date(), emailAttempts: { increment: 1 } })

/**
 * Sends the notification for a saved record exactly once per claim. The claim is a single conditional UPDATE,
 * so a double-click, a refresh or two administrators pressing "retry" cannot send the same attempt twice,
 * and a notification that was already sent is never sent again.
 */
export async function deliverNotification(kind: NotifyKind, id: string): Promise<NotifyResult> {
  try {
    const settings = await getEmailSettings()
    if (!notificationsEnabled(settings, kind)) return 'skipped'
    const delivery = { to: recipientsFor(settings, kind), fromName: settings.fromName }

    if (kind === 'application') {
      const claimed = await prisma.application.updateMany({ where: claimWhere(id), data: claimData() })
      if (claimed.count === 0) return 'skipped'
      const record = await prisma.application.findUnique({ where: { id } })
      if (!record) return 'skipped'
      const outcome = await sendNotification({ ...applicationMail(record), ...delivery })
      await prisma.application.update({
        where: { id },
        data: outcome.ok ? { emailStatus: 'SENT', emailSentAt: new Date(), emailError: null } : { emailStatus: 'FAILED', emailError: outcome.error.slice(0, 250) },
      })
      return outcome.ok ? 'sent' : 'failed'
    }
    const claimed = await prisma.contactMessage.updateMany({ where: claimWhere(id), data: claimData() })
    if (claimed.count === 0) return 'skipped'
    const record = await prisma.contactMessage.findUnique({ where: { id } })
    if (!record) return 'skipped'
    const outcome = await sendNotification({ ...contactMail(record), ...delivery })
    await prisma.contactMessage.update({
      where: { id },
      data: outcome.ok ? { emailStatus: 'SENT', emailSentAt: new Date(), emailError: null } : { emailStatus: 'FAILED', emailError: outcome.error.slice(0, 250) },
    })
    return outcome.ok ? 'sent' : 'failed'
  } catch (error) {
    const e = error as { name?: string; code?: string }
    console.error('[forms] notification bookkeeping failed', { name: e?.name, code: e?.code })
    return 'failed'
  }
}
