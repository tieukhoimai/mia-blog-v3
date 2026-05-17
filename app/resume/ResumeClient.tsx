'use client'

import Link from 'next/link'
import { useState } from 'react'
import Image from '@/components/Image'
import { ResumeData } from './types'

type ResumeSectionKey =
  | 'experience'
  | 'education'
  | 'publications'
  | 'skills'
  | 'projects'
  | 'awards'

// Shared tag class — outlined square, used everywhere
const tagClass =
  'border border-gray-100 dark:border-gray-800 px-2 py-0.5 font-mono text-2xs text-gray-400 dark:text-gray-600 rounded-sm'

function SectionHeader({
  title,
  onToggle,
  collapsed,
  anchorId,
}: {
  title: string
  onToggle: () => void
  collapsed: boolean
  anchorId?: string
}) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 pb-2 dark:border-gray-800">
      <h2
        id={anchorId}
        className="text-2xs uppercase tracking-[0.13em] text-gray-400 dark:text-gray-600"
      >
        {title}
      </h2>
      <button
        type="button"
        onClick={onToggle}
        className="text-xs text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-gray-100 print:hidden"
        aria-label={collapsed ? `Expand ${title}` : `Collapse ${title}`}
      >
        {collapsed ? '+ show' : '− hide'}
      </button>
    </div>
  )
}

function splitDates(dates?: string) {
  if (!dates) return { start: '', end: '' }
  const [start, end] = dates.split('-').map((p) => p.trim())
  return { start, end }
}

