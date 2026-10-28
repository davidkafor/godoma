'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { assertPermission, AuthorizationError } from '@/lib/auth/session'
import { audit } from '@/lib/audit'
import { deliverNotification } from '@/lib/forms/notify'
import type { FormState } from './crud'

type Kind = 'application' | 'contact'

const applicationStatuses = ['NEW', 'IN_REVIEW', 'CONTACTED', 'ADMITTED', 'DECLINED', 'ARCHIVED'] as const
const messageStatuses = ['NEW', 'READ', 'REPLIED', 'ARCHIVED'] as const

function failure(error: unknown): FormState {
  if (error instanceof AuthorizationError) return { error: error.message }
  console.error('[admin] submission action failed', error)
  return { error: 'Something went wrong. Please try again.' }
}

const entityName = (kind: Kind) => (kind === 'application' ? 'application' : 'contact-message')
const basePath = (kind: Kind) => (kind === 'application' ? '/admin/applications' : '/admin/messages')

export async function setSubmissionStatus(kind: Kind, id: string, status: string): Promise<FormState> {
  try {
    const session = await assertPermission('submissions:manage')
    if (typeof id !== 'string' || id.length > 40) return { error: 'Unknown record.' }
    if (kind === 'application') {
      if (!(applicationStatuses as readonly string[]).includes(status)) return { error: 'Invalid status.' }
      await prisma.application.update({ where: { id }, data: { status: status as (typeof applicationStatuses)[number] } })
    } else if (kind === 'contact') {
      if (!(messageStatuses as readonly string[]).includes(status)) return { error: 'Invalid status.' }
      await prisma.contactMessage.update({ where: { id }, data: { status: status as (typeof messageStatuses)[number] } })
    } else {
      return { error: 'Unknown record.' }
    }
    await audit(session.user.id, 'status', entityName(kind), id, status)
    revalidatePath(basePath(kind))
    return { ok: true, message: 'Status updated.' }
  } catch (error) {
    if ((error as { code?: string })?.code === 'P2025') return { error: 'That record no longer exists.' }
    return failure(error)
  }
}

/**
 * Re-sends a failed (or abandoned) notification. deliverNotification claims the record with a single conditional
 * UPDATE, so two administrators clicking at once, or a double click, can never send two emails for the same retry,
 * and a notification that was already sent is never sent again.
 */
export async function retryNotification(kind: Kind, id: string): Promise<FormState> {
  try {
    const session = await assertPermission('submissions:manage')
    if (typeof id !== 'string' || id.length > 40) return { error: 'Unknown record.' }
    if (kind !== 'application' && kind !== 'contact') return { error: 'Unknown record.' }

    const result = await deliverNotification(kind, id)
    await audit(session.user.id, 'retry-email', entityName(kind), id, result)
    revalidatePath(basePath(kind))
    revalidatePath(`${basePath(kind)}/${id}`)
    if (result === 'sent') return { ok: true, message: 'The email was accepted by the mail server.' }
    if (result === 'skipped') return { error: 'This notification was already sent or is being sent right now.' }
    return { error: 'The mail server did not accept the email. See the delivery error on the record, then try again.' }
  } catch (error) {
    return failure(error)
  }
}
