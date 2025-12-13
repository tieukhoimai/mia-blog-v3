'use client'

import Link from 'next/link'
import { useEffect, useState, type ReactNode } from 'react'
import { ResumeData } from './types'

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

      <div className="flex flex-col text-xs font-semibold uppercase text-gray-600">
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
            {hasMoreTags && <span className="text-xs text-gray-500">…</span>}
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
      <div className="text-xs uppercase text-gray-500">{item.dates}</div>
    </div>
  )
}

function SkillsList({ items }: { items: NonNullable<ResumeData['skills']> }) {
  return (
    <div className="flex flex-col gap-2">
      {items?.map((group, i) => (
        <p
          key={i}
          className="text-sm text-gray-900 dark:text-gray-100 print:font-bold transition-colors hover:text-teal-800 dark:hover:text-teal-200"
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
    <ul className="list-disc pl-5 text-sm leading-relaxed">
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
    <ul className="list-disc pl-5 text-sm leading-relaxed">
      {items.map((a, i) => (
        <li key={i} className="mt-1 transition hover:text-teal-800 dark:hover:text-teal-200">
          <span className="font-semibold text-gray-900 dark:text-gray-100 print:font-bold">
            {a.title}
          </span>
          {a.year ? ` — ${a.year}` : ''}
        </li>
      ))}
    </ul>
  )
}

function ProjectsList({ items }: { items?: NonNullable<ResumeData['projects']> }) {
  if (!items?.length) return null
  return (
    <div className="space-y-3">
      {items.map((p, i) => (
        <div
          key={i}
          className="flex flex-col gap-1 rounded-lg transition hover:bg-gray-50 dark:hover:bg-gray-800 p-2 -m-2"
        >
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-base font-semibold text-gray-900 dark:text-gray-100 print:font-bold">
              {p.title}
            </p>
            {p.dates && <span className="text-xs uppercase text-gray-500">{p.dates}</span>}
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
            <p className="text-xs uppercase text-gray-500">{p.tech.join(' · ')}</p>
          )}
        </div>
      ))}
    </div>
  )
}

export default function ResumeClient({ data }: { data: ResumeData }) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  const [expandedExp, setExpandedExp] = useState<Record<number, boolean>>({})
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    setHeroVisible(true)
  }, [])

  const toggleSection = (id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleExperience = (idx: number) => {
    setExpandedExp((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <main
      className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-10 md:p-14 bg-white dark:bg-gray-900 dark:text-white"
      id="main-content"
    >
      <section
        className="mx-auto w-full max-w-3xl space-y-8 print:space-y-6"
        aria-label="Resume Content"
      >
        <header
          className={`flex flex-col gap-2 print:gap-1 transition-all duration-500 ease-out ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          } print:opacity-100 print:translate-y-0`}
        >
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {data.name}
            </h1>
            <span className="h-0.5 w-16 rounded-full bg-teal-600" aria-hidden="true" />
          </div>
          {data.headline && (
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-200 max-w-2xl">
              {data.headline}
            </p>
          )}
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-teal-700">
            {data.socials &&
              Object.values(data.socials).map((s, i) => (
                <Link
                  key={i}
                  href={s.url}
                  className="underline underline-offset-4 hover:text-teal-500 transition-colors"
                >
                  {s.display || s.url}
                </Link>
              ))}
          </div>
        </header>

        {data.experience && data.experience.length > 0 && (
          <section id="experience" className="flex flex-col gap-4">
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
                    expanded={expandedExp[idx] ?? true}
                    onToggle={() => toggleExperience(idx)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section id="education" className="flex flex-col gap-4">
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

        {data.publications && data.publications.length > 0 && (
          <section id="publications" className="flex flex-col gap-3 break-inside-avoid">
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

        {data.skills && data.skills.length > 0 && (
          <section id="skills" className="flex flex-col gap-3">
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

        {data.projects && data.projects.length > 0 && (
          <section id="projects" className="flex flex-col gap-3 break-inside-avoid">
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

        {data.awards && data.awards.length > 0 && (
          <section id="awards" className="flex flex-col gap-3 break-inside-avoid">
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

        <footer className="mt-8 border-t pt-4 text-xs text-gray-500 print:mt-6 print:pt-3">
          <div className="grid gap-3 text-center sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:text-left">
            <span className="justify-self-start">
              Last updated: {new Date(data.meta?.generated_at).toLocaleDateString()}
            </span>
            <Link
              href="https://tieukhoimai.github.io/mia-resume-builder/cv.pdf"
              className="justify-self-center text-gray-500 underline underline-offset-4 hover:text-teal-700 print:hidden"
            >
              Download CV (PDF)
            </Link>
            <Link
              href="https://github.com/tieukhoimai/mia-resume-builder"
              className="justify-self-end text-gray-500 underline underline-offset-4 hover:text-teal-700"
            >
              Built by mia-resume-builder
            </Link>
          </div>
        </footer>
      </section>
    </main>
  )
}
