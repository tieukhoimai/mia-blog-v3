import { writeFileSync, readFileSync, readdirSync } from 'fs'
import matter from 'gray-matter'
import { slug } from 'github-slugger'

function createTagCount() {
  console.log('🏷️  Generating tag count data...')

  const isProduction = process.env.NODE_ENV === 'production'

  // Find all MDX files in the blog directory
  const blogFiles = readdirSync('data/blog')
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => `data/blog/${file}`)

  console.log(`📄 Found ${blogFiles.length} blog files`)

  const tagCount = {}

  // Process each blog file
  blogFiles.forEach((filePath) => {
    try {
      const fileContent = readFileSync(filePath, 'utf8')
      const { data: frontmatter } = matter(fileContent)

      // Skip if draft in production
      if (frontmatter.tags && (!isProduction || frontmatter.draft !== true)) {
        frontmatter.tags.forEach((tag) => {
          const formattedTag = slug(tag)
          if (formattedTag in tagCount) {
            tagCount[formattedTag] += 1
          } else {
            tagCount[formattedTag] = 1
          }
        })
      }
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message)
    }
  })

  // Write tag count data
  writeFileSync('./app/tag-data.json', JSON.stringify(tagCount))

  console.log('✅ Tag count data generated successfully!')
  console.log(`📊 Tags found: ${Object.keys(tagCount).length}`)

  return tagCount
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createTagCount()
}

export default createTagCount
