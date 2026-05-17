'use client'

import { useState, useEffect, useMemo } from 'react'
import GithubSlugger from 'github-slugger'

interface TocItem {
  value: string
  url: string
  depth: number
}

interface Props {
  toc: TocItem[]
  mobile?: boolean
}

export default function TableOfContents({ toc, mobile = false }: Props) {
  const [activeId, setActiveId] = useState('')
  const [open, setOpen] = useState(false)

  // Rebuild correct IDs using a fresh per-render slugger — mirrors what rehype-slug does.
  // extractTocHeadings uses a shared singleton slugger across docs, producing mismatched
  // suffixed slugs (e.g. #references-10) that don't match rehype-slug's per-doc IDs.
  const items = useMemo(() => {
    const slugger = new GithubSlugger()
    return toc.map((item) => ({ ...item, id: slugger.slug(item.value) }))
  }, [toc])

  useEffect(() => {
    if (!items.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-72px 0% -80% 0%' }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
    window.history.pushState(null, '', `#${id}`)
    setActiveId(id)
    if (mobile) setOpen(false)
  }

  if (!items.length) return null

  const list = (
    <ul className="flex flex-col gap-1.5">
      {items.map(({ value, id, depth }) => (
        <li key={id} style={{ paddingLeft: depth > 2 ? `${(depth - 2) * 10}px` : 0 }}>
          <a
            href={`#${id}`}
            onClick={(e) => handleClick(e, id)}
            className={`block text-xs leading-snug transition-colors ${
              activeId === id
                ? 'text-gray-900 dark:text-gray-100'
                : 'text-gray-400 hover:text-gray-700 dark:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            {value}
          </a>
        </li>
      ))}
    </ul>
  )

  if (mobile) {
    return (
      <div className="mb-8 rounded-lg border border-gray-100 dark:border-gray-800">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between px-4 py-3 text-left"
        >
          <span className="text-2xs uppercase tracking-[0.13em] text-gray-400 dark:text-gray-600">
            — contents
          </span>
          <span className="font-mono text-xs text-gray-400 dark:text-gray-600">
            {open ? '−' : '+'}
          </span>
        </button>
        {open && (
          <div className="border-t border-gray-100 px-4 py-3 dark:border-gray-800">{list}</div>
        )}
      </div>
    )
  }

  return (
    <nav aria-label="Table of contents">
      <p className="mb-3 text-2xs tracking-[0.13em] text-gray-400 dark:text-gray-600">— contents</p>
      {list}
    </nav>
  )
}
