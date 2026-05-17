import Link from 'next/link'
import { Newspaper } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { siteContent } from '@/config/site.content'

export const FOOTER_OVERRIDE_ENABLED = true


const getCategoryLabel = (value: string) => {
  const normalized = normalizeCategory(value)
  return CATEGORY_OPTIONS.find((item) => item.slug === normalized)?.name || value
}


const column = (title: string, items: { label: string; href: string }[]) => (
  <div>
    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F9E4D4]/70">{title}</h3>
    <ul className="mt-4 space-y-2.5 text-sm text-[#F9E4D4]/80">
      {items.map((item) => (
        <li key={item.href + item.label}>
          <Link href={item.href} className="transition hover:text-[#D67D3E]">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export async function FooterOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 200, { allowMockFallback: false })
  const categories = Array.from(
    new Map(
      posts
        .map((post) => {
          const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
          const raw = typeof content.category === 'string' ? content.category.trim() : ''
          if (!raw) return null
          const slug = normalizeCategory(raw)
          return { slug, name: getCategoryLabel(raw) }
        })
        .filter((item): item is { slug: string; name: string } => Boolean(item))
        .map((item) => [item.slug, item])
    ).values()
  ).slice(0, 8)

  const primary = SITE_CONFIG.tasks.find((t) => t.enabled)
  return (
    <footer className="border-t border-[#9C0F48]/20 bg-[#1a0a10] text-[#F9E4D4]/80">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#9C0F48] via-[#D67D3E] to-[#9C0F48]" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr]">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#9C0F48]">
                <Newspaper className="h-5 w-5 text-[#F9E4D4]" />
              </div>
              <div>
                <p className="font-display text-xl font-semibold text-[#F9E4D4]">{SITE_CONFIG.name}</p>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#D67D3E]">
                  Media Press Wire
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#F9E4D4]/60">
              {siteContent.footer.tagline}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-7 text-[#F9E4D4]/50">{SITE_CONFIG.description}</p>

            {primary ? (
              <Link
                href={primary.route}
                className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[#D67D3E]/30 bg-[#D67D3E]/10 px-4 py-2.5 text-sm font-semibold text-[#D67D3E] transition hover:border-[#D67D3E]/60 hover:bg-[#D67D3E]/20"
              >
                {primary.label}
                <span aria-hidden>→</span>
              </Link>
            ) : null}
          </div>

          {column('Press Wire', [
            { label: 'Latest Releases', href: '/public-relation' },
            { label: 'Submit a Release', href: '/create/mediaDistribution' },
            { label: 'Search Archive', href: '/search' },
            { label: 'Categories', href: '/public-relation' },
          ])}

          {column('Company', [
            { label: 'About Us', href: '/about' },
            { label: 'Contact', href: '/contact' },
            { label: 'Help Center', href: '/help' },
          ])}

          {column('Legal', [
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
            { label: 'Cookie Policy', href: '/cookies' },
          ])}
        </div>

        {/* Bottom bar */}

        {categories.length ? (
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">Categories</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/updates?category=${category.slug}`}
                  className="opacity-80 underline-offset-4 transition hover:opacity-100 hover:underline"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 sm:flex-row">
          <p className="text-xs text-[#F9E4D4]/35">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9C0F48]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#D67D3E]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#F9E4D4]/40" />
          </div>
          <p className="text-xs text-[#F9E4D4]/35">{SITE_CONFIG.domain}</p>
        </div>
      </div>
    </footer>
  )
}
