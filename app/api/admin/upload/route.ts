import { randomBytes } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { assertPermission, assertSameOrigin, AuthorizationError, csrfMatches } from '@/lib/auth/session'
import { detectFileType, maxUploadBytes, uploadDir } from '@/lib/uploads'
import { audit } from '@/lib/audit'
import { cleanText } from '@/lib/admin/validation'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    await assertSameOrigin()
    const session = await assertPermission('content:write')
    if (!csrfMatches(session.csrfToken, request.headers.get('x-csrf-token'))) {
      return NextResponse.json({ error: 'Security token mismatch. Reload the page and try again.' }, { status: 403 })
    }

    const declared = Number(request.headers.get('content-length') ?? 0)
    if (declared > maxUploadBytes() + 1024 * 64) {
      return NextResponse.json({ error: 'That file is too large.' }, { status: 413 })
    }

    const form = await request.formData()
    const file = form.get('file')
    if (!(file instanceof File) || file.size === 0) return NextResponse.json({ error: 'Choose a file to upload.' }, { status: 400 })
    if (file.size > maxUploadBytes()) {
      return NextResponse.json({ error: `Files must be ${Math.round(maxUploadBytes() / 1024 / 1024)} MB or smaller.` }, { status: 413 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const type = detectFileType(buffer, file.name)
    if (!type) {
      return NextResponse.json({ error: 'Unsupported file type. Upload JPG, PNG, WebP, GIF, PDF, DOC(X) or XLS(X) files.' }, { status: 415 })
    }

    const filename = `${Date.now().toString(36)}-${randomBytes(8).toString('hex')}.${type.ext}`
    await mkdir(uploadDir(), { recursive: true })
    await writeFile(path.join(uploadDir(), filename), buffer, { mode: 0o644 })

    const asset = await prisma.mediaAsset.create({
      data: {
        filename,
        originalName: cleanText(file.name).slice(0, 255) || filename,
        mime: type.mime,
        size: buffer.length,
        kind: type.kind,
        alt: cleanText(String(form.get('alt') ?? '')).slice(0, 255) || null,
        uploadedById: session.user.id,
      },
    })
    await audit(session.user.id, 'upload', 'media', asset.id, asset.originalName)
    return NextResponse.json({ id: asset.id, url: `/uploads/${filename}`, kind: type.kind, name: asset.originalName })
  } catch (error) {
    if (error instanceof AuthorizationError) return NextResponse.json({ error: error.message }, { status: 401 })
    console.error('[admin] upload failed', error)
    return NextResponse.json({ error: 'The upload failed. Please try again.' }, { status: 500 })
  }
}
