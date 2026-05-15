import { genPageMetadata } from 'app/seo'
import ResumeClient from '../resume/ResumeClient'
import { ResumeData } from '../resume/types'

export const metadata = genPageMetadata({ title: 'About' })
export const dynamic = 'force-dynamic'

async function fetchResume(): Promise<ResumeData> {
  const res = await fetch('https://tieukhoimai.github.io/mia-resume-builder/cv.json', {
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error('Failed to load resume data')
  return res.json()
}

export default async function Page() {
  const resumeData = await fetchResume()

  return (
    <ResumeClient
      data={resumeData}
      sections={['education', 'experience', 'projects', 'awards']}
      heroImage={{ src: '/static/images/avatar.png', alt: 'Mia' }}
    />
  )
}
