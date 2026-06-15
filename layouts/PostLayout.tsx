import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import SeriesNavigation from '@/components/SeriesNavigation'
import TableOfContents from '@/components/TableOfContents'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const editUrl = (path: string) => `${siteMetadata.siteRepo}/blob/main/data/${path}`

const shortDate = (dateStr: string, locale: string) =>
  new Date(dateStr).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags, image, series, summary } = content
  const basePath = path.split('/')[0]
  const readingTime = (content as CoreContent<Blog> & { readingTime?: { text: string } })
    .readingTime?.text
  const rawToc = (
    content as CoreContent<Blog> & {
      toc?: string | { value: string; url: string; depth: number }[]
    }
  ).toc
  const toc: { value: string; url: string; depth: number }[] =
    typeof rawToc === 'string' ? JSON.parse(rawToc) : rawToc ?? []

  return (
    <div
      className={`mx-auto px-4 py-12 sm:px-8 ${toc.length > 0 ? 'max-w-3xl xl:max-w-5xl' : 'max-w-3xl'}`}
    >
      <ScrollTopAndComment />
      <div className="xl:flex xl:gap-16">
        <article className="min-w-0 flex-1">
          {/* Section label + back link */}
          <div className="mb-10">
            <p className="mb-1 text-2xs tracking-[0.13em] text-gray-400 dark:text-gray-600">
              <Link
                href={`/${basePath}`}
                className="transition-colors hover:text-gray-900 dark:hover:text-gray-100"
              >
                ← {basePath}
              </Link>
            </p>

            {/* Eyebrow: date · reading time */}
            <p className="mb-3 text-2xs tracking-[0.04em] text-gray-400 dark:text-gray-600">
              <span>{shortDate(date, siteMetadata.locale)}</span>
              {readingTime && (
                <>
                  <span className="mx-2">·</span>
                  <span>{readingTime}</span>
                </>
              )}
            </p>

            {/* Title */}
            <h1 className="mb-4 text-base font-semibold leading-[1.2] tracking-tight text-gray-900 dark:text-gray-100 sm:text-[2rem]">
              {title}
            </h1>

            {/* Tags */}
            {tags && (
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} variant="chip" />
                ))}
              </div>
            )}

            {/* Standfirst */}
            {summary && (
              <p className="mt-5 text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">
                {summary}
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="mb-8 h-px bg-gray-100 dark:bg-gray-800" />

          {/* Mobile TOC — collapsible, hidden on xl (where sidebar takes over) */}
          {toc.length > 0 && (
            <div className="xl:hidden">
              <TableOfContents toc={toc} mobile />
            </div>
          )}

          {/* Cover image */}
          {image && (
            <div className="mb-8 overflow-hidden rounded-sm">
              <Image src={image} width={2548} height={1296} alt="Article Cover" />
            </div>
          )}

          {/* Prose body */}
          <div className="prose max-w-none dark:prose-invert">{children}</div>

          {/* Series navigation */}
          {series && <SeriesNavigation currentSeries={series} currentSlug={slug} />}

          {/* Prev / Next — bordered cards */}
          {(prev || next) && (
            <div className="mt-12 grid grid-cols-2 gap-4 border-t border-gray-100 pt-8 dark:border-gray-800">
              {prev?.path ? (
                <Link
                  href={`/${prev.path}`}
                  className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-600"
                >
                  <p className="mb-1.5 text-2xs uppercase tracking-[0.12em] text-gray-400 dark:text-gray-600">
                    ← previous
                  </p>
                  <p className="text-xs font-semibold leading-snug text-gray-900 dark:text-gray-100">
                    {prev.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {next?.path ? (
                <Link
                  href={`/${next.path}`}
                  className="rounded-lg border border-gray-200 p-4 text-right transition-colors hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-600"
                >
                  <p className="mb-1.5 text-2xs uppercase tracking-[0.12em] text-gray-400 dark:text-gray-600">
                    next →
                  </p>
                  <p className="text-xs font-semibold leading-snug text-gray-900 dark:text-gray-100">
                    {next.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
            </div>
          )}

          {/* Edit on GitHub */}
          <div className="mt-6 text-2xs text-gray-400 dark:text-gray-600">
            <Link href={editUrl(filePath)} className="hover:text-gray-900 dark:hover:text-gray-100">
              View on GitHub
            </Link>
          </div>

          {/* Comments */}
          {siteMetadata.comments && (
            <div className="mt-8 pt-6 text-center" id="comment">
              <Comments slug={slug} />
            </div>
          )}
        </article>

        {/* Sticky TOC — visible only on xl screens */}
        {toc.length > 0 && (
          <aside className="hidden xl:block xl:w-52 xl:shrink-0">
            <div className="sticky top-24">
              <TableOfContents toc={toc} />
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
