import { ResumeData } from './types'
import ResumeClient from './ResumeClient'

export const dynamic = 'force-dynamic'

async function fetchResume(): Promise<ResumeData> {
  const res = await fetch('https://tieukhoimai.github.io/mia-resume-builder/cv.json', {
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error('Failed to load resume data')
  return res.json()
}

export default async function Page() {
  const data = await fetchResume()

  return <ResumeClient data={data} />
}
