# Knowledge Graph Generator

Regenerate the blog's knowledge graph by deeply analyzing all articles in `data/blog/`.

## Process

1. **Read** every MDX file in `data/blog/`. For each article collect:

   - `title`, `tags`, `series`, `summary` from frontmatter
   - The article body text (first 400–600 words) for concept extraction

2. **Extract two types of nodes** per article:

   **a) Tag nodes** — from the frontmatter `tags` field, normalized to lowercase-hyphenated
   (e.g. `Data Engineering` → `data-engineering`)

   **b) Concept nodes** — key technical ideas found in the body/summary that are NOT in the tags:

   - Normalize to lowercase-hyphenated (e.g. `star schema` → `star-schema`)
   - Must be a concrete technical concept (not vague terms like "data", "model")
   - Examples: `normalization`, `star-schema`, `fact-table`, `slowly-changing-dimension`,
     `embeddings`, `transformer`, `attention-mechanism`, `acid-properties`, `olap`, `data-mesh`

3. **Build edges** — two concepts/tags are connected when they appear in the same article.
   Edge weight = count of articles where both co-occur.

4. **Filter**:

   - Keep nodes that appear in **2 or more** articles (weight ≥ 2)
   - Keep all edges between kept nodes (weight ≥ 1)
   - Cap at **20 nodes** maximum — prefer higher-weight nodes

5. **Write** to **both** `app/graph-data.json` AND `public/graph-data.json`:

```json
{
  "generated": "YYYY-MM-DD",
  "nodes": [
    {
      "id": "data-engineering",
      "label": "Data Engineering",
      "weight": 10,
      "href": "/tags/data-engineering"
    },
    {
      "id": "star-schema",
      "label": "Star Schema",
      "weight": 2,
      "href": "/tags/dimensional-modeling"
    }
  ],
  "edges": [
    { "source": "data-engineering", "target": "data-warehouse", "weight": 8 },
    { "source": "star-schema", "target": "dimensional-modeling", "weight": 2 }
  ]
}
```

6. **Print a summary**: nodes added, edges added, articles processed, date.

## Node href rules

- If node `id` exactly matches a slug in `app/tag-data.json` → `href: /tags/{id}`
- If node is a concept not in tag-data (e.g. `star-schema`, `normalization`) →
  link to the closest parent tag page (e.g. `dimensional-modeling`, `database`)
- If node is a series slug → `href: /series/{slug}`

## Label rules

- `id` is always lowercase-hyphenated (slug form)
- `label` is the human-readable display name (title-case, abbreviations preserved: `LLMs`, `RAG`, `SCD`, `ETL`)

## Quality bar

Prefer nodes that reveal _structure_ — relationships between ideas — over generic category words.
`star-schema` is better than `schema`. `slowly-changing-dimension` (shown as `SCD`) is better
than `dimension`. `normalization` is better than `database-design`.
Use 2-space JSON indentation.
