import { Send } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { siteIdentity } from '@/config/site.identity'
import Link from 'next/link'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

export function ContactPageOverride() {
  const domain = siteIdentity.domain
  const pressEmail = `press@${domain}`
  const generalEmail = `contact@${domain}`

  return (
    <div className="min-h-screen bg-[#fdf6f0] text-[#1a0a10]">
      <NavbarShell />

      {/* Hero */}
      <header className="press-hero-mesh border-b border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F9E4D4]/70">
            Get in touch
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Let&apos;s get your next release right
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#F9E4D4]/80 sm:text-lg">
            Editorial questions, account setup, and timing — route through the right lane so the
            desk can respond with useful next steps.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div>
          {/* Contact form */}
          <div className="press-card overflow-hidden p-0">
            {/* Form header */}
            <div className="border-b border-[#e8c8b0] bg-gradient-to-r from-[#9C0F48]/8 to-[#D67D3E]/5 px-6 py-5">
              <h2 className="font-display text-xl font-semibold text-[#9C0F48]">
                Write to the team
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Fields below post through your default mail client. No new backend required.
              </p>
            </div>

            <form
              className="space-y-4 p-6"
              action={`mailto:${generalEmail}`}
              method="post"
              encType="text/plain"
            >
              <p className="rounded-lg bg-[#F9E4D4]/50 px-3 py-2 text-xs text-[#6b3a2a]">
                This opens your mail client. Some browsers will prompt before launching.
              </p>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b3a2a]">
                  Your name
                </label>
                <input
                  name="name"
                  className="mt-1.5 h-11 w-full rounded-lg border border-[#e8c8b0] bg-white px-3 text-sm text-[#1a0a10] placeholder:text-[#9C0F48]/30 focus:border-[#9C0F48] focus:outline-none focus:ring-1 focus:ring-[#9C0F48]"
                  placeholder="Jane Smith"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b3a2a]">
                  Topic
                </label>
                <input
                  name="subject"
                  className="mt-1.5 h-11 w-full rounded-lg border border-[#e8c8b0] bg-white px-3 text-sm text-[#1a0a10] placeholder:text-[#9C0F48]/30 focus:border-[#9C0F48] focus:outline-none focus:ring-1 focus:ring-[#9C0F48]"
                  placeholder="E.g. demo, billing, or correction"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b3a2a]">
                  Message
                </label>
                <textarea
                  className="mt-1.5 min-h-[160px] w-full rounded-lg border border-[#e8c8b0] bg-white px-3 py-2.5 text-sm text-[#1a0a10] placeholder:text-[#9C0F48]/30 focus:border-[#9C0F48] focus:outline-none focus:ring-1 focus:ring-[#9C0F48]"
                  name="body"
                  required
                  placeholder="Organization, what you are announcing, and ideal timing."
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#9C0F48] py-3 text-sm font-semibold text-[#F9E4D4] transition hover:bg-[#7a0c38] sm:w-auto sm:px-6"
                >
                  <Send className="h-4 w-4" aria-hidden />
                  Open in email
                </button>
                <Link
                  href="/create/mediaDistribution"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#D67D3E]/30 bg-[#D67D3E]/8 py-3 text-sm font-semibold text-[#D67D3E] transition hover:bg-[#D67D3E]/15 sm:w-auto sm:px-6"
                >
                  Submit a release directly
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
