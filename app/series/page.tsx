import { genPageMetadata } from 'app/seo'
import SeriesList from '@/components/SeriesList'

export const metadata = genPageMetadata({
  title: 'Series',
  description: 'Article series on various topics',
})

export default function SeriesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-8">
      <div className="mb-10">
        <p className="mb-1 text-2xs tracking-[0.13em] text-gray-400 dark:text-gray-600">— series</p>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          Collections
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Let's go deep, stay curious, and map it all out — one series at a time.
        </p>
      </div>
      <SeriesList />
    </div>
  )
}
