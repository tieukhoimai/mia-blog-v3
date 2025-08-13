import { writeFileSync, readFileSync, readdirSync } from 'fs'
import matter from 'gray-matter'

// Simple function to extract core content (similar to pliny's allCoreContent)
function allCoreContent(posts) {
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    tags: post.tags || [],
    summary: post.summary || '',
    image: post.image || '',
  }))
}

// Simple function to sort posts by date
function sortPosts(posts) {
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

function createSearchIndex() {
  console.log('🔍 Generating search index...')

  // For now, we'll create a basic search index
  // This would normally use siteMetadata, but we'll simplify for compatibility

  const isProduction = process.env.NODE_ENV === 'production'

  // Find all MDX files in the blog directory
  const blogFiles = readdirSync('data/blog')
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => `data/blog/${file}`)

  console.log(`📄 Processing ${blogFiles.length} blog files for search index`)

  const allBlogs = []

  // Process each blog file
  blogFiles.forEach((filePath) => {
    try {
      const fileContent = readFileSync(filePath, 'utf8')
      const { data: frontmatter, content } = matter(fileContent)

      // Skip if draft in production
      if (!isProduction || frontmatter.draft !== true) {
        const slug = filePath.replace('data/blog/', '').replace('.mdx', '')

        allBlogs.push({
          slug,
          title: frontmatter.title,
          date: frontmatter.date,
          tags: frontmatter.tags || [],
          summary: frontmatter.summary || '',
          image: frontmatter.image || '',
          path: `blog/${slug}`,
        })
      }
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message)
    }
  })

  // Create search index (assuming kbar search configuration)
  const searchData = allCoreContent(sortPosts(allBlogs))

  // Write to public directory for client-side search
  writeFileSync('public/search.json', JSON.stringify(searchData))

  console.log('✅ Search index generated successfully!')
  console.log(`📊 Indexed ${searchData.length} posts`)

  return searchData
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createSearchIndex()
}

export default createSearchIndex
