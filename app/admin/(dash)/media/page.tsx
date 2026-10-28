import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { requireSession } from '@/lib/auth/session'
import { can } from '@/lib/auth/permissions'
import { EmptyState, PageHeader } from '@/components/admin/page-header'
import { MediaGrid, Uploader } from '@/components/admin/media-library'
import { btnSecondary } from '@/components/admin/styles'

export const metadata: Metadata = { title: 'Media library' }

const SIZE = 40
const sizeLabel = (bytes: number) => (bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`)

export default async function MediaPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const session = await requireSession('content:write')
  const page = Math.max(1, Number((await searchParams).page) || 1)
  const [total, assets] = await Promise.all([
    prisma.mediaAsset.count(),
    prisma.mediaAsset.findMany({ orderBy: { createdAt: 'desc' }, skip: (page - 1) * SIZE, take: SIZE }),
  ])
  const pages = Math.max(1, Math.ceil(total / SIZE))

  return (
    <>
      <PageHeader title="Media library" description="Images and documents you have uploaded. Pick them from any form." />
      <Uploader />
      {assets.length === 0 ? (
        <EmptyState title="No files uploaded yet">Use the button above to add your first image or document.</EmptyState>
      ) : (
        <MediaGrid
          canDelete={can(session.user.role, 'media:delete')}
          items={assets.map((a) => ({ id: a.id, url: `/uploads/${a.filename}`, name: a.originalName, kind: a.kind, sizeLabel: sizeLabel(a.size) }))}
        />
      )}
      {pages > 1 && (
        <nav aria-label="Pagination" className="mt-6 flex items-center justify-between text-sm">
          <p className="text-muted-foreground">
            Page {page} of {pages}
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link href={`/admin/media?page=${page - 1}`} className={btnSecondary}>
                Newer
              </Link>
            )}
            {page < pages && (
              <Link href={`/admin/media?page=${page + 1}`} className={btnSecondary}>
                Older
              </Link>
            )}
          </div>
        </nav>
      )}
    </>
  )
}
