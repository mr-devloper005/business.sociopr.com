export const siteTaskDefinitions = [
  {
    key: 'mediaDistribution',
    label: 'Release media',
    route: '/public-relation',
    description: 'Latest wire posts, company announcements, and distributed media updates.',
    contentType: 'mediaDistribution',
    enabled: true,
  },
] as const

export const siteTaskViews = {
  mediaDistribution: '/public-relation',
} as const
