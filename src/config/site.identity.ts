export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'q4covnfbb4',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Business Sociopr',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Media Press Wire & Distribution',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Business Sociopr is a trusted media press wire for distributing company announcements, press releases, and investor updates to journalists and newsrooms worldwide.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'business.sociopr.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://business.sociopr.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || '',
} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const
