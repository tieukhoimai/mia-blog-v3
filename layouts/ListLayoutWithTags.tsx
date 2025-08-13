/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Image from '@/components/Image'
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
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
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
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
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
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 xl:px-0">
        <div className="space-y-8 pb-12 pt-16">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
              {title}
            </h1>
          </div>

          <div className="flex flex-col gap-8 md:flex-row">
            {/* Tags Sidebar */}
            <aside className="hidden md:block md:w-64">
              <div className="sticky top-24 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Filter by tag
                  </h2>
                  <nav className="flex flex-col space-y-3">
                    {sortedTags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tags/${slug(tag)}`}
                        className={`text-sm uppercase ${
                          pathname === `/tags/${slug(tag)}`
                            ? 'font-extrabold text-primary-600 dark:text-primary-400'
                            : 'text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                        }`}
                        aria-label={`View posts tagged ${tag}`}
                      >
                        {tag}
                        <span className="ml-2 text-gray-400 dark:text-gray-400">
                          ({tagCounts[tag]})
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>

            {/* Posts List */}
            <div className="min-w-0 flex-1">
              <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                {!displayPosts.length && (
                  <li className="py-4">
                    <p className="text-gray-600 dark:text-gray-300">No posts found.</p>
                  </li>
                )}

                {displayPosts.map((post) => {
                  const { path, date, title, summary, tags, image } = post
                  return (
                    <li key={path} className="py-12 first:pt-0">
                      <article>
                        <div className="space-y-8">
                          <div className="space-y-4">
                            <div className="flex flex-col gap-4 text-sm text-gray-500 dark:text-gray-300">
                              <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                <Link href={`/${path}`}>{title}</Link>
                              </h2>
                              <div className="flex flex-wrap gap-2">
                                {/* prettier-ignore */}
                                {tags?.map((tag) => (
                                  <Tag key={tag} text={tag} />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">{summary}</p>
                            <Image src={image} width={2548} height={1296} alt="Blog Cover" />
                          </div>
                          <Link
                            href={`/${path}`}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            aria-label={`Read more: "${title}"`}
                          >
                            Read more &rarr;
                          </Link>
                        </div>
                      </article>
                    </li>
                  )
                })}
              </ul>

              {pagination && pagination.totalPages > 1 && (
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
