#!/usr/bin/env node

/**
 * Fix Contentlayer2 generated files to use modern import syntax
 * This script converts deprecated 'assert { type: "json" }' to 'with { type: "json" }'
 * to maintain compatibility with Node.js v23+
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

function fixContentlayerImports() {
  const generatedDir = '.contentlayer/generated'
  const indexFile = join(generatedDir, 'index.mjs')

  if (!existsSync(indexFile)) {
    console.log('⚠️  Contentlayer index.mjs not found, skipping fix...')
    return
  }

  console.log('🔧 Fixing Contentlayer import syntax for Node.js v23+ compatibility...')

  try {
    const content = readFileSync(indexFile, 'utf8')

    // Replace 'assert { type: 'json' }' with 'with { type: 'json' }'
    const fixedContent = content.replace(
      /assert\s*{\s*type:\s*['"]json['"]\s*}/g,
      "with { type: 'json' }"
    )

    if (content !== fixedContent) {
      writeFileSync(indexFile, fixedContent)
      console.log('✅ Fixed import assertions in', indexFile)
    } else {
      console.log('✅ No fixes needed, imports already use correct syntax')
    }
  } catch (error) {
    console.error('❌ Error fixing contentlayer imports:', error.message)
    process.exit(1)
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  fixContentlayerImports()
}

export default fixContentlayerImports
