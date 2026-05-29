'use client'

import { useTheme } from 'next-themes'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { TopChannel } from '@/lib/analytics'

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
    <div className="border border-gray-100 bg-white px-3 py-2 dark:border-gray-800 dark:bg-gray-950">
      <p className="font-mono text-xs text-gray-400 dark:text-gray-600">{label}</p>
      <p className="font-mono text-sm text-gray-900 dark:text-gray-100">
        {payload[0].value.toLocaleString()} sessions
      </p>
    </div>
  )
}

export default function ChannelChart({ data }: { data: TopChannel[] }) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const tickColor = isDark ? '#4b5563' : '#9ca3af'
  const maxSessions = data[0]?.sessions ?? 1

  // Gradient of gray shades from darkest (top) to lightest
  const barColors = isDark
    ? ['#d1d5db', '#9ca3af', '#6b7280', '#4b5563', '#374151', '#374151', '#374151', '#374151']
    : ['#374151', '#4b5563', '#6b7280', '#9ca3af', '#d1d5db', '#d1d5db', '#d1d5db', '#d1d5db']

  const chartData = data.map((d) => ({ ...d, pct: (d.sessions / maxSessions) * 100 }))

  return (
    <ResponsiveContainer width="100%" height={data.length * 36 + 16}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        barCategoryGap={8}
      >
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="channel"
          width={130}
          tick={{ fontSize: 12, fill: tickColor, fontFamily: 'inherit' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: isDark ? '#1f2937' : '#f9fafb' }} />
        <Bar dataKey="sessions" radius={0} maxBarSize={14}>
          {chartData.map((_, i) => (
            <Cell key={i} fill={barColors[i] ?? barColors[barColors.length - 1]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
