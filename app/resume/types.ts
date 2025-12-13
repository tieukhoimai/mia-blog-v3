export type ResumeData = {
  name: string
  socials?: Record<string, { url: string; display?: string }>
  headline?: string
  experience?: Array<{
    role: string
    company: string
    location?: string
    dates?: string
    bullets?: string[]
    tags?: string[]
  }>
  education?: Array<{ dates?: string; details?: string }>
  skills?: Array<{ category: string; items: string[] }>
  awards?: Array<{ year?: string; title?: string }>
  projects?: Array<{
    title: string
    dates?: string
    description?: string
    links?: Record<string, { url: string; display?: string }>
    tech?: string[]
  }>
  publications?: Array<{
    title?: string
    year?: string
    booktitle?: string | null
    journal?: string | null
    author?: string
  }>
  meta: { generated_at: string }
}
