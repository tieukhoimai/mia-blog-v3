import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between px-4 py-6 sm:px-6 xl:px-8">
        <span className="text-[11.5px] text-gray-400 dark:text-gray-600">{siteMetadata.title}</span>
        <span className="font-mono text-[11px] text-gray-400 dark:text-gray-600">
          © {new Date().getFullYear()} Mai Khoi TIEU
        </span>
      </div>
    </footer>
  )
}
