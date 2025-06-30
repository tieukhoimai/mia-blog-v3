'use client'

import { useState, useEffect } from 'react'
import Link from '@/components/Link'
import Tag from '@/components/Tag'

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

// Expandable summary component
function ExpandableSummary({ text, maxLength = 80 }: { text: string; maxLength?: number }) {
  const [expanded, setExpanded] = useState(false)

  const isLong = text.length > maxLength
  const displayText = expanded || !isLong ? text : text.slice(0, maxLength) + '...'

  return (
    <div className="text-sm text-gray-700 dark:text-gray-300 mt-1 mb-2 leading-relaxed">
      {displayText}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-1 text-teal-700 dark:text-teal-300 hover:underline"
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  )
}

export default function SeriesList() {
  const [seriesData, setSeriesData] = useState<SeriesData>({})
  const [loading, setLoading] = useState(true)

  // const bgVariants = [
  //   'bg-cyan-50',
  //   'bg-emerald-50',
  //   'bg-orange-50',
  //   'bg-indigo-50',
  //   'bg-yellow-50',
  //   'bg-rose-50',
  // ]

  useEffect(() => {
    fetch('/series-data.json')
      .then((response) => response.json())
      .then((data: SeriesData) => {
        setSeriesData(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error loading series data:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="text-center py-8 text-teal-700 dark:text-teal-300">Loading series...</div>
    )
  }

  if (Object.keys(seriesData).length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No series found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {Object.entries(seriesData).map(([seriesSlug, articles], index) => {
        const seriesName = articles[0]?.series || seriesSlug

        return (
          <div
            key={seriesSlug}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  📚
                </div>
                <div className="flex-1">
                  <Link
                    href={`/series/${seriesSlug}`}
                    className="text-2xl font-bold text-gray-900 dark:text-gray-100 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  >
                    {seriesName}
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    A comprehensive series of {articles.length} article
                    {articles.length > 1 ? 's' : ''} covering {seriesName.toLowerCase()} topics in
                    depth.
                  </p>
                </div>
                <Link
                  href={`/series/${seriesSlug}`}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30 border border-teal-300 dark:border-teal-700 rounded-md hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors"
                >
                  View Series
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>

              <div className="space-y-3">
                {articles
                  .slice()
                  .sort((a, b) => {
                    if (a.seriesOrder != null && b.seriesOrder != null) {
                      return a.seriesOrder - b.seriesOrder
                    }
                    if (a.seriesOrder != null) return -1
                    if (b.seriesOrder != null) return 1
                    return 0
                  })
                  .map((article, index) => (
                    <div
                      key={article.slug}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {article.seriesOrder || index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/${article.path}`}
                          className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-teal-600 dark:hover:text-teal-400 transition-colors truncate block"
                        >
                          {article.title}
                        </Link>
                        <div className="flex items-center justify-between">
                          <time className="text-xs text-gray-500 dark:text-gray-400">
                            {article.date}
                          </time>
                          {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {article.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs px-2 py-1 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                              {article.tags.length > 2 && (
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  +{article.tags.length - 2}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
