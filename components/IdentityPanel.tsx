'use client'

import { usePathname } from 'next/navigation'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import tagData from 'app/tag-data.json'

interface Props {
  postCount: number
}

export default function IdentityPanel({ postCount }: Props) {
  const pathname = usePathname()
  if (pathname !== '/') return null

  const topTags = Object.entries(tagData as Record<string, number>)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([tag]) => tag)

  return (
    <aside className="hidden md:flex md:w-52 xl:w-64 shrink-0 sticky top-16 h-[calc(100vh-4rem)] flex-col overflow-y-auto border-r border-gray-100 px-6 py-8 dark:border-gray-800 xl:px-8">
      {/* ABOUT zone */}
      <div className="mb-8">
        <p className="mb-3 font-mono text-2xs tracking-[0.2em] uppercase text-gray-300 dark:text-gray-700">
          About
        </p>
        <p className="font-mono text-xs tracking-widest text-gray-400 dark:text-gray-600">
          {siteMetadata.description}
        </p>
      </div>

      {/* WRITING zone */}
      <div className="mb-8">
        <p className="mb-3 font-mono text-2xs tracking-[0.2em] uppercase text-gray-300 dark:text-gray-700">
          Writing
        </p>
        <p className="mb-3 font-mono text-xs text-gray-400 dark:text-gray-500">
          {postCount} posts on
        </p>
        <div className="flex flex-wrap gap-1.5">
          {/* {topTags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="border border-gray-200 px-1.5 py-0.5 font-mono text-2xs text-gray-400 transition-colors hover:border-gray-400 hover:text-gray-700 dark:border-gray-800 dark:text-gray-600 dark:hover:border-gray-600 dark:hover:text-gray-300"
            >
              {tag}
            </Link>
          ))} */}
          {/* Identity tags — manually curated */}
          {['agentic-ai', 'llms', 'digital-twins', 'data-engineering', 'data-visualization'].map(
            (tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="border border-gray-200 px-1.5 py-0.5 font-mono text-2xs text-gray-400 transition-colors hover:border-gray-400 hover:text-gray-700 dark:border-gray-800 dark:text-gray-600 dark:hover:border-gray-600 dark:hover:text-gray-300"
              >
                {tag}
              </Link>
            )
          )}
        </div>
      </div>

      {/* NAVIGATE zone */}
      <div className="mb-auto">
        <p className="mb-3 font-mono text-2xs tracking-[0.2em] uppercase text-gray-300 dark:text-gray-700">
          Navigate
        </p>
        <nav className="flex flex-col">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-2 border-b border-gray-100 py-2.5 text-sm text-gray-500 transition-all last:border-0 hover:translate-x-0.5 hover:text-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
              >
                <span className="text-gray-300 transition-colors group-hover:text-gray-500 dark:text-gray-700 dark:group-hover:text-gray-500">
                  —
                </span>
                {link.title}
              </Link>
            ))}
        </nav>
      </div>

      {/* CONNECT zone */}
      <div className="border-t border-gray-100 pt-6 dark:border-gray-800">
        <p className="mb-3 font-mono text-2xs tracking-[0.2em] uppercase text-gray-300 dark:text-gray-700">
          Connect
        </p>
        <div className="flex gap-4">
          {siteMetadata.github && (
            <Link
              href={siteMetadata.github}
              className="border-b border-transparent font-mono text-xs text-gray-400 transition-colors hover:border-gray-900 hover:text-gray-900 dark:hover:border-gray-100 dark:hover:text-gray-100"
            >
              github
            </Link>
          )}
          {siteMetadata.linkedin && (
            <Link
              href={siteMetadata.linkedin}
              className="border-b border-transparent font-mono text-xs text-gray-400 transition-colors hover:border-gray-900 hover:text-gray-900 dark:hover:border-gray-100 dark:hover:text-gray-100"
            >
              linkedin
            </Link>
          )}
          {siteMetadata.email && (
            <Link
              href={`mailto:${siteMetadata.email}`}
              className="border-b border-transparent font-mono text-xs text-gray-400 transition-colors hover:border-gray-900 hover:text-gray-900 dark:hover:border-gray-100 dark:hover:text-gray-100"
            >
              email
            </Link>
          )}
        </div>
      </div>
    </aside>
  )
}
