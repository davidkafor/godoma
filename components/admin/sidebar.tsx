'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ExternalLink, LogOut, Menu, X } from 'lucide-react'
import { logout } from '@/lib/admin/auth-actions'
import { btnGhost } from './styles'

export type NavGroup = { heading: string; items: { href: string; label: string }[] }

type Props = {
  groups: NavGroup[]
  user: { name: string; email: string; roleLabel: string }
  children: React.ReactNode
}

export function AdminShell({ groups, user, children }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const isActive = (href: string) => (href === '/admin' ? pathname === '/admin' : pathname === href || pathname.startsWith(`${href}/`))

  const nav = (
    <nav aria-label="Admin sections" className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
      {groups.map((group) => (
        <div key={group.heading}>
          <p className="px-3 pb-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">{group.heading}</p>
          <ul className="space-y-0.5">
            {group.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`block rounded-md px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isActive(item.href) ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )

  const brand = (
    <Link href="/admin" className="flex items-center gap-3 px-4 py-4">
      <Image src="/images/godoma-main-logo.webp" alt="" width={36} height={36} className="h-9 w-auto" />
      <span className="text-sm font-extrabold leading-tight text-primary">
        Godoma TTI
        <span className="block text-xs font-semibold text-muted-foreground">Administration</span>
      </span>
    </Link>
  )

  return (
    <div className="min-h-svh lg:flex">
      <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col border-r border-border bg-card lg:flex">{brand}{nav}</aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-2.5">
          <button type="button" onClick={() => setOpen(true)} className={`${btnGhost} lg:hidden`} aria-label="Open navigation menu" aria-expanded={open}>
            <Menu className="size-5" aria-hidden="true" />
          </button>
          <div className="hidden min-w-0 lg:block">
            <p className="truncate text-sm font-bold text-foreground">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.roleLabel} · {user.email}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/" target="_blank" className={btnGhost}>
              <ExternalLink className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">View website</span>
              <span className="sr-only sm:hidden">View website</span>
            </Link>
            <form action={logout}>
              <button type="submit" className={btnGhost}>
                <LogOut className="size-4" aria-hidden="true" />
                <span className="hidden sm:inline">Sign out</span>
                <span className="sr-only sm:hidden">Sign out</span>
              </button>
            </form>
          </div>
        </header>

        <main id="admin-main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button type="button" aria-label="Close navigation menu" className="absolute inset-0 bg-foreground/50" onClick={() => setOpen(false)} />
          <div className="relative flex h-full w-72 max-w-[85vw] flex-col bg-card shadow-xl">
            <button type="button" onClick={() => setOpen(false)} className={`${btnGhost} absolute right-2 top-2`} aria-label="Close navigation menu">
              <X className="size-5" aria-hidden="true" />
            </button>
            {brand}
            {nav}
            <div className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
              <p className="truncate font-bold text-foreground">{user.name}</p>
              <p className="truncate">{user.roleLabel}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
