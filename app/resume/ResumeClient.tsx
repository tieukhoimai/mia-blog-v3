'use client'

import Link from 'next/link'
import { useEffect, useState, type ReactNode } from 'react'
import Image from '@/components/Image'
import { ResumeData } from './types'

type ResumeSectionKey =
  | 'experience'
  | 'education'
  | 'publications'
  | 'skills'
  | 'projects'
  | 'awards'

function BriefcaseIcon() {
  return (
    <svg
      className="h-5 w-5 text-teal-700 print:hidden"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M9 7V6a3 3 0 0 1 3-3 3 3 0 0 1 3 3v1" strokeLinecap="round" />
      <rect x="4" y="7" width="16" height="12" rx="2" />
      <path d="M4 12h16" />
    </svg>
  )
}

function GraduationIcon() {
  return (
    <svg
      className="h-5 w-5 text-teal-700 print:hidden"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="m3 9 9-5 9 5-9 5-9-5Z" />
      <path d="M12 14v7" strokeLinecap="round" />
      <path d="M5 12v4c2 1.5 4.333 2.25 7 2.25S17 17.5 19 16v-4" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg
      className="h-5 w-5 text-teal-700 print:hidden"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M5.5 4H14a2.5 2.5 0 0 1 2.5 2.5V20H8A2.5 2.5 0 0 0 5.5 17.5V4Z" />
      <path d="M8 7h6" strokeLinecap="round" />
      <path d="M8 11h6" strokeLinecap="round" />
      <path d="M14 4h4.5v15.5a.5.5 0 0 1-.5.5H16" />
    </svg>
  )
}

