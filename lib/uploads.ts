import 'server-only'
import path from 'node:path'

// Set UPLOAD_DIR to a folder outside the application directory so uploads survive redeploys.
export const uploadDir = () => path.resolve(/*turbopackIgnore: true*/ process.env.UPLOAD_DIR || path.join(/*turbopackIgnore: true*/ process.cwd(), 'storage', 'uploads'))

export const maxUploadBytes = () => Number(process.env.MAX_UPLOAD_MB || 10) * 1024 * 1024

type FileKind = { ext: string; mime: string; kind: 'IMAGE' | 'DOCUMENT' }

const startsWith = (buf: Buffer, bytes: number[], offset = 0) => bytes.every((b, i) => buf[offset + i] === b)

// Content is identified by its bytes, never by the browser-supplied type or file name alone.
export function detectFileType(buf: Buffer, originalName: string): FileKind | null {
  const ext = path.extname(originalName).toLowerCase()
  if (startsWith(buf, [0xff, 0xd8, 0xff])) return { ext: 'jpg', mime: 'image/jpeg', kind: 'IMAGE' }
  if (startsWith(buf, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return { ext: 'png', mime: 'image/png', kind: 'IMAGE' }
  if (startsWith(buf, [0x47, 0x49, 0x46, 0x38])) return { ext: 'gif', mime: 'image/gif', kind: 'IMAGE' }
  if (startsWith(buf, [0x52, 0x49, 0x46, 0x46]) && startsWith(buf, [0x57, 0x45, 0x42, 0x50], 8)) return { ext: 'webp', mime: 'image/webp', kind: 'IMAGE' }
  if (startsWith(buf, [0x25, 0x50, 0x44, 0x46])) return { ext: 'pdf', mime: 'application/pdf', kind: 'DOCUMENT' }
  if (startsWith(buf, [0x50, 0x4b, 0x03, 0x04])) {
    if (ext === '.docx') return { ext: 'docx', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', kind: 'DOCUMENT' }
    if (ext === '.xlsx') return { ext: 'xlsx', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', kind: 'DOCUMENT' }
  }
  if (startsWith(buf, [0xd0, 0xcf, 0x11, 0xe0])) {
    if (ext === '.doc') return { ext: 'doc', mime: 'application/msword', kind: 'DOCUMENT' }
    if (ext === '.xls') return { ext: 'xls', mime: 'application/vnd.ms-excel', kind: 'DOCUMENT' }
  }
  return null
}

export const mimeByExtension: Record<string, string> = {
  jpg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}
