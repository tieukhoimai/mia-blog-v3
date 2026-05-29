import { BetaAnalyticsDataClient } from '@google-analytics/data'

export type DateRange = 'all' | '365d' | '90d' | '30d'

export function getStartDate(range: DateRange): string {
  switch (range) {
    case 'all':
      return '2020-01-01'
    case '365d':
      return '364daysAgo'
    case '90d':
      return '89daysAgo'
    case '30d':
      return '29daysAgo'
  }
}

export interface OverviewStats {
  pageviews: number
  users: number
  avgSessionDuration: number // seconds
}

export interface TopPost {
  path: string
  title: string
  views: number
}

export interface TimeSeriesPoint {
  label: string
  views: number
}

export interface TopCountry {
  country: string
  users: number
}

export interface TopChannel {
  channel: string
  sessions: number
}

function getClient(): BetaAnalyticsDataClient | null {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!keyJson) return null
  try {
    const credentials = JSON.parse(keyJson)
    return new BetaAnalyticsDataClient({ credentials })
  } catch {
    return null
  }
}

const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export async function getAllTimePageviews(): Promise<number> {
  const client = getClient()
  if (!client || !propertyId) return 0

  try {
    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '2023-11-01', endDate: 'today' }],
      metrics: [{ name: 'screenPageViews' }],
    })
    return parseInt(response.rows?.[0]?.metricValues?.[0]?.value ?? '0', 10)
  } catch {
    return 0
  }
}

export function getPreviousPeriodDates(
  range: DateRange
): { startDate: string; endDate: string } | null {
  switch (range) {
    case '30d':
      return { startDate: '59daysAgo', endDate: '30daysAgo' }
    case '90d':
      return { startDate: '179daysAgo', endDate: '90daysAgo' }
    case '365d':
      return { startDate: '729daysAgo', endDate: '365daysAgo' }
    case 'all':
      return null
  }
}

export async function getOverviewStats(
  startDate: string,
  endDate = 'today'
): Promise<OverviewStats | null> {
  const client = getClient()
  if (!client || !propertyId) return null

  try {
    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'totalUsers' },
        { name: 'averageSessionDuration' },
      ],
    })

    const row = response.rows?.[0]
    if (!row?.metricValues) return null

    return {
      pageviews: parseInt(row.metricValues[0]?.value ?? '0', 10),
      users: parseInt(row.metricValues[1]?.value ?? '0', 10),
      avgSessionDuration: parseFloat(row.metricValues[2]?.value ?? '0'),
    }
  } catch {
    return null
  }
}

export async function getTopPosts(startDate: string, limit = 10): Promise<TopPost[]> {
  const client = getClient()
  if (!client || !propertyId) return []

  try {
    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit,
      dimensionFilter: {
        filter: {
          fieldName: 'pagePath',
          stringFilter: { matchType: 'BEGINS_WITH', value: '/blog/' },
        },
      },
    })

    return (response.rows ?? [])
      .map((row) => ({
        path: row.dimensionValues?.[0]?.value ?? '',
        title: row.dimensionValues?.[1]?.value ?? '',
        views: parseInt(row.metricValues?.[0]?.value ?? '0', 10),
      }))
      .filter((post) => post.path && post.path !== '/blog/')
  } catch {
    return []
  }
}

export async function getAllPostViews(startDate: string): Promise<TopPost[]> {
  const client = getClient()
  if (!client || !propertyId) return []

  try {
    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 200,
      dimensionFilter: {
        filter: {
          fieldName: 'pagePath',
          stringFilter: { matchType: 'BEGINS_WITH', value: '/blog/' },
        },
      },
    })

    return (response.rows ?? [])
      .map((row) => ({
        path: row.dimensionValues?.[0]?.value ?? '',
        title: row.dimensionValues?.[1]?.value ?? '',
        views: parseInt(row.metricValues?.[0]?.value ?? '0', 10),
      }))
      .filter((post) => post.path && post.path !== '/blog/')
  } catch {
    return []
  }
}

export async function getPageviewTimeSeries(range: DateRange): Promise<TimeSeriesPoint[]> {
  const client = getClient()
  if (!client || !propertyId) return []

  // Use daily granularity for short ranges, monthly for long ones
  const useDaily = range === '30d' || range === '90d'
  const dimension = useDaily ? 'date' : 'yearMonth'
  const startDate = getStartDate(range)

  try {
    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate: 'today' }],
      dimensions: [{ name: dimension }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [{ dimension: { dimensionName: dimension }, desc: false }],
    })

    return (response.rows ?? []).map((row) => {
      const val = row.dimensionValues?.[0]?.value ?? ''
      let label: string

      if (useDaily) {
        // val: "20240115" → "Jan 15"
        const year = val.substring(0, 4)
        const month = parseInt(val.substring(4, 6), 10) - 1
        const day = parseInt(val.substring(6, 8), 10)
        label = `${MONTH_NAMES[month]} ${day}`
        // Suppress repeated month names for readability
        void year
      } else {
        // val: "202401" → "Jan '24"
        const year = val.substring(2, 4)
        const month = parseInt(val.substring(4, 6), 10) - 1
        label = `${MONTH_NAMES[month]} '${year}`
      }

      return {
        label,
        views: parseInt(row.metricValues?.[0]?.value ?? '0', 10),
      }
    })
  } catch {
    return []
  }
}

export async function getTopCountries(startDate: string, limit = 8): Promise<TopCountry[]> {
  const client = getClient()
  if (!client || !propertyId) return []

  try {
    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate: 'today' }],
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'totalUsers' }],
      orderBys: [{ metric: { metricName: 'totalUsers' }, desc: true }],
      limit,
    })

    return (response.rows ?? []).map((row) => ({
      country: row.dimensionValues?.[0]?.value ?? '',
      users: parseInt(row.metricValues?.[0]?.value ?? '0', 10),
    }))
  } catch {
    return []
  }
}

export async function getTopChannels(startDate: string, limit = 8): Promise<TopChannel[]> {
  const client = getClient()
  if (!client || !propertyId) return []

  try {
    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate: 'today' }],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit,
    })

    return (response.rows ?? [])
      .map((row) => ({
        channel: row.dimensionValues?.[0]?.value ?? '',
        sessions: parseInt(row.metricValues?.[0]?.value ?? '0', 10),
      }))
      .filter((c) => c.channel && c.channel !== '(not set)')
  } catch {
    return []
  }
}
