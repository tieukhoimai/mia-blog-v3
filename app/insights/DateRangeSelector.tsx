'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import type { DateRange } from '@/lib/analytics'

const RANGES: { value: DateRange; label: string; shortLabel: string }[] = [
  { value: 'all', label: 'All time', shortLabel: 'All' },
  { value: '365d', label: '12 months', shortLabel: '12m' },
  { value: '90d', label: '3 months', shortLabel: '3m' },
  { value: '30d', label: 'Last month', shortLabel: '1m' },
]

export default function DateRangeSelector({ current }: { current: DateRange }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <div
      className={`inline-flex overflow-hidden rounded border border-gray-200 dark:border-gray-700 ${isPending ? 'opacity-50' : ''}`}
    >
      {RANGES.map((r, i) => (
        <button
          key={r.value}
          onClick={() => startTransition(() => router.push(`/insights?range=${r.value}`))}
          disabled={isPending}
          className={[
            'px-3 py-1.5 text-xs transition-colors sm:px-4 sm:text-sm',
            i < RANGES.length - 1 ? 'border-r border-gray-200 dark:border-gray-700' : '',
            current === r.value
              ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200',
          ].join(' ')}
        >
          <span className="sm:hidden">{r.shortLabel}</span>
          <span className="hidden sm:inline">{r.label}</span>
        </button>
      ))}
    </div>
  )
}
