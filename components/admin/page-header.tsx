import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export function PageHeader({
  title,
  description,
  crumbs,
  actions,
}: {
  title: string
  description?: string
  crumbs?: { href?: string; label: string }[]
  actions?: React.ReactNode
}) {
  return (
    <div className="mb-6">
      {crumbs && (
        <nav aria-label="Breadcrumb" className="mb-2">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            {crumbs.map((crumb, i) => (
              <li key={crumb.label} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="size-3.5" aria-hidden="true" />}
                {crumb.href ? (
                  <Link href={crumb.href} className="font-semibold text-primary underline-offset-4 hover:underline">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-balance text-2xl font-extrabold text-primary">{title}</h1>
          {description && <p className="mt-1 max-w-2xl text-pretty text-sm text-muted-foreground">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </div>
  )
}

export function Notice({ tone = 'success', children }: { tone?: 'success' | 'error'; children: React.ReactNode }) {
  return (
    <p
      role={tone === 'error' ? 'alert' : 'status'}
      className={`mb-4 rounded-md border px-3 py-2 text-sm font-semibold ${
        tone === 'error' ? 'border-destructive/40 bg-destructive/10 text-destructive' : 'border-secondary/50 bg-secondary/15 text-foreground'
      }`}
    >
      {children}
    </p>
  )
}

export function EmptyState({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-card px-6 py-12 text-center">
      <p className="font-bold text-foreground">{title}</p>
      {children && <div className="mt-2 text-sm text-muted-foreground">{children}</div>}
    </div>
  )
}
