import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, HelpCircle } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteIdentity } from '@/config/site.identity'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/pricing',
    title: 'Plans & distribution',
    description: 'Compare Basic, Pro, and Premium plans for press release distribution, analytics, and media reach.',
    image: SITE_CONFIG.defaultOgImage,
  })
}

const plans = [
  {
    name: 'Basic',
    price: '$199',
    period: '/ month',
    blurb: 'Foundations for lean teams publishing a few stories per quarter.',
    popular: false,
    features: ['Single brand profile', 'Standard wire pages', 'Email confirmation', '30-day archive search'],
  },
  {
    name: 'Pro',
    price: '$499',
    period: '/ month',
    blurb: 'For active communicators with steady cadence and more regions.',
    popular: true,
    features: [
      'Everything in Basic',
      'Deeper category targeting',
      'Engagement and pickup snapshots',
      'Unlimited user seats in one org',
    ],
  },
  {
    name: 'Premium',
    price: 'Custom',
    period: ' · annual',
    blurb: 'For enterprises needing SLAs, IR workflows, and analyst outreach.',
    popular: false,
    features: [
      'Dedicated CSM and onboarding',
      'Crisis & correction lane',
      'Data exports & API read access (where available)',
    ],
  },
] as const

const comparison = [
  { feature: 'Distribution level', basic: 'National', pro: 'National + select global', prem: 'Global, bespoke lists' },
  { feature: 'Media reach & syndication', basic: 'Core', pro: 'Expanded + verticals', prem: 'Analysts + hand-curated' },
  { feature: 'Analytics & reporting', basic: '7-day', pro: '1-year, exports', prem: 'Custom, BI hooks' },
] as const

const addOns = [
  { title: 'Add-on: IR calendar sync', text: 'Push key dates to investor comms and leadership feeds.' },
  { title: 'Add-on: Premium imagery', text: 'Studio retouching for hero images and product shots.' },
  { title: 'Add-on: On-site training', text: 'Half-day workshop for in-house copy and compliance.' },
] as const

const faq = [
  { q: 'Is there a trial window?', a: 'Most teams start on Pro with a short paid pilot. Basic can move month-to-month; Premium is contract.' },
  { q: 'Can we keep our existing newswire process?', a: 'Yes. Import drafts, or push from your CMS; the reading pages stay in sync for SEO and search.' },
  { q: 'What does analytics include?', a: 'Referrers, on-page engagement, and rough pickup estimates where partner data exists—Pro and Premium get longer retention.' },
] as const

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#f6f2ea] text-[#10202e]">
      <NavbarShell />
      <header className="border-b border-[#d4cdc0] bg-gradient-to-b from-white to-[#f6f2ea] py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-semibold text-[#102e50] sm:text-5xl">Plans for every comms team</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Transparent entry points, room to grow, and enterprise options when the newsroom depends on the wire. Prices shown are illustrative
            for {siteIdentity.name}; confirm with the desk for your org.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`press-card flex flex-col p-6 ${
                p.popular
                  ? 'ring-2 ring-[#e78b48] ring-offset-2 ring-offset-[#f6f2ea]'
                  : ''
              }`}
            >
              {p.popular ? (
                <span className="mb-3 w-fit rounded-full bg-[#102e50] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#f5c45e]">
                  Most popular
                </span>
              ) : (
                <span className="mb-3 h-5" aria-hidden />
              )}
              <h2 className="font-display text-2xl font-semibold text-[#102e50]">{p.name}</h2>
              <p className="mt-2 min-h-[3rem] text-sm text-muted-foreground">{p.blurb}</p>
              <p className="mt-4 font-display text-3xl font-bold text-[#102e50]">
                {p.price}
                <span className="text-lg font-normal text-muted-foreground">{p.period}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm text-[#2d3a45]">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#e78b48]" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact?topic=pricing"
                className="mt-8 block rounded-lg bg-[#102e50] py-2.5 text-center text-sm font-semibold text-[#f5c45e] transition hover:bg-[#1a4a6e]"
              >
                Contact sales
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[#d4cdc0] bg-white/50 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="press-section-title text-center">Feature comparison</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">Deeper distribution and analytics as you move up. Exact entitlements are confirmed in your order form.</p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[500px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b-2 border-[#102e50]">
                  <th className="p-3 font-display text-base text-[#102e50]">Feature</th>
                  <th className="p-3 font-medium text-[#102e50]">Basic</th>
                  <th className="p-3 font-medium text-[#102e50]">Pro</th>
                  <th className="p-3 font-medium text-[#102e50]">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-[#d4cdc0]">
                    <th className="p-3 font-medium text-foreground" scope="row">
                      {row.feature}
                    </th>
                    <td className="p-3 text-muted-foreground">{row.basic}</td>
                    <td className="p-3 text-muted-foreground">{row.pro}</td>
                    <td className="p-3 text-muted-foreground">{row.prem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="press-section-title">Add-ons</h2>
          <p className="mt-1 text-sm text-muted-foreground">Stack services without changing the core product foundation.</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {addOns.map((a) => (
              <li key={a.title} className="press-card p-4 text-sm text-[#2d3a45]">
                <p className="font-semibold text-[#102e50]">{a.title}</p>
                <p className="mt-1 text-muted-foreground">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-[#d4cdc0] bg-gradient-to-b from-[#f6f2ea] to-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="press-section-title flex items-center gap-2 text-center sm:justify-center">
            <HelpCircle className="h-7 w-7 text-[#e78b48]" />
            FAQ
          </h2>
          <Accordion type="single" collapsible className="mt-6 w-full">
            {faq.map((item) => (
              <AccordionItem key={item.q} value={item.q} className="border-[#d4cdc0]">
                <AccordionTrigger className="text-left font-medium text-[#102e50] hover:no-underline">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-7 text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  )
}
