import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'

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

async function getSeriesData(): Promise<SeriesData> {
  const fs = await import('fs')
  const path = await import('path')

  try {
    const filePath = path.join(process.cwd(), 'app', 'series-data.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error loading series data:', error)
    return {}
  }
}

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const seriesData = await getSeriesData()
  const articles = seriesData[params.slug]

  if (!articles || articles.length === 0) {
    return genPageMetadata({ title: 'Series Not Found', description: '' })
  }

  const seriesTitle = articles[0]?.series || 'Article Series'
  return genPageMetadata({
    title: seriesTitle,
    description: `${articles.length} articles covering ${seriesTitle.toLowerCase()} in depth.`,
  })
}

export async function generateStaticParams() {
  const seriesData = await getSeriesData()
  return Object.keys(seriesData).map((slug) => ({ slug }))
}

export default async function SeriesPage({ params }: Props) {
  const seriesData = await getSeriesData()
  const articles = seriesData[params.slug]

  if (!articles || articles.length === 0) notFound()

  const sortedArticles = [...articles].sort((a, b) => {
    const orderA = a.seriesOrder ?? 999
    const orderB = b.seriesOrder ?? 999
    return orderA - orderB
  })

  const seriesTitle = articles[0]?.series || 'Article Series'

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-8">
      {/* Back link */}
      <Link
        href="/series"
        className="mb-8 inline-flex items-center gap-1 text-xs text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
      >
        ← All series
      </Link>

      {/* Heading */}
      <div className="mb-10">
        <p className="mb-1 text-2xs tracking-[0.13em] text-gray-400 dark:text-gray-600">— series</p>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          {seriesTitle}
        </h1>
        <p className="mt-1 font-mono text-xs text-gray-400 dark:text-gray-600">
          {sortedArticles.length} articles
        </p>
      </div>

      {/* Article list */}
      <ul className="divide-y divide-gray-100 dark:divide-gray-800">
        {sortedArticles.map((article, index) => (
          <li key={article.slug} className="py-6 first:pt-0">
            <div className="flex items-start gap-4">
              {/* Number */}
              <span className="mt-0.5 w-6 shrink-0 font-mono text-xs text-gray-400 dark:text-gray-600">
                {String(article.seriesOrder ?? index + 1).padStart(2, '0')}
              </span>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <p className="mb-0.5 text-xs tracking-[0.04em] text-gray-400 dark:text-gray-600">
                  <time dateTime={article.date}>
                    {formatDate(article.date, siteMetadata.locale)}
                  </time>
                </p>
                <h2 className="mb-2 text-base font-semibold leading-snug tracking-[-0.02em] text-gray-900 dark:text-gray-100">
                  <Link
                    href={`/${article.path}`}
                    className="transition-colors hover:text-gray-600 dark:hover:text-gray-400"
                  >
                    {article.title}
                  </Link>
                </h2>
                <p className="mb-3 text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">
                  {article.summary}
                </p>
                <Link
                  href={`/${article.path}`}
                  className="text-xs text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Read article →
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
