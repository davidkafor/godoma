// Content is stored and rendered as plain text (React escapes it), so there is no HTML to sanitize.
// These helpers strip control characters and restrict URLs to safe schemes.
export function cleanText(value: string) {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').replace(/\r\n/g, '\n').trim()
}

export function isSafeLink(value: string) {
  if (value.startsWith('/')) return !value.startsWith('//') && !value.includes('\\') && !/[\u0000-\u001F]/.test(value)
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:' || url.protocol === 'mailto:'
  } catch {
    return false
  }
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120)
}

export const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
