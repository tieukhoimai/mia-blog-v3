/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
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

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="pt-8 pb-4">
      <nav className="flex justify-between text-[13px] text-gray-500 dark:text-gray-400">
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
        <span className="font-mono text-[11px] text-gray-400">
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
  const [tagFilter, setTagFilter] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const filteredTags = tagFilter
    ? sortedTags.filter((t) => t.toLowerCase().includes(tagFilter.toLowerCase()))
    : sortedTags
  const totalPosts = Object.values(tagCounts).reduce((a, b) => a + b, 0)

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  const isAllPosts = pathname === '/blog'

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-8">
      {/* Page heading */}
      <div className="mb-10">
        <p className="mb-1 text-[10.5px] tracking-[0.13em] text-gray-400 dark:text-gray-600">
          — blog
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          {title}
        </h1>
      </div>

      <div className="flex gap-12 xl:gap-16">
        {/* Sidebar — tag filter */}
        <aside className="hidden w-44 shrink-0 md:block">
          <div className="sticky top-20">
            <p className="mb-2 text-[10px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-600">
              Filter by tag
            </p>
            {/* Desktop search input */}
            <input
              type="text"
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              placeholder="Search tags…"
              className="mb-3 w-full border-b border-gray-100 bg-transparent pb-1.5 text-[12px] text-gray-600 placeholder-gray-300 outline-none transition-colors focus:border-gray-400 dark:border-gray-800 dark:text-gray-400 dark:placeholder-gray-700 dark:focus:border-gray-600"
            />
            <nav className="flex flex-col">
              {!tagFilter && (
                <Link
                  href="/blog"
                  className={`flex justify-between border-b py-1.5 text-[13px] transition-colors ${
                    isAllPosts
                      ? 'border-gray-900 text-gray-900 dark:border-gray-100 dark:text-gray-100'
                      : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                  }`}
                >
                  <span>All</span>
                  <span className="font-mono text-[11px] text-gray-400 dark:text-gray-600">
                    {totalPosts}
                  </span>
                </Link>
              )}
              {filteredTags.map((tag) => {
                const tagSlug = slug(tag)
                const isActive = pathname === `/tags/${tagSlug}`
                return (
                  <Link
                    key={tag}
                    href={`/tags/${tagSlug}`}
                    className={`flex justify-between border-b py-1.5 text-[13px] transition-colors ${
                      isActive
                        ? 'border-gray-900 text-gray-900 dark:border-gray-100 dark:text-gray-100'
                        : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                    }`}
                    aria-label={`View posts tagged ${tag}`}
                  >
                    <span>{tag}</span>
                    <span className="font-mono text-[11px] text-gray-400 dark:text-gray-600">
                      {tagCounts[tag]}
                    </span>
                  </Link>
                )
              })}
              {filteredTags.length === 0 && (
                <p className="py-2 text-[12px] text-gray-400 dark:text-gray-600">No tags found.</p>
              )}
            </nav>
          </div>
        </aside>

        {/* Post list */}
        <div className="min-w-0 flex-1">
          {/* Mobile tag filter */}
          <div className="mb-6 md:hidden">
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="flex items-center gap-1.5 text-[12px] text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
            >
              <span>{mobileOpen ? '▾' : '▸'}</span>
              <span>
                {pathname.startsWith('/tags/')
                  ? `Tag: ${pathname.replace('/tags/', '')}`
                  : 'Filter by tag'}
              </span>
            </button>

            {mobileOpen && (
              <div className="mt-3 rounded-lg border border-gray-100 p-4 dark:border-gray-800">
                <input
                  type="text"
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  placeholder="Search tags…"
                  className="mb-3 w-full border-b border-gray-100 bg-transparent pb-1.5 text-[12px] text-gray-600 placeholder-gray-300 outline-none transition-colors focus:border-gray-400 dark:border-gray-800 dark:text-gray-400 dark:placeholder-gray-700 dark:focus:border-gray-600"
                  ref={(el) => el?.focus()}
                />
                <div className="flex max-h-48 flex-col overflow-y-auto">
                  {!tagFilter && (
                    <Link
                      href="/blog"
                      onClick={() => setMobileOpen(false)}
                      className={`flex justify-between border-b py-1.5 text-[13px] transition-colors ${
                        isAllPosts
                          ? 'border-gray-900 text-gray-900 dark:border-gray-100 dark:text-gray-100'
                          : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                      }`}
                    >
                      <span>All</span>
                      <span className="font-mono text-[11px] text-gray-400 dark:text-gray-600">
                        {totalPosts}
                      </span>
                    </Link>
                  )}
                  {filteredTags.map((tag) => {
                    const tagSlug = slug(tag)
                    const isActive = pathname === `/tags/${tagSlug}`
                    return (
                      <Link
                        key={tag}
                        href={`/tags/${tagSlug}`}
                        onClick={() => setMobileOpen(false)}
                        className={`flex justify-between border-b py-1.5 text-[13px] transition-colors ${
                          isActive
                            ? 'border-gray-900 text-gray-900 dark:border-gray-100 dark:text-gray-100'
                            : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray:400 dark:hover:text-gray-100'
                        }`}
                      >
                        <span>{tag}</span>
                        <span className="font-mono text-[11px] text-gray-400 dark:text-gray-600">
                          {tagCounts[tag]}
                        </span>
                      </Link>
                    )
                  })}
                  {filteredTags.length === 0 && (
                    <p className="py-2 text-[12px] text-gray-400 dark:text-gray-600">
                      No tags found.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            {!displayPosts.length && (
              <li className="py-4">
                <p className="text-[13px] text-gray-400 dark:text-gray-600">No posts found.</p>
              </li>
            )}
            {displayPosts.map((post) => {
              const { path, date, title, summary, tags } = post
              const readingTime = (post as { readingTime?: { text: string } }).readingTime?.text
              return (
                <li key={path} className="py-6 first:pt-0">
                  <article>
                    <p className="mb-1 text-[11px] tracking-[0.04em] text-gray-400 dark:text-gray-600">
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    </p>
                    <h2 className="mb-1.5 text-[17.5px] font-semibold leading-snug tracking-[-0.025em] text-gray-900 dark:text-gray-100">
                      <Link href={`/${path}`}>{title}</Link>
                    </h2>
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      {tags?.map((tag) => (
                        <Tag key={tag} text={tag} variant="chip" />
                      ))}
                    </div>
                    <p className="mb-2 text-[13px] font-light leading-relaxed text-gray-500 dark:text-gray-400">
                      {summary}
                    </p>
                    <Link
                      href={`/${path}`}
                      className="text-[12px] text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
                      aria-label={`Read more: "${title}"`}
                    >
                      {readingTime ?? 'Read more'} →
                    </Link>
                  </article>
                </li>
              )
            })}
          </ul>

          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </div>
    </div>
  )
}
