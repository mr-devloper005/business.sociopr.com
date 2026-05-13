import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  BarChart3,
  Camera,
  Globe2,
  LineChart,
  Megaphone,
  Newspaper,
  Play,
  Radio,
  Rss,
  Search,
  Share2,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import type { SitePost } from '@/lib/site-connector'
import { CATEGORY_OPTIONS } from '@/lib/categories'

const HERO_VISUAL = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=900&fit=crop&q=80'
const SOLUTION_IMAGES = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=560&fit=crop&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=560&fit=crop&q=80',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=560&fit=crop&q=80',
]
const RESOURCE_IMAGES = {
  journalists: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop&q=80',
  communicators: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop&q=80',
}

const FEATURES = [
  { icon: Globe2, title: 'Global distribution', text: 'Route stories to the regions, languages, and verticals that match your news.', href: '/updates' },
  { icon: BarChart3, title: 'Measurement you can use', text: 'See reach, referrers, and engagement without wrestling with a dozen tools.', href: '/pricing' },
  { icon: Target, title: 'Audience alignment', text: 'Match releases to the beats, sectors, and outlets that care about the topic.', href: '/updates' },
  { icon: Share2, title: 'Social-ready assets', text: 'Ship consistent headlines, images, and quotes for every platform.', href: '/updates' },
  { icon: Radio, title: 'Media desk access', text: 'Give journalists a reliable feed for embargoes, advisories, and follow-ups.', href: '/contact' },
  { icon: LineChart, title: 'Benchmarking', text: 'Compare announcement performance over time to sharpen the next campaign.', href: '/pricing' },
] as const

const SOLUTIONS = [
  {
    title: 'Multichannel wire',
    text: 'Publish once, deliver across on-site wire pages, email digests, and partner syndication endpoints.',
  },
  {
    title: 'Comms & IR bundles',
    text: 'Tie earnings, product launches, and executive moves into a single, calm publishing workflow.',
  },
  {
    title: 'Crisis-ready cadence',
    text: 'When minutes matter, ship clarifications, corrections, and statements with a consistent layout.',
  },
] as const

const TRENDING_CLUSTERS = [
  { label: 'Sustainability & ESG', slug: 'news', kicker: 'Environment' },
  { label: 'Earnings & capital markets', slug: 'finance', kicker: 'Markets' },
  { label: 'Innovation & product', slug: 'technology', kicker: 'Product' },
] as const

const BROWSE_LINKS: { label: string; slug: string }[] = [
  { label: 'Automotive', slug: 'automotive' },
  { label: 'Energy & utilities', slug: 'electric' },
  { label: 'Finance', slug: 'finance' },
  { label: 'Health', slug: 'health' },
  { label: 'Industrials', slug: 'industry-manufacturing' },
  { label: 'Policy & public sector', slug: 'law-legal' },
  { label: 'Retail & consumer', slug: 'shopping' },
  { label: 'Travel & transport', slug: 'shipping-transportation' },
]

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage =
    typeof post?.content === 'object' && post?.content && Array.isArray((post.content as { images?: string[] }).images)
      ? (post.content as { images?: string[] }).images?.find((url) => typeof url === 'string' && url)
      : null
  const logo =
    typeof post?.content === 'object' && post?.content && typeof (post.content as { logo?: string }).logo === 'string'
      ? (post.content as { logo?: string }).logo
      : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

function getCategory(post: SitePost) {
  const c = post.content && typeof post.content === 'object' ? (post.content as { category?: string }).category : ''
  if (typeof c === 'string' && c.trim()) return c.trim()
  const t = post.tags?.find((x) => typeof x === 'string')
  return typeof t === 'string' ? t : 'Release media'
}

type Props = { posts: SitePost[] }

