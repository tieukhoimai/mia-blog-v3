import { genPageMetadata } from 'app/seo'
import {
  type DateRange,
  getStartDate,
  getOverviewStats,
  getTopPosts,
  getPageviewTimeSeries,
  getTopCountries,
  getTopSources,
  getPreviousPeriodDates,
} from '@/lib/analytics'
import { getAllSeries } from '@/lib/series'
import Link from '@/components/Link'
import PageviewChart from './PageviewChart'
import WorldMap from './WorldMap'
import DateRangeSelector from './DateRangeSelector'

export const metadata = genPageMetadata({
  title: 'Insights',
  description: 'Blog analytics and reading statistics',
})

const VALID_RANGES: DateRange[] = ['all', '365d', '90d', '30d']
const RANGE_LABEL: Record<DateRange, string> = {
  all: 'across all time',
  '365d': 'over the last 12 months',
  '90d': 'over the last 3 months',
  '30d': 'last month',
}

const SOURCE_LABELS: Record<string, string> = {
  '(direct)': 'Direct',
  google: 'Google',
  bing: 'Bing',
  'cn.bing.com': 'Bing',
  duckduckgo: 'DuckDuckGo',
  yahoo: 'Yahoo',
  ecosia: 'Ecosia',
  'ecosia.org': 'Ecosia',
  'linkedin.com': 'LinkedIn',
  'lnkd.in': 'LinkedIn',
  't.co': 'Twitter / X',
  'twitter.com': 'Twitter / X',
  'x.com': 'Twitter / X',
  'github.com': 'GitHub',
  'facebook.com': 'Facebook',
  'l.facebook.com': 'Facebook',
  'lm.facebook.com': 'Facebook',
  'm.facebook.com': 'Facebook',
  'instagram.com': 'Instagram',
  'l.instagram.com': 'Instagram',
  'reddit.com': 'Reddit',
  'medium.com': 'Medium',
  'dev.to': 'dev.to',
  'news.ycombinator.com': 'Hacker News',
  hackernews: 'Hacker News',
  'substack.com': 'Substack',
  'youtube.com': 'YouTube',
  'l.threads.com': 'Threads',
  'l.threads.net': 'Threads',
  'www.threads.net': 'Threads',
  'chatgpt.com': 'ChatGPT',
  'gemini.google.com': 'Google Gemini',
  'lens.google.com': 'Google Lens',
  'perplexity.ai': 'Perplexity',
  'unsplash.com': 'Unsplash',
  'vercel.com': 'Vercel',
  zalo: 'Zalo',
  'chat.zalo.me': 'Zalo',
  'statics.teams.cdn.office.net': 'Microsoft Teams',
}

function normalizeSource(src: string): string {
  const lower = src.toLowerCase()
  if (SOURCE_LABELS[lower]) return SOURCE_LABELS[lower]
  if (lower.endsWith('.pages.github.io')) return 'GitHub Pages'
  if (lower.endsWith('.google.com')) return 'Google'
  if (lower.endsWith('.bing.com')) return 'Bing'
  if (lower.endsWith('.facebook.com')) return 'Facebook'
  if (lower.endsWith('.instagram.com')) return 'Instagram'
  if (lower.endsWith('.linkedin.com')) return 'LinkedIn'
  if (lower.endsWith('.youtube.com')) return 'YouTube'
  if (lower.endsWith('.reddit.com')) return 'Reddit'
  if (lower.endsWith('.threads.net')) return 'Threads'
  return src
}

function formatSourceMedium(sourceMedium: string): string {
  if (sourceMedium === '(direct) / (none)') return 'Direct'
  const slash = sourceMedium.lastIndexOf(' / ')
  if (slash === -1) return normalizeSource(sourceMedium)
  const src = sourceMedium.slice(0, slash)
  const medium = sourceMedium.slice(slash + 3)
  const label = normalizeSource(src)
  const HIDE_MEDIUMS = new Set(['(none)', '(not set)', src.toLowerCase(), label.toLowerCase()])
  if (!medium || HIDE_MEDIUMS.has(medium.toLowerCase())) return label
  return `${label} / ${medium}`
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60)
  if (m === 0) return `${s}s`
  return `${m}m ${s}s`
}

function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US').format(n)
}

