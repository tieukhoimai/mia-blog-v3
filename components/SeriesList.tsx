'use client'

import { useState, useEffect } from 'react'
import Link from '@/components/Link'
import { slug } from 'github-slugger'

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
    return <div className="text-center py-8">Loading series...</div>
  }

  if (Object.keys(seriesData).length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No series found.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-8 md:gap-12">
      {Object.entries(seriesData).map(([seriesSlug, articles]) => {
        const seriesName = articles[0]?.series || seriesSlug
        const seriesIcon = '🏷️'

        return (
          <div key={seriesSlug} className="series-container">
            <div className="series-header">
              <h2 className="series-title">
                {seriesIcon} Series: {seriesName}
              </h2>
              <p className="series-description">
                {articles.length} article{articles.length > 1 ? 's' : ''} in this series
              </p>
            </div>

            <div className="series-articles">
              {articles.map((article, index) => (
                <div key={article.slug} className="series-article-item">
                  <div className="series-number">{index + 1}</div>
                  <div className="series-article-content">
                    <Link href={`/${article.path}`} className="series-article-title">
                      {article.title}
                    </Link>
                    <p className="series-article-summary">{article.summary}</p>
                    <div className="series-article-meta">
                      <time className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(article.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
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
