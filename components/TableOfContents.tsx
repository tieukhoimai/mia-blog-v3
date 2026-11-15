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

interface Section {
  item: TocItem & { id: string }
  children: (TocItem & { id: string })[]
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

  // Group H3s under their preceding H2 so the list can show sections always
  // and expand only the subsection list of the section currently in view.
  const sections = useMemo<Section[]>(() => {
    const grouped: Section[] = []
    for (const item of items) {
      if (item.depth <= 2 || grouped.length === 0) {
        grouped.push({ item, children: [] })
      } else {
        grouped[grouped.length - 1].children.push(item)
      }
    }
    return grouped
  }, [items])

  const activeSectionId = useMemo(() => {
    const active = sections.find(
      (section) =>
        section.item.id === activeId || section.children.some((child) => child.id === activeId)
    )
    return active?.item.id ?? ''
  }, [sections, activeId])

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

  const linkClass = (id: string) =>
    `block text-xs leading-snug transition-colors ${
      activeId === id
        ? 'text-gray-900 dark:text-gray-100'
        : 'text-gray-400 hover:text-gray-700 dark:text-gray-600 dark:hover:text-gray-300'
    }`

  const list = (
    <ul className="flex flex-col gap-1.5">
      {sections.map(({ item, children }) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className={linkClass(item.id)}
          >
            {item.value}
          </a>
          {children.length > 0 && item.id === activeSectionId && (
            <ul className="mt-1.5 flex flex-col gap-1.5 border-l border-gray-100 pl-2.5 dark:border-gray-800">
              {children.map((child) => (
                <li key={child.id}>
                  <a
                    href={`#${child.id}`}
                    onClick={(e) => handleClick(e, child.id)}
                    className={linkClass(child.id)}
                  >
                    {child.value}
                  </a>
                </li>
              ))}
            </ul>
          )}
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
