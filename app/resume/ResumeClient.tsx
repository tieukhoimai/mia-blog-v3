'use client'

import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import Image from '@/components/Image'
import { ResumeData } from './types'

type ResumeSectionKey =
  | 'experience'
  | 'education'
  | 'publications'
  | 'skills'
  | 'projects'
  | 'awards'

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
    <div className="relative grid gap-3 break-inside-avoid pl-4 md:grid-cols-[110px_1fr]">
      <span
        className="absolute left-0 top-2 h-full w-px bg-gray-100 dark:bg-gray-800"
        aria-hidden="true"
      />
      <span
        className="absolute left-[-3px] top-2 h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600"
        aria-hidden="true"
      />

      <div className="flex flex-col font-mono text-xs text-gray-400 dark:text-gray-600">
        <span>{start}</span>
        <span>{end}</span>
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={onToggle}
          className="flex items-start justify-between gap-3 text-left transition-opacity hover:opacity-70 focus:outline-none"
          aria-expanded={expanded}
        >
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {item.role}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{item.company}</span>
            {item.location && (
              <span className="text-xs text-gray-400 dark:text-gray-600">{item.location}</span>
            )}
          </div>
          <span className="mt-0.5 text-sm text-gray-400">{expanded ? '−' : '+'}</span>
        </button>

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

        {!expanded && previewTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {previewTags.map((tag, idx) => (
              <span
                key={idx}
                className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              >
                {tag}
              </span>
            ))}
            {hasMoreTags && <span className="text-xs text-gray-400">…</span>}
          </div>
        )}

        {expanded && Array.isArray(item.tags) && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag, idx) => (
              <span
                key={idx}
                className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              >
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
    <div className="flex flex-col gap-0.5 break-inside-avoid">
      <h3 className="text-sm font-semibold leading-snug text-gray-900 dark:text-gray-100">
        {degree}
        {institution && (
          <span className="font-light text-gray-500 dark:text-gray-400">, {institution}</span>
        )}
        {bracket && (
          <span className="font-light text-gray-400 dark:text-gray-600"> ({bracket})</span>
        )}
      </h3>
      <div className="font-mono text-xs text-gray-400 dark:text-gray-600">{item.dates}</div>
    </div>
  )
}

function SkillsList({ items }: { items: NonNullable<ResumeData['skills']> }) {
  return (
    <div className="flex flex-col gap-2">
      {items?.map((group, i) => (
        <p key={i} className="text-2xs text-gray-900 dark:text-gray-100">
          <span className="font-semibold">{group.category}:</span>{' '}
          <span className="font-light text-gray-500 dark:text-gray-400">
            {group.items.join(', ')}
          </span>
        </p>
      ))}
    </div>
  )
}

function PublicationsList({ items }: { items?: NonNullable<ResumeData['publications']> }) {
  if (!items?.length) return null
  return (
    <ul className="flex flex-col gap-2">
      {items.map((p, i) => (
        <li key={i} className="flex gap-2 text-sm leading-relaxed">
          <span className="text-gray-300 dark:text-gray-600">›</span>
          <span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">{p.title}</span>
            <span className="font-light text-gray-500 dark:text-gray-400">
              {p.year ? ` (${p.year})` : ''}
              {p.journal ? ` — ${p.journal}` : p.booktitle ? ` — ${p.booktitle}` : ''}
              {p.author ? ` — ${p.author}` : ''}
            </span>
          </span>
        </li>
      ))}
    </ul>
  )
}

function AwardsList({ items }: { items?: NonNullable<ResumeData['awards']> }) {
  if (!items?.length) return null
  return (
    <ul className="flex flex-col gap-3">
      {items.map((a, i) => {
        const titleParts = a.title?.split(' — ') || []
        const awardTitle = titleParts[0]?.trim() || ''
        const organization = titleParts.length > 1 ? titleParts.slice(1).join(' — ').trim() : ''
        return (
          <li key={i} className="flex items-baseline gap-4">
            <span className="w-10 shrink-0 font-mono text-xs text-gray-400 dark:text-gray-600">
              {a.year}
            </span>
            <div>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {awardTitle}
              </span>
              {organization && (
                <span className="text-sm font-light text-gray-500 dark:text-gray-400">
                  {' — '}
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
    <div className="flex flex-col gap-3">
      {items.map((p, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 rounded-lg border border-gray-100 p-4 transition-colors hover:border-gray-200 dark:border-gray-800 dark:hover:border-gray-700"
        >
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{p.title}</p>
            {p.dates && (
              <span className="flex-shrink-0 font-mono text-xs text-gray-400 dark:text-gray-600">
                {p.dates}
              </span>
            )}
          </div>
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
                  className="text-xs text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
                >
                  {link.display || link.url} →
                </Link>
              ))}
            </div>
          )}
          {p.tech && p.tech.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {p.tech.map((tech, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-gray-100 px-2.5 py-0.5 text-2xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
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
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-8 print:p-8" id="main-content">
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

              <div className="flex flex-col gap-1.5 items-center text-center md:order-1 md:items-start md:text-left">
                <p className="text-2xs tracking-[0.13em] text-gray-400 dark:text-gray-600">
                  — resume
                </p>
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                  {data.name}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Data Scientist · Analytics Engineer
                </p>
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
                <div className="space-y-3">
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
                <div className="space-y-4">
                  {data.experience.map((item, idx) => (
                    <ExperienceItem
                      key={idx}
                      item={item}
                      expanded={expandedExp[idx] ?? idx === 0}
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
                className="w-full rounded-lg border border-gray-100 px-5 py-2 text-center text-sm text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-100 md:w-auto md:justify-self-center print:hidden order-first md:order-none"
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
