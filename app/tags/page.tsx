import Link from '@/components/Link'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-8">
      <div className="mb-10">
        <p className="mb-1 text-[10.5px] tracking-[0.13em] text-gray-400 dark:text-gray-600">
          — tags
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          Tags
        </h1>
      </div>

      {tagKeys.length === 0 ? (
        <p className="text-[13px] text-gray-400 dark:text-gray-600">No tags found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-12 sm:grid-cols-3">
          {sortedTags.map((t) => (
            <Link
              key={t}
              href={`/tags/${slug(t)}`}
              aria-label={`View posts tagged ${t}`}
              className="flex justify-between border-b border-gray-100 py-2 text-[13px] transition-colors hover:text-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <span className="text-gray-600 dark:text-gray-400">{t}</span>
              <span className="font-mono text-[11px] text-gray-400 dark:text-gray-600">
                {tagCounts[t]}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
