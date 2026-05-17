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
      className={`sticky top-0 z-40 flex items-center bg-white px-4 py-2.5 transition-all duration-200 dark:bg-gray-950 sm:px-6 xl:px-8 ${
        isTop ? '' : 'border-b border-gray-100 dark:border-gray-800'
      }`}
    >
      {/* Logo */}
      <Link href="/" className="mr-8 shrink-0 font-mono tracking-wide">
        <span className="font-light text-gray-200 dark:text-gray-700">—</span>{' '}
        <span className="font-light tracking-widest text-gray-400 dark:text-gray-600">m</span>{' '}
        <span className="font-semibold tracking-normal text-gray-900 dark:text-gray-50">ai</span>
        <span className="font-light tracking-normal text-gray-300 dark:text-gray-700">.</span>
      </Link>

      {/* Desktop nav links — fill remaining space */}
      <nav className="hidden flex-1 items-center gap-6 sm:flex">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => {
            const isActive =
              pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
            return (
              <Link
                key={link.title}
                href={link.href}
                className={`pb-0.5 text-sm transition-colors ${
                  isActive
                    ? 'border-b-2 border-gray-900 font-medium text-gray-900 dark:border-gray-100 dark:text-gray-100'
                    : 'border-b-2 border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                }`}
              >
                {link.title}
              </Link>
            )
          })}
      </nav>

      {/* Right controls */}
      <div className="ml-auto flex items-center gap-2">
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