export function BestpressHomepage({ posts }: Props) {
  const lead = posts[0]
  const sideStories = posts.slice(1, 5)
  const forTrending = posts.length ? posts : []
  const primaryTask = SITE_CONFIG.tasks.find((t) => t.key === 'mediaDistribution') ?? SITE_CONFIG.tasks[0]

  return (
    <main className="overflow-x-hidden text-[#10202e]">
      {/* Hero */}
      <section className="press-hero-mesh text-[#f8f4ed]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-22">
          <div className="min-w-0 [animation:factory-fade-in_0.5s_ease]">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f5c45e]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              {siteContent.hero.badge}
            </p>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[2.75rem]">
              Unmatched visibility. Powerful results.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/85 sm:text-lg">
              Reach decision-makers, journalists, and industry analysts with a wire built for business announcements, investor updates, and
              public-interest stories—backed by measurement, not guesswork.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={siteContent.hero.primaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f5c45e] px-6 py-3.5 text-sm font-semibold text-[#102e50] shadow-lg shadow-black/20 transition hover:bg-[#ffd87a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5c45e]"
              >
                {siteContent.hero.primaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href={siteContent.hero.secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/12"
              >
                {siteContent.hero.secondaryCta.label}
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/60">
              Prefer to browse first? <Link className="font-medium text-[#f5c45e] underline-offset-2 hover:underline" href={primaryTask?.route || '/updates'}>Open the {primaryTask?.label} archive</Link>
            </p>
          </div>
          <div className="relative min-h-[280px] w-full [animation:factory-fade-in_0.6s_ease] lg:min-h-[360px]">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-3xl border border-white/10 bg-gradient-to-br from-[#e78b48]/40 to-transparent blur-0" aria-hidden />
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/30 lg:min-h-[360px]">
              <Image src={HERO_VISUAL} alt="Newsroom monitoring screens and press workflow" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f35]/80 via-[#0a1f35]/20 to-transparent" />
              <button
                type="button"
                className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
                aria-label="Play product overview (visual placeholder)"
              >
                <Play className="h-6 w-6" fill="currentColor" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-[#0a1f35]/60 px-4 py-2 text-xs text-white/80 backdrop-blur">
                <span className="flex items-center gap-1.5">
                  <Camera className="h-3.5 w-3.5" aria-hidden /> Professional release media for every announcement
                </span>
                <span className="hidden sm:inline">HD · 16:9</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What sets us apart */}
      <section className="border-b border-[#d4cdc0]/80 bg-[#faf7f0] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6b4f3a]">What sets us apart</p>
            <h2 className="press-section-title mt-3">Everything you need to go from draft to distribution</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">Fewer handoffs, better targeting, and reporting your leadership team can read in minutes.</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="press-card group flex h-full flex-col p-6">
                <f.icon className="h-8 w-8 text-[#e78b48]" aria-hidden />
                <h3 className="mt-4 font-display text-lg font-semibold text-[#102e50]">{f.title}</h3>
                <p className="mt-2 grow text-sm leading-7 text-muted-foreground">{f.text}</p>
                <Link href={f.href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#102e50] group-hover:gap-2">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured solutions */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="press-section-title">Featured solutions</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">Modular building blocks for corporate newsrooms, agencies, and investor relations teams.</p>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {SOLUTIONS.map((s, i) => (
              <article key={s.title} className="press-card flex flex-col overflow-hidden p-0">
                <div className="relative h-48 w-full">
                  <Image src={SOLUTION_IMAGES[i] ?? SOLUTION_IMAGES[0]} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-[#102e50]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured stories + categories */}
      <section className="border-y border-[#d4cdc0]/80 bg-white/70 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="press-section-title">Featured stories</h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            {lead ? (
              <Link href={`/updates/${lead.slug}`} className="press-card group block overflow-hidden p-0 no-underline">
                <div className="relative h-56 w-full sm:h-64">
                  <ContentImage src={getPostImage(lead)} alt="" fill className="object-cover" />
                  <div className="absolute left-3 top-3 rounded-full bg-[#102e50] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#f5c45e]">
                    {getCategory(lead)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mt-2 font-display text-2xl font-semibold text-[#102e50] group-hover:text-[#b83220]">{lead.title}</h3>
                  {lead.summary ? <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">{lead.summary}</p> : null}
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#102e50]">Read the release</span>
                </div>
              </Link>
            ) : (
              <div className="press-card p-8 text-sm text-muted-foreground">
                <p>Once your first post is live, the lead block highlights your top story. Meanwhile, you can </p>
                <Link className="font-medium text-[#102e50] underline" href="/contact">talk to the desk</Link> about a launch.
              </div>
            )}

            <div className="space-y-4">
              {sideStories.length
                ? sideStories.map((post) => (
                    <Link key={post.id} href={`/updates/${post.slug}`} className="press-card group flex gap-4 p-4 no-underline">
                      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg">
                        <ContentImage src={getPostImage(post)} alt="" fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#be3d2a]">{getCategory(post)}</p>
                        <p className="mt-0.5 line-clamp-2 font-medium leading-snug text-[#102e50] group-hover:underline">{post.title}</p>
                      </div>
                    </Link>
                  ))
                : (
                    <div className="press-card p-4 text-sm text-muted-foreground">
                      Wire stories will list here in compact cards when the archive contains more than one post.
                    </div>
                  )}
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="press-section-title">Resources</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Two lanes—one for the newsroom, one for the people who brief them.</p>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="press-card overflow-hidden p-0">
              <div className="relative h-44">
                <Image src={RESOURCE_IMAGES.journalists} alt="Journalist researching at a desk" fill className="object-cover" />
              </div>
              <div className="space-y-4 p-6">
                <h3 className="font-display text-xl font-semibold text-[#102e50]">Resources for journalists</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>
                    <Link className="flex items-start gap-2 font-medium text-[#102e50] hover:underline" href="/updates?category=news">
                      <Newspaper className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      Top distribution lists by beat and region
                    </Link>
                  </li>
                  <li>
                    <Link className="flex items-start gap-2 font-medium text-[#102e50] hover:underline" href="/search?q=advisory">
                      <Search className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      How to read advisories, corrections, and updates
                    </Link>
                  </li>
                  <li>
                    <Link className="flex items-start gap-2 font-medium text-[#102e50] hover:underline" href="/contact?topic=editorial">
                      <Rss className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      Editorial & sourcing requests
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="press-card overflow-hidden p-0">
              <div className="relative h-44">
                <Image src={RESOURCE_IMAGES.communicators} alt="Team collaborating on a communications plan" fill className="object-cover" />
              </div>
              <div className="space-y-4 p-6">
                <h3 className="font-display text-xl font-semibold text-[#102e50]">Resources for communicators</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>
                    <Link className="flex items-start gap-2 font-medium text-[#102e50] hover:underline" href="/create/mediaDistribution">
                      <Megaphone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      How to file a new wire release
                    </Link>
                  </li>
                  <li>
                    <Link className="flex items-start gap-2 font-medium text-[#102e50] hover:underline" href="/pricing">
                      <LineChart className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      Plan comparison by distribution depth
                    </Link>
                  </li>
                  <li>
                    <Link className="flex items-start gap-2 font-medium text-[#102e50] hover:underline" href="/contact?topic=training">
                      <Users className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      Training, SLAs, and comms playbooks
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending + sidebar browse */}
      <section className="border-t border-[#d4cdc0]/60 bg-[#f3ece0]/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:items-start">
            <div>
              <h2 className="press-section-title">Trending right now</h2>
              <p className="mt-2 text-sm text-muted-foreground">A snapshot of topics readers and desks are opening most—powered by your live archive.</p>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {TRENDING_CLUSTERS.map((cluster, i) => {
                  const clusterPosts = forTrending.slice(i * 2, i * 2 + 3)
                  return (
                    <div key={cluster.label} className="press-card p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b83220]">{cluster.kicker}</p>
                      <h3 className="mt-1 font-display text-base font-semibold text-[#102e50]">{cluster.label}</h3>
                      <ul className="mt-3 space-y-2 border-t border-border/60 pt-3 text-sm">
                        {clusterPosts.length ? (
                          clusterPosts.map((p) => (
                            <li key={p.id}>
                              <Link href={`/updates/${p.slug}`} className="line-clamp-2 text-[#102e50] hover:text-[#be3d2a] hover:underline">
                                {p.title}
                              </Link>
                            </li>
                          ))
                        ) : (
                          <>
                            <li>
                              <Link className="text-[#102e50] hover:underline" href={`/updates?category=${cluster.slug}`}>
                                Open {cluster.label} archive
                              </Link>
                            </li>
                            <li className="text-muted-foreground">More headlines appear as your feed populates.</li>
                          </>
                        )}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>
            <aside className="press-card p-6 [animation:factory-fade-in_0.5s_ease]">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#102e50]">Browse news by category</h3>
              <p className="mt-1 text-xs text-muted-foreground">Short paths into the most-requested industry lanes—aligned with the categories your CMS already supports.</p>
              <ul className="mt-5 space-y-1 border-t border-border/60 pt-4 text-sm">
                {BROWSE_LINKS.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/updates?category=${c.slug}`} className="flex items-center justify-between py-1.5 text-[#102e50] hover:text-[#e78b48]">
                      <span>{c.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-50" aria-hidden />
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Link href="/updates" className="text-xs font-semibold text-[#be3d2a] hover:underline">
                    All categories
                  </Link>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {CATEGORY_OPTIONS.slice(0, 6).map((c) => (
                  <Link key={c.slug} className="rounded-md border border-border/80 bg-white/80 px-2 py-1 text-xs text-[#4a5568] hover:border-[#e78b48]/50" href={`/updates?category=${c.slug}`}>
                    {c.name}
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="press-hero-mesh relative py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Newspaper className="mx-auto h-8 w-8 text-[#f5c45e]" aria-hidden />
          <h2 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">Daily & weekly digests for movers and shakers</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">The same filters you use in the app—by sector, company size, and geography—are available in your inbox.</p>
          <form className="mt-8 flex max-w-md flex-col gap-3 sm:mx-auto sm:flex-row" action="/contact" method="get">
            <input type="hidden" name="topic" value="newsletter" />
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="name@newsroom.com"
              className="h-12 grow rounded-lg border border-white/15 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 focus:border-[#f5c45e] focus:outline-none"
            />
            <button
              type="submit"
              className="h-12 shrink-0 rounded-lg bg-[#f5c45e] px-6 text-sm font-semibold text-[#102e50] transition hover:bg-[#ffd87a]"
            >
              Sign up
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
