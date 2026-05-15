'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

type TickerItem = { id: string; slug: string; title: string }

const FALLBACK_ITEMS: TickerItem[] = [
  { id: '1', slug: '#', title: 'Regional Partnership Expansion Announced' },
  { id: '2', slug: '#', title: 'Quarterly Product Update Released to Press' },
  { id: '3', slug: '#', title: 'Industry Event Participation Confirmed' },
  { id: '4', slug: '#', title: 'Leadership Statement on Market Growth' },
  { id: '5', slug: '#', title: 'New Service Rollout Now Live' },
  { id: '6', slug: '#', title: 'Editorial Guidelines Refresh for 2026' },
  { id: '7', slug: '#', title: 'Global Media Distribution Network Expanded' },
  { id: '8', slug: '#', title: 'Annual Press Awards Nominations Open' },
]

export function MarqueeTicker({ posts }: { posts: TickerItem[] }) {
  const items = posts.length ? posts.slice(0, 8) : FALLBACK_ITEMS
  // Repeat 4 times so there's always enough content to fill the screen
  const repeated = [...items, ...items, ...items, ...items]

  const trackRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const speed = 0.5 // px per frame — adjust for faster/slower

    const tick = () => {
      posRef.current -= speed
      // Reset when we've scrolled exactly half the track width (one full set)
      const halfWidth = track.scrollWidth / 2
      if (Math.abs(posRef.current) >= halfWidth) {
        posRef.current = 0
      }
      track.style.transform = `translateX(${posRef.current}px)`
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="border-y border-[#9C0F48]/15 bg-[#9C0F48]/5 py-2.5">
      <div className="flex items-center">
        {/* Fixed badge */}
        <div className="shrink-0 pl-4 pr-3 sm:pl-6">
          <span className="rounded bg-[#9C0F48] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#F9E4D4]">
            Latest
          </span>
        </div>

        {/* Scrolling track — overflow hidden on this wrapper only */}
        <div className="flex-1 overflow-hidden">
          <div
            ref={trackRef}
            className="flex w-max items-center whitespace-nowrap text-sm text-[#6b3a2a]"
          >
            {repeated.map((item, i) => (
              <span key={`${item.id}-${i}`} className="inline-flex items-center">
                {item.slug !== '#' ? (
                  <Link
                    href={`/public-relation/${item.slug}`}
                    className="px-5 hover:text-[#9C0F48] hover:underline"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <span className="px-5">{item.title}</span>
                )}
                <span className="text-[#9C0F48]/40 text-[10px]" aria-hidden>
                  ◆
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
