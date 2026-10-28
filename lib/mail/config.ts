// Reads SMTP settings from server-side environment variables only. Nothing here is ever sent to the browser,
// and this file is deliberately free of the `server-only` marker so scripts/smtp-test.ts can reuse it.

export type MailKind = 'application' | 'contact'

export type MailConfig = {
  host: string
  port: number
  secure: boolean
  user: string
  password: string
  from: string
}

const EMAIL = /^[^\s<>@,;"'()]+@[^\s<>@,;"'()]+\.[^\s<>@,;"'()]+$/

function mailbox(value: string | undefined) {
  const trimmed = (value ?? '').trim()
  if (!trimmed || /[\r\n]/.test(trimmed)) return ''
  // Accept either "address@domain" or "Display Name <address@domain>".
  const match = trimmed.match(/<([^<>]+)>\s*$/)
  const address = (match ? match[1] : trimmed).trim()
  return EMAIL.test(address) ? trimmed : ''
}

export function addressOf(value: string) {
  const match = value.match(/<([^<>]+)>\s*$/)
  return (match ? match[1] : value).trim()
}

/** Returns the SMTP settings, or the names of the variables that are missing or invalid. */
export function readMailConfig(): { ok: true; config: MailConfig } | { ok: false; problems: string[] } {
  const problems: string[] = []
  const host = (process.env.SMTP_HOST ?? '').trim()
  const port = Number(process.env.SMTP_PORT ?? '')
  const user = (process.env.SMTP_USER ?? '').trim()
  const password = process.env.SMTP_PASSWORD ?? ''
  const from = mailbox(process.env.MAIL_FROM) || mailbox(user)

  if (!host || /[\s/]/.test(host)) problems.push('SMTP_HOST')
  if (!Number.isInteger(port) || port < 1 || port > 65535) problems.push('SMTP_PORT')
  if (!user) problems.push('SMTP_USER')
  if (!password) problems.push('SMTP_PASSWORD')
  if (!from) problems.push('MAIL_FROM')
  if (problems.length) return { ok: false, problems }

  // Port 465 uses implicit TLS. Every other port (587) connects in plain text and must upgrade with STARTTLS.
  return { ok: true, config: { host, port, secure: port === 465, user, password, from } }
}

export function recipientFor(kind: MailKind): string {
  const primary = kind === 'application' ? process.env.APPLICATION_RECIPIENT : process.env.CONTACT_RECIPIENT
  const fallback = kind === 'application' ? process.env.CONTACT_RECIPIENT : process.env.APPLICATION_RECIPIENT
  return mailbox(primary) || mailbox(fallback)
}
