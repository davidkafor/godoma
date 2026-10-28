import nodemailer, { type Transporter } from 'nodemailer'
import { readMailConfig, recipientFor, type MailKind } from './config'

export type MailOutcome = { ok: true; messageId: string } | { ok: false; error: string }

type Cached = { key: string; transporter: Transporter }
let cached: Cached | null = null

function transporterFor(config: Extract<ReturnType<typeof readMailConfig>, { ok: true }>['config']) {
  const key = `${config.host}:${config.port}:${config.user}:${config.password.length}`
  if (cached?.key === key) return cached.transporter
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: !config.secure,
    auth: { user: config.user, pass: config.password },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    tls: { minVersion: 'TLSv1.2' },
  })
  cached = { key, transporter }
  return transporter
}

/** Maps a transport error to a short, safe description. Credentials and server banners are never stored or shown. */
export function describeMailError(error: unknown): string {
  const e = error as { code?: string; responseCode?: number; command?: string }
  const code = e?.code ?? ''
  if (code === 'EAUTH' || e?.responseCode === 535) return 'SMTP authentication failed. Check SMTP_USER and SMTP_PASSWORD.'
  if (code === 'ETIMEDOUT' || code === 'ECONNECTION' || code === 'ESOCKET' || code === 'ETIMEOUT') {
    if (/CERT|TLS|SSL|ALTNAME/i.test(String((error as Error)?.message))) return 'TLS negotiation with the SMTP server failed. Check SMTP_PORT and the server certificate.'
    return 'Could not connect to the SMTP server (connection failed or timed out).'
  }
  if (code === 'ECONNREFUSED' || code === 'ENOTFOUND' || code === 'EDNS') return 'The SMTP host could not be reached. Check SMTP_HOST and SMTP_PORT.'
  if (code === 'EENVELOPE') return 'The SMTP server rejected the sender or recipient address.'
  if (/CERT|TLS|SSL|ALTNAME/i.test(`${code} ${(error as Error)?.message ?? ''}`)) return 'TLS negotiation with the SMTP server failed. Check SMTP_PORT and the server certificate.'
  if (e?.responseCode && e.responseCode >= 400) return `The SMTP server refused the message (code ${e.responseCode}).`
  return 'The email could not be sent because of an unexpected SMTP error.'
}

export type OutgoingMail = {
  kind: MailKind
  subject: string
  text: string
  html: string
  replyTo?: { name: string; address: string }
  reference: string
}

/**
 * Sends one notification. Success means the SMTP server accepted the message for delivery;
 * it is not a guarantee that it reached the recipient's inbox.
 */
export async function sendNotification(mail: OutgoingMail): Promise<MailOutcome> {
  const settings = readMailConfig()
  if (!settings.ok) return { ok: false, error: `Email is not configured on the server (${settings.problems.join(', ')}).` }
  const to = recipientFor(mail.kind)
  if (!to) return { ok: false, error: `No valid recipient is configured (${mail.kind === 'application' ? 'APPLICATION_RECIPIENT' : 'CONTACT_RECIPIENT'}).` }

  try {
    const info = await transporterFor(settings.config).sendMail({
      from: settings.config.from,
      to,
      replyTo: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
      headers: { 'X-Godoma-Reference': mail.reference, 'Auto-Submitted': 'auto-generated' },
    })
    if (info.rejected?.length || !info.accepted?.length) return { ok: false, error: 'The SMTP server rejected the recipient address.' }
    return { ok: true, messageId: String(info.messageId ?? '') }
  } catch (error) {
    const e = error as { code?: string; responseCode?: number; command?: string }
    console.error('[mail] send failed', { code: e?.code, responseCode: e?.responseCode, command: e?.command })
    return { ok: false, error: describeMailError(error) }
  }
}

export async function verifySmtp() {
  const settings = readMailConfig()
  if (!settings.ok) return { ok: false as const, error: `Missing or invalid: ${settings.problems.join(', ')}` }
  try {
    await transporterFor(settings.config).verify()
    return { ok: true as const, host: settings.config.host, port: settings.config.port, secure: settings.config.secure }
  } catch (error) {
    return { ok: false as const, error: describeMailError(error) }
  }
}
