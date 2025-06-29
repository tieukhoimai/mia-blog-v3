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
}

interface SeriesData {
  [key: string]: SeriesArticle[]
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
    <div className="grid gap-10 md:gap-10">
      {Object.entries(seriesData).map(([seriesSlug, articles], index) => {
        const seriesName = articles[0]?.series || seriesSlug
        const seriesIcon = '🏷️'
        // const bgClass = bgVariants[index % bgVariants.length]

        return (
          <div
            key={seriesSlug}
            className="bg-teal-100 dark:bg-teal-950/30 border-l-4 border-teal-500 p-6 dark:border-teal-700"
          >
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-teal-900 dark:text-teal-100 flex items-center gap-2">
                {seriesIcon} <span>Series: {seriesName}</span>
              </h2>
              <p className="text-sm text-gray-700 dark:text-teal-300 mt-1">
                {articles.length} article{articles.length > 1 ? 's' : ''} in this series
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {articles.map((article, index) => (
                <div
                  key={article.slug}
                  className="flex flex-col md:flex-row items-start gap-4 bg-white dark:bg-teal-950/50 border border-gray-200 dark:border-teal-800 p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.01] hover:border-teal-400 dark:hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/40"
                >
                  <div className="bg-teal-500 dark:bg-teal-200 text-white dark:text-teal-900 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center font-bold text-xl md:text-2xl shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 text-left">
                    <Link
                      href={`/${article.path}`}
                      className="block text-lg md:text-xl font-semibold text-gray-900 dark:text-teal-100 hover:text-teal-800 dark:hover:text-teal-50 transition-colors"
                    >
                      {article.title}
                    </Link>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 mb-2 leading-relaxed">
                      {article.summary}
                    </p>
                    <time className="text-xs text-gray-500 dark:text-gray-400">{article.date}</time>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
