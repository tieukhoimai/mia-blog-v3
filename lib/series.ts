import fs from 'fs'
import path from 'path'

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

export function getSeriesData(): SeriesData {
  try {
    const seriesDataPath = path.join(process.cwd(), 'app', 'series-data.json')
    const fileContents = fs.readFileSync(seriesDataPath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error reading series data:', error)
    return {}
  }
}

export function getSeriesForArticle(articleSeries: string): SeriesArticle[] {
  const seriesData = getSeriesData()
  const seriesSlug = Object.keys(seriesData).find((key) =>
    seriesData[key].some((article) => article.series === articleSeries)
  )
  
  return seriesSlug ? seriesData[seriesSlug] : []
}

export function getAllSeries(): {
  [key: string]: { name: string; articles: SeriesArticle[]; count: number }
} {
  const seriesData = getSeriesData()
  const result: { [key: string]: { name: string; articles: SeriesArticle[]; count: number } } = {}
  
  Object.entries(seriesData).forEach(([slug, articles]) => {
    if (articles.length > 0) {
      result[slug] = {
        name: articles[0].series,
        articles,
        count: articles.length,
      }
    }
  })
  
  return result
}