function ExperienceItem({
  item,
  expanded,
  onToggle,
}: {
  item: NonNullable<ResumeData['experience']>[number]
  expanded: boolean
  onToggle: () => void
}) {
  const { start, end } = splitDates(item.dates)
  const tags = item.tags || []
  const previewTags = tags.slice(0, 3)
  const hasMoreTags = tags.length > previewTags.length

  return (
    <div className="grid grid-cols-[80px_1fr] gap-3 border-b border-gray-50 py-3 first:pt-0 last:border-0 last:pb-0 dark:border-gray-800/50">
      {/* Dates */}
      <div className="pt-0.5 font-mono text-2xs leading-relaxed text-gray-300 dark:text-gray-700">
        <span>{start}</span>
        <br />
        <span>{end}</span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={onToggle}
          className="flex items-start justify-between gap-3 text-left transition-opacity hover:opacity-70 focus:outline-none"
          aria-expanded={expanded}
        >
          <div className="flex flex-col gap-0.5 leading-tight">
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {item.role}
            </span>
            <span className="text-xs font-light text-gray-500 dark:text-gray-400">
              {[item.company, item.location].filter(Boolean).join(' · ')}
            </span>
          </div>
          <span className="mt-0.5 shrink-0 font-mono text-xs text-gray-300 dark:text-gray-700">
            {expanded ? '−' : '+'}
          </span>
        </button>

        {/* Expanded bullets */}
        {expanded && Array.isArray(item.bullets) && item.bullets.length > 0 && (
          <ul className="flex flex-col gap-1">
            {item.bullets.map((h, idx) => (
              <li
                key={idx}
                className="flex gap-2 text-xs font-light leading-relaxed text-gray-500 dark:text-gray-400"
              >
                <span className="text-gray-300 dark:text-gray-600">›</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tags — preview when collapsed, full when expanded */}
        {!expanded && previewTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {previewTags.map((tag, idx) => (
              <span key={idx} className={tagClass}>
                {tag}
              </span>
            ))}
            {hasMoreTags && (
              <span className="font-mono text-2xs text-gray-300 dark:text-gray-700">…</span>
            )}
          </div>
        )}

        {expanded && Array.isArray(item.tags) && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag, idx) => (
              <span key={idx} className={tagClass}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function formatEducation(details?: string) {
  if (!details) return { degree: '', institution: '', bracket: '' }
  const [degree, ...rest] = details.split(',')
  let institution = rest.join(',').trim()
  let bracket = ''

  const match = institution.match(/^(.*?)(\s*\(([^)]*)\))$/)
  if (match) {
    institution = match[1].trim()
    bracket = match[3].trim()
  }

  return { degree: degree.trim(), institution, bracket }
}

function EducationItem({ item }: { item: NonNullable<ResumeData['education']>[number] }) {
  const { degree, institution, bracket } = formatEducation(item.details)
  return (
    <div className="grid grid-cols-[80px_1fr] items-baseline gap-3 py-2 first:pt-0 last:pb-0 border-b border-gray-50 dark:border-gray-800/50 last:border-0">
      <div className="font-mono text-2xs text-gray-300 dark:text-gray-700 leading-relaxed">
        {item.dates}
      </div>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{degree}</span>
        {institution && (
          <span className="text-xs font-light text-gray-500 dark:text-gray-400">{institution}</span>
        )}
        {bracket && (
          <span className="text-xs font-light text-gray-500 dark:text-gray-400">({bracket})</span>
        )}
      </div>
    </div>
  )
}

function SkillsList({ items }: { items: NonNullable<ResumeData['skills']> }) {
  return (
    <div className="flex flex-col divide-y divide-gray-50 dark:divide-gray-800/50">
      {items?.map((group, i) => (
        <div
          key={i}
          className="grid grid-cols-[140px_1fr] items-start gap-4 py-3 first:pt-0 last:pb-0"
        >
          <span className="pt-0.5 font-mono text-2xs leading-relaxed text-gray-300 dark:text-gray-700">
            {group.category}
          </span>
          <div className="flex flex-wrap gap-1.5 self-start">
            {group.items.map((item, idx) => (
              <span key={idx} className={tagClass}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function PublicationsList({ items }: { items?: NonNullable<ResumeData['publications']> }) {
  if (!items?.length) return null

  const getType = (p: NonNullable<ResumeData['publications']>[number]) => {
    if (p.journal) return 'journal'
    if (p.booktitle) return 'conference'
    return null
  }

  return (
    <ul className="flex flex-col divide-y divide-gray-50 dark:divide-gray-800/50">
      {items.map((p, i) => {
        const type = getType(p)
        const venue = p.journal || p.booktitle || ''
        const authors = p.author || ''
        return (
          <li key={i} className="grid grid-cols-[24px_1fr] gap-3 py-3 first:pt-0 last:pb-0">
            <span className="pt-0.5 font-mono text-2xs text-gray-300 dark:text-gray-700">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-1.5">
              <p className="text-sm font-semibold leading-snug text-gray-900 dark:text-gray-100">
                {p.title}
              </p>
              {venue && (
                <p className="text-xs font-light text-gray-400 dark:text-gray-600">{venue}</p>
              )}
              {authors && (
                <p className="text-xs font-light italic text-gray-400 dark:text-gray-600">
                  {authors}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5">
                {p.year && <span className={tagClass}>{p.year}</span>}
                {type && <span className={tagClass}>{type}</span>}
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function AwardsList({ items }: { items?: NonNullable<ResumeData['awards']> }) {
  if (!items?.length) return null
  return (
    <ul className="flex flex-col divide-y divide-gray-50 dark:divide-gray-800/50">
      {items.map((a, i) => {
        const titleParts = a.title?.split(' — ') || []
        const awardTitle = titleParts[0]?.trim() || ''
        const organization = titleParts.length > 1 ? titleParts.slice(1).join(' — ').trim() : ''
        return (
          <li
            key={i}
            className="grid grid-cols-[80px_1fr] items-baseline gap-3 py-2 first:pt-0 last:pb-0"
          >
            <span className="font-mono text-2xs text-gray-300 dark:text-gray-700">{a.year}</span>
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="text-sm font-semibold leading-snug text-gray-900 dark:text-gray-100">
                {awardTitle}
              </span>
              {organization && (
                <span className="text-xs font-light text-gray-500 dark:text-gray-400">
                  {organization}
                </span>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function ProjectsList({ items }: { items?: NonNullable<ResumeData['projects']> }) {
  if (!items?.length) return null
  return (
    <div className="flex flex-col divide-y divide-gray-50 dark:divide-gray-800/50">
      {items.map((p, i) => (
        <div key={i} className="grid grid-cols-[80px_1fr] gap-3 py-3 first:pt-0 last:pb-0">
          <div className="pt-0.5 font-mono text-2xs leading-relaxed text-gray-300 dark:text-gray-700">
            {p.dates || ''}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold leading-snug text-gray-900 dark:text-gray-100">
              {p.title}
            </p>
            {p.description && (
              <p className="text-xs font-light leading-relaxed text-gray-500 dark:text-gray-400">
                {p.description}
              </p>
            )}
            {p.links && Object.values(p.links).length > 0 && (
              <div className="flex flex-wrap gap-3">
                {Object.values(p.links).map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.url}
                    className="font-mono text-xs text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    {link.display || link.url} →
                  </Link>
                ))}
              </div>
            )}
            {p.tech && p.tech.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {p.tech.map((tech, idx) => (
                  <span key={idx} className={tagClass}>
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ResumeClient({
  data,
  sections,
  hideHero = false,
  heroImage,
}: {
  data: ResumeData
  sections?: ResumeSectionKey[]
  hideHero?: boolean
  heroImage?: { src: string; alt?: string }
}) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  const [expandedExp, setExpandedExp] = useState<Record<number, boolean>>({})

  const toggleSection = (id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleExperience = (idx: number) => {
    setExpandedExp((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  const isSectionEnabled = (key: ResumeSectionKey) => !sections || sections.includes(key)

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-8 print:p-8" id="main-content">
      <section className="w-full space-y-8 print:space-y-6" aria-label="Resume Content">
        {!hideHero && (
          <header className="flex flex-col gap-4 print:gap-2">
            <div className="flex flex-col items-center gap-4 md:grid md:grid-cols-[1fr_160px] md:items-start md:gap-6">
              <div className="flex justify-center md:order-2">
                {heroImage ? (
                  <Image
                    src={heroImage.src}
                    alt={heroImage.alt || data.name}
                    width={140}
                    height={140}
                    className="h-32 w-32 rounded-full object-cover shadow-sm dark:shadow-none md:h-[140px] md:w-[140px]"
                  />
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-100 text-3xl font-semibold text-gray-500 dark:bg-gray-800 dark:text-gray-400 md:h-[140px] md:w-[140px]">
                    {data.name?.[0] || '?'}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center gap-1.5 text-center md:order-1 md:items-start md:text-left">
                <p className="text-2xs tracking-[0.13em] text-gray-400 dark:text-gray-600">
                  — resume
                </p>
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                  {data.name}
                </h1>
                <div className="mt-2 flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-400">
                  {data.socials && Object.keys(data.socials).length > 0 ? (
                    Object.values(data.socials).map((s, i) => (
                      <Link
                        key={i}
                        href={s.url}
                        className="transition-colors hover:text-gray-900 dark:hover:text-gray-100"
                      >
                        <span className="mr-1.5 text-gray-300 dark:text-gray-700">—</span>
                        {s.display || s.url}
                      </Link>
                    ))
                  ) : (
                    <>
                      <Link
                        href="https://linkedin.com/in/tieukhoimai"
                        className="transition-colors hover:text-gray-900 dark:hover:text-gray-100"
                      >
                        <span className="mr-1.5 text-gray-300 dark:text-gray-700">—</span>
                        linkedin.com/in/tieukhoimai
                      </Link>
                      <Link
                        href="https://github.com/tieukhoimai"
                        className="transition-colors hover:text-gray-900 dark:hover:text-gray-100"
                      >
                        <span className="mr-1.5 text-gray-300 dark:text-gray-700">—</span>
                        github.com/tieukhoimai
                      </Link>
                      <Link
                        href="mailto:tieukhoimai@gmail.com"
                        className="transition-colors hover:text-gray-900 dark:hover:text-gray-100"
                      >
                        <span className="mr-1.5 text-gray-300 dark:text-gray-700">—</span>
                        tieukhoimai@gmail.com
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            {data.headline && (
              <div className="mt-2 text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">
                {data.headline.split('\n').map((para, idx) => (
                  <p key={idx} className="mb-3 last:mb-0">
                    {para.trim()}
                  </p>
                ))}
              </div>
            )}
          </header>
        )}

        <div className="mt-8 space-y-8">
          {isSectionEnabled('education') && data.education && data.education.length > 0 && (
            <section id="education" className="flex flex-col gap-3">
              <SectionHeader
                title="Education"
                onToggle={() => toggleSection('education')}
                collapsed={!!collapsed['education']}
                anchorId="education"
              />
              {!collapsed['education'] && (
                <div>
                  {data.education.map((item, idx) => (
                    <EducationItem key={idx} item={item} />
                  ))}
                </div>
              )}
            </section>
          )}

          {isSectionEnabled('experience') && data.experience && data.experience.length > 0 && (
            <section id="experience" className="flex flex-col gap-3">
              <SectionHeader
                title="Work Experience"
                onToggle={() => toggleSection('experience')}
                collapsed={!!collapsed['experience']}
                anchorId="experience"
              />
              {!collapsed['experience'] && (
                <div>
                  {data.experience.map((item, idx) => (
                    <ExperienceItem
                      key={idx}
                      item={item}
                      expanded={expandedExp[idx] ?? false}
                      onToggle={() => toggleExperience(idx)}
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          {isSectionEnabled('publications') &&
            data.publications &&
            data.publications.length > 0 && (
              <section id="publications" className="flex flex-col gap-3 break-inside-avoid">
                <SectionHeader
                  title="Publications"
                  onToggle={() => toggleSection('publications')}
                  collapsed={!!collapsed['publications']}
                  anchorId="publications"
                />
                {!collapsed['publications'] && <PublicationsList items={data.publications} />}
              </section>
            )}

          {isSectionEnabled('skills') && data.skills && data.skills.length > 0 && (
            <section id="skills" className="flex flex-col gap-3">
              <SectionHeader
                title="Skills"
                onToggle={() => toggleSection('skills')}
                collapsed={!!collapsed['skills']}
                anchorId="skills"
              />
              {!collapsed['skills'] && <SkillsList items={data.skills} />}
            </section>
          )}

          {isSectionEnabled('projects') && data.projects && data.projects.length > 0 && (
            <section id="projects" className="flex flex-col gap-3 break-inside-avoid">
              <SectionHeader
                title="Projects"
                onToggle={() => toggleSection('projects')}
                collapsed={!!collapsed['projects']}
                anchorId="projects"
              />
              {!collapsed['projects'] && <ProjectsList items={data.projects} />}
            </section>
          )}

          {isSectionEnabled('awards') && data.awards && data.awards.length > 0 && (
            <section id="awards" className="flex flex-col gap-3 break-inside-avoid">
              <SectionHeader
                title="Awards"
                onToggle={() => toggleSection('awards')}
                collapsed={!!collapsed['awards']}
                anchorId="awards"
              />
              {!collapsed['awards'] && <AwardsList items={data.awards} />}
            </section>
          )}

          <footer className="mt-4 border-t border-gray-100 pt-6 dark:border-gray-800">
            <div className="flex flex-col items-center gap-3 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
              <span className="text-xs text-gray-400 dark:text-gray-600 md:justify-self-start">
                Last updated:{' '}
                {new Date(data.meta?.generated_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
              <Link
                href="https://tieukhoimai.github.io/mia-resume-builder/cv.pdf"
                className="order-first w-full rounded-lg border border-gray-100 px-5 py-2 text-center text-xs text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-100 md:order-none md:w-auto md:justify-self-center print:hidden"
              >
                Download CV →
              </Link>
              <Link
                href="https://github.com/tieukhoimai/mia-resume-builder"
                className="text-xs text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-gray-100 md:justify-self-end"
              >
                mia-resume-builder ↗
              </Link>
            </div>
          </footer>
        </div>
      </section>
    </main>
  )
}
