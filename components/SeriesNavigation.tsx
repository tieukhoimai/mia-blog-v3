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

interface SeriesNavigationProps {
  currentSeries: string
  currentSlug: string
}

export default function SeriesNavigation({ currentSeries, currentSlug }: SeriesNavigationProps) {
  const [seriesData, setSeriesData] = useState<SeriesData>({})
  const [loading, setLoading] = useState(true)

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

  if (loading || !currentSeries) {
    return null
  }

  // Find the series slug from the series name
  const seriesSlug = Object.keys(seriesData).find((slug) =>
    seriesData[slug].some((article) => article.series === currentSeries)
  )

  if (!seriesSlug || !seriesData[seriesSlug]) {
    return null
  }

  const articles = seriesData[seriesSlug].slice().sort((a, b) => {
    // Sort by seriesOrder if available
    if (a.seriesOrder != null && b.seriesOrder != null) {
      return a.seriesOrder - b.seriesOrder
    }
    if (a.seriesOrder != null) return -1
    if (b.seriesOrder != null) return 1
    return 0
  })

  const currentIndex = articles.findIndex((article) => article.slug === currentSlug)
  const previousArticle = currentIndex > 0 ? articles[currentIndex - 1] : null
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null

  return (
    <div className="my-8 p-6 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/50 dark:to-cyan-950/50 border border-teal-200 dark:border-teal-800 rounded-lg">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-teal-900 dark:text-teal-100 mb-2">
          📚 Part of Series:{' '}
          <Link
            href={`/series/${seriesSlug}`}
            className="hover:text-teal-700 dark:hover:text-teal-300 transition-colors underline decoration-2 underline-offset-2"
          >
            {currentSeries}
          </Link>
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Article {currentIndex + 1} of {articles.length} in this series
        </p>
      </div>

      {/* Series overview with article list */}
      <div className="mt-4">
        <div className="space-y-2">
          {articles.map((article, index) => (
            <div
              key={article.slug}
              className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                article.slug === currentSlug
                  ? 'bg-teal-100 dark:bg-teal-900/50 border-l-4 border-teal-500'
                  : 'hover:bg-white dark:hover:bg-teal-900/20'
              }`}
            >
              <div
                className={`w-8 h-8 flex items-center justify-center text-sm font-bold rounded-full ${
                  article.slug === currentSlug
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {article.seriesOrder || index + 1}
              </div>
              <div className="flex-1">
                {article.slug === currentSlug ? (
                  <span className="text-sm font-medium text-teal-900 dark:text-teal-100">
                    {article.title}
                  </span>
                ) : (
                  <Link
                    href={`/${article.path}`}
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                  >
                    {article.title}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
