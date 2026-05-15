import Link from '@/components/Link'
import Image from '@/components/Image'
import projectsData from '@/data/projectsData'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Learning' })

export default function Learning() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-8">
      <div className="mb-10">
        <p className="mb-1 text-[10.5px] tracking-[0.13em] text-gray-400 dark:text-gray-600">
          — learning
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          Study with me
        </h1>
        <p className="mt-2 text-[13px] text-gray-500 dark:text-gray-400">
          Let's learn it, write it and bring it all together for continous improvement.
        </p>
      </div>

      <ul className="divide-y divide-gray-100 dark:divide-gray-800">
        {projectsData.map((item, index) => (
          <li key={item.title} className="py-6 first:pt-0">
            <div className="flex items-start gap-4">
              {/* Index number */}
              <span className="mt-1 w-6 shrink-0 font-mono text-[11px] text-gray-400 dark:text-gray-600">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Text content */}
              <div className="min-w-0 flex-1">
                <h2 className="mb-1 text-[15px] font-semibold leading-snug tracking-tight text-gray-900 dark:text-gray-100">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-gray-600 dark:hover:text-gray-400"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    item.title
                  )}
                </h2>
                <p className="mb-3 text-[13px] font-light leading-relaxed text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
                {item.href && (
                  <Link
                    href={item.href}
                    className="text-[12px] text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    Open notes →
                  </Link>
                )}
              </div>

              {/* Thumbnail */}
              {/* {item.imgSrc && (
                <div className="shrink-0 overflow-hidden rounded-sm">
                  <Image
                    src={item.imgSrc}
                    alt={item.title}
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] object-cover"
                  />
                </div>
              )} */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
