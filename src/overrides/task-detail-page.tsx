import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Facebook, Linkedin, Link2, Twitter, ArrowLeft, BookOpen } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPostBySlug, fetchTaskPosts, buildPostUrl } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG, getTaskConfig } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'
import { ContentImage } from '@/components/shared/content-image'
import type { SitePost } from '@/lib/site-connector'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

function getHeroImage(post: SitePost) {
  const media = Array.isArray(post.media) ? post.media : []
  const m = media.find((i) => typeof i?.url === 'string' && i.url)?.url
  const content =
    post.content && typeof post.content === 'object'
      ? (post.content as { images?: string[]; logo?: string })
      : null
  return m || content?.images?.[0] || content?.logo || null
}

function getSubtitle(post: SitePost) {
  if (post.summary && post.summary.length < 200) return post.summary
  const c =
    post.content && typeof post.content === 'object'
      ? (post.content as { subtitle?: string; excerpt?: string })
      : null
  return c?.subtitle || c?.excerpt || ''
}

function shareUrl(path: string) {
  return `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${path}`
}

export async function TaskDetailPageOverride({ task, slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()

  const related = (
    await fetchTaskPosts(task, 10, { fresh: false, allowMockFallback: true, revalidate: 120 })
  )
    .filter((p) => p.slug !== slug)
    .slice(0, 4)

  const content = (post.content || {}) as Record<string, unknown>
  const html = formatRichHtml(
    (content.body as string) || post.summary || '',
    'Full text is available in the original filing.',
  )
  const href = buildPostUrl(task, post.slug)
  const fullUrl = shareUrl(href)
  const title = encodeURIComponent(post.title)
  const hero = getHeroImage(post)
  const sub = getSubtitle(post)
  const listRoute = getTaskConfig(task)?.route || '/public-relation'

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.authorName || SITE_CONFIG.name },
    publisher: { '@type': 'Organization', name: SITE_CONFIG.name },
    mainEntityOfPage: fullUrl,
  }

  return (
    <div className="min-h-screen bg-[#fdf6f0] text-[#1a0a10]">
      <NavbarShell />
      <SchemaJsonLd data={articleSchema} />

      <article>
        {/* ── HEADER ── */}
        <header className="border-b border-[#e8c8b0] bg-white/80">
          <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link className="font-medium text-[#9C0F48] hover:underline" href="/">
                    Home
                  </Link>
                </li>
                <li aria-hidden className="text-[#e8c8b0]">·</li>
                <li>
                  <Link className="font-medium text-[#9C0F48] hover:underline" href={listRoute}>
                    {task === 'mediaDistribution' ? 'Release media' : 'Archive'}
                  </Link>
                </li>
                <li aria-hidden className="text-[#e8c8b0]">·</li>
                <li className="line-clamp-1 text-[#6b3a2a]">{post.title}</li>
              </ol>
            </nav>

            {/* Category badge */}
            <div className="mt-6 flex items-center gap-3">
              <span className="rounded-full bg-[#9C0F48] px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F9E4D4]">
                {(content.category as string) || 'Press Release'}
              </span>
              {post.publishedAt ? (
                <span className="text-xs text-[#6b3a2a]/70">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              ) : null}
            </div>

            {/* Title */}
            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-[#1a0a10] sm:text-4xl lg:text-[2.6rem]">
              {post.title}
            </h1>

            {/* Subtitle / summary */}
            {sub ? (
              <p className="mt-4 border-l-4 border-[#D67D3E] pl-4 text-base leading-relaxed text-[#3a1020] sm:text-lg">
                {sub}
              </p>
            ) : null}

            {/* Byline */}
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#6b3a2a]">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-6 w-6 rounded-full bg-[#9C0F48]/10 flex items-center justify-center">
                  <BookOpen className="h-3 w-3 text-[#9C0F48]" />
                </span>
                By <strong className="text-[#1a0a10]">{post.authorName || 'Editorial desk'}</strong>
              </span>
            </div>

            {/* Share bar */}
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${title}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#9C0F48]/15 bg-white px-3 text-sm font-medium text-[#1a0a10] shadow-sm transition hover:border-[#9C0F48]/40 hover:bg-[#F9E4D4]/50"
              >
                <Twitter className="h-3.5 w-3.5 text-[#9C0F48]" aria-hidden />
                X / Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#9C0F48]/15 bg-white px-3 text-sm font-medium text-[#1a0a10] shadow-sm transition hover:border-[#9C0F48]/40 hover:bg-[#F9E4D4]/50"
              >
                <Linkedin className="h-3.5 w-3.5 text-[#9C0F48]" aria-hidden />
                LinkedIn
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#9C0F48]/15 bg-white px-3 text-sm font-medium text-[#1a0a10] shadow-sm transition hover:border-[#9C0F48]/40 hover:bg-[#F9E4D4]/50"
              >
                <Facebook className="h-3.5 w-3.5 text-[#9C0F48]" aria-hidden />
                Facebook
              </a>
              <span className="inline-flex h-9 max-w-full items-center gap-1.5 overflow-x-auto rounded-lg border border-dashed border-[#9C0F48]/20 bg-[#F9E4D4]/30 px-2 py-0 text-left text-xs text-[#6b3a2a]">
                <Link2 className="h-3.5 w-3.5 shrink-0 text-[#D67D3E]" aria-hidden />
                <span className="min-w-0 break-all" title="Copy this URL from the address bar">
                  {fullUrl}
                </span>
              </span>
            </div>
            <p className="mt-2 text-xs text-[#9C0F48]/50">Share tools open in a new window.</p>
          </div>
        </header>

        {/* ── HERO IMAGE ── */}
        {hero ? (
          <div className="relative mx-auto w-full max-w-5xl px-0 sm:px-6">
            <div className="relative aspect-[21/9] w-full overflow-hidden sm:rounded-b-2xl sm:shadow-lg">
              <ContentImage
                src={hero}
                alt=""
                fill
                className="object-cover sm:rounded-b-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a10]/30 to-transparent" />
            </div>
          </div>
        ) : null}

        {/* ── BODY + SIDEBAR ── */}
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:flex-row lg:items-start lg:px-8">

          {/* Article body */}
          <div className="min-w-0 flex-1 [animation:factory-fade-in_0.5s_ease]">
            <div className="article-content max-w-none rounded-2xl border border-[#e8c8b0] bg-white px-4 py-6 text-base leading-relaxed text-[#2d1a10] shadow-sm sm:px-8 sm:py-10 sm:text-lg">
              <RichContent html={html} />
            </div>

            {/* Back link */}
            <div className="mt-8">
              <Link
                href={listRoute}
                className="inline-flex items-center gap-2 rounded-lg border border-[#9C0F48]/15 bg-white px-4 py-2.5 text-sm font-medium text-[#9C0F48] transition hover:bg-[#F9E4D4]/50"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to {task === 'mediaDistribution' ? 'Release media' : 'Archive'}
              </Link>
            </div>

            {/* Related releases */}
            {related.length > 0 ? (
              <section
                className="mt-12 border-t border-[#e8c8b0] pt-10"
                aria-label="Related releases"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9C0F48]">
                  More releases
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-[#1a0a10]">
                  Related articles
                </h2>
                <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2">
                  {related.map((r) => (
                    <li key={r.id}>
                      <Link
                        href={buildPostUrl(task, r.slug)}
                        className="press-card group block p-5 no-underline transition"
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9C0F48]">
                          {((r.content as { category?: string } | null)?.category) || 'Press Release'}
                        </p>
                        <p className="mt-1.5 font-display font-semibold leading-snug text-[#1a0a10] group-hover:text-[#9C0F48]">
                          {r.title}
                        </p>
                        {r.summary ? (
                          <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                            {r.summary}
                          </p>
                        ) : null}
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#D67D3E]">
                          Read release →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          {/* Sidebar */}
          <aside className="w-full shrink-0 space-y-4 lg:sticky lg:top-28 lg:max-w-[300px]">

            {/* Search */}
            <form className="press-card p-0 overflow-hidden" action="/search" method="get">
              <input type="hidden" name="master" value="1" />
              <div className="border-b border-[#e8c8b0] bg-[#F9E4D4]/30 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#9C0F48]">
                  Search the wire
                </p>
              </div>
              <div className="p-3">
                <div className="flex">
                  <input
                    name="q"
                    type="search"
                    className="h-10 w-full min-w-0 flex-1 rounded-l-lg border border-[#e8c8b0] bg-white px-3 text-sm text-[#1a0a10] placeholder:text-[#9C0F48]/30 focus:border-[#9C0F48] focus:outline-none"
                    placeholder="Search releases…"
                    aria-label="Search releases"
                  />
                  <button
                    type="submit"
                    className="h-10 shrink-0 rounded-r-lg bg-[#9C0F48] px-3 text-sm font-semibold text-[#F9E4D4] transition hover:bg-[#7a0c38]"
                  >
                    Go
                  </button>
                </div>
              </div>
            </form>

            {/* About this story */}
            <div className="press-card overflow-hidden p-0">
              <div className="border-b border-[#e8c8b0] bg-[#F9E4D4]/30 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#9C0F48]">
                  In this story
                </p>
              </div>
              <div className="p-4">
                <p className="text-sm leading-6 text-muted-foreground">
                  Datelines, contact blocks, and tables in the body above reflect the information
                  submitted with the original distribution.
                </p>
              </div>
            </div>

            {/* CTA card */}
            <Link
              href="/contact"
              className="press-card block overflow-hidden p-0 no-underline"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-[#9C0F48] to-[#D67D3E]" />
              <div className="p-4">
                <p className="font-display font-semibold text-[#9C0F48]">Need a correction?</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Reach the distribution desk for follow-ups or re-filings.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#D67D3E]">
                  Contact the desk →
                </span>
              </div>
            </Link>

            {/* Submit CTA */}
            <Link
              href="/create/mediaDistribution"
              className="block rounded-xl bg-[#9C0F48] p-4 no-underline transition hover:bg-[#7a0c38]"
            >
              <p className="font-display font-semibold text-[#F9E4D4]">Submit a release</p>
              <p className="mt-1 text-xs leading-5 text-[#F9E4D4]/70">
                Distribute your next announcement through the wire.
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#D67D3E]">
                Get started →
              </span>
            </Link>
          </aside>
        </div>
      </article>

      <Footer />
    </div>
  )
}
