// Editors work in East Africa Time (UTC+3, no daylight saving) regardless of the server's timezone.
const EAT_OFFSET_MS = 3 * 60 * 60 * 1000

export function toInputValue(date: Date | null | undefined) {
  if (!date) return ''
  return new Date(date.getTime() + EAT_OFFSET_MS).toISOString().slice(0, 16)
}

export function fromInputValue(value: string | null | undefined) {
  if (!value || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return null
  const date = new Date(`${value}:00+03:00`)
  return Number.isNaN(date.getTime()) ? null : date
}

export function formatDate(date: Date | null | undefined) {
  if (!date) return '—'
  return new Intl.DateTimeFormat('en-KE', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Africa/Nairobi' }).format(date)
}
