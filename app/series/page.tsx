import { genPageMetadata } from 'app/seo'
import SeriesList from '@/components/SeriesList'

export const metadata = genPageMetadata({
  title: 'Series',
  description: 'Article series on various topics',
})

export default function SeriesPage() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Article Series
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Discover comprehensive article series covering various topics in depth
          </p>
        </div>
        <div className="py-8">
          <SeriesList />
        </div>
      </div>
    </>
  )
}
