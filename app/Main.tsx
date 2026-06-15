import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import KnowledgeGraph from '@/components/KnowledgeGraph'
import TypingEffect from '@/components/TypingEffect'
import graphData from 'app/graph-data.json'

type Post = CoreContent<Blog> & { readingTime?: { text: string } }

const pageLabels: Record<string, string> = {
  '/blog': 'raw observations and ideas',
  '/series': 'structured narratives',
  '/learning': 'work in progress',
  '/insights': 'reading between the rows',
  '/about': 'the schema behind the data',
}

export default function Home({ posts }: { posts: Post[] }) {
  const cardPosts = posts.slice(0, 3)

  const pageLinks = headerNavLinks.filter((l) => l.href !== '/')

  return (
    <div>
      {/* ── Hero — full-bleed graph background ───────────────────── */}
      <section className="relative min-h-[600px] overflow-hidden lg:min-h-[720px]">
        {/* Graph: absolute full-bleed, low opacity — pointer events pass through text */}
        <div className="absolute inset-0 opacity-[0.8]">
          <KnowledgeGraph data={graphData} biasX={0.5} />
        </div>

        {/* Text: pointer-events-none so drags reach the graph beneath */}
        <div className="pointer-events-none relative z-10 mx-auto max-w-5xl px-4 py-20 sm:px-8 lg:py-28">
          <p className="mb-6 text-2xs tracking-[0.13em] text-gray-400 dark:text-gray-600">
            — {siteMetadata.description}
          </p>
          <h1 className="mb-6 font-serif text-4xl font-bold leading-[1.05] tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-6xl">
            Hi, I'm Mai
            <br />
            <span className="text-gray-400 dark:text-gray-600">
              <TypingEffect />
            </span>
          </h1>
          <p className="mb-10 max-w-md text-base font-light leading-relaxed text-gray-500 dark:text-gray-400">
            I've been writing and building here since 2022 - turning abstract concepts into clarity,
            raw ideas into working software, and figuring it out, in the most naive way.
          </p>
          {/* Re-enable pointer events for links only */}
          <div className="pointer-events-auto flex gap-6">
            {siteMetadata.github && (
              <Link
                href={siteMetadata.github}
                className="text-sm text-gray-500 underline-offset-4 transition-colors hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-gray-100"
              >
                github
              </Link>
            )}
            {siteMetadata.linkedin && (
              <Link
                href={siteMetadata.linkedin}
                className="text-sm text-gray-500 underline-offset-4 transition-colors hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-gray-100"
              >
                linkedin
              </Link>
            )}
            {siteMetadata.email && (
              <Link
                href={`mailto:${siteMetadata.email}`}
                className="text-sm text-gray-500 underline-offset-4 transition-colors hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-gray-100"
              >
                email
              </Link>
            )}
          </div>
        </div>

        {/* <p className="pointer-events-none absolute bottom-4 right-4 font-mono text-2xs text-gray-300 dark:text-gray-700">
          drag · hover · click
        </p> */}
      </section>

      {/* ── Recent articles — tinted background ──────────────────── */}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-8">
          <p className="mb-1 text-2xs tracking-[0.13em] text-gray-400 dark:text-gray-600">
            — latest
          </p>
          <h2 className="mb-8 text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            Recent articles
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cardPosts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-950 dark:hover:ring-1 dark:hover:ring-gray-700"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-2xs text-gray-400 dark:text-gray-600">
                    {formatDate(post.date, siteMetadata.locale)}
                  </span>
                  {post.tags?.[0] && (
                    <span className="font-mono text-2xs text-gray-300 dark:text-gray-700">
                      {post.tags[0]}
                    </span>
                  )}
                </div>
                <h3 className="mb-3 text-base font-semibold leading-snug tracking-tight text-gray-900 dark:text-gray-100">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-gray-600 dark:hover:text-gray-400"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mb-5 line-clamp-2 flex-1 text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">
                  {post.summary}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-auto text-xs text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Read article →
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/blog"
              className="text-sm text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
            >
              All articles →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Explore — editorial list, title + label ──────────────── */}
      <section>
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-8">
          <p className="mb-1 text-2xs tracking-[0.13em] text-gray-400 dark:text-gray-600">
            — navigate
          </p>
          <h2 className="mb-8 text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            Explore
          </h2>

          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            {pageLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-baseline justify-between py-4 transition-colors"
                >
                  <span className="text-base font-semibold text-gray-900 transition-colors group-hover:text-gray-500 dark:text-gray-100 dark:group-hover:text-gray-400">
                    {link.title}
                  </span>
                  <span className="text-sm text-gray-400 transition-colors group-hover:text-gray-700 dark:text-gray-600 dark:group-hover:text-gray-300">
                    {pageLabels[link.href] ?? ''}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
