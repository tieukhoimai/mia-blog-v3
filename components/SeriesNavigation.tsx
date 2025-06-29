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

interface SeriesNavigationProps {
  currentSeries?: string
  currentSlug?: string
}

export default function SeriesNavigation({ currentSeries, currentSlug }: SeriesNavigationProps) {
  const [seriesData, setSeriesData] = useState<SeriesData>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentSeries) return

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
  }, [currentSeries])

  if (!currentSeries || loading) {
    return null
  }

  const seriesSlug = Object.keys(seriesData).find((key) =>
    seriesData[key].some((article) => article.series === currentSeries)
  )

  if (!seriesSlug || !seriesData[seriesSlug]) {
    return null
  }

  const articles = seriesData[seriesSlug]
  const currentIndex = articles.findIndex((article) => article.slug === currentSlug)

  return (
    <div className="series-navigation-container">
      <div className="series-navigation-header">
        <h3>
          🏷️ Series: <Link href="/series">{currentSeries}</Link>
        </h3>
        <p>{articles.length} articles in this series</p>
      </div>

      <div className="series-navigation-list">
        {articles.map((article, index) => {
          const isCurrent = article.slug === currentSlug
          const isCompleted = index < currentIndex
          const isUpcoming = index > currentIndex

          return (
            <div
              key={article.slug}
              className={`series-navigation-item ${
                isCurrent ? 'current' : isCompleted ? 'completed' : 'upcoming'
              }`}
            >
              <div className="series-navigation-number">{index + 1}</div>
              <div className="series-navigation-content">
                {isCurrent ? (
                  <span className="series-navigation-title current">{article.title}</span>
                ) : (
                  <Link href={`/${article.path}`} className="series-navigation-title">
                    {article.title}
                  </Link>
                )}
                <p className="series-navigation-summary">{article.summary}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
