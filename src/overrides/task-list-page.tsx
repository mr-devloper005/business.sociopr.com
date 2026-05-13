import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { siteContent, taskPageMetadata } from '@/config/site.content'
import { CATEGORY_OPTIONS, normalizeCategory, isValidCategory } from '@/lib/categories'
import { ContentImage } from '@/components/shared/content-image'
import { buildPostUrl } from '@/lib/task-data'
import type { SitePost } from '@/lib/site-connector'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { Search } from 'lucide-react'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

function excerpt(text?: string | null, len = 180) {
  const value = (text || '').trim()
  if (!value) return 'Read the full release for tables, pull quotes, and company contact blocks.'
  return value.length > len ? value.slice(0, len - 1).trimEnd() + '…' : value
}

function getImage(post: SitePost) {
  const media = Array.isArray(post.media) ? post.media : []
  const m = media.find((i) => typeof i?.url === 'string' && i.url)?.url
  const content = post.content && typeof post.content === 'object' ? (post.content as { images?: string[]; logo?: string }) : null
  const fromImg = content?.images?.[0]
  return m || fromImg || '/placeholder.svg?height=600&width=900'
}

function filterPosts(posts: SitePost[], category?: string) {
  if (!category) {
    return posts.filter((p) => {
      const c = p.content && typeof p.content === 'object' ? (p.content as { category?: string }).category : ''
      return !c || isValidCategory(c)
    })
  }
  const nc = normalizeCategory(category)
  if (nc === 'all' || !nc) return posts
  return posts.filter((p) => {
    const raw = p.content && typeof p.content === 'object' ? (p.content as { category?: string }).category : ''
    return raw && normalizeCategory(raw) === nc
  })
}

function sortByDate(posts: SitePost[], order: 'new' | 'old') {
  const out = [...posts]
  out.sort((a, b) => {
    const ta = new Date(a.publishedAt || 0).getTime()
    const tb = new Date(b.publishedAt || 0).getTime()
    return order === 'old' ? ta - tb : tb - ta
  })
  return out
}

export async function TaskListPageOverride({
  task,
  category,
  sort = 'new',
}: {
  task: TaskKey
  category?: string
  sort?: 'new' | 'old'
}) {
  const raw = await fetchTaskPosts(task, 64, { fresh: false, allowMockFallback: true, revalidate: 120 })
  const filtered = sortByDate(filterPosts(raw, category), sort)
  const taskConfig = getTaskConfig(task)
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const listPath = taskConfig?.route || '/updates'

  return (
    <div className="min-h-screen bg-[#f6f2ea] text-[#10202e]">
      <NavbarShell />
      <SchemaJsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${taskConfig?.label || 'Press'} | ${SITE_CONFIG.name}`,
          url: `${baseUrl}${listPath}`,
          hasPart: filtered.slice(0, 12).map((post, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${baseUrl}${buildPostUrl(task, post.slug)}`,
            name: post.title,
          })),
        }}
      />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="border-b border-[#d4cdc0] pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6b4f3a]">Wire archive</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-[#102e50] sm:text-5xl">
            {taskConfig?.label || taskPageMetadata.mediaDistribution.title}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            {getTaskListDescription(task) || taskConfig?.description}
          </p>
        </header>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <form className="flex flex-wrap items-end gap-3" method="get" action={listPath}>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4a5568]">Category</label>
              <select
                name="category"
                defaultValue={category ? normalizeCategory(category) : ''}
                className="mt-1.5 h-11 min-w-[200px] rounded-lg border border-[#102e50]/15 bg-white px-3 text-sm text-[#102e50] shadow-sm"
              >
                <option value="">All categories</option>
                {CATEGORY_OPTIONS.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4a5568]">Sort by date</label>
              <select
                name="sort"
                defaultValue={sort === 'old' ? 'oldest' : 'newest'}
                className="mt-1.5 h-11 min-w-[160px] rounded-lg border border-[#102e50]/15 bg-white px-3 text-sm text-[#102e50] shadow-sm"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
            <button
              type="submit"
              className="h-11 rounded-lg bg-[#102e50] px-5 text-sm font-semibold text-[#f5c45e] transition hover:bg-[#153a5c]"
            >
              Apply
            </button>
          </form>
          <form className="flex w-full max-w-md gap-0" action="/search" method="get">
            <input type="hidden" name="master" value="1" />
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7c88]" />
              <input
                name="q"
                type="search"
                placeholder="Search titles, tickers, topics…"
                className="h-11 w-full rounded-l-lg border border-r-0 border-[#102e50]/15 bg-white pl-9 pr-3 text-sm text-[#102e50] placeholder:text-[#8a9ba8] focus:border-[#e78b48] focus:outline-none focus:ring-1 focus:ring-[#e78b48]"
              />
            </div>
            <button type="submit" className="h-11 rounded-r-lg bg-[#e78b48] px-4 text-sm font-semibold text-white hover:bg-[#c96d38]">
              Search
            </button>
          </form>
        </div>

        <ul className="mt-10 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => {
            const href = buildPostUrl(task, post.slug)
            return (
              <li key={post.id}>
                <Link
                  href={href}
                  className="press-card group flex h-full flex-col overflow-hidden p-0 no-underline [animation:factory-fade-in_0.45s_ease]"
                >
                  <div className="relative h-40 w-full">
                    <ContentImage src={getImage(post)} alt="" fill className="object-cover" />
                    <div className="absolute left-2 top-2 rounded-md bg-[#102e50]/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#f5c45e]">
                      {(post.content as { category?: string } | null)?.category || 'Release'}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-[11px] text-muted-foreground">
                      {post.authorName || 'Wire'}
                    </p>
                    <h2 className="mt-1 font-display text-lg font-semibold text-[#102e50] group-hover:text-[#b83220]">{post.title}</h2>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">{excerpt(post.summary)}</p>
                    <span className="mt-3 text-sm font-semibold text-[#e78b48]">View release</span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
        {filtered.length === 0 && (
          <p className="mt-6 rounded-2xl border border-dashed border-[#d4cdc0] bg-white/50 px-4 py-12 text-center text-muted-foreground">
            No stories match that filter.{' '}
            <Link className="font-medium text-[#102e50] hover:underline" href={listPath}>
              Clear filters
            </Link>
          </p>
        )}
      </main>
      <Footer />
    </div>
  )
}

function getTaskListDescription(task: TaskKey) {
  const m = taskPageMetadata[task as keyof typeof taskPageMetadata]
  if (m && 'description' in m) return m.description
  return siteContent.taskSectionDescriptionSuffix
}
