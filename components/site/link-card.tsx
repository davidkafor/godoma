import Link from 'next/link'
import { ArrowUpRight, type LucideIcon } from 'lucide-react'

export function LinkCard({
  href,
  title,
  text,
  icon: Icon,
  external,
}: {
  href: string
  title: string
  text: string
  icon: LucideIcon
  external?: boolean
}) {
  const className =
    'group flex h-full flex-col gap-3 rounded-lg border bg-card p-5 transition-colors hover:border-primary'
  const body = (
    <>
      <span className="flex items-center justify-between">
        <span className="flex size-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <ArrowUpRight className="size-4 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
      <span className="font-bold text-foreground group-hover:text-primary">{title}</span>
      <span className="text-sm leading-relaxed text-muted-foreground">{text}</span>
    </>
  )
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {body}
    </a>
  ) : (
    <Link href={href} className={className}>
      {body}
    </Link>
  )
}
