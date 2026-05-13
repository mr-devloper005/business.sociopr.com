import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Release media wire · Media intelligence',
  },
  footer: {
    tagline: 'Distribution, measurement, and trust for communicators and journalists',
  },
  hero: {
    badge: 'Press wire',
    title: ['Unmatched visibility. Powerful results.'],
    description:
      'Send announcements with confidence, reach relevant journalists, and see how your story travels across the media landscape.',
    primaryCta: {
      label: 'Send a release media',
      href: '/create/mediaDistribution',
    },
    secondaryCta: {
      label: 'Request a demo',
      href: '/contact?topic=demo',
    },
    searchPlaceholder: 'Search releases and topics',
    focusLabel: 'Today',
    featureCardBadge: 'For communicators',
    featureCardTitle: 'Built for the full announcement lifecycle',
    featureCardDescription:
      'From drafting through distribution, pickup tracking, and archived reading—without cluttering the front page with generic widgets.',
  },
  home: {
    metadata: {
      title: 'Global press release distribution & company news',
      description:
        'Distribute company announcements, monitor interest, and browse the latest wire posts from Bestpressnews.',
      openGraphTitle: 'Global press release distribution & company news',
      openGraphDescription: 'A modern press room to publish, distribute, and read organization updates.',
      keywords: ['press release', 'earned media', 'company news', 'PR distribution', 'Bestpressnews'],
    },
    introBadge: 'Why it matters',
    introTitle: 'A wire-style surface designed for business newsrooms and journalists.',
    introParagraphs: [
      'The homepage is structured like a real distribution product: a confident hero, clearly separated resources, and reading lanes you can scan quickly.',
      'Releases and announcements stay readable on every device, with the archive, search, and categories always within reach.',
      'Under the hood, the same post model powers search, detail pages, and sitemap—only the presentation is tailored for press and media work.',
    ],
    sideBadge: 'What you get',
    sidePoints: [
      'A distribution-first experience with real imagery and content blocks.',
      'Releases, featured stories, resources, and trending—without template filler from other site types.',
      'Clean legal and contact paths when readers need a human being.',
    ],
    primaryLink: {
      label: 'Browse all releases',
      href: '/public-relation',
    },
    secondaryLink: {
      label: 'Contact distribution desk',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Talk to us',
    title: 'When your next announcement needs reach and a calm workflow.',
    description: 'We help communicators line up review, release timing, and measurement in one place—without the noise of a generic content feed.',
    primaryCta: {
      label: 'Contact the desk',
      href: '/contact',
    },
    secondaryCta: {
      label: 'View archive',
      href: '/public-relation',
    },
  },
  taskSectionHeading: 'Release media & updates',
  taskSectionDescriptionSuffix: 'Latest wire posts and company announcements for your market.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles',
    description: 'Read the latest posts and long-form updates.',
  },
  listing: {
    title: 'Listings',
    description: 'Explore listings and directory-style entries.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Browse classifieds and short-form notices.',
  },
  image: {
    title: 'Images',
    description: 'Browse image-led updates and visual posts.',
  },
  profile: {
    title: 'Profiles',
    description: 'View profile pages and public identities.',
  },
  sbm: {
    title: 'Bookmarks',
    description: 'Browse curated resources and saved links.',
  },
  pdf: {
    title: 'Resources',
    description: 'Open PDFs and downloadable files.',
  },
  mediaDistribution: {
    title: 'Release media & wire posts',
    description: 'Filter and search the latest company announcements, filings, and media advisories.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: { title: 'Listings', paragraphs: ['Directory entries and service pages.'], links: [{ label: 'Home', href: '/' }] },
  article: { title: 'Articles', paragraphs: ['General long-form article feed.'], links: [{ label: 'Home', href: '/' }] },
  classified: { title: 'Classifieds', paragraphs: ['Short-form posts and notices.'], links: [{ label: 'Home', href: '/' }] },
  image: { title: 'Images', paragraphs: ['Image-first posts and galleries.'], links: [{ label: 'Home', href: '/' }] },
  profile: { title: 'Profiles', paragraphs: ['Profile pages and identity surfaces.'], links: [{ label: 'Home', href: '/' }] },
  sbm: { title: 'Bookmarks', paragraphs: ['Curated saved links and references.'], links: [{ label: 'Home', href: '/' }] },
  pdf: { title: 'Resources', paragraphs: ['Downloadable files and documents.'], links: [{ label: 'Home', href: '/' }] },
  social: { title: 'Social', paragraphs: ['Short updates and activity.'], links: [{ label: 'Home', href: '/' }] },
  comment: { title: 'Comments', paragraphs: ['Commentary and response posts.'], links: [{ label: 'Home', href: '/' }] },
  org: { title: 'Organizations', paragraphs: ['Organization pages and entities.'], links: [{ label: 'Home', href: '/' }] },
  mediaDistribution: {
    title: 'Press room archive',
    paragraphs: [
      'Browse distributed announcements, advisories, and long-form company updates. Use search and categories to find what matters to your beat.',
      'Every page keeps the same structured content model—so RSS, sitemap, and on-site search stay in sync with what you see here.',
    ],
    links: [
      { label: 'Home', href: '/' },
      { label: 'Pricing & plans', href: '/pricing' },
      { label: 'Contact', href: '/contact' },
    ],
  },
}
