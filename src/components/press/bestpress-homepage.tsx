import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  BarChart3,
  Globe2,
  LineChart,
  Megaphone,
  Newspaper,
  Radio,
  Rss,
  Search,
  Share2,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
  Clock,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import type { SitePost } from '@/lib/site-connector'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { MarqueeTicker } from '@/components/press/marquee-ticker'

const HERO_VISUAL =
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=900&fit=crop&q=80'
const SOLUTION_IMAGES = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=560&fit=crop&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=560&fit=crop&q=80',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=560&fit=crop&q=80',
]
const RESOURCE_IMAGES = {
  journalists:
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop&q=80',
  communicators:
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop&q=80',
}

const FEATURES = [
  {
    icon: Globe2,
    title: 'Global distribution',
    text: 'Route stories to the regions, languages, and verticals that match your news.',
    href: '/public-relation',
  },
  {
    icon: BarChart3,
    title: 'Measurement you can use',
    text: 'See reach, referrers, and engagement without wrestling with a dozen tools.',
    href: '/pricing',
  },
  {
    icon: Target,
    title: 'Audience alignment',
    text: 'Match releases to the beats, sectors, and outlets that care about the topic.',
    href: '/public-relation',
  },
  {
    icon: Share2,
    title: 'Social-ready assets',
    text: 'Ship consistent headlines, images, and quotes for every platform.',
    href: '/public-relation',
  },
  {
    icon: Radio,
    title: 'Media desk access',
    text: 'Give journalists a reliable feed for embargoes, advisories, and follow-ups.',
    href: '/contact',
  },
  {
    icon: LineChart,
    title: 'Benchmarking',
    text: 'Compare announcement performance over time to sharpen the next campaign.',
    href: '/pricing',
  },
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

const STATS = [
  { value: '50K+', label: 'Press releases distributed', icon: Newspaper },
  { value: '120+', label: 'Countries reached', icon: Globe2 },
  { value: '98%', label: 'Delivery success rate', icon: CheckCircle2 },
  { value: '4.8★', label: 'Average client rating', icon: TrendingUp },
]

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage =
    typeof post?.content === 'object' &&
    post?.content &&
    Array.isArray((post.content as { images?: string[] }).images)
      ? (post.content as { images?: string[] }).images?.find(
          (url) => typeof url === 'string' && url,
        )
      : null
  const logo =
    typeof post?.content === 'object' &&
    post?.content &&
    typeof (post.content as { logo?: string }).logo === 'string'
      ? (post.content as { logo?: string }).logo
      : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

function getCategory(post: SitePost) {
  const c =
    post.content && typeof post.content === 'object'
      ? (post.content as { category?: string }).category
      : ''
  if (typeof c === 'string' && c.trim()) return c.trim()
  const t = post.tags?.find((x) => typeof x === 'string')
  return typeof t === 'string' ? t : 'Press Release'
}

type Props = { posts: SitePost[] }

export function BestpressHomepage({ posts }: Props) {
  const lead = posts[0]
  const sideStories = posts.slice(1, 5)
  const forTrending = posts.length ? posts : []
  const primaryTask =
    SITE_CONFIG.tasks.find((t) => t.key === 'mediaDistribution') ?? SITE_CONFIG.tasks[0]

  return (
    <main className="overflow-x-hidden text-[#1a0a10]">

      {/* ── HERO ── */}
      <section className="press-hero-mesh text-[#F9E4D4]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-24">
          <div className="min-w-0 [animation:factory-fade-in_0.5s_ease]">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#F9E4D4]/20 bg-[#F9E4D4]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F9E4D4]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              {siteContent.hero.badge}
            </p>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3rem]">
              Your story deserves to be heard — everywhere.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#F9E4D4]/80 sm:text-lg">
              Reach decision-makers, journalists, and industry analysts with a wire built for
              business announcements, investor updates, and public-interest stories — backed by
              measurement, not guesswork.
            </p>

            {/* Stats row */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-[#F9E4D4]/10 bg-[#F9E4D4]/5 px-3 py-3 text-center"
                >
                  <p className="font-display text-2xl font-bold text-[#D67D3E]">{s.value}</p>
                  <p className="mt-0.5 text-[10px] leading-tight text-[#F9E4D4]/60">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={siteContent.hero.primaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#D67D3E] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-[#c06830] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D67D3E]"
              >
                {siteContent.hero.primaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href={siteContent.hero.secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#F9E4D4]/25 bg-[#F9E4D4]/5 px-6 py-3.5 text-sm font-semibold text-[#F9E4D4] backdrop-blur transition hover:bg-[#F9E4D4]/12"
              >
                {siteContent.hero.secondaryCta.label}
              </Link>
            </div>
            <p className="mt-6 text-sm text-[#F9E4D4]/50">
              Prefer to browse first?{' '}
              <Link
                className="font-medium text-[#D67D3E] underline-offset-2 hover:underline"
                href={primaryTask?.route || '/public-relation'}
              >
                Open the {primaryTask?.label} archive
              </Link>
            </p>
          </div>

          {/* Hero image */}
          <div className="relative min-h-[280px] w-full [animation:factory-fade-in_0.6s_ease] lg:min-h-[400px]">
            <div
              className="absolute -right-4 -top-4 h-24 w-24 rounded-3xl border border-[#F9E4D4]/10 bg-gradient-to-br from-[#D67D3E]/40 to-transparent blur-0"
              aria-hidden
            />
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-[#F9E4D4]/10 shadow-2xl shadow-black/30 lg:min-h-[400px]">
              <Image
                src={HERO_VISUAL}
                alt="Newsroom monitoring screens and press workflow"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a10]/80 via-[#1a0a10]/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 rounded-xl border border-[#F9E4D4]/10 bg-[#1a0a10]/60 px-4 py-2 text-xs text-[#F9E4D4]/80 backdrop-blur">
                <span className="flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-[#D67D3E]" aria-hidden />
                  Professional press release distribution for every announcement
                </span>
                <span className="hidden items-center gap-1 sm:flex">
                  <Clock className="h-3 w-3" />
                  Live
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER / MARQUEE BAR ── */}
      <MarqueeTicker posts={posts.slice(0, 8).map(p => ({ id: p.id, slug: p.slug, title: p.title }))} />

      {/* ── WHAT SETS US APART ── */}
      <section className="border-b border-[#e8c8b0]/80 bg-[#fdf6f0] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9C0F48]">
              What sets us apart
            </p>
            <h2 className="press-section-title mt-3">
              Everything you need to go from draft to distribution
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              Fewer handoffs, better targeting, and reporting your leadership team can read in
              minutes.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="press-card group flex h-full flex-col p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#9C0F48]/8">
                  <f.icon className="h-6 w-6 text-[#9C0F48]" aria-hidden />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-[#1a0a10]">
                  {f.title}
                </h3>
                <p className="mt-2 grow text-sm leading-7 text-muted-foreground">{f.text}</p>
                <Link
                  href={f.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#D67D3E] group-hover:gap-2"
                >
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED SOLUTIONS ── */}
      <section className="bg-[#F9E4D4]/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9C0F48]">
                Solutions
              </p>
              <h2 className="press-section-title mt-2">Featured solutions</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                Modular building blocks for corporate newsrooms, agencies, and investor relations
                teams.
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {SOLUTIONS.map((s, i) => (
              <article key={s.title} className="press-card flex flex-col overflow-hidden p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={SOLUTION_IMAGES[i] ?? SOLUTION_IMAGES[0]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#9C0F48]/60 to-transparent" />
                  <span className="absolute bottom-3 left-4 rounded-full bg-[#D67D3E] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Solution {i + 1}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-[#9C0F48]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.text}</p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#D67D3E] hover:gap-2"
                  >
                    Learn more <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED STORIES ── */}
      <section className="border-y border-[#e8c8b0]/80 bg-white/70 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9C0F48]">
                Wire
              </p>
              <h2 className="press-section-title mt-2">Featured stories</h2>
            </div>
            <Link
              href={primaryTask?.route || '/public-relation'}
              className="hidden items-center gap-1 text-sm font-semibold text-[#D67D3E] hover:underline sm:flex"
            >
              View all releases <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            {lead ? (
              <Link
                href={`/public-relation/${lead.slug}`}
                className="press-card group block overflow-hidden p-0 no-underline"
              >
                <div className="relative h-56 w-full sm:h-72">
                  <ContentImage src={getPostImage(lead)} alt="" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a10]/70 to-transparent" />
                  <div className="absolute left-3 top-3 rounded-full bg-[#9C0F48] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#F9E4D4]">
                    {getCategory(lead)}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-xl font-semibold text-white group-hover:text-[#F9E4D4] sm:text-2xl">
                      {lead.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  {lead.summary ? (
                    <p className="line-clamp-3 text-sm leading-7 text-muted-foreground">
                      {lead.summary}
                    </p>
                  ) : null}
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#D67D3E]">
                    Read the release <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ) : (
              <div className="press-card p-8 text-sm text-muted-foreground">
                <p>
                  Once your first post is live, the lead block highlights your top story.{' '}
                  <Link className="font-medium text-[#9C0F48] underline" href="/contact">
                    Talk to the desk
                  </Link>{' '}
                  about a launch.
                </p>
              </div>
            )}

            <div className="space-y-4">
              {sideStories.length ? (
                sideStories.map((post) => (
                  <Link
                    key={post.id}
                    href={`/public-relation/${post.slug}`}
                    className="press-card group flex gap-4 p-4 no-underline"
                  >
                    <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg">
                      <ContentImage
                        src={getPostImage(post)}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9C0F48]">
                        {getCategory(post)}
                      </p>
                      <p className="mt-0.5 line-clamp-2 font-medium leading-snug text-[#1a0a10] group-hover:text-[#9C0F48]">
                        {post.title}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="press-card p-4 text-sm text-muted-foreground">
                  Wire stories will list here in compact cards when the archive contains more than
                  one post.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── RESOURCES ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9C0F48]">
            Resources
          </p>
          <h2 className="press-section-title mt-2">Resources</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Two lanes — one for the newsroom, one for the people who brief them.
          </p>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="press-card overflow-hidden p-0">
              <div className="relative h-44">
                <Image
                  src={RESOURCE_IMAGES.journalists}
                  alt="Journalist researching at a desk"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#9C0F48]/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="rounded-full bg-[#9C0F48] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#F9E4D4]">
                    For journalists
                  </span>
                </div>
              </div>
              <div className="space-y-4 p-6">
                <h3 className="font-display text-xl font-semibold text-[#9C0F48]">
                  Resources for journalists
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>
                    <Link
                      className="flex items-start gap-2 font-medium text-[#1a0a10] hover:text-[#9C0F48]"
                      href="/public-relation?category=news"
                    >
                      <Newspaper className="mt-0.5 h-4 w-4 shrink-0 text-[#D67D3E]" aria-hidden />
                      Top distribution lists by beat and region
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-start gap-2 font-medium text-[#1a0a10] hover:text-[#9C0F48]"
                      href="/search?q=advisory"
                    >
                      <Search className="mt-0.5 h-4 w-4 shrink-0 text-[#D67D3E]" aria-hidden />
                      How to read advisories, corrections, and updates
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-start gap-2 font-medium text-[#1a0a10] hover:text-[#9C0F48]"
                      href="/contact?topic=editorial"
                    >
                      <Rss className="mt-0.5 h-4 w-4 shrink-0 text-[#D67D3E]" aria-hidden />
                      Editorial & sourcing requests
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="press-card overflow-hidden p-0">
              <div className="relative h-44">
                <Image
                  src={RESOURCE_IMAGES.communicators}
                  alt="Team collaborating on a communications plan"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#D67D3E]/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="rounded-full bg-[#D67D3E] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    For communicators
                  </span>
                </div>
              </div>
              <div className="space-y-4 p-6">
                <h3 className="font-display text-xl font-semibold text-[#9C0F48]">
                  Resources for communicators
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>
                    <Link
                      className="flex items-start gap-2 font-medium text-[#1a0a10] hover:text-[#9C0F48]"
                      href="/create/mediaDistribution"
                    >
                      <Megaphone className="mt-0.5 h-4 w-4 shrink-0 text-[#D67D3E]" aria-hidden />
                      How to file a new wire release
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-start gap-2 font-medium text-[#1a0a10] hover:text-[#9C0F48]"
                      href="/pricing"
                    >
                      <LineChart className="mt-0.5 h-4 w-4 shrink-0 text-[#D67D3E]" aria-hidden />
                      Plan comparison by distribution depth
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-start gap-2 font-medium text-[#1a0a10] hover:text-[#9C0F48]"
                      href="/contact?topic=training"
                    >
                      <Users className="mt-0.5 h-4 w-4 shrink-0 text-[#D67D3E]" aria-hidden />
                      Training, SLAs, and comms playbooks
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRENDING + BROWSE ── */}
      <section className="border-t border-[#e8c8b0]/60 bg-[#F9E4D4]/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9C0F48]">
                Trending
              </p>
              <h2 className="press-section-title mt-2">Trending right now</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                A snapshot of topics readers and desks are opening most — powered by your live
                archive.
              </p>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {TRENDING_CLUSTERS.map((cluster, i) => {
                  const clusterPosts = forTrending.slice(i * 2, i * 2 + 3)
                  return (
                    <div key={cluster.label} className="press-card p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9C0F48]">
                        {cluster.kicker}
                      </p>
                      <h3 className="mt-1 font-display text-base font-semibold text-[#1a0a10]">
                        {cluster.label}
                      </h3>
                      <ul className="mt-3 space-y-2 border-t border-border/60 pt-3 text-sm">
                        {clusterPosts.length ? (
                          clusterPosts.map((p) => (
                            <li key={p.id}>
                              <Link
                                href={`/public-relation/${p.slug}`}
                                className="line-clamp-2 text-[#1a0a10] hover:text-[#9C0F48] hover:underline"
                              >
                                {p.title}
                              </Link>
                            </li>
                          ))
                        ) : (
                          <>
                            <li>
                              <Link
                                className="text-[#1a0a10] hover:underline"
                                href={`/public-relation?category=${cluster.slug}`}
                              >
                                Open {cluster.label} archive
                              </Link>
                            </li>
                            <li className="text-muted-foreground">
                              More headlines appear as your feed populates.
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>

            <aside className="press-card p-6 [animation:factory-fade-in_0.5s_ease]">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#9C0F48]">
                Browse news by category
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Short paths into the most-requested industry lanes.
              </p>
              <ul className="mt-5 space-y-1 border-t border-border/60 pt-4 text-sm">
                {BROWSE_LINKS.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/public-relation?category=${c.slug}`}
                      className="flex items-center justify-between py-1.5 text-[#1a0a10] hover:text-[#D67D3E]"
                    >
                      <span>{c.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-50" aria-hidden />
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Link
                    href="/public-relation"
                    className="text-xs font-semibold text-[#9C0F48] hover:underline"
                  >
                    All categories
                  </Link>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {CATEGORY_OPTIONS.slice(0, 6).map((c) => (
                  <Link
                    key={c.slug}
                    className="rounded-md border border-[#9C0F48]/15 bg-[#F9E4D4]/60 px-2 py-1 text-xs text-[#6b3a2a] hover:border-[#D67D3E]/50 hover:bg-[#F9E4D4]"
                    href={`/public-relation?category=${c.slug}`}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="press-hero-mesh relative py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D67D3E]/20">
            <Newspaper className="h-7 w-7 text-[#F9E4D4]" aria-hidden />
          </div>
          <h2 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">
            Daily & weekly digests for movers and shakers
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#F9E4D4]/75 sm:text-base">
            The same filters you use in the app — by sector, company size, and geography — are
            available in your inbox.
          </p>
          <form
            className="mt-8 flex max-w-md flex-col gap-3 sm:mx-auto sm:flex-row"
            action="/contact"
            method="get"
          >
            <input type="hidden" name="topic" value="newsletter" />
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="name@newsroom.com"
              className="h-12 grow rounded-lg border border-[#F9E4D4]/15 bg-[#F9E4D4]/10 px-4 text-sm text-[#F9E4D4] placeholder:text-[#F9E4D4]/50 focus:border-[#D67D3E] focus:outline-none"
            />
            <button
              type="submit"
              className="h-12 shrink-0 rounded-lg bg-[#D67D3E] px-6 text-sm font-semibold text-white transition hover:bg-[#c06830]"
            >
              Sign up
            </button>
          </form>
          <p className="mt-4 text-xs text-[#F9E4D4]/40">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </main>
  )
}
