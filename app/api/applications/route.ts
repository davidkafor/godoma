import { after } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getDepartments } from '@/lib/content'
import { idempotencyKeyPattern, validateApplication } from '@/lib/forms/validation'
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
const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000
const UNAVAILABLE = 'We could not save your application right now. Nothing was submitted, so please try again in a few minutes or call the Admissions Office.'

export async function POST(request: Request) {
  try {
    assertBrowserRequest(request)
    const body = await readJsonBody(request)

    // Honeypot: real visitors never see or fill this field. Bots get a quiet, empty success and nothing is stored.
    if (typeof body.website === 'string' && body.website.trim() !== '') return succeed(200, { reference: null })
    if (typeof body.elapsedMs === 'number' && body.elapsedMs < MIN_FILL_MS) return fail(400, 'Please review your details and submit again.')

    const key = typeof body.submissionId === 'string' ? body.submissionId : ''
    if (!idempotencyKeyPattern.test(key)) return fail(400, 'The form expired. Please reload the page and try again.')

    const validated = validateApplication(body)
    if (!validated.ok) return fail(422, 'Please correct the highlighted fields.', { fieldErrors: validated.fieldErrors })
    const input = validated.data

    // The department and programme must really exist, and the programme must belong to that department.
    const departments = await getDepartments()
    const department = departments.find((d) => d.id === input.department)
    const course = department?.courses.find((c) => c.name === input.programme)
    if (!department) return fail(422, 'Please correct the highlighted fields.', { fieldErrors: { department: 'Select a valid department.' } })
    if (!course) return fail(422, 'Please correct the highlighted fields.', { fieldErrors: { programme: 'Select a programme from the chosen department.' } })

    await enforceRateLimits([
      { scope: 'application-ip', key: hashKey(clientIp(request)), limit: 5, windowMs: 60 * 60 * 1000 },
      { scope: 'application-email', key: hashKey(input.email), limit: 5, windowMs: 24 * 60 * 60 * 1000 },
    ])

    const existing = await prisma.application.findUnique({ where: { idempotencyKey: key }, select: { reference: true } })
    if (existing) return succeed(200, { reference: existing.reference, duplicate: true })

    const fingerprint = fingerprintOf(input.email, department.name, course.name)
    const recent = await prisma.application.findFirst({
      where: { fingerprint, createdAt: { gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) } },
      select: { reference: true },
      orderBy: { createdAt: 'desc' },
    })
    if (recent) return succeed(200, { reference: recent.reference, duplicate: true })

    let created: { id: string; reference: string } | null = null
    for (let attempt = 0; attempt < 5 && !created; attempt++) {
      try {
        created = await prisma.application.create({
          data: {
            reference: newReference('APP'),
            idempotencyKey: key,
            fingerprint,
            fullName: input.name,
            email: input.email,
            phone: input.phone,
            department: department.name,
            programme: course.name,
            qualification: input.grade,
            notes: input.message || null,
          },
          select: { id: true, reference: true },
        })
      } catch (error) {
        if (!isUniqueViolation(error)) throw error
        // Either a concurrent request with the same key won the race, or the reference collided.
        const raced = await prisma.application.findUnique({ where: { idempotencyKey: key }, select: { reference: true } })
        if (raced) return succeed(200, { reference: raced.reference, duplicate: true })
      }
    }
    if (!created) throw new Error('reference-exhausted')

    // The record is saved; email delivery happens after the response and its outcome is stored on the record.
    const { id } = created
    after(() => deliverNotification('application', id))

    return succeed(201, { reference: created.reference })
  } catch (error) {
    if (error instanceof HttpError) return fail(error.status, error.message, {}, error.headers)
    logServerError('application submission failed', error)
    return fail(503, UNAVAILABLE)
  }
}
