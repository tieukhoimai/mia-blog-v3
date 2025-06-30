import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'
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
    return genPageMetadata({
      title: 'Series Not Found',
      description: 'The requested series could not be found.',
    })
  }

  const seriesTitle = articles[0]?.series || 'Article Series'

  return genPageMetadata({
    title: seriesTitle,
    description: `Complete article series: ${seriesTitle}. ${articles.length} articles covering in-depth topics.`,
  })
}

export async function generateStaticParams() {
  const seriesData = await getSeriesData()
  return Object.keys(seriesData).map((slug) => ({
    slug,
  }))
}

export default async function SeriesPage({ params }: Props) {
  const seriesData = await getSeriesData()
  const articles = seriesData[params.slug]

  if (!articles || articles.length === 0) {
    notFound()
  }

  // Sort articles by seriesOrder
  const sortedArticles = [...articles].sort((a, b) => {
    const orderA = a.seriesOrder ?? 999
    const orderB = b.seriesOrder ?? 999
    return orderA - orderB
  })

  const seriesTitle = articles[0]?.series || 'Article Series'

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/series"
            className="text-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            ← Back to All Series
          </Link>
        </div>

        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          📚 {seriesTitle}
        </h1>

        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          A comprehensive series of {sortedArticles.length} articles covering{' '}
          {seriesTitle.toLowerCase()} topics in depth.
        </p>
      </div>

      <div className="py-8">
        <div className="space-y-6">
          {sortedArticles.map((article, index) => (
            <article
              key={article.slug}
              className="group relative p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-all duration-200"
            >
              <div className="flex gap-6">
                {/* Article Number */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                </div>

                {/* Article Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <time
                      dateTime={article.date}
                      className="text-sm text-gray-500 dark:text-gray-400"
                    >
                      {formatDate(article.date, siteMetadata.locale)}
                    </time>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    <Link href={`/${article.path}`} className="hover:no-underline">
                      {article.title}
                    </Link>
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3 overflow-hidden mb-3">
                    {article.summary}
                  </p>

                  {/* Tags */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  )}

                  <div className="mt-4">
                    <Link
                      href={`/${article.path}`}
                      className="inline-flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors"
                    >
                      Read article
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
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
