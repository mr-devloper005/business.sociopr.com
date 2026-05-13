import { TaskListPage } from '@/components/tasks/task-list-page'
import { buildTaskMetadata } from '@/lib/seo'

export const revalidate = 3
export const generateMetadata = () => buildTaskMetadata('mediaDistribution')

export default async function UpdatesPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; sort?: string }>
}) {
  const sp = (await searchParams) || {}
  const sort = sp.sort === 'oldest' ? 'old' : 'new'
  return <TaskListPage task="mediaDistribution" category={sp.category} sort={sort} />
}
