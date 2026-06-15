import { writeFileSync, readFileSync, readdirSync, mkdirSync } from 'fs'
import matter from 'gray-matter'
import { slug } from 'github-slugger'

// Preserve known abbreviations in display labels
const ABBREV = {
  llms: 'LLMs',
  rag: 'RAG',
  etl: 'ETL',
  elt: 'ELT',
  cdc: 'CDC',
  rlhf: 'RLHF',
  dpo: 'DPO',
  scd: 'SCD',
  ai: 'AI',
}

function toLabel(id) {
  return id
    .split('-')
    .map((w) => ABBREV[w] ?? w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function generateGraph({ minWeight = 2, maxNodes = 20 } = {}) {
  console.log('🕸️  Generating knowledge graph...')

  const isProduction = process.env.NODE_ENV === 'production'

  const blogFiles = readdirSync('data/blog')
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => `data/blog/${f}`)

  console.log(`📄 Found ${blogFiles.length} blog files`)

  // Parse each article: extract slug-normalised tags
  const articles = []
  blogFiles.forEach((filePath) => {
    try {
      const { data: fm } = matter(readFileSync(filePath, 'utf8'))
      if (isProduction && fm.draft === true) return
      const tags = [...new Set((fm.tags ?? []).map((t) => slug(t)))]
      if (tags.length > 0) articles.push({ tags })
    } catch (err) {
      console.error(`❌ Error reading ${filePath}:`, err.message)
    }
  })

  // Node weight = number of articles containing that tag
  const tagWeight = {}
  articles.forEach(({ tags }) => {
    tags.forEach((t) => {
      tagWeight[t] = (tagWeight[t] ?? 0) + 1
    })
  })

  // Edge weight = number of articles where both tags co-occur
  const edgeWeight = {}
  articles.forEach(({ tags }) => {
    const kept = tags.filter((t) => tagWeight[t] >= minWeight)
    for (let i = 0; i < kept.length; i++) {
      for (let j = i + 1; j < kept.length; j++) {
        const key = [kept[i], kept[j]].sort().join('||')
        edgeWeight[key] = (edgeWeight[key] ?? 0) + 1
      }
    }
  })

  // Build nodes — top maxNodes by weight
  const nodes = Object.entries(tagWeight)
    .filter(([, w]) => w >= minWeight)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxNodes)
    .map(([id, weight]) => ({
      id,
      label: toLabel(id),
      weight,
      href: `/tags/${id}`,
    }))

  const nodeIds = new Set(nodes.map((n) => n.id))

  // Build edges between kept nodes
  const edges = Object.entries(edgeWeight)
    .map(([key, weight]) => {
      const [source, target] = key.split('||')
      return { source, target, weight }
    })
    .filter((e) => nodeIds.has(e.source) && nodeIds.has(e.target))
    .sort((a, b) => b.weight - a.weight)

  const graphData = {
    generated: new Date().toISOString().split('T')[0],
    nodes,
    edges,
  }

  const json = JSON.stringify(graphData, null, 2)
  const outFiles = ['app/graph-data.json', 'public/graph-data.json']
  outFiles.forEach((f) => {
    mkdirSync(f.split('/').slice(0, -1).join('/'), { recursive: true })
    writeFileSync(f, json)
  })

  console.log(`✅ Knowledge graph generated successfully!`)
  console.log(`📊 Nodes: ${nodes.length} | Edges: ${edges.length}`)
  console.log(`   Articles processed: ${articles.length}`)
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateGraph()
}

export default generateGraph
