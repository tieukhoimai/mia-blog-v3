'use client'

import { useTheme } from 'next-themes'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from 'recharts'
import type { TimeSeriesPoint } from '@/lib/analytics'

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { value: number }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="border border-gray-200 bg-white px-3 py-2 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <p className="font-mono text-xs text-gray-400 dark:text-gray-500">{label}</p>
      <p className="font-mono text-sm font-medium text-gray-900 dark:text-gray-100">
        {payload[0].value.toLocaleString()}
        <span className="ml-1 text-xs font-normal text-gray-400 dark:text-gray-500">views</span>
      </p>
    </div>
  )
}

export default function PageviewChart({ data }: { data: TimeSeriesPoint[] }) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const strokeColor = isDark ? '#e5e7eb' : '#111827'
  const gradientStart = isDark ? '#374151' : '#d1d5db'
  const tickColor = isDark ? '#4b5563' : '#9ca3af'
  const gridColor = isDark ? '#1f2937' : '#f3f4f6'

  const avg = data.length ? Math.round(data.reduce((s, d) => s + d.views, 0) / data.length) : 0

  return (
    <div>
      <p className="mb-1 text-2xs tracking-[0.13em] text-gray-400 dark:text-gray-600">
        — pageviews
      </p>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={gradientStart} stopOpacity={0.6} />
              <stop offset="95%" stopColor={gradientStart} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke={gridColor} strokeDasharray="0" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10, fill: tickColor, fontFamily: 'monospace' }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 10, fill: tickColor, fontFamily: 'monospace' }}
            axisLine={false}
            tickLine={false}
            width={36}
            tickFormatter={(v: number) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v))}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: isDark ? '#4b5563' : '#d1d5db', strokeWidth: 1 }}
          />
          {avg > 0 && (
            <ReferenceLine
              y={avg}
              stroke={isDark ? '#374151' : '#e5e7eb'}
              strokeDasharray="4 4"
              strokeWidth={1}
            />
          )}
          <Area
            type="monotone"
            dataKey="views"
            stroke={strokeColor}
            strokeWidth={1.5}
            fill="url(#viewsGradient)"
            dot={false}
            activeDot={{ r: 4, fill: strokeColor, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
