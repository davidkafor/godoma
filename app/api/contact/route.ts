import { after } from 'next/server'
import { prisma } from '@/lib/prisma'
import { idempotencyKeyPattern, validateContact } from '@/lib/forms/validation'
import { deliverNotification } from '@/lib/forms/notify'
import {
  HttpError,
  assertBrowserRequest,
  clientIp,
  enforceRateLimits,
  fail,
  fingerprintOf,
  hashKey,
  isUniqueViolation,
  logServerError,
  newReference,
  readJsonBody,
  succeed,
} from '@/lib/forms/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const MIN_FILL_MS = 1500
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000
const UNAVAILABLE = 'We could not save your message right now. Nothing was sent, so please try again in a few minutes or call the school office.'

export async function POST(request: Request) {
  try {
    assertBrowserRequest(request)
    const body = await readJsonBody(request)

    if (typeof body.website === 'string' && body.website.trim() !== '') return succeed(200, { reference: null })
    if (typeof body.elapsedMs === 'number' && body.elapsedMs < MIN_FILL_MS) return fail(400, 'Please review your message and send it again.')

    const key = typeof body.submissionId === 'string' ? body.submissionId : ''
    if (!idempotencyKeyPattern.test(key)) return fail(400, 'The form expired. Please reload the page and try again.')

    const validated = validateContact(body)
    if (!validated.ok) return fail(422, 'Please correct the highlighted fields.', { fieldErrors: validated.fieldErrors })
    const input = validated.data

    await enforceRateLimits([
      { scope: 'contact-ip', key: hashKey(clientIp(request)), limit: 5, windowMs: 60 * 60 * 1000 },
      { scope: 'contact-email', key: hashKey(input.email), limit: 10, windowMs: 24 * 60 * 60 * 1000 },
    ])

    const existing = await prisma.contactMessage.findUnique({ where: { idempotencyKey: key }, select: { reference: true } })
    if (existing) return succeed(200, { reference: existing.reference, duplicate: true })

    const fingerprint = fingerprintOf(input.email, input.subject, input.message)
    const recent = await prisma.contactMessage.findFirst({
      where: { fingerprint, createdAt: { gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) } },
      select: { reference: true },
      orderBy: { createdAt: 'desc' },
    })
    if (recent) return succeed(200, { reference: recent.reference, duplicate: true })

    let created: { id: string; reference: string } | null = null
    for (let attempt = 0; attempt < 5 && !created; attempt++) {
      try {
        created = await prisma.contactMessage.create({
          data: {
            reference: newReference('MSG'),
            idempotencyKey: key,
            fingerprint,
            name: input.name,
            email: input.email,
            subject: input.subject,
            message: input.message,
          },
          select: { id: true, reference: true },
        })
      } catch (error) {
        if (!isUniqueViolation(error)) throw error
        const raced = await prisma.contactMessage.findUnique({ where: { idempotencyKey: key }, select: { reference: true } })
        if (raced) return succeed(200, { reference: raced.reference, duplicate: true })
      }
    }
    if (!created) throw new Error('reference-exhausted')

    const { id } = created
    after(() => deliverNotification('contact', id))

    return succeed(201, { reference: created.reference })
  } catch (error) {
    if (error instanceof HttpError) return fail(error.status, error.message, {}, error.headers)
    logServerError('contact submission failed', error)
    return fail(503, UNAVAILABLE)
  }
}
