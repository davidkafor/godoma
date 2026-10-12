'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import { navigation, type NavGroup } from '@/lib/site-data'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function isActive(group: NavGroup, pathname: string) {
  if (group.href === '/') return pathname === '/'
  return pathname === group.href || pathname.startsWith(`${group.href}/`)
}

function BrandBar() {
  return (
    <div className="border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3" aria-label="Godoma Technical Training Institute home">
          <Image
            src="/images/gok-logo.png"
            alt="Government of Kenya coat of arms"
            width={250}
            height={236}
            priority
            className="h-12 w-auto sm:h-16"
          />
          <span className="hidden border-l pl-3 text-xs leading-snug text-muted-foreground sm:block">
            <span className="block font-bold uppercase tracking-wider text-foreground">Republic of Kenya</span>
            Ministry of Education
            <span className="block">State Department for TVET</span>
          </span>
        </Link>

        <Link href="/" className="shrink-0" aria-label="Godoma Technical Training Institute home">
          <Image
            src="/images/boh.png"
            alt="Godoma Technical Training Institute logo"
            width={307}
            height={90}
            priority
            className="h-12 w-auto sm:h-16"
          />
        </Link>
      </div>
    </div>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [pathname])

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
    <>
      <BrandBar />
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4">
          <nav ref={navRef} aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center">
              {navigation.map((group) => {
                const active = isActive(group, pathname)
                return (
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
                          className={cn(
                            'flex items-center gap-1 border-b-4 px-4 py-4 text-sm font-semibold transition-colors hover:bg-primary-foreground/10',
                            active ? 'border-accent' : 'border-transparent',
                          )}
                        >
                          {group.label}
                          <ChevronDown
                            className={cn('size-4 transition-transform', openMenu === group.label && 'rotate-180')}
                            aria-hidden="true"
                          />
                        </button>
                        <div
                          className={cn(
                            'absolute left-0 top-full transition-all',
                            openMenu === group.label ? 'visible opacity-100' : 'invisible -translate-y-1 opacity-0',
                          )}
                        >
                          <ul className="min-w-64 overflow-hidden rounded-b-md border-t-4 border-accent bg-background py-2 text-foreground shadow-xl">
                            {group.items.map((item) => (
                              <li key={item.label}>
                                <Link
                                  href={item.href}
                                  className={cn(
                                    'block px-4 py-2 text-sm transition-colors hover:bg-secondary hover:text-primary',
                                    pathname === item.href && 'bg-secondary font-semibold text-primary',
                                  )}
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={group.href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'block border-b-4 px-4 py-4 text-sm font-semibold transition-colors hover:bg-primary-foreground/10',
                          active ? 'border-accent' : 'border-transparent',
                        )}
                      >
                        {group.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          <span className="py-3 text-sm font-bold lg:hidden">Menu</span>

          <div className="flex items-center gap-2 py-2">
            <Link
              href="/admissions"
              className={cn(buttonVariants(), 'h-10 bg-accent px-5 font-bold text-accent-foreground hover:bg-accent/90')}
            >
              Apply Now!
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground lg:hidden"
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
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="max-h-[70vh] overflow-y-auto border-t bg-background text-foreground lg:hidden"
          >
            <ul className="mx-auto max-w-7xl px-4 py-2">
              {navigation.map((group) => (
                <li key={group.label} className="border-b last:border-0">
                  {group.items ? (
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between py-3 font-semibold [&::-webkit-details-marker]:hidden">
                        {group.label}
                        <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                      </summary>
                      <ul className="pb-3 pl-3">
                        {group.items.map((item) => (
                          <li key={item.label}>
                            <Link href={item.href} className="block py-2 text-sm text-muted-foreground hover:text-primary">
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link href={group.href} className="block py-3 font-semibold">
                      {group.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  )
}
