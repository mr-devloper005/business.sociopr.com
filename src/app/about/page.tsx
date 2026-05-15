import Link from 'next/link'
import Image from 'next/image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import { ArrowRight, Globe2, Newspaper, ShieldCheck, Users } from 'lucide-react'

const OFFICE_SHOT =
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=700&fit=crop&q=80'
const TEAM_SHOT =
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=560&fit=crop&q=80'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/about',
    title: 'About us',
    description: `How ${SITE_CONFIG.name} supports communicators and journalists with a modern press wire.`,
    image: SITE_CONFIG.defaultOgImage,
  })
}

const principles = [
  {
    icon: Newspaper,
    title: 'Clarity over noise',
    body: 'We strip the page back to what a release needs: provenance, structure, and a clean read — so the story, not the chrome, travels.',
  },
  {
    icon: Users,
    title: 'Built for two audiences',
    body: 'Communicators need speed and measurement; journalists need confidence in datelines and contacts. The same product serves both without compromise.',
  },
  {
    icon: Globe2,
    title: 'Room to grow',
    body: 'Start with the wire, add analytics, IR sync, and training as your team\'s calendar gets busier — without replatforming every year.',
  },
] as const

const stats = [
  { value: '50K+', label: 'Releases distributed' },
  { value: '120+', label: 'Countries reached' },
  { value: '98%', label: 'Delivery success rate' },
  { value: '4.8★', label: 'Client satisfaction' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fdf6f0] text-[#1a0a10]">
      <NavbarShell />

      {/* Hero header */}
      <header className="press-hero-mesh border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F9E4D4]/70">
            About {SITE_CONFIG.name}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            A press wire for the way companies actually announce news
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#F9E4D4]/80 sm:text-lg">
            {SITE_CONFIG.name} is a distribution and reading platform for press-style updates:
            earnings, product launches, policy positions, and public-interest stories that deserve a
            serious page — not a recycled social feed.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/public-relation"
              className="inline-flex items-center gap-2 rounded-lg bg-[#D67D3E] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c06830]"
            >
              Browse the wire <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-[#F9E4D4]/20 bg-[#F9E4D4]/10 px-5 py-2.5 text-sm font-semibold text-[#F9E4D4] transition hover:bg-[#F9E4D4]/20"
            >
              Contact the desk
            </Link>
          </div>
        </div>
      </header>

      {/* Stats bar */}
      <div className="border-b border-[#e8c8b0] bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-bold text-[#9C0F48]">{s.value}</p>
                <p className="mt-1 text-xs font-medium text-[#6b3a2a]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why we exist */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#e8c8b0] shadow-md">
            <Image
              src={OFFICE_SHOT}
              alt="Communications team collaborating"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#9C0F48]/30 to-transparent" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9C0F48]">
              Our mission
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-[#1a0a10] sm:text-3xl">
              Why we exist
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#3a1020] sm:text-base">
              Most "content" products optimize for feeds. We optimize for credibility: a stable URL,
              a structured body, and a path from press room to search and social without losing
              context.
            </p>
            <p className="mt-3 text-sm leading-7 text-[#3a1020] sm:text-base">
              {SITE_CONFIG.tagline} — built for communicators who need speed and journalists who
              need confidence in every dateline and contact block.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#9C0F48]" />
              <span className="text-sm font-medium text-[#9C0F48]">
                Trusted by newsrooms worldwide
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-[#e8c8b0] bg-[#F9E4D4]/25 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9C0F48]">
            How we work
          </p>
          <h2 className="press-section-title mt-2">Our principles</h2>
          <ul className="mt-8 grid list-none gap-5 p-0 sm:grid-cols-3">
            {principles.map((p) => (
              <li key={p.title} className="press-card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#9C0F48]/8">
                  <p.icon className="h-5 w-5 text-[#9C0F48]" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-[#1a0a10]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Team photo */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9C0F48]">
              The team
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-[#1a0a10] sm:text-3xl">
              No filler metrics
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#3a1020] sm:text-base">
              We don&apos;t quote vanity stats on this page. When you work with us, you&apos;ll see
              real readership, pickup signals, and operational SLAs in your account — not placeholder
              millions from an unrelated product.
            </p>
            <p className="mt-3 text-sm leading-7 text-[#3a1020] sm:text-base">
              Every metric we show is tied to a real action: a journalist opening a release, a
              referral click, or a confirmed pickup. That&apos;s the standard we hold ourselves to.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[#9C0F48] px-5 py-2.5 text-sm font-semibold text-[#F9E4D4] transition hover:bg-[#7a0c38]"
              >
                Talk to us <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-lg border border-[#9C0F48]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#9C0F48] transition hover:bg-[#F9E4D4]/50"
              >
                View pricing
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#e8c8b0] shadow-md">
            <Image
              src={TEAM_SHOT}
              alt="Team working on communications"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#9C0F48]/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="press-hero-mesh py-14">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            Ready to distribute your next release?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#F9E4D4]/75 sm:text-base">
            Join thousands of communicators who trust {SITE_CONFIG.name} to get their stories to
            the right desks.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/create/mediaDistribution"
              className="inline-flex items-center gap-2 rounded-lg bg-[#D67D3E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c06830]"
            >
              Submit a release <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-[#F9E4D4]/20 bg-[#F9E4D4]/10 px-6 py-3 text-sm font-semibold text-[#F9E4D4] transition hover:bg-[#F9E4D4]/20"
            >
              Request a demo
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
