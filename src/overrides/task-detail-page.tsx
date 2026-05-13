import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Facebook, Linkedin, Link2, Twitter } from 'lucide-react'
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
  const content = post.content && typeof post.content === 'object' ? (post.content as { images?: string[]; logo?: string }) : null
  return m || content?.images?.[0] || content?.logo || null
}

function getSubtitle(post: SitePost) {
  if (post.summary && post.summary.length < 200) return post.summary
  const c = post.content && typeof post.content === 'object' ? (post.content as { subtitle?: string; excerpt?: string }) : null
  return c?.subtitle || c?.excerpt || ''
}

function shareUrl(path: string) {
  return `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${path}`
}

export async function TaskDetailPageOverride({ task, slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 10, { fresh: false, allowMockFallback: true, revalidate: 120 })).filter((p) => p.slug !== slug).slice(0, 4)
  const content = (post.content || {}) as Record<string, unknown>
  const html = formatRichHtml((content.body as string) || post.summary || '', 'Full text is available in the original filing.')
  const href = buildPostUrl(task, post.slug)
  const fullUrl = shareUrl(href)
  const title = encodeURIComponent(post.title)
  const hero = getHeroImage(post)
  const sub = getSubtitle(post)
  const listRoute = getTaskConfig(task)?.route || '/updates'

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
    <div className="min-h-screen bg-[#f6f2ea] text-[#10202e]">
      <NavbarShell />
      <SchemaJsonLd data={articleSchema} />
      <article>
        <header className="border-b border-[#d4cdc0] bg-gradient-to-b from-white to-[#f6f2ea]">
          <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
            <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link className="font-medium text-[#102e50] hover:underline" href="/">
                    Home
                  </Link>
                </li>
                <li aria-hidden>·</li>
                <li>
                  <Link className="font-medium text-[#102e50] hover:underline" href={listRoute}>
                    {task === 'mediaDistribution' ? 'Release media' : 'Archive'}
                  </Link>
                </li>
                <li aria-hidden>·</li>
                <li className="line-clamp-1 text-[#4a5568]">{post.title}</li>
              </ol>
            </nav>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#b83220]">
              {(content.category as string) || 'Release media'}
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-[#102e50] sm:text-4xl lg:text-[2.6rem]">{post.title}</h1>
            {sub ? <p className="mt-4 text-lg leading-relaxed text-[#4a5568] sm:text-xl">{sub}</p> : null}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>By {post.authorName || 'Editorial desk'}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${title}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#102e50]/15 bg-white px-3 text-sm font-medium text-[#102e50] shadow-sm transition hover:border-[#e78b48]/50"
              >
                <Twitter className="h-3.5 w-3.5" aria-hidden />
                X / Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#102e50]/15 bg-white px-3 text-sm font-medium text-[#102e50] shadow-sm transition hover:border-[#e78b48]/50"
              >
                <Linkedin className="h-3.5 w-3.5" aria-hidden />
                LinkedIn
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#102e50]/15 bg-white px-3 text-sm font-medium text-[#102e50] shadow-sm transition hover:border-[#e78b48]/50"
              >
                <Facebook className="h-3.5 w-3.5" aria-hidden />
                Facebook
              </a>
              <span className="inline-flex h-9 max-w-full items-center gap-1.5 overflow-x-auto rounded-lg border border-dashed border-[#102e50]/25 bg-white/60 px-2 py-0 text-left text-xs text-[#4a5568]">
                <Link2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="min-w-0 break-all" title="Copy this URL from the address bar">
                  {fullUrl}
                </span>
              </span>
            </div>
            <p className="mt-2 text-xs text-[#6b7c88]">Share tools open in a new window.</p>
          </div>
        </header>

        {hero ? (
          <div className="relative mx-auto w-full max-w-5xl px-0 sm:px-6">
            <div className="relative aspect-[21/9] w-full sm:rounded-b-2xl sm:shadow-lg">
              <ContentImage src={hero} alt="" fill className="object-cover sm:rounded-b-2xl" priority />
            </div>
          </div>
        ) : null}

        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:flex-row lg:items-start lg:px-8">
          <div className="min-w-0 flex-1 [animation:factory-fade-in_0.5s_ease]">
            <div className="article-content max-w-none rounded-2xl border border-[#d4cdc0]/80 bg-white/80 px-4 py-6 text-base leading-relaxed text-[#2d3a45] shadow-sm sm:px-8 sm:py-10 sm:text-lg">
              <RichContent html={html} />
            </div>
            {related.length > 0 ? (
              <section className="mt-12 border-t border-[#d4cdc0] pt-10" aria-label="Related releases">
                <h2 className="font-display text-2xl font-semibold text-[#102e50]">Related articles</h2>
                <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2">
                  {related.map((r) => (
                    <li key={r.id}>
                      <Link href={buildPostUrl(task, r.slug)} className="press-card group block p-4 no-underline transition">
                        <p className="mt-1 font-medium text-[#102e50] group-hover:underline">{r.title}</p>
                        {r.summary ? <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.summary}</p> : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          <aside className="w-full shrink-0 space-y-4 lg:sticky lg:top-28 lg:max-w-[300px]">
            <form className="press-card p-0" action="/search" method="get">
              <input type="hidden" name="master" value="1" />
              <div className="p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#4a5568]">Search the wire</p>
                <div className="mt-2 flex">
                  <input
                    name="q"
                    type="search"
                    className="h-10 w-full min-w-0 flex-1 rounded-l-md border border-[#d4cdc0] bg-white px-3 text-sm"
                    placeholder="Search…"
                    aria-label="Search releases"
                  />
                  <button type="submit" className="h-10 shrink-0 rounded-r-md bg-[#102e50] px-3 text-sm font-medium text-[#f5c45e]">
                    Go
                  </button>
                </div>
              </div>
            </form>
            <div className="press-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#4a5568]">In this story</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Datelines, contact blocks, and tables in the body above reflect the information submitted with the original distribution.</p>
            </div>
            <Link
              href="/contact"
              className="press-card block border-[#e78b48]/40 bg-gradient-to-br from-white to-[#f5c45e]/20 p-4 no-underline"
            >
              <p className="text-sm font-semibold text-[#102e50]">Need a correction?</p>
              <p className="mt-1 text-xs text-muted-foreground">Reach the distribution desk for follow-ups or re-filings.</p>
            </Link>
          </aside>
        </div>
      </article>
      <Footer />
    </div>
  )
}
