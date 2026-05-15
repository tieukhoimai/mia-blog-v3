import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
  /**
   * Visual variant for the tag link.
   * - "text": legacy inline text link
   * - "chip": pill-like chip used for compact mobile rows
   */
  variant?: 'text' | 'chip'
  /**
   * Extra classes to append to the computed classes
   */
  className?: string
  /**
   * Optional count badge to show next to tag text (used in chip variant)
   */
  count?: number
}

const Tag = ({ text, variant = 'text', className = '', count }: Props) => {
  const baseText =
    'mr-3 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
  const chipText =
    'inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'

  const classes = `${variant === 'chip' ? chipText : baseText} ${className}`.trim()

  return (
    <Link href={`/tags/${slug(text)}`} className={classes} rel="tag">
      {text.split(' ').join('-')}
      {typeof count === 'number' && (
        <span className="ml-1 text-[10px] font-medium text-gray-500 dark:text-gray-400">
          ({count})
        </span>
      )}
    </Link>
  )
}

export default Tag
