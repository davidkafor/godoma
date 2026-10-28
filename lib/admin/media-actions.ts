'use server'

import { unlink } from 'node:fs/promises'
import path from 'node:path'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { assertPermission, AuthorizationError } from '@/lib/auth/session'
import { uploadDir } from '@/lib/uploads'
import { audit } from '@/lib/audit'
import type { FormState } from './crud'

export async function deleteMedia(id: string): Promise<FormState> {
  try {
    const session = await assertPermission('media:delete')
    const asset = await prisma.mediaAsset.findUnique({ where: { id } })
    if (!asset) return { error: 'That file no longer exists.' }
    await prisma.mediaAsset.delete({ where: { id } })
    // basename guards against any path segments in the stored name.
    await unlink(path.join(uploadDir(), path.basename(asset.filename))).catch(() => undefined)
    await audit(session.user.id, 'delete', 'media', id, asset.originalName)
    revalidatePath('/admin/media')
    return { ok: true }
  } catch (error) {
    if (error instanceof AuthorizationError) return { error: error.message }
    console.error('[admin] deleteMedia failed', error)
    return { error: 'Something went wrong while deleting the file.' }
  }
}
