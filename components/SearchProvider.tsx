'use client'

import { ReactNode, useState, useEffect } from 'react'
import { KBarProvider } from 'kbar'
import { useRouter } from 'next/navigation'
import KBarModal from './KBarModal'
import type { Action } from 'kbar'

interface SearchDocument {
  slug: string
  title: string
  summary: string
  tags: string[]
  content: string
}

function KBarWrapper({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [searchActions, setSearchActions] = useState<Action[]>([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/search.json')
      const json = await res.json()
      const actions: Action[] = json.map((doc: SearchDocument) => ({
        id: doc.slug,
        name: doc.title,
        keywords: [doc.summary, ...doc.tags, doc.content].join(' '),
        section: 'Content',
        subtitle: doc.tags?.join(', ') || '',
        perform: () => router.push(`/blog/${doc.slug}`),
      }))
      setSearchActions(actions)
      setDataLoaded(true)
    }
    if (!dataLoaded) fetchData()
  }, [dataLoaded, router])

  return (
    <>
      <KBarModal actions={searchActions} isLoading={!dataLoaded} />
      {children}
    </>
  )
}

export default function ClientSearchProvider({ children }: { children: ReactNode }) {
  return (
    <KBarProvider>
      <KBarWrapper>{children}</KBarWrapper>
    </KBarProvider>
  )
}