function WrenchIcon() {
  return (
    <svg
      className="h-5 w-5 text-teal-700 print:hidden"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M16.4 7.6a4.5 4.5 0 0 0-5-5.9l2 2-3.5 3.5-2-2a4.5 4.5 0 0 0 5.9 5l5.3 5.3a1.5 1.5 0 0 1 0 2.1l-.2.2a1.5 1.5 0 0 1-2.1 0l-5.3-5.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LightbulbIcon() {
  return (
    <svg
      className="h-5 w-5 text-teal-700 print:hidden"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 3a6.5 6.5 0 0 0-3.3 12.1c.2.1.3.3.3.6V17a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.3c0-.2.1-.5.3-.6A6.5 6.5 0 0 0 12 3Z" />
      <path d="M10 21h4" strokeLinecap="round" />
      <path d="M10 19h4" strokeLinecap="round" />
    </svg>
  )
}

function AwardIcon() {
  return (
    <svg
      className="h-5 w-5 text-teal-700 print:hidden"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
      <path d="m9 14.5-.5 6 3.5-2 3.5 2-.5-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg
      className="h-4 w-4 text-teal-700"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M10.5 13.5 9 15a3 3 0 0 1-4.24-4.24l3-3A3 3 0 0 1 12 8.76" strokeLinecap="round" />
      <path d="M13.5 10.5 15 9a3 3 0 0 1 4.24 4.24l-3 3A3 3 0 0 1 12 15.24" strokeLinecap="round" />
      <path d="M9.75 14.25 14.25 9.75" strokeLinecap="round" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="h-4 w-4 text-teal-700" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg className="h-4 w-4 text-teal-700" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg
      className="h-4 w-4 text-teal-700"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" strokeLinecap="round" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg
      className="h-4 w-4 text-teal-700"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" strokeLinecap="round" />
    </svg>
  )
}

function SectionHeader({
  title,
  onToggle,
  collapsed,
  icon,
  anchorId,
}: {
  title: string
  onToggle: () => void
  collapsed: boolean
  icon?: ReactNode
  anchorId?: string
}) {
  return (
    <div className="flex items-center justify-between gap-2 group">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-xl font-semibold tracking-wide text-teal-700 print:text-teal-800 flex items-center gap-2">
          <span>{title}</span>
          {anchorId && (
            <Link
              href={`#${anchorId}`}
              className="hidden items-center rounded-full p-1 text-teal-700 transition hover:bg-teal-50 focus:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 group-hover:inline-flex print:hidden"
              aria-label={`Copy link to ${title}`}
            >
              <LinkIcon />
            </Link>
          )}
        </h2>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-teal-200 text-sm font-semibold text-teal-700 hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 print:hidden"
        aria-label={collapsed ? `Expand ${title}` : `Collapse ${title}`}
      >
        {collapsed ? '+' : '−'}
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
    <div className="relative grid gap-3 md:grid-cols-[110px_1fr] break-inside-avoid pl-4 rounded-lg transition hover:bg-gray-50 dark:hover:bg-gray-800">
      <span className="absolute left-0 top-2 h-full w-px bg-gray-200" aria-hidden="true" />
      <span
        className="absolute left-[-3px] top-2 h-2 w-2 rounded-full bg-teal-600"
        aria-hidden="true"
      />

      <div className="flex flex-col text-sm font-semibold uppercase text-gray-600">
        <span>{start}</span>
        <span>{end}</span>
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={onToggle}
          className="group flex items-start justify-between gap-3 rounded-md px-2 py-1 text-left transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:hover:bg-gray-800"
          aria-expanded={expanded}
        >
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold text-gray-900 dark:text-gray-100">
              {item.role}
            </span>
            <span className="inline-flex w-fit items-center text-base italic font-semibold text-teal-700 dark:text-teal-400 print:font-bold">
              {item.company}
            </span>
            {item.location && (
              <span className="text-sm italic text-gray-600 dark:text-gray-300">
                {item.location}
              </span>
            )}
          </div>
          <span className="mt-1 text-lg text-teal-700">{expanded ? '−' : '+'}</span>
        </button>

        {expanded && Array.isArray(item.bullets) && item.bullets.length > 0 && (
          <ul className="flex flex-col gap-1 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            {item.bullets.map((h, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-teal-700">›</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        {!expanded && previewTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {previewTags.map((tag, idx) => (
              <span
                key={idx}
                className="rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-800 dark:border-teal-800 dark:bg-teal-900 dark:text-teal-100"
              >
                {tag}
              </span>
            ))}
            {hasMoreTags && <span className="text-sm text-gray-500">…</span>}
          </div>
        )}

        {expanded && Array.isArray(item.tags) && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, idx) => (
              <span
                key={idx}
                className="rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-800 dark:border-teal-800 dark:bg-teal-900 dark:text-teal-100"
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
    <div className="flex flex-col gap-1 break-inside-avoid">
      <h3 className="text-base leading-tight text-gray-900 dark:text-gray-100">
        <span className="font-bold text-gray-900 dark:text-gray-100">{degree}</span>
        {institution && (
          <>
            {', '}
            <span className="inline-flex w-fit items-center text-base italic font-semibold text-teal-700 dark:text-teal-400 print:font-bold">
              {institution}
            </span>
          </>
        )}
        {bracket && (
          <>
            {' '}
            <span className="text-gray-700 dark:text-gray-200">({bracket})</span>
          </>
        )}
      </h3>
      <div className="text-sm uppercase text-gray-500">{item.dates}</div>
    </div>
  )
}

function SkillsList({ items }: { items: NonNullable<ResumeData['skills']> }) {
  return (
    <div className="flex flex-col gap-2">
      {items?.map((group, i) => (
        <p
          key={i}
          className="text-base text-gray-900 dark:text-gray-100 print:font-bold transition-colors hover:text-teal-800 dark:hover:text-teal-200"
        >
          <span className="font-semibold">{group.category}:</span>{' '}
          <span className="font-normal text-gray-700 dark:text-gray-200">
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
    <ul className="list-disc pl-5 text-base leading-relaxed">
      {items.map((p, i) => (
        <li key={i} className="mt-1 transition hover:text-teal-800 dark:hover:text-teal-200">
          <span className="font-semibold text-gray-900 dark:text-gray-100 print:font-bold">
            {p.title}
          </span>
          {p.year ? ` (${p.year})` : ''}
          {p.journal ? ` — ${p.journal}` : p.booktitle ? ` — ${p.booktitle}` : ''}
          {p.author ? ` — ${p.author}` : ''}
        </li>
      ))}
    </ul>
  )
}

function AwardsList({ items }: { items?: NonNullable<ResumeData['awards']> }) {
  if (!items?.length) return null

  return (
    <div className="space-y-3">
      <ul className="text-base leading-relaxed space-y-3">
        {items.map((a, i) => {
          const titleParts = a.title?.split(' — ') || []
          const awardTitle = titleParts[0]?.trim() || ''
          const organization = titleParts.length > 1 ? titleParts.slice(1).join(' — ').trim() : ''

          return (
            <li key={i} className="flex gap-3 items-baseline">
              <span className="text-sm uppercase text-gray-600 dark:text-gray-400 min-w-[70px]">
                {a.year}
              </span>
              <div className="text-gray-900 dark:text-gray-100">
                <span className="text-sm font-semibold print:font-bold">{awardTitle}</span>
                {organization && (
                  <>
                    {' — '}
                    <span className="text-sm italic font-semibold text-teal-700 dark:text-teal-400 print:font-bold">
                      {organization}
                    </span>
                  </>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ProjectsList({ items }: { items?: NonNullable<ResumeData['projects']> }) {
  if (!items?.length) return null
  return (
    <div className="space-y-3">
      {items.map((p, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 rounded-xl border border-gray-200/80 bg-white/70 p-4 shadow-sm shadow-gray-100/70 transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/60 dark:shadow-none"
        >
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-base font-semibold text-gray-900 dark:text-gray-100 print:font-bold">
              {p.title}
            </p>
            {p.dates && <span className="text-sm uppercase text-gray-500">{p.dates}</span>}
          </div>
          {p.description && (
            <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
              {p.description}
            </p>
          )}
          <div className="flex flex-wrap gap-3 text-sm text-teal-700">
            {p.links &&
              Object.values(p.links).map((link, idx) => (
                <Link
                  key={idx}
                  href={link.url}
                  className="underline underline-offset-4 hover:text-teal-500"
                >
                  {link.display || link.url}
                </Link>
              ))}
          </div>
          {p.tech && p.tech.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {p.tech.map((tech, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-teal-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-teal-800 dark:bg-teal-900/60 dark:text-teal-100"
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
    <main
      className="container relative mx-auto scroll-my-12 overflow-auto p-3 print:p-8 md:p-10"
      id="main-content"
    >
      <section
        className="mx-auto w-full max-w-5xl space-y-8 print:space-y-6"
        aria-label="Resume Content"
      >
        {!hideHero && (
          <header className="flex flex-col gap-4 print:gap-2 p-0 print:p-0">
            <div className="flex flex-col items-center gap-4 md:grid md:gap-6 md:grid-cols-[1fr_160px] md:items-start">
              <div className="flex justify-center md:order-2">
                {heroImage ? (
                  <Image
                    src={heroImage.src}
                    alt={heroImage.alt || data.name}
                    width={140}
                    height={140}
                    className="h-32 w-32 md:h-[140px] md:w-[140px] rounded-full object-cover shadow-sm dark:shadow-none"
                  />
                ) : (
                  <div className="flex h-32 w-32 md:h-[140px] md:w-[140px] items-center justify-center rounded-full bg-teal-50 text-3xl font-bold text-teal-700 dark:bg-gray-800">
                    {data.name?.[0] || '?'}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 items-center text-center md:items-start md:text-left md:order-1">
                <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
                  {data.name}
                </h1>
                <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                  Data Scientist | Analytics Engineer
                </p>
                <div className="mt-2 flex flex-col gap-1.5 text-sm text-gray-700 dark:text-gray-300">
                  {data.socials && Object.keys(data.socials).length > 0 ? (
                    Object.values(data.socials).map((s, i) => (
                      <Link
                        key={i}
                        href={s.url}
                        className="flex items-center gap-2 hover:text-teal-700 transition-colors"
                      >
                        <span className="text-teal-700">▸</span>
                        <span>{s.display || s.url}</span>
                      </Link>
                    ))
                  ) : (
                    <>
                      <Link
                        href="https://linkedin.com/in/tieukhoimai"
                        className="flex items-center gap-2 hover:text-teal-700 transition-colors"
                      >
                        <LinkedInIcon />
                        <span>linkedin.com/in/tieukhoimai</span>
                      </Link>
                      <Link
                        href="https://github.com/tieukhoimai"
                        className="flex items-center gap-2 hover:text-teal-700 transition-colors"
                      >
                        <GitHubIcon />
                        <span>github.com/tieukhoimai</span>
                      </Link>
                      <Link
                        href="mailto:tieukhoimai@gmail.com"
                        className="flex items-center gap-2 hover:text-teal-700 transition-colors"
                      >
                        <EmailIcon />
                        <span>tieukhoimai@gmail.com</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            {data.headline && (
              <div className="mt-4 text-[15px] leading-[1.65] text-gray-700 text-justify dark:text-gray-300">
                {data.headline.split('\n').map((para, idx) => (
                  <p key={idx} className="mb-3 last:mb-0">
                    {para.trim()}
                  </p>
                ))}
              </div>
            )}
          </header>
        )}

        <div className="space-y-8 mt-8">
          {isSectionEnabled('education') && data.education && data.education.length > 0 && (
            <section id="education" className="flex flex-col gap-3 p-0">
              <SectionHeader
                title="Education"
                onToggle={() => toggleSection('education')}
                collapsed={!!collapsed['education']}
                icon={<GraduationIcon />}
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
            <section id="experience" className="flex flex-col gap-3 p-0">
              <SectionHeader
                title="Work Experience"
                onToggle={() => toggleSection('experience')}
                collapsed={!!collapsed['experience']}
                icon={<BriefcaseIcon />}
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
              <section id="publications" className="flex flex-col gap-3 break-inside-avoid p-0">
                <SectionHeader
                  title="Publications"
                  onToggle={() => toggleSection('publications')}
                  collapsed={!!collapsed['publications']}
                  icon={<BookIcon />}
                  anchorId="publications"
                />
                {!collapsed['publications'] && <PublicationsList items={data.publications} />}
              </section>
            )}

          {isSectionEnabled('skills') && data.skills && data.skills.length > 0 && (
            <section id="skills" className="flex flex-col gap-3 p-0">
              <SectionHeader
                title="Skills"
                onToggle={() => toggleSection('skills')}
                collapsed={!!collapsed['skills']}
                icon={<WrenchIcon />}
                anchorId="skills"
              />
              {!collapsed['skills'] && <SkillsList items={data.skills} />}
            </section>
          )}

          {isSectionEnabled('projects') && data.projects && data.projects.length > 0 && (
            <section id="projects" className="flex flex-col gap-3 break-inside-avoid p-0">
              <SectionHeader
                title="Projects"
                onToggle={() => toggleSection('projects')}
                collapsed={!!collapsed['projects']}
                icon={<LightbulbIcon />}
                anchorId="projects"
              />
              {!collapsed['projects'] && <ProjectsList items={data.projects} />}
            </section>
          )}

          {isSectionEnabled('awards') && data.awards && data.awards.length > 0 && (
            <section id="awards" className="flex flex-col gap-3 break-inside-avoid p-0">
              <SectionHeader
                title="Awards"
                onToggle={() => toggleSection('awards')}
                collapsed={!!collapsed['awards']}
                icon={<AwardIcon />}
                anchorId="awards"
              />
              {!collapsed['awards'] && <AwardsList items={data.awards} />}
            </section>
          )}
          <footer className="mt-4 border-t pt-4 text-xs text-gray-500 print:mt-6 print:pt-3">
            <div className="flex flex-col items-center gap-2 md:grid md:gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center md:text-left">
              <span className="md:justify-self-start">
                Last updated:{' '}
                {new Date(data.meta?.generated_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
              <Link
                href="https://tieukhoimai.github.io/mia-resume-builder/cv.pdf"
                className="w-full md:w-auto rounded-lg bg-teal-700 px-6 py-3 md:py-2 text-center text-white font-semibold hover:bg-teal-800 transition-colors print:hidden md:justify-self-center order-first md:order-none"
              >
                Download CV (PDF)
              </Link>
              <Link
                href="https://github.com/tieukhoimai/mia-resume-builder"
                className="text-gray-500 underline underline-offset-4 hover:text-teal-700 md:justify-self-end"
              >
                Sourced from mia-resume-builder
              </Link>
            </div>
          </footer>
        </div>
      </section>
    </main>
  )
}
