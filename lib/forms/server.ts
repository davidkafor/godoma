import 'server-only'
import { createHash, createHmac, randomInt } from 'node:crypto'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const MAX_BODY_BYTES = 16 * 1024

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public headers?: Record<string, string>,
  ) {
    super(message)
  }
}

export function fail(status: number, error: string, extra: Record<string, unknown> = {}, headers?: Record<string, string>) {
  return NextResponse.json({ ok: false, error, ...extra }, { status, headers: { 'Cache-Control': 'no-store', ...headers } })
}

export function succeed(status: number, body: Record<string, unknown>) {
  return NextResponse.json({ ok: true, ...body }, { status, headers: { 'Cache-Control': 'no-store' } })
}

/**
 * Cross-site request protection for the public JSON endpoints: the request must be JSON (a content type
 * that cross-site HTML forms cannot send) and any Origin header must match the host being served.
 */
export function assertBrowserRequest(request: Request) {
  const type = request.headers.get('content-type') ?? ''
  if (!type.toLowerCase().startsWith('application/json')) throw new HttpError(415, 'Unsupported request.')
  const origin = request.headers.get('origin')
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host')
  if (!origin || !host) throw new HttpError(403, 'This request was blocked.')
  let originHost = ''
  try {
    originHost = new URL(origin).host
  } catch {
    throw new HttpError(403, 'This request was blocked.')
  }
  if (originHost !== host.split(',')[0].trim()) throw new HttpError(403, 'This request was blocked.')
}

/** Reads at most MAX_BODY_BYTES, so an oversized body is rejected without being buffered whole. */
export async function readJsonBody(request: Request): Promise<Record<string, unknown>> {
  const declared = Number(request.headers.get('content-length') ?? '0')
  if (declared > MAX_BODY_BYTES) throw new HttpError(413, 'Your submission is too large.')
  const reader = request.body?.getReader()
  if (!reader) throw new HttpError(400, 'The request was empty.')
  const chunks: Uint8Array[] = []
  let size = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > MAX_BODY_BYTES) {
      await reader.cancel().catch(() => undefined)
      throw new HttpError(413, 'Your submission is too large.')
    }
    chunks.push(value)
  }
  try {
    const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('shape')
    return parsed as Record<string, unknown>
  } catch {
    throw new HttpError(400, 'The request could not be read.')
  }
}

export function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return (forwarded || request.headers.get('x-real-ip') || 'unknown').slice(0, 64)
}

// Visitors' addresses are only kept as a keyed hash, and only long enough to rate limit.
export const hashKey = (value: string) => createHmac('sha256', process.env.SESSION_SECRET || 'godoma-dev-secret').update(value).digest('hex')

export const fingerprintOf = (...parts: string[]) => createHash('sha256').update(parts.join('\u0000').toLowerCase()).digest('hex')

type Rule = { scope: string; key: string; limit: number; windowMs: number }

/** Database-backed so it works on single-process shared hosting and survives restarts. Throws HttpError(429) when exceeded. */
export async function enforceRateLimits(rules: Rule[]) {
  for (const rule of rules) {
    const since = new Date(Date.now() - rule.windowMs)
    const used = await prisma.rateLimitHit.count({ where: { scope: rule.scope, key: rule.key, createdAt: { gte: since } } })
    if (used >= rule.limit) {
      throw new HttpError(429, 'You have sent too many submissions. Please wait a while before trying again.', { 'Retry-After': String(Math.ceil(rule.windowMs / 1000)) })
    }
  }
  await prisma.rateLimitHit.createMany({ data: rules.map((r) => ({ scope: r.scope, key: r.key })) })
  if (randomInt(0, 50) === 0) {
    await prisma.rateLimitHit.deleteMany({ where: { createdAt: { lt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) } } }).catch(() => undefined)
  }
}

// No 0/O/1/I/L, so references can be read out over the phone.
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'

export function newReference(prefix: 'APP' | 'MSG') {
  let code = ''
  for (let i = 0; i < 6; i++) code += ALPHABET[randomInt(0, ALPHABET.length)]
  return `${prefix}-${new Date().getFullYear()}-${code}`
}

export const isUniqueViolation = (error: unknown) => (error as { code?: string })?.code === 'P2002'

/** Never log the message: database errors can include connection details. */
export function logServerError(label: string, error: unknown) {
  const e = error as { name?: string; code?: string }
  console.error(`[forms] ${label}`, { name: e?.name, code: e?.code })
}
