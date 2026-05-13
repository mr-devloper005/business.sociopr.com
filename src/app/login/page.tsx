import Link from 'next/link'
import { Bookmark, Building2, FileText, Image as ImageIcon, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { LOGIN_PAGE_OVERRIDE_ENABLED, LoginPageOverride } from '@/overrides/login-page'

/** Matches site brand tokens: navy #102E50, gold #F5C45E, ember #E78B48, paper #f6f2ea */
const loginTheme = {
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

function getLoginConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      ...loginTheme,
      icon: Building2,
      title: 'Access your business dashboard',
      body: 'Manage listings, verification details, contact info, and local discovery surfaces from one place.',
    }
  }
  if (kind === 'editorial') {
    return {
      ...loginTheme,
      icon: FileText,
      title: 'Sign in to your press workspace',
      body: 'File releases, follow pickup, and keep the newsroom aligned on one clear surface.',
    }
  }
  if (kind === 'visual') {
    return {
      ...loginTheme,
      icon: ImageIcon,
      title: 'Enter the creator workspace',
      body: 'Open your visual feed, creator profile, and publishing tools without dropping into a generic admin shell.',
    }
  }
  return {
    ...loginTheme,
    icon: Bookmark,
    title: 'Open your curated collections',
    body: 'Manage saved resources, collection notes, and curator identity from a calmer workspace.',
  }
}

export default function LoginPage() {
  if (LOGIN_PAGE_OVERRIDE_ENABLED) {
    return <LoginPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getLoginConfig(productKind)
  const Icon = config.icon

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
          <div className={`rounded-2xl p-8 ${config.side}`}>
            <Icon className="h-8 w-8 text-[#e78b48]" aria-hidden />
            <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight text-[#102e50] sm:text-4xl">{config.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>{config.body}</p>
            <div className="mt-8 grid gap-3">
              {['Secure access to your distribution account', 'Palette aligned with the public site', 'Fewer admin chrome surprises'].map((item) => (
                <div key={item} className={config.listItem}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-2xl p-8 ${config.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b4f3a]">Welcome back</p>
            <form className="mt-6 grid gap-4">
              <input className={config.field} placeholder="Email address" autoComplete="email" name="email" type="email" />
              <input className={config.field} placeholder="Password" name="password" type="password" autoComplete="current-password" />
              <button type="submit" className={`inline-flex h-12 w-full items-center justify-center rounded-xl px-6 text-sm font-semibold ${config.action}`}>
                Sign in
              </button>
            </form>
            <div className="mt-6 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
              <Link href="/forgot-password" className={config.link}>
                Forgot password?
              </Link>
              <Link href="/register" className={`inline-flex items-center gap-2 font-semibold ${config.link}`}>
                <Sparkles className="h-4 w-4 text-[#e78b48]" aria-hidden />
                Create account
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
