import Link from './Link'
import ThemeSwitch from './ThemeSwitch'
import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Left: copyright*/}
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-2xs text-gray-400 dark:text-gray-600">
              © {new Date().getFullYear()} Mai Khoi TIEU
            </span>
          </div>

          {/* Right: socials */}
          <div className="flex items-center gap-4">
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
            {siteMetadata.email && (
              <Link
                href={`mailto:${siteMetadata.email}`}
                className="border-b border-transparent font-mono text-[11px] text-gray-400 transition-colors hover:border-gray-900 hover:text-gray-900 dark:hover:border-gray-100 dark:hover:text-gray-100"
              >
                email
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
