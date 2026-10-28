import 'server-only'
import { prisma } from '@/lib/prisma'
import { clientInfo } from '@/lib/auth/session'

export async function audit(userId: string | null, action: string, entity: string, entityId?: string | null, detail?: string) {
  try {
    const { ip } = await clientInfo()
    await prisma.auditLog.create({
      data: { userId, action, entity, entityId: entityId ?? null, detail: detail?.slice(0, 500) ?? null, ip },
    })
  } catch (error) {
    console.error('[audit] failed to write audit log', error)
  }
}
