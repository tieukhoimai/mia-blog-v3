'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const HamburgerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-5 w-5"
  >
    <path
      fillRule="evenodd"
      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
)

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-5 w-5"
  >
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
)

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setNavShow(false)
    document.body.style.overflow = 'auto'
  }, [pathname])

  const onToggleNav = () => {
    setNavShow((prev) => {
      document.body.style.overflow = prev ? 'auto' : 'hidden'
      return !prev
    })
  }

  return (
    <>
      <button
        aria-label={navShow ? 'Close menu' : 'Open menu'}
        onClick={onToggleNav}
        className="flex h-8 w-8 items-center justify-center text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 sm:hidden"
      >
        {navShow ? <CloseIcon /> : <HamburgerIcon />}
      </button>

      {navShow && (
        <div className="fixed inset-x-0 top-[52px] z-30 h-[calc(100dvh-52px)] overflow-y-auto bg-white dark:bg-gray-950 sm:hidden">
          <nav className="flex flex-col px-4 sm:px-6">
            {headerNavLinks.map((link) => {
              const isActive =
                pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className={`border-b border-gray-100 py-4 text-base transition-colors dark:border-gray-800 ${
                    isActive
                      ? 'font-semibold text-gray-900 dark:text-gray-100'
                      : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                  }`}
                  onClick={onToggleNav}
                >
                  {link.title}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </>
  )
}

export default MobileNav
