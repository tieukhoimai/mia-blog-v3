import { writeFileSync, readFileSync, readdirSync } from 'fs'
import matter from 'gray-matter'
import { slug } from 'github-slugger'

function createSeriesData() {
  console.log('🔍 Scanning for articles with series...')

  // Find all MDX files in the blog directory
  const blogFiles = readdirSync('data/blog')
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => `data/blog/${file}`)

  console.log(`📄 Found ${blogFiles.length} blog files`)

  const seriesData = {}

  // Process each blog file
  blogFiles.forEach((filePath) => {
    try {
      console.log(`🔍 Processing: ${filePath}`)
      const fileContent = readFileSync(filePath, 'utf8')
      const { data: frontmatter } = matter(fileContent)

      console.log(`   - Title: ${frontmatter.title}`)
      console.log(`   - Series: ${frontmatter.series}`)
      console.log(`   - Draft: ${frontmatter.draft}`)

      // Skip if no series field or if draft
      if (!frontmatter.series || frontmatter.draft === true) {
        console.log(`   ⏭️  Skipping (no series or draft)`)
        return
      }

      console.log(`📋 Found article in series: "${frontmatter.series}" - ${frontmatter.title}`)

      // Create series slug for grouping
      const seriesSlug = slug(frontmatter.series)

      if (!seriesData[seriesSlug]) {
        seriesData[seriesSlug] = []
      }

      // Extract filename without extension for slug
      const articleSlug = filePath.replace('data/blog/', '').replace('.mdx', '')

      // Add article to series
      seriesData[seriesSlug].push({
        title: frontmatter.title,
        date: frontmatter.date,
        summary: frontmatter.summary || '',
        slug: articleSlug,
        image: frontmatter.image || '',
        series: frontmatter.series,
        path: `blog/${articleSlug}`,
        seriesOrder: frontmatter.seriesOrder || null,
      })
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message)
    }
  })

  // Sort articles within each series by seriesOrder if available, otherwise by date
  Object.keys(seriesData).forEach((seriesSlug) => {
    seriesData[seriesSlug].sort((a, b) => {
      // If both have seriesOrder, sort by that
      if (a.seriesOrder != null && b.seriesOrder != null) {
        return (a.seriesOrder || 0) - (b.seriesOrder || 0)
      }
      // If only one has seriesOrder, prioritize it
      if (a.seriesOrder != null) return -1
      if (b.seriesOrder != null) return 1
      // Otherwise fall back to date sorting
      return new Date(a.date) - new Date(b.date)
    })
    console.log(
      `📅 Sorted ${seriesData[seriesSlug].length} articles in "${seriesData[seriesSlug][0].series}" series`
    )
  })

  // Write to both locations
  const jsonOutput = JSON.stringify(seriesData, null, 2)
  writeFileSync('./app/series-data.json', jsonOutput)
  writeFileSync('./public/series-data.json', jsonOutput)

  console.log('✅ Series data generated successfully!')
  console.log(`📊 Series found: ${Object.keys(seriesData).length}`)
  Object.entries(seriesData).forEach(([seriesSlug, articles]) => {
    console.log(
      `   - ${articles[0].series}: ${articles.length} article${articles.length > 1 ? 's' : ''}`
    )
  })

  return seriesData
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createSeriesData()
}

export default createSeriesData
