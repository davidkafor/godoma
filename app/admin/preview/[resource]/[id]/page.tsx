import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireSession } from '@/lib/auth/session'
import { resourceByKey } from '@/lib/admin/resources'
import { getItem } from '@/lib/admin/queries'
import { StatusBadge } from '@/components/admin/status-badge'

export const metadata: Metadata = { title: 'Preview', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

const isMedia = (value: string) => value.startsWith('/') || value.startsWith('https://') || value.startsWith('http://')

function Banner({ status, publishedAt, back }: { status: string; publishedAt?: Date | null; back: string }) {
  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-accent px-4 py-2 text-sm text-accent-foreground">
      <span className="flex items-center gap-2 font-semibold">
        Preview — only signed-in administrators can see this page <StatusBadge value={status} publishedAt={publishedAt} />
      </span>
      <Link href={back} className="font-semibold underline underline-offset-2">
        Back to editing
      </Link>
    </div>
  )
}

export default async function PreviewPage({ params }: { params: Promise<{ resource: string; id: string }> }) {
  const { resource: key, id } = await params
  await requireSession('content:write')

  if (key === 'pages') {
    const page = await prisma.contentPage.findUnique({ where: { slug: id } })
    if (!page) notFound()
    const sections = (Array.isArray(page.sections) ? page.sections : []) as string[][]
    return (
      <>
        <Banner status={page.status} publishedAt={page.publishedAt} back={`/admin/pages/${id}`} />
        <main className="mx-auto max-w-3xl px-4 py-10">
          <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{page.eyebrow}</p>
          <h1 className="mt-1 text-balance text-4xl font-extrabold text-primary">{page.title}</h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed">{page.intro}</p>
          {sections.map(([heading, ...paragraphs], i) => (
            <section key={i} className="mt-8">
              <h2 className="text-2xl font-extrabold text-primary">{heading}</h2>
              {paragraphs.map((p, j) => (
                <p key={j} className="mt-3 whitespace-pre-line leading-relaxed">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </main>
      </>
    )
  }

  const resource = resourceByKey[key]
  if (!resource) notFound()
  const item = (await getItem(resource, id)) as Record<string, unknown> | null
  if (!item) notFound()

  const title = String(item[resource.titleField] ?? resource.singular)
  const image = resource.imageField ? String(item[resource.imageField] ?? '') : ''

  return (
    <>
      <Banner status={String(item.status ?? 'DRAFT')} publishedAt={item.publishedAt as Date | null} back={`/admin/${key}/${id}`} />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{resource.singular}</p>
        <h1 className="mt-1 text-balance text-4xl font-extrabold text-primary">{title}</h1>
        {image && isMedia(image) && (
          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-lg bg-muted">
            <Image src={image} alt="" fill sizes="(min-width: 768px) 48rem, 100vw" className="object-cover" unoptimized />
          </div>
        )}
        <dl className="mt-8 space-y-5">
          {resource.fields
            .filter((f) => f.name !== resource.titleField && f.name !== resource.imageField && f.type !== 'boolean')
            .map((f) => {
              const raw = item[f.name]
              if (raw === null || raw === undefined || raw === '') return null
              const text = raw instanceof Date ? raw.toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' }) : String(raw)
              return (
                <div key={f.name}>
                  <dt className="text-sm font-bold text-muted-foreground">{f.label}</dt>
                  <dd className="mt-1 whitespace-pre-line leading-relaxed">
                    {f.type === 'image' && isMedia(text) ? (
                      <span className="relative block aspect-[16/9] max-w-md overflow-hidden rounded-md bg-muted">
                        <Image src={text} alt="" fill sizes="28rem" className="object-cover" unoptimized />
                      </span>
                    ) : f.type === 'file' ? (
                      <a href={text} target="_blank" rel="noreferrer" className="font-semibold text-primary underline">
                        Open file
                      </a>
                    ) : (
                      text
                    )}
                  </dd>
                </div>
              )
            })}
        </dl>
      </main>
    </>
  )
}
