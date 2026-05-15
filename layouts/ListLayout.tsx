'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'

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
    <div className="pt-6 pb-8">
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
        <span>
          {currentPage} of {totalPages}
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

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags?.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <div className="space-y-8 px-4 pb-12 pt-16 sm:px-6 xl:px-8">
      <div className="space-y-4">
        <div className="space-y-1">
          <p className="text-xs tracking-widest text-gray-400 dark:text-gray-500">— search</p>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            {title}
          </h1>
        </div>
        <div className="relative max-w-sm">
          <label>
            <span className="sr-only">Search articles</span>
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-gray-500"
            />
          </label>
          <svg
            className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <ul className="divide-y divide-gray-100 dark:divide-gray-800">
        {!filteredBlogPosts.length && (
          <li className="py-4">
            <p className="text-gray-500 dark:text-gray-400">No posts found.</p>
          </li>
        )}
        {displayPosts.map((post) => {
          const { path, date, title, summary, tags, image } = post
          const readingTime = (post as { readingTime?: { text: string } }).readingTime?.text
          return (
            <li key={path} className="py-8 first:pt-0">
              <article className="space-y-3">
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {tags?.[0] && (
                    <>
                      <span>{tags[0]}</span>
                      <span className="mx-2">·</span>
                    </>
                  )}
                  <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                </p>
                <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                  <Link href={`/${path}`}>{title}</Link>
                </h2>
                <div className="flex flex-wrap gap-2" aria-label={`Tags: ${tags?.join(', ')}`}>
                  {tags?.map((tag) => (
                    <Tag key={tag} text={tag} variant="chip" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {summary}
                </p>
                {image && (
                  <div className="overflow-hidden rounded-sm">
                    <Image src={image} width={2548} height={1296} alt="Blog Cover" />
                  </div>
                )}
                <Link
                  href={`/${path}`}
                  className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  aria-label={`Read more: "${title}"`}
                >
                  {readingTime ?? 'Read more'} →
                </Link>
              </article>
            </li>
          )
        })}
      </ul>

      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </div>
  )
}
