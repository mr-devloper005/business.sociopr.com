'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#f6f2ea] text-[#10202e]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#d4cdc0] bg-gradient-to-b from-white to-[#f6f2ea]">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="font-display text-3xl font-semibold tracking-tight text-[#102e50] sm:text-4xl">{title}</h1>
                {description && <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>}
              </div>
              {actions && <div className="flex flex-wrap gap-2 sm:gap-3">{actions}</div>}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">{children}</section>
      </main>
      <Footer />
    </div>
  )
}
