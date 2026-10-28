import { Megaphone } from 'lucide-react'
import { getTicker } from '@/lib/content'

export async function NewsTicker() {
  const tickerItems = await getTicker()
  if (tickerItems.length === 0) return null
  const items = [...tickerItems, ...tickerItems]

  return (
    <section className="overflow-hidden border-b bg-secondary" aria-label="Latest updates">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-5">
        <div className="flex shrink-0 items-center gap-2 text-sm font-bold uppercase tracking-wide text-secondary-foreground">
          <Megaphone className="size-4 text-accent" aria-hidden="true" />
          <span className="hidden sm:inline">Updates</span>
        </div>
        <div className="min-w-0 flex-1 overflow-hidden" aria-live="off">
          <div className="marquee-track flex w-max gap-12 whitespace-nowrap text-sm font-medium text-secondary-foreground">
            {items.map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
          </div>
        </div>
      </div>
    </section>
  )
}
