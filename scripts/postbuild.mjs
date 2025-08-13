import { execSync } from 'child_process'

async function postbuild() {
  try {
    // Fix contentlayer import syntax for Node.js v23+ compatibility
    console.log('Fixing contentlayer import syntax...')
    execSync('node scripts/fix-contentlayer.mjs', { stdio: 'inherit' })

    // Generate tag count data (moved from contentlayer callback)
    console.log('Generating tag count data...')
    execSync('node scripts/generate-tags.mjs', { stdio: 'inherit' })

    // Generate series data automatically from MDX files
    console.log('Generating series data...')
    execSync('node scripts/generate-series.mjs', { stdio: 'inherit' })

    // Generate search index (moved from contentlayer callback)
    console.log('Generating search index...')
    execSync('node scripts/generate-search.mjs', { stdio: 'inherit' })

    console.log('✅ Postbuild process completed successfully!')
  } catch (error) {
    console.error('❌ Error in postbuild process:', error)
    process.exit(1)
  }
}

postbuild()
