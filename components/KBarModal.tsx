'use client'

import {
  KBarPortal,
  KBarSearch,
  KBarAnimator,
  KBarPositioner,
  KBarResults,
  useMatches,
  useRegisterActions,
} from 'kbar'
import type { Action } from 'kbar'

const DocumentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
    />
  </svg>
)

const RenderResults = () => {
  const { results } = useMatches()

  if (!results.length) {
    return (
      <div className="px-4 py-10 text-center text-sm text-gray-400 dark:text-gray-500">
        No results found.
      </div>
    )
  }

  return (
    <div className="max-h-80 overflow-y-auto py-2">
      <KBarResults
        items={results}
        onRender={({ item, active }) => {
          if (typeof item === 'string') {
            return (
              <div className="px-4 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {item}
              </div>
            )
          }
          return (
            <div
              className={`mx-2 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                active ? 'bg-gray-100 dark:bg-gray-800' : 'bg-transparent'
              }`}
            >
              <DocumentIcon />
              <div className="min-w-0 flex-1">
                <div
                  className={`truncate text-sm ${
                    active
                      ? 'font-medium text-gray-900 dark:text-gray-100'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {item.name}
                </div>
                {item.subtitle && (
                  <div className="mt-0.5 truncate text-xs text-gray-400 dark:text-gray-500">
                    {item.subtitle}
                  </div>
                )}
              </div>
            </div>
          )
        }}
      />
    </div>
  )
}

export default function KBarModal({
  actions,
  isLoading,
}: {
  actions: Action[]
  isLoading: boolean
}) {
  useRegisterActions(actions, [actions])

  return (
    <KBarPortal>
      <KBarPositioner className="z-50 bg-black/40 backdrop-blur-sm dark:bg-black/60">
        <KBarAnimator className="w-full max-w-lg">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-1 dark:border-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <KBarSearch
                className="h-14 flex-1 border-0 bg-transparent text-sm text-gray-900 placeholder-gray-400 shadow-none focus:border-0 focus:outline-none focus:ring-0 dark:text-gray-100 dark:placeholder-gray-500"
                defaultPlaceholder="Search posts..."
              />
              <kbd className="rounded border border-gray-200 px-1.5 py-0.5 font-mono text-xs text-gray-400 dark:border-gray-700 dark:text-gray-500">
                ESC
              </kbd>
            </div>
            {isLoading ? (
              <div className="px-4 py-10 text-center text-sm text-gray-400 dark:text-gray-500">
                Loading...
              </div>
            ) : (
              <RenderResults />
            )}
          </div>
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  )
}
