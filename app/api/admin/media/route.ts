import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { assertPermission, AuthorizationError } from '@/lib/auth/session'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  try {
    await assertPermission('content:write')
    const kind = new URL(request.url).searchParams.get('kind') === 'DOCUMENT' ? 'DOCUMENT' : 'IMAGE'
    const assets = await prisma.mediaAsset.findMany({ where: { kind }, orderBy: { createdAt: 'desc' }, take: 60 })
    return NextResponse.json({
      items: assets.map((a) => ({ id: a.id, url: `/uploads/${a.filename}`, name: a.originalName, alt: a.alt })),
    })
  } catch (error) {
    if (error instanceof AuthorizationError) return NextResponse.json({ error: error.message }, { status: 401 })
    return NextResponse.json({ error: 'Could not load the media library.' }, { status: 500 })
  }
}
