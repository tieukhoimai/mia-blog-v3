/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

const TAG_BAR_LIMIT = 12

function shortDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="pt-8 pb-4">
      <nav className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
        {!prevPage && (
          <button className="cursor-auto opacity-40" disabled>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span className="font-mono text-xs text-gray-400">
          {currentPage} / {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto opacity-40" disabled>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])
  const barTags = sortedTags.slice(0, TAG_BAR_LIMIT)
  const extraCount = sortedTags.length - TAG_BAR_LIMIT

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts
  const isAllPosts = pathname === '/blog'

  // Group posts by year for the archive layout
  const postsByYear = displayPosts.reduce<Record<number, typeof displayPosts>>((acc, post) => {
    const year = new Date(post.date).getFullYear()
    ;(acc[year] ??= []).push(post)
    return acc
  }, {})
  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-8">
      {/* Page heading */}
      <div className="mb-8">
        <p className="mb-1 text-2xs tracking-[0.13em] text-gray-400 dark:text-gray-600">— blog</p>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          {title}
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Let's explore the source of my reflections — on data, AI, and everything that sits between
          a raw dataset and a good decision — turn complexity into clarity, and share it all in the
          most naive way.
        </p>
      </div>

      {/* Horizontal tag pill bar */}
      <div
        className="mb-10 flex gap-2 overflow-x-auto pb-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <Link
          href="/blog"
          className={`flex-shrink-0 rounded-full px-3 py-1 text-xs transition-colors ${
            isAllPosts
              ? 'bg-gray-900 text-gray-100 dark:bg-gray-100 dark:text-gray-900'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
          }`}
        >
          All
        </Link>
        {barTags.map((tag) => {
          const tagSlug = slug(tag)
          const isActive = pathname === `/tags/${tagSlug}`
          return (
            <Link
              key={tag}
              href={`/tags/${tagSlug}`}
              className={`flex-shrink-0 rounded-full px-3 py-1 text-xs transition-colors ${
                isActive
                  ? 'bg-gray-900 text-gray-100 dark:bg-gray-100 dark:text-gray-900'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              {tag}
            </Link>
          )
        })}
        {extraCount > 0 && (
          <Link
            href="/tags"
            className="flex-shrink-0 rounded-full px-3 py-1 text-xs text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
          >
            +{extraCount} more →
          </Link>
        )}
      </div>

      {/* Archive list — grouped by year */}
      {displayPosts.length === 0 ? (
        <p className="py-4 text-sm text-gray-400 dark:text-gray-600">No posts found.</p>
      ) : (
        <div className="space-y-10">
          {years.map((year) => (
            <div key={year}>
              {/* Year label */}
              <div className="mb-4 flex items-center gap-4">
                <span className="font-mono text-xs text-gray-400 dark:text-gray-600">{year}</span>
                <span className="h-px flex-1 bg-gray-100 dark:bg-gray-800" />
              </div>

              {/* Posts for this year */}
              <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                {postsByYear[year].map((post) => {
                  const { path, date, title: postTitle, tags, summary } = post
                  const readingTime = (post as { readingTime?: { text: string } }).readingTime?.text
                  return (
                    <li key={path}>
                      <Link
                        href={`/${path}`}
                        className="group flex items-start gap-4 py-4 transition-opacity hover:opacity-60 sm:gap-6"
                      >
                        {/* Date column */}
                        <span className="w-14 flex-shrink-0 font-mono text-xs text-gray-400 dark:text-gray-600 sm:w-16">
                          {shortDate(date)}
                        </span>

                        {/* Title + tags */}
                        <div className="min-w-0 flex-1">
                          <h2 className="text-base font-semibold leading-snug tracking-[-0.02em] text-gray-900 dark:text-gray-100">
                            {postTitle}
                          </h2>
                          {tags && tags.length > 0 && (
                            <p className="mt-0.5 truncate text-xs text-gray-400 dark:text-gray-600">
                              {tags.join(' · ')}
                            </p>
                          )}
                          {summary && (
                            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-400 dark:text-gray-600">
                              {summary}
                            </p>
                          )}
                        </div>

                        {/* Reading time */}
                        <span className="flex-shrink-0 whitespace-nowrap font-mono text-xs text-gray-400 dark:text-gray-600">
                          {readingTime?.replace(' read', '') ?? ''}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      )}

      {pagination && pagination.totalPages > 1 && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </div>
  )
}
