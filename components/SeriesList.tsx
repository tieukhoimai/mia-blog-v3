'use client'

import { useState, useEffect } from 'react'
import Link from '@/components/Link'

interface SeriesArticle {
  title: string
  date: string
  summary: string
  slug: string
  image: string
  series: string
  path: string
  seriesOrder?: number | null
  tags: string[]
}

interface SeriesData {
  [key: string]: SeriesArticle[]
}

const PREVIEW_COUNT = 5

export default function SeriesList() {
  const [seriesData, setSeriesData] = useState<SeriesData>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/series-data.json')
      .then((res) => res.json())
      .then((data: SeriesData) => {
        setSeriesData(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return <p className="py-4 font-mono text-[11px] text-gray-400 dark:text-gray-600">Loading...</p>
  }

  if (Object.keys(seriesData).length === 0) {
    return <p className="text-sm text-gray-500 dark:text-gray-400">No series found.</p>
  }

  return (
    <div className="space-y-5">
      {Object.entries(seriesData).map(([seriesSlug, articles]) => {
        const seriesName = articles[0]?.series || seriesSlug
        const sorted = [...articles].sort((a, b) => {
          if (a.seriesOrder != null && b.seriesOrder != null) return a.seriesOrder - b.seriesOrder
          if (a.seriesOrder != null) return -1
          if (b.seriesOrder != null) return 1
          return 0
        })
        const extra = sorted.length - PREVIEW_COUNT

        return (
          <div
            key={seriesSlug}
            className="rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-600"
          >
            <Link
              href={`/series/${seriesSlug}`}
              className="text-[17px] font-semibold text-gray-900 transition-colors hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-400"
            >
              {seriesName}
            </Link>
            <p className="mb-5 mt-1 font-mono text-[11.5px] text-gray-400 dark:text-gray-600">
              {articles.length} articles
            </p>

            <div className="flex flex-col gap-2">
              {sorted.slice(0, PREVIEW_COUNT).map((article, i) => (
                <div key={article.slug} className="flex items-baseline gap-3 text-[13px]">
                  <span className="w-5 shrink-0 font-mono text-[10px] text-gray-400 dark:text-gray-600">
                    {String(article.seriesOrder ?? i + 1).padStart(2, '0')}
                  </span>
                  <Link
                    href={`/${article.path}`}
                    className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    {article.title}
                  </Link>
                </div>
              ))}
              {extra > 0 && (
                <p className="pl-8 text-[12px] text-gray-400 dark:text-gray-600">
                  + {extra} more articles
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
