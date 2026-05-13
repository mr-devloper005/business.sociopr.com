import Link from "next/link";
import Image from "next/image";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { SITE_CONFIG } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const OFFICE_SHOT = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=700&fit=crop&q=80";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/about",
    title: "About us",
    description: `How ${SITE_CONFIG.name} supports communicators and journalists with a modern press wire.`,
    image: SITE_CONFIG.defaultOgImage,
  });
}

const principles = [
  {
    title: "Clarity over noise",
    body: "We strip the page back to what a release needs: provenance, structure, and a clean read—so the story, not the chrome, travels.",
  },
  {
    title: "Built for two audiences",
    body: "Communicators need speed and measurement; journalists need confidence in datelines and contacts. The same product has to serve both without compromise.",
  },
  {
    title: "Room to grow",
    body: "Start with the wire, add analytics, IR sync, and training as your team’s calendar gets busier—without replatforming every year.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f6f2ea] text-[#10202e]">
      <NavbarShell />
      <header className="border-b border-[#d4cdc0] bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6b4f3a]">About {SITE_CONFIG.name}</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[#102e50] sm:text-5xl">
            A press wire for the way companies actually announce news
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            {SITE_CONFIG.name} is a distribution and reading platform for press-style updates: earnings, product launches, policy positions, and
            public-interest stories that deserve a serious page—not a recycled social feed.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#d4cdc0] shadow-md">
            <Image src={OFFICE_SHOT} alt="Communications team collaborating" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-[#102e50]">Why we exist</h2>
            <p className="mt-4 text-sm leading-7 text-[#2d3a45] sm:text-base">
              Most “content” products optimize for feeds. We optimize for credibility: a stable URL, a structured body, and a path from press
              room to search and social without losing context. {SITE_CONFIG.tagline}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/updates"
                className="inline-flex items-center justify-center rounded-lg bg-[#102e50] px-5 py-2.5 text-sm font-semibold text-[#f5c45e] transition hover:bg-[#1a4a6e]"
              >
                Browse the wire
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-[#102e50]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#102e50] transition hover:border-[#e78b48]/50"
              >
                Contact the desk
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#d4cdc0] bg-white/60 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="press-section-title">Principles</h2>
          <ul className="mt-8 grid list-none gap-5 p-0 sm:grid-cols-3">
            {principles.map((p) => (
              <li key={p.title} className="press-card p-5">
                <h3 className="font-display text-lg font-semibold text-[#102e50]">{p.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-[#102e50]">No filler metrics</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
            We don&apos;t quote vanity stats on this page. When you work with us, you&apos;ll see real readership, pickup signals, and operational
            SLAs in your account—not placeholder millions from an unrelated product.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
