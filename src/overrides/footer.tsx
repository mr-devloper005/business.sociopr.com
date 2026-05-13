import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'

export const FOOTER_OVERRIDE_ENABLED = true

const column = (title: string, items: { label: string; href: string }[]) => (
  <div>
    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a9ba8]">{title}</h3>
    <ul className="mt-4 space-y-2.5 text-sm text-[#ccd7e0]">
      {items.map((item) => (
        <li key={item.href + item.label}>
          <Link href={item.href} className="transition hover:text-[#f5c45e]">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export function FooterOverride() {
  const primary = SITE_CONFIG.tasks.find((t) => t.enabled)
  return (
    <footer className="border-t border-[#102e50]/20 bg-[#0d2438] text-[#b8c9d4]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <p className="font-display text-xl font-semibold text-white">{SITE_CONFIG.name}</p>
            <p className="mt-1 text-sm text-[#8a9ba8]">{siteContent.footer.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#9dadb8]">{SITE_CONFIG.description}</p>
            {primary ? (
              <Link
                href={primary.route}
                className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-[#f5c45e] transition hover:border-[#f5c45e]/40 hover:bg-white/10"
              >
                {primary.label}
                <span aria-hidden>→</span>
              </Link>
            ) : null}
          </div>
          {column('Product', [
            { label: 'Release media', href: '/updates' },
            { label: 'Search', href: '/search' },
            { label: 'Create a release', href: '/create/mediaDistribution' },
          ])}
          {column('Company', [
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
            { label: 'Help', href: '/help' },
          ])}
          {column('Legal', [
            { label: 'Privacy', href: '/privacy' },
            { label: 'Terms', href: '/terms' },
            { label: 'Cookies', href: '/cookies' },
          ])}
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-[#6b7c88] sm:text-left">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved. · bestpressnews.com
        </div>
      </div>
    </footer>
  )
}
