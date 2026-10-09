import { Megaphone } from 'lucide-react'
import { tickerItems } from '@/lib/site-data'

export function NewsTicker() {
  const items = [...tickerItems, ...tickerItems]
  return (
    <div className="flex items-stretch overflow-hidden border-b bg-secondary" aria-label="Quick updates">
      <div className="z-10 flex shrink-0 items-center gap-2 bg-accent px-4 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground">
        <Megaphone className="size-4" aria-hidden="true" />
        <span>Updates</span>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <ul className="animate-ticker flex w-max items-center gap-12 py-3 pl-6 text-sm font-medium text-secondary-foreground">
          {items.map((item, i) => (
            <li key={i} aria-hidden={i >= tickerItems.length} className="flex items-center gap-3 whitespace-nowrap">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
