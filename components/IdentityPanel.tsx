'use client'

import { usePathname } from 'next/navigation'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'

export default function IdentityPanel() {
  const pathname = usePathname()
  if (pathname !== '/') return null

  return (
    <aside className="hidden md:flex md:w-52 xl:w-64 shrink-0 sticky top-16 h-[calc(100vh-4rem)] flex-col overflow-y-auto border-r border-gray-100 px-6 py-8 dark:border-gray-800 xl:px-8">
      {/* Author name */}
      <Link
        href="/"
        className="mb-3 block text-3xl font-light leading-none tracking-[-0.05em] text-gray-900 transition-colors hover:text-gray-500 dark:text-gray-100 dark:hover:text-gray-400"
      >
        {siteMetadata.headerTitle}
      </Link>

      {/* Bio label */}
      <p className="mb-6 font-mono text-[12px] uppercase tracking-widest text-gray-400 dark:text-gray-600">
        {siteMetadata.description}
      </p>

      {/* Nav links */}
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

      {/* Social + stats */}
      <div className="mt-auto border-t border-gray-100 pt-6 dark:border-gray-800">
        <div className="flex gap-4">
          {siteMetadata.github && (
            <Link
              href={siteMetadata.github}
              className="border-b border-transparent font-mono text-[11px] text-gray-400 transition-colors hover:border-gray-900 hover:text-gray-900 dark:hover:border-gray-100 dark:hover:text-gray-100"
            >
              github
            </Link>
          )}
          {siteMetadata.linkedin && (
            <Link
              href={siteMetadata.linkedin}
              className="border-b border-transparent font-mono text-[11px] text-gray-400 transition-colors hover:border-gray-900 hover:text-gray-900 dark:hover:border-gray-100 dark:hover:text-gray-100"
            >
              linkedin
            </Link>
          )}
        </div>
      </div>
    </aside>
  )
}
