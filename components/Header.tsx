'use client'

import headerNavLinks from '@/data/headerNavLinks'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

function useIsScrollTop() {
  const [isTop, setIsTop] = useState(true)
  useEffect(() => {
    function onScroll() {
      setIsTop(window.scrollY <= 0)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return isTop
}

const Header = () => {
  const isTop = useIsScrollTop()
  const pathname = usePathname()

  return (
    <header
      className={`sticky top-0 z-40 flex items-center justify-between bg-white px-4 py-2.5 transition-all duration-200 dark:bg-gray-950 sm:px-6 xl:px-8 ${
        isTop ? '' : 'border-b border-gray-100 dark:border-gray-800'
      }`}
    >
      {/* Logo */}
      <Link
        href="/"
        className="text-[15px] font-semibold tracking-[-0.03em] text-gray-900 dark:text-gray-100"
      >
        m a i<span className="text-gray-400 dark:text-gray-600">.</span>
      </Link>

      {/* Right nav */}
      <div className="flex items-center gap-5 sm:gap-6">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => {
            const isActive =
              pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
            return (
              <Link
                key={link.title}
                href={link.href}
                className={`hidden pb-px text-[13px] tracking-[0.02em] transition-colors sm:block ${
                  isActive
                    ? 'border-b border-gray-900 text-gray-900 dark:border-gray-100 dark:text-gray-100'
                    : 'border-b border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                }`}
              >
                {link.title}
              </Link>
            )
          })}
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
