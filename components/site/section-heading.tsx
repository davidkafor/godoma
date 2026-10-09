import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  invert = false,
  id,
}: {
  eyebrow: string
  title: string
  description?: string
  align?: 'center' | 'left'
  invert?: boolean
  id?: string
}) {
  return (
    <div className={cn('mb-12 max-w-3xl', align === 'center' && 'mx-auto text-center')}>
      <p className="text-sm font-bold uppercase tracking-widest text-accent">{eyebrow}</p>
      <h2
        id={id}
        className={cn(
          'mt-2 text-balance text-3xl font-extrabold sm:text-4xl',
          invert ? 'text-primary-foreground' : 'text-primary',
        )}
      >
        {title}
      </h2>
      <div className={cn('mt-4 h-1 w-16 rounded-full bg-accent', align === 'center' && 'mx-auto')} aria-hidden="true" />
      {description && (
        <p
          className={cn(
            'mt-5 text-pretty leading-relaxed',
            invert ? 'text-primary-foreground/80' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
