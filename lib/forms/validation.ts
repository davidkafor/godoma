import { z } from 'zod'

// Shared by the browser (instant feedback) and the server (the authoritative check).

export type FieldErrors = Record<string, string>
export type ValidationResult<T> = { ok: true; data: T } | { ok: false; fieldErrors: FieldErrors }

// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u2028\u2029\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g

/** Single-line values: control characters, tabs and line breaks become spaces, which also blocks header injection. */
export function cleanLine(value: unknown) {
  if (typeof value !== 'string') return ''
  return value.normalize('NFC').replace(/[\r\n\t]+/g, ' ').replace(CONTROL_CHARS, '').replace(/\s{2,}/g, ' ').trim()
}

/** Multi-line values: keeps line breaks, removes control characters and collapses excessive blank lines. */
export function cleanText(value: unknown) {
  if (typeof value !== 'string') return ''
  return value
    .normalize('NFC')
    .replace(/\r\n?/g, '\n')
    .replace(CONTROL_CHARS, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

const nameRegex = /^[\p{L}\p{M}][\p{L}\p{M}\s'’.-]*$/u

export function normalizePhone(value: string) {
  return value.replace(/[\s().-]/g, '')
}

const name = z
  .string()
  .min(1, 'Enter your full name.')
  .min(2, 'Your name must be at least 2 characters.')
  .max(100, 'Your name must be 100 characters or fewer.')
  .regex(nameRegex, 'Use letters, spaces, apostrophes, hyphens or full stops only.')

const email = z.string().min(1, 'Enter your email address.').max(254, 'That email address is too long.').pipe(z.email('Enter a valid email address, for example name@example.com.'))

const phone = z
  .string()
  .min(1, 'Enter your phone number.')
  .refine((v) => /^\+?\d{9,15}$/.test(normalizePhone(v)), 'Enter a valid phone number, for example +254 743 661 423.')

export const applicationSchema = z.object({
  name,
  email,
  phone,
  department: z.string().min(1, 'Select a department.').max(100, 'Select a valid department.'),
  programme: z.string().min(1, 'Select a programme.').max(255, 'Select a valid programme.'),
  grade: z.string().min(1, 'Enter your highest qualification or grade.').max(100, 'Keep this to 100 characters or fewer.'),
  message: z.string().max(2000, 'Additional information must be 2,000 characters or fewer.'),
})

export const contactSchema = z.object({
  name,
  email,
  subject: z.string().min(1, 'Enter a subject.').min(3, 'The subject must be at least 3 characters.').max(150, 'The subject must be 150 characters or fewer.'),
  message: z.string().min(1, 'Enter your message.').min(10, 'Your message must be at least 10 characters.').max(5000, 'Your message must be 5,000 characters or fewer.'),
})

export type ApplicationInput = z.infer<typeof applicationSchema>
export type ContactInput = z.infer<typeof contactSchema>

function run<T>(schema: z.ZodType<T>, cleaned: unknown): ValidationResult<T> {
  const parsed = schema.safeParse(cleaned)
  if (parsed.success) return { ok: true, data: parsed.data }
  const fieldErrors: FieldErrors = {}
  for (const issue of parsed.error.issues) {
    const key = String(issue.path[0] ?? 'form')
    if (!fieldErrors[key]) fieldErrors[key] = issue.message
  }
  return { ok: false, fieldErrors }
}

const str = (raw: Record<string, unknown>, key: string) => cleanLine(raw[key])

export function validateApplication(raw: Record<string, unknown>): ValidationResult<ApplicationInput> {
  const result = run(applicationSchema, {
    name: str(raw, 'name'),
    email: str(raw, 'email').toLowerCase(),
    phone: str(raw, 'phone'),
    department: str(raw, 'department'),
    programme: str(raw, 'programme'),
    grade: str(raw, 'grade'),
    message: cleanText(raw.message),
  })
  if (result.ok) result.data.phone = normalizePhone(result.data.phone)
  return result
}

export function validateContact(raw: Record<string, unknown>): ValidationResult<ContactInput> {
  return run(contactSchema, {
    name: str(raw, 'name'),
    email: str(raw, 'email').toLowerCase(),
    subject: str(raw, 'subject'),
    message: cleanText(raw.message),
  })
}

export const idempotencyKeyPattern = /^[A-Za-z0-9-]{16,64}$/
