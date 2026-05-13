'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { Button } from '@/components/ui/button'

export const NAVBAR_OVERRIDE_ENABLED = true

const STATIC_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
] as const

export function NavbarOverride() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const primaryTask = SITE_CONFIG.tasks.find((t) => t.key === 'mediaDistribution' && t.enabled) || SITE_CONFIG.tasks.find((t) => t.enabled)
  const secondary = STATIC_LINKS.filter((l) => l.label !== 'Home').slice(0, 1)[0] ?? { href: '/contact', label: 'Contact' }

  const navItems = [
    { label: 'Home', href: '/' },
    primaryTask ? { label: primaryTask.label, href: primaryTask.route } : null,
    { label: 'About', href: '/about' },
  ].filter(Boolean) as { label: string; href: string }[]

  return (
    <header className="sticky top-0 z-50 border-b border-[#102e50]/10 bg-[#f8f4ed]/92 text-[#102e50] shadow-[0_1px_0_rgba(16,46,80,0.06)] backdrop-blur-md">
      <div className="border-b border-[#102e50]/5 bg-[#102e50] py-1.5 text-center text-[11px] font-medium text-[#f5c45e] sm:text-xs">
        <span className="inline-block [animation:factory-fade-in_0.4s_ease]">{siteContent.navbar.tagline}</span>
      </div>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-[#102e50]/15 bg-white shadow-sm sm:h-11 sm:w-11">
              <img src="/favicon.png?v=20260401" alt="" width="44" height="44" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0 text-left">
              <span className="block font-display text-lg font-semibold leading-tight tracking-tight text-[#102e50] sm:text-xl">{SITE_CONFIG.name}</span>
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-[#4a5f72] sm:block">bestpressnews.com</span>
            </div>
          </Link>
        </div>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                  active
                    ? 'bg-[#102e50] text-[#f8f4ed] shadow-sm'
                    : 'text-[#1c3a52] hover:bg-white/60 hover:text-[#102e50]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/search"
            className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#102e50]/15 bg-white/80 text-[#102e50] shadow-sm transition hover:border-[#e78b48]/40"
            aria-label="Search the wire"
          >
            <Search className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 lg:flex">
            {primaryTask ? (
              <Button size="sm" className="rounded-lg border-0 bg-[#f5c45e] text-[#102e50] shadow-sm hover:bg-[#ffd87a] md:h-9" asChild>
                <Link href={primaryTask.route}>
                  {primaryTask.label}
                </Link>
              </Button>
            ) : null}
            <Button size="sm" variant="outline" className="rounded-lg border-[#102e50]/20 bg-white/60 text-[#102e50] md:h-9" asChild>
              <Link href={secondary?.href || '/contact'}>Request demo</Link>
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="h-10 w-10 md:hidden" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[#102e50]/10 bg-[#faf7f0] px-4 py-4 md:hidden">
          <div className="mb-3 flex flex-wrap gap-2">
            {navItems.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
              return (
                <Link
                  key={`m-${item.label}`}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`inline-flex w-full max-w-full justify-center rounded-lg px-4 py-2.5 text-sm font-semibold ${
                    active ? 'bg-[#102e50] text-white' : 'bg-white/90 text-[#102e50]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link href="/search" onClick={() => setOpen(false)} className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#102e50]/25 bg-white/90 px-4 py-2.5 text-sm font-medium text-[#102e50]">
              <Search className="h-4 w-4" />
              Search
            </Link>
          </div>
          {primaryTask ? (
            <Button asChild className="w-full rounded-lg bg-[#f5c45e] text-[#102e50] hover:bg-[#ffd87a]">
              <Link href={primaryTask.route} onClick={() => setOpen(false)}>{primaryTask.label}</Link>
            </Button>
          ) : null}
        </div>
      )}

    </header>
  )
}
