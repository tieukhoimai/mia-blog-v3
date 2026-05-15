'use client'

import { useState } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <>
      <button aria-label="Toggle Menu" onClick={onToggleNav} className="sm:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-900 dark:text-gray-100 h-6 w-6"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Backdrop */}
      <button
        aria-label="Close menu"
        className={`fixed inset-0 z-10 w-full cursor-default bg-black/20 transition-opacity duration-300 sm:hidden ${
          navShow ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onToggleNav}
      />

      {/* Side drawer */}
      <div
        className={`fixed right-0 top-0 z-20 h-full w-64 bg-white shadow-xl dark:bg-gray-950
          transform transition-transform duration-300 ease-in-out sm:hidden ${
            navShow ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex justify-end p-4">
          <button
            aria-label="Close Menu"
            onClick={onToggleNav}
            className="h-8 w-8 text-gray-900 dark:text-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col px-6 pt-2">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="py-3 text-base font-medium text-gray-900 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-400"
              onClick={onToggleNav}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default MobileNav
