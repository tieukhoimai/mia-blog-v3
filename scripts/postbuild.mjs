import { execSync } from 'child_process'

async function postbuild() {
  try {
    // Generate series data automatically from MDX files
    console.log('Generating series data...')
    execSync('node scripts/generate-series.mjs', { stdio: 'inherit' })
    
    // Generate RSS feeds - commented out due to import assertion issue
    // await rss()
    console.log('Postbuild process completed successfully!')
  } catch (error) {
    console.error('Error in postbuild process:', error)
    process.exit(1)
  }
}

postbuild()
