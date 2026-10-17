'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { BookOpen, BriefcaseBusiness, CalendarDays, ChevronDown, ClipboardCheck, FileText, GraduationCap, Home, Landmark, Menu, Users, X } from 'lucide-react'
import { navigation, type NavItem } from '@/lib/site-data'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function getNavIcon(label: string) {
  if (label.includes('Principal')) return Landmark
  if (label.includes('Dean')) return Users
  if (label.includes('Registry') || label.includes('Admissions')) return ClipboardCheck
  if (label.includes('Assessment')) return FileText
  if (label.includes('Student')) return GraduationCap
  if (label.includes('Department')) return BriefcaseBusiness
  if (label.includes('Training')) return BookOpen
  if (label.includes('Events')) return CalendarDays
  if (label.includes('Home')) return Home
  return FileText
}

function NavLink({ item, className, onClick }: { item: NavItem; className?: string; onClick?: () => void }) {
  const Icon = getNavIcon(item.label)

  return (
    <a
      href={item.href}
      onClick={onClick}
      className={className}
      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <Icon className="size-4 shrink-0 text-accent" aria-hidden="true" />
      <span>{item.label}</span>
    </a>
  )
}

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null)
        setMobileOpen(false)
      }
    }
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex max-w-[90rem] items-center gap-4 px-4 py-4">
        <a href="/" className="shrink-0" aria-label="Godoma Technical Training Institute home">
          <Image
            src="/images/godoma-main-logo.png"
            alt="Godoma Technical Training Institute with the Kenya coat of arms and institute crest"
            width={707}
            height={200}
            priority
            className="h-auto w-[15rem] max-w-[35vw] sm:w-[18rem]"
          />
        </a>

        <nav ref={navRef} aria-label="Main" className="hidden min-w-0 flex-1 overflow-x-auto lg:block">
          <ul className="flex min-w-max items-center justify-end gap-0.5">
            {navigation.map((group) => (
              <li
                key={group.label}
                className="relative"
                onMouseEnter={() => group.items && setOpenMenu(group.label)}
                onMouseLeave={() => group.items && setOpenMenu(null)}
              >
                {group.items ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={openMenu === group.label}
                      aria-haspopup="true"
                      onClick={() => setOpenMenu((m) => (m === group.label ? null : group.label))}
                      className="flex h-10 items-center gap-1 whitespace-nowrap rounded-md px-1.5 text-base font-semibold text-foreground transition-colors hover:text-primary"
                    >
                      {group.label}
                      <ChevronDown
                        className={cn('size-4 transition-transform', openMenu === group.label && 'rotate-180')}
                        aria-hidden="true"
                      />
                    </button>
                    <div
                      className={cn(
                        'absolute left-0 top-full pt-2 transition-all',
                        openMenu === group.label ? 'visible opacity-100' : 'invisible -translate-y-1 opacity-0',
                      )}
                    >
                      <ul
                        className={cn(
                          'overflow-hidden rounded-md border-t-4 border-accent bg-background py-2 shadow-xl',
                          group.items.length > 4 ? 'grid min-w-[34rem] grid-cols-2' : 'min-w-60',
                        )}
                      >
                        {group.items.map((item) => (
                          <li key={item.label} className="mx-2 border-b last:border-0">
                            <NavLink
                              item={item}
                              onClick={() => setOpenMenu(null)}
                              className="flex items-center gap-3 px-4 py-2 font-sans text-base font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <a
                    href={group.href}
                    className="flex h-10 items-center whitespace-nowrap rounded-md px-2 text-base font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    {group.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-nav" aria-label="Mobile" className="max-h-[70vh] overflow-y-auto border-t bg-background lg:hidden">
          <ul className="mx-auto max-w-7xl px-4 py-2">
            {navigation.map((group) => (
              <li key={group.label} className="border-b last:border-0">
                {group.items ? (
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-base font-semibold [&::-webkit-details-marker]:hidden">
                      {group.label}
                      <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <ul className="pb-3 pl-3">
                      {group.items.map((item) => (
                        <li key={item.label} className="border-b last:border-0">
                          <NavLink
                            item={item}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 py-2 text-base text-muted-foreground hover:text-primary"
                          />
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <a href={group.href} onClick={() => setMobileOpen(false)} className="block py-3 font-semibold">
                    {group.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
