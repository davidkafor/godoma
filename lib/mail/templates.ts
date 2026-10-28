import { cleanLine } from '@/lib/forms/validation'
import type { OutgoingMail } from './transport'

export function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

const dateFormat = new Intl.DateTimeFormat('en-KE', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Africa/Nairobi' })
const formatDate = (date: Date) => dateFormat.format(date)

function adminLink(path: string) {
  const base = (process.env.APP_URL ?? '').replace(/\/+$/, '')
  return /^https?:\/\//.test(base) ? `${base}${path}` : ''
}

type Row = [label: string, value: string]

function layout(title: string, intro: string, rows: Row[], body: { label: string; text: string } | null, link: string) {
  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px 12px;background:#f3f5f9;border:1px solid #dde2ec;width:34%;font-size:14px;color:#1c2b4a">${escapeHtml(label)}</th><td style="padding:8px 12px;border:1px solid #dde2ec;font-size:14px;color:#222">${escapeHtml(value)}</td></tr>`,
    )
    .join('')
  const bodyHtml = body
    ? `<h3 style="margin:20px 0 6px;font-size:15px;color:#1c2b4a">${escapeHtml(body.label)}</h3><div style="white-space:pre-wrap;padding:12px;border:1px solid #dde2ec;background:#fafbfd;font-size:14px;line-height:1.55;color:#222">${escapeHtml(body.text)}</div>`
    : ''
  const linkHtml = link ? `<p style="margin-top:20px;font-size:14px"><a href="${escapeHtml(link)}" style="color:#1c4fa0">Open in the admin dashboard</a></p>` : ''
  return `<!doctype html><html><body style="margin:0;padding:16px;background:#ffffff;font-family:Arial,Helvetica,sans-serif"><div style="max-width:620px;margin:0 auto"><h2 style="margin:0 0 4px;font-size:20px;color:#1c2b4a">${escapeHtml(title)}</h2><p style="margin:0 0 16px;font-size:14px;color:#555">${escapeHtml(intro)}</p><table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%">${tableRows}</table>${bodyHtml}${linkHtml}<p style="margin-top:24px;font-size:12px;color:#777">Sent automatically by the Godoma TTI website. Reply to this email to respond directly to the sender.</p></div></body></html>`
}

function plain(title: string, rows: Row[], body: { label: string; text: string } | null, link: string) {
  return [title, '', ...rows.map(([l, v]) => `${l}: ${v}`), ...(body ? ['', `${body.label}:`, body.text] : []), ...(link ? ['', `Admin dashboard: ${link}`] : []), '', 'Sent automatically by the Godoma TTI website. Reply to respond directly to the sender.'].join('\n')
}

export type ApplicationMailData = {
  id: string
  reference: string
  fullName: string
  email: string
  phone: string
  department: string
  programme: string
  qualification: string
  notes: string | null
  createdAt: Date
}

export function applicationMail(a: ApplicationMailData): OutgoingMail {
  const rows: Row[] = [
    ['Reference', a.reference],
    ['Submitted', `${formatDate(a.createdAt)} (${a.createdAt.toISOString()})`],
    ['Full name', a.fullName],
    ['Email', a.email],
    ['Phone', a.phone],
    ['Department', a.department],
    ['Programme', a.programme],
    ['Highest qualification / grade', a.qualification],
  ]
  const body = { label: 'Additional information', text: a.notes?.trim() || 'None provided' }
  const link = adminLink(`/admin/applications/${a.id}`)
  const title = 'New student application'
  return {
    kind: 'application',
    reference: a.reference,
    subject: cleanLine(`New application ${a.reference}: ${a.fullName} - ${a.programme}`).slice(0, 200),
    text: plain(title, rows, body, link),
    html: layout(title, `A new application was submitted through the website (${a.reference}).`, rows, body, link),
    replyTo: { name: cleanLine(a.fullName), address: a.email },
  }
}

export type ContactMailData = {
  id: string
  reference: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
}

export function contactMail(m: ContactMailData): OutgoingMail {
  const rows: Row[] = [
    ['Reference', m.reference],
    ['Submitted', `${formatDate(m.createdAt)} (${m.createdAt.toISOString()})`],
    ['Name', m.name],
    ['Email', m.email],
    ['Subject', m.subject],
  ]
  const body = { label: 'Message', text: m.message }
  const link = adminLink(`/admin/messages/${m.id}`)
  const title = 'New website contact message'
  return {
    kind: 'contact',
    reference: m.reference,
    subject: cleanLine(`[Website contact] ${m.subject}`).slice(0, 200),
    text: plain(title, rows, body, link),
    html: layout(title, `A visitor sent a message through the website contact form (${m.reference}).`, rows, body, link),
    replyTo: { name: cleanLine(m.name), address: m.email },
  }
}
