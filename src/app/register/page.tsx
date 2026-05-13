import Link from 'next/link'
import { Bookmark, Building2, FileText, Image as ImageIcon, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'

const registerTheme = {
  shell: 'bg-[#f6f2ea] text-[#10202e]',
  panel: 'border border-[#d4cdc0] bg-white shadow-sm',
  side: 'border border-[#d4cdc0] bg-gradient-to-b from-white to-[#f0ebe2] shadow-sm',
  muted: 'text-[#4a5568]',
  action: 'bg-[#102e50] text-[#f5c45e] shadow-md hover:bg-[#1a4a6e] hover:text-[#ffd87a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e78b48]',
  field:
    'h-12 w-full rounded-xl border border-[#d4cdc0] bg-white px-4 text-sm text-[#10202e] placeholder:text-[#8a9ba8] focus:border-[#e78b48] focus:outline-none focus:ring-1 focus:ring-[#e78b48]/35',
  link: 'text-[#102e50] hover:text-[#be3d2a] hover:underline',
  listItem: 'rounded-2xl border border-[#d4cdc0]/60 bg-white/50 px-4 py-3 text-sm text-[#2d3a45]',
} as const

function getRegisterConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      ...registerTheme,
      icon: Building2,
      title: 'Create a business-ready account',
      body: 'List services, manage locations, and activate trust signals with a proper directory workflow.',
    }
  }
  if (kind === 'editorial') {
    return {
      ...registerTheme,
      icon: FileText,
      title: 'Create your comms & wire account',
      body: 'Set up a profile for press releases, advisories, and collaboration with the distribution desk.',
    }
  }
  if (kind === 'visual') {
    return {
      ...registerTheme,
      icon: ImageIcon,
      title: 'Set up your creator profile',
      body: 'Launch a visual-first account with gallery publishing, identity surfaces, and profile-led discovery.',
    }
  }
  return {
    ...registerTheme,
    icon: Bookmark,
    title: 'Create a curator account',
    body: 'Build shelves, save references, and connect collections to your profile without a generic feed setup.',
  }
}

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getRegisterConfig(productKind)
  const Icon = config.icon

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className={`rounded-2xl p-8 ${config.side}`}>
            <Icon className="h-8 w-8 text-[#e78b48]" aria-hidden />
            <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight text-[#102e50] sm:text-4xl">{config.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>{config.body}</p>
            <div className="mt-8 grid gap-3">
              {['Onboarding tuned to this site’s tasks', 'Same look as the public experience', 'Publishing, identity, and discovery in sync'].map((item) => (
                <div key={item} className={config.listItem}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-2xl p-8 ${config.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b4f3a]">Create account</p>
            <form className="mt-6 grid gap-4">
              <input className={config.field} name="name" autoComplete="name" placeholder="Full name" type="text" />
              <input className={config.field} name="email" autoComplete="email" placeholder="Email address" type="email" />
              <input className={config.field} name="password" autoComplete="new-password" placeholder="Password" type="password" />
              <input
                className={config.field}
                name="intent"
                placeholder="What are you creating or publishing?"
                type="text"
              />
              <button
                type="submit"
                className={`inline-flex h-12 w-full items-center justify-center rounded-xl px-6 text-sm font-semibold ${config.action}`}
              >
                Create account
              </button>
            </form>
            <div className="mt-6 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
              <span className={config.muted}>Already have an account?</span>
              <Link href="/login" className={`inline-flex items-center gap-2 font-semibold ${config.link}`}>
                <Sparkles className="h-4 w-4 text-[#e78b48]" aria-hidden />
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
