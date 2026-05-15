'use client'

import { useState, useEffect } from 'react'
import Link from '@/components/Link'

interface SeriesArticle {
  title: string
  slug: string
  series: string
  path: string
  seriesOrder?: number | null
}

interface SeriesData {
  [key: string]: SeriesArticle[]
}

interface SeriesNavigationProps {
  currentSeries: string
  currentSlug: string
}

export default function SeriesNavigation({ currentSeries, currentSlug }: SeriesNavigationProps) {
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

  if (loading || !currentSeries) return null

  const seriesSlug = Object.keys(seriesData).find((slug) =>
    seriesData[slug].some((a) => a.series === currentSeries)
  )

  if (!seriesSlug || !seriesData[seriesSlug]) return null

  const articles = [...seriesData[seriesSlug]].sort((a, b) => {
    if (a.seriesOrder != null && b.seriesOrder != null) return a.seriesOrder - b.seriesOrder
    if (a.seriesOrder != null) return -1
    if (b.seriesOrder != null) return 1
    return 0
  })

  return (
    <div className="my-10 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-800 dark:bg-gray-900/50">
        <p className="mb-0.5 text-[10px] uppercase tracking-[0.12em] text-gray-400 dark:text-gray-600">
          Part of series
        </p>
        <Link
          href={`/series/${seriesSlug}`}
          className="text-[13.5px] font-semibold text-gray-900 transition-colors hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-400"
        >
          {currentSeries} ↗
        </Link>
      </div>

      {/* Article list */}
      <ul className="py-2">
        {articles.map((article, index) => {
          const isCurrent = article.slug === currentSlug
          const num = String(article.seriesOrder ?? index + 1)

          return (
            <li key={article.slug}>
              {isCurrent ? (
                <div className="flex items-center gap-3 bg-gray-100 px-5 py-2.5 dark:bg-gray-800/60">
                  <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-gray-900 font-mono text-[11px] text-white dark:bg-gray-100 dark:text-gray-900">
                    {num}
                  </span>
                  <span className="text-[13px] font-semibold text-gray-900 dark:text-gray-100">
                    {article.title}
                  </span>
                </div>
              ) : (
                <Link
                  href={`/${article.path}`}
                  className="flex items-center gap-3 px-5 py-2.5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/40"
                >
                  <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-gray-100 font-mono text-[11px] text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    {num}
                  </span>
                  <span className="text-[13px] text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                    {article.title}
                  </span>
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