function Delta({ value }: { value: number | null }) {
  if (value === null) return null
  const sign = value >= 0 ? '+' : ''
  return (
    <span className="ml-2 font-mono text-xs text-gray-400 dark:text-gray-600">
      {sign}
      {value}%
    </span>
  )
}

function calcDelta(current: number, previous: number): number | null {
  if (previous === 0) return null
  return Math.round(((current - previous) / previous) * 100)
}

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>
}) {
  const { range: rawRange } = await searchParams
  const range: DateRange = VALID_RANGES.includes(rawRange as DateRange)
    ? (rawRange as DateRange)
    : '365d'
  const startDate = getStartDate(range)
  const prevDates = getPreviousPeriodDates(range)

  const [overview, prevOverview, allPosts, timeSeries, topCountries, topSources] =
    await Promise.all([
      getOverviewStats(startDate),
      prevDates ? getOverviewStats(prevDates.startDate, prevDates.endDate) : Promise.resolve(null),
      getTopPosts(startDate, 200),
      getPageviewTimeSeries(range),
      getTopCountries(startDate, 50),
      getTopSources(startDate, 30),
    ])

  const stats = overview ?? { pageviews: 0, users: 0, avgSessionDuration: 0 }
  const topPosts = allPosts.slice(0, 10)

  const deltas = prevOverview
    ? {
        pageviews: calcDelta(stats.pageviews, prevOverview.pageviews),
        users: calcDelta(stats.users, prevOverview.users),
        avgSessionDuration: calcDelta(stats.avgSessionDuration, prevOverview.avgSessionDuration),
      }
    : null

  // Merge sources that normalize to the same display label (e.g. l.facebook.com + lm.facebook.com → Facebook)
  const sourceMap = new Map<string, number>()
  topSources.forEach((item) => {
    const label = formatSourceMedium(item.source)
    sourceMap.set(label, (sourceMap.get(label) ?? 0) + item.sessions)
  })
  const allMergedSources = Array.from(sourceMap.entries())
    .map(([source, sessions]) => ({ source, sessions }))
    .sort((a, b) => b.sessions - a.sessions)
  const TOP_N = 7
  const mergedSources = allMergedSources.slice(0, TOP_N)
  const otherSessions = allMergedSources.slice(TOP_N).reduce((sum, s) => sum + s.sessions, 0)
  if (otherSessions > 0) mergedSources.push({ source: 'Other', sessions: otherSessions })

  // Compute views per series.
  // Use title as primary key (stable across URL renames) and sum across all matching paths.
  // Fall back to slug for articles whose titles don't appear in GA4 data.
  const viewsByTitle: Record<string, number> = {}
  const viewsBySlug: Record<string, number> = {}
  allPosts.forEach((p) => {
    const title = p.title.split(' | ')[0].trim()
    if (title) viewsByTitle[title] = (viewsByTitle[title] ?? 0) + p.views
    const slug = p.path.split('/').pop()?.split('?')[0]
    if (slug) viewsBySlug[slug] = (viewsBySlug[slug] ?? 0) + p.views
  })

  const allSeriesData = getAllSeries()
  const seriesViews = Object.entries(allSeriesData)
    .map(([slug, { name, articles, count }]) => {
      const totalViews = articles.reduce((sum, article) => {
        return sum + (viewsByTitle[article.title] ?? viewsBySlug[article.slug] ?? 0)
      }, 0)
      return { slug, name, views: totalViews, count }
    })
    .sort((a, b) => b.views - a.views)

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-8">
      {/* Header */}
      <div className="mb-10">
        <p className="mb-1 text-2xs tracking-[0.13em] text-gray-400 dark:text-gray-600">
          — insights
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          Insights
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Let's read the numbers, spot the patterns, and write what the data says —{' '}
          {RANGE_LABEL[range]}.
        </p>
        <div className="mt-4">
          <DateRangeSelector current={range} />
        </div>
      </div>

      {!process.env.GOOGLE_SERVICE_ACCOUNT_KEY || !process.env.GOOGLE_ANALYTICS_PROPERTY_ID ? (
        <p className="text-sm text-gray-400 dark:text-gray-600">
          Analytics not configured. Set{' '}
          <code className="font-mono text-xs">GOOGLE_ANALYTICS_PROPERTY_ID</code> and{' '}
          <code className="font-mono text-xs">GOOGLE_SERVICE_ACCOUNT_KEY</code> to enable this page.
        </p>
      ) : (
        <>
          {/* Pageview chart */}
          {timeSeries.length > 0 && (
            <div className="mb-10">
              <PageviewChart data={timeSeries} />
            </div>
          )}

          {/* Stats row — 3 cards */}
          <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="border border-gray-200 bg-gray-100 px-5 py-4 sm:px-6 sm:py-5 dark:border-gray-700 dark:bg-gray-800">
              <p className="font-mono text-2xl font-light text-gray-900 dark:text-gray-100">
                {formatNumber(stats.pageviews)}
                <Delta value={deltas?.pageviews ?? null} />
              </p>
              <p className="mt-1 text-2xs tracking-wide text-gray-400 dark:text-gray-600">
                Pageviews
              </p>
            </div>
            <div className="border border-gray-200 bg-gray-100 px-5 py-4 sm:px-6 sm:py-5 dark:border-gray-700 dark:bg-gray-800">
              <p className="font-mono text-2xl font-light text-gray-900 dark:text-gray-100">
                {formatNumber(stats.users)}
                <Delta value={deltas?.users ?? null} />
              </p>
              <p className="mt-1 text-2xs tracking-wide text-gray-400 dark:text-gray-600">
                Unique visitors
              </p>
            </div>
            <div className="col-span-2 border border-gray-200 bg-gray-100 px-5 py-4 sm:col-span-1 sm:px-6 sm:py-5 dark:border-gray-700 dark:bg-gray-800">
              <p className="font-mono text-2xl font-light text-gray-900 dark:text-gray-100">
                {formatDuration(stats.avgSessionDuration)}
                <Delta value={deltas?.avgSessionDuration ?? null} />
              </p>
              <p className="mt-1 text-2xs tracking-wide text-gray-400 dark:text-gray-600">
                Avg. session
              </p>
            </div>
          </div>

          {/* Traffic source + World map */}
          {(topSources.length > 0 || topCountries.length > 0) && (
            <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div>
                <p className="mb-4 text-2xs tracking-[0.13em] text-gray-400 dark:text-gray-600">
                  — sessions by source
                </p>
                {mergedSources.length > 0 ? (
                  <ul>
                    {mergedSources.map((item) => {
                      const pct = Math.round((item.sessions / mergedSources[0].sessions) * 100)
                      return (
                        <li key={item.source} className="py-3 first:pt-0 last:pb-0">
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {formatSourceMedium(item.source)}
                            </span>
                            <span className="ml-3 shrink-0 font-mono text-xs text-gray-400 dark:text-gray-600">
                              {item.sessions.toLocaleString()}
                            </span>
                          </div>
                          <div className="h-px w-full bg-gray-100 dark:bg-gray-800">
                            <div
                              className="h-px bg-gray-400 dark:bg-gray-600"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400 dark:text-gray-600">No data.</p>
                )}
              </div>

              <div className="sm:col-span-2">
                {topCountries.length > 0 && <WorldMap data={topCountries} />}
              </div>
            </div>
          )}

          {/* Series views + Posts views */}
          <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <p className="mb-4 text-2xs tracking-[0.13em] text-gray-400 dark:text-gray-600">
                — views by series
              </p>
              <ul className="space-y-4">
                {seriesViews.map((s) => (
                  <li key={s.slug}>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/series/${s.slug}`}
                        className="text-sm leading-snug text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                      >
                        {s.name}
                      </Link>
                      <span className="shrink-0 font-mono text-xs text-gray-400 dark:text-gray-600">
                        {formatNumber(s.views)}
                      </span>
                    </div>
                    <p className="mt-0.5 font-mono text-xs text-gray-400 dark:text-gray-600">
                      {s.count} {s.count === 1 ? 'article' : 'articles'}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sm:col-span-2">
              <p className="mb-4 text-2xs tracking-[0.13em] text-gray-400 dark:text-gray-600">
                — views by posts
              </p>
              <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                {topPosts.map((post, i) => (
                  <li key={post.path} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <span className="w-5 shrink-0 font-mono text-xs text-gray-400 dark:text-gray-600">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Link
                      href={post.path}
                      className="min-w-0 flex-1 truncate text-sm text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                    >
                      {post.title.split(' | ')[0]}
                    </Link>
                    <span className="shrink-0 font-mono text-xs text-gray-400 dark:text-gray-600">
                      {formatNumber(post.views)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
