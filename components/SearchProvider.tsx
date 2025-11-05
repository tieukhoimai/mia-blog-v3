'use client'

import { ReactNode } from 'react'
import { SearchProvider, SearchConfig } from 'pliny/search'
import siteMetadata from '@/data/siteMetadata'

interface SearchDocument {
  slug: string
  title: string
  summary: string
  tags: string[]
  content: string
}

export default function ClientSearchProvider({ children }: { children: ReactNode }) {
  const searchConfig: SearchConfig = {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: 'search.json',
      onSearchDocumentsLoad(json) {
        return json.map((doc: SearchDocument) => ({
          id: doc.slug,
          name: doc.title,
          keywords: [doc.summary, ...doc.tags, doc.content].join(' '),
          section: 'Content',
          subtitle: doc.tags?.join(', ') || '',
          perform: () => (window.location.href = `/blog/${doc.slug}`),
        }))
      },
    },
  }

  return <SearchProvider searchConfig={searchConfig}>{children}</SearchProvider>
}
