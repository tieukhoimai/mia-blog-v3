import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

type Post = CoreContent<Blog> & { readingTime?: { text: string } }

const MAX_DISPLAY = 8

export default function Home({ posts }: { posts: Post[] }) {
  const [featuredPost, ...recentPosts] = posts.slice(0, MAX_DISPLAY)

  return (
    <div className="space-y-10 px-4 py-10 sm:px-6 xl:px-8">
      {/* Section label */}
      <p className="text-xs tracking-widest text-gray-400 dark:text-gray-500">— latest</p>

      {/* Featured post — large typographic treatment */}
      {featuredPost && (
        <article className="space-y-4 border-b border-gray-100 pb-10 dark:border-gray-800">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            <time dateTime={featuredPost.date}>
              {formatDate(featuredPost.date, siteMetadata.locale)}
            </time>
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
            <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
          </h2>
          <p className="max-w-2xl text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">
            {featuredPost.summary}
          </p>
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="inline-flex items-center text-sm text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
            aria-label={`Read: "${featuredPost.title}"`}
          >
            {featuredPost.readingTime?.text ?? 'Read more'} →
          </Link>
        </article>
      )}

      {/* Recent posts — editorial list */}
      <ul className="divide-y divide-gray-100 dark:divide-gray-800">
        {recentPosts.map((post) => (
          <li key={post.slug} className="py-5 first:pt-0 last:pb-0">
            <article className="grid grid-cols-1 gap-1 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-4">
              <div className="space-y-1">
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  <time dateTime={post.date}>{formatDate(post.date, siteMetadata.locale)}</time>
                </p>
                <h3 className="text-base font-semibold leading-snug tracking-tight text-gray-900 dark:text-gray-100">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="line-clamp-2 text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">
                  {post.summary}
                </p>
              </div>
              <div className="whitespace-nowrap pt-0.5 font-mono text-xs text-gray-400 dark:text-gray-600">
                {post.readingTime?.text ?? ''}
              </div>
            </article>
          </li>
        ))}
      </ul>

      {/* All posts link */}
      {posts.length > MAX_DISPLAY && (
        <div className="border-t border-gray-100 pt-6 dark:border-gray-800">
          <Link
            href="/blog"
            className="text-sm text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
            aria-label="All posts"
          >
            All Posts →
          </Link>
        </div>
      )}
    </div>
  )
}
