import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, linkedin, github } = content

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-8">
      <div className="mb-10">
        <p className="mb-1 text-2xs tracking-[0.13em] text-gray-400 dark:text-gray-600">— about</p>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          About
        </h1>
      </div>

      <div className="flex flex-col gap-10 md:flex-row md:gap-12">
        {/* Avatar + identity */}
        <div className="flex flex-col items-start gap-4 md:w-48 md:shrink-0">
          {avatar && (
            <Image
              src={avatar}
              alt="avatar"
              width={192}
              height={192}
              className="h-32 w-32 rounded-full"
            />
          )}
          <div>
            <h2 className="text-base font-semibold tracking-tight text-gray-900 dark:text-gray-100">
              {name}
            </h2>
            {occupation && <p className="text-sm text-gray-500 dark:text-gray-400">{occupation}</p>}
            {company && <p className="text-sm text-gray-500 dark:text-gray-400">{company}</p>}
          </div>
          <div className="flex gap-3">
            <SocialIcon kind="mail" href={`mailto:${email}`} size={5} />
            <SocialIcon kind="github" href={github} size={5} />
            <SocialIcon kind="linkedin" href={linkedin} size={5} />
          </div>
        </div>

        {/* Bio */}
        <div className="prose min-w-0 flex-1 dark:prose-invert">{children}</div>
      </div>
    </div>
  )
}
