import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { mimeByExtension, uploadDir } from '@/lib/uploads'

export const runtime = 'nodejs'

const safeName = /^[a-z0-9]+-[a-f0-9]{16}\.[a-z]{3,4}$/

export async function GET(_request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params
  if (!safeName.test(filename)) return new Response('Not found', { status: 404 })
  const ext = path.extname(filename).slice(1)
  const mime = mimeByExtension[ext]
  if (!mime) return new Response('Not found', { status: 404 })
  try {
    const data = await readFile(path.join(uploadDir(), filename))
    return new Response(new Uint8Array(data), {
      headers: {
        'Content-Type': mime,
        'Content-Disposition': mime.startsWith('image/') ? 'inline' : 'attachment',
        'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; sandbox",
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return new Response('Not found', { status: 404 })
  }
}
