import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { BestpressHomepage } from '@/components/press/bestpress-homepage'

export const HOME_PAGE_OVERRIDE_ENABLED = true

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 20, { allowMockFallback: true, fresh: false, revalidate: 120 })
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${baseUrl}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />
      <BestpressHomepage posts={posts} />
      <Footer />
    </div>
  )
}
