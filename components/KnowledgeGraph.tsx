'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'

interface Node {
  id: string
  label: string
  weight: number
  href: string
}

interface Edge {
  source: string
  target: string
  weight: number
}

interface GraphData {
  nodes: Node[]
  edges: Edge[]
}

interface SimNode {
  id: string
  x: number
  y: number
  vx: number
  vy: number
}

interface Props {
  data: GraphData
  decorative?: boolean
  /** 0–1: fraction of width to bias gravity toward (default 0.5 = centred, 0.65 = right) */
  biasX?: number
}

// ── Force simulation helpers ─────────────────────────────────────────────────

function initSimNodes(
  nodes: Node[],
  edges: Edge[],
  w: number,
  h: number,
  biasX: number
): SimNode[] {
  const PAD_X = 30
  const PAD_Y = 20
  const cx = w * biasX
  const cy = h / 2
  const r = Math.min(w * 0.42, h * 0.44)

  const state: SimNode[] = nodes.map((_, i) => ({
    id: nodes[i].id,
    x: cx + Math.cos((2 * Math.PI * i) / nodes.length - Math.PI / 2) * r,
    y: cy + Math.sin((2 * Math.PI * i) / nodes.length - Math.PI / 2) * r * 0.75,
    vx: 0,
    vy: 0,
  }))

  // Clamp into bounds
  state.forEach((p) => {
    p.x = Math.max(PAD_X, Math.min(w - PAD_X, p.x))
    p.y = Math.max(PAD_Y, Math.min(h - PAD_Y, p.y))
  })

  // Run to convergence
  const pm: Record<string, SimNode> = Object.fromEntries(state.map((p) => [p.id, p]))
  for (let iter = 0; iter < 400; iter++) {
    stepForces(state, pm, edges, w, h, null, biasX)
  }
  return state
}

function stepForces(
  nodes: SimNode[],
  pm: Record<string, SimNode>,
  edges: Edge[],
  w: number,
  h: number,
  dragId: string | null,
  biasX = 0.5
) {
  const PAD_X = 30
  const PAD_Y = 20

  nodes.forEach((p) => {
    p.vx = 0
    p.vy = 0
  })

  // Repulsion
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[j].x - nodes[i].x
      const dy = nodes[j].y - nodes[i].y
      const d2 = dx * dx + dy * dy + 1
      const d = Math.sqrt(d2)
      const f = 4500 / d2
      nodes[i].vx -= (dx / d) * f
      nodes[i].vy -= (dy / d) * f
      nodes[j].vx += (dx / d) * f
      nodes[j].vy += (dy / d) * f
    }
  }

  // Springs
  edges.forEach((e) => {
    const a = pm[e.source]
    const b = pm[e.target]
    if (!a || !b) return
    const dx = b.x - a.x
    const dy = b.y - a.y
    const d = Math.sqrt(dx * dx + dy * dy) + 0.01
    const ideal = Math.max(100, 200 - e.weight * 15)
    const f = 0.07 * (d - ideal)
    a.vx += (dx / d) * f
    a.vy += (dy / d) * f
    b.vx -= (dx / d) * f
    b.vy -= (dy / d) * f
  })

  // Weak center gravity — lets nodes fill the canvas
  nodes.forEach((p) => {
    p.vx += (w * biasX - p.x) * 0.0003
    p.vy += (h / 2 - p.y) * 0.008
  })

  // Integrate (skip pinned/dragged node)
  nodes.forEach((p) => {
    if (p.id === dragId) return
    p.x = Math.max(PAD_X, Math.min(w - PAD_X, p.x + p.vx * 0.5))
    p.y = Math.max(PAD_Y, Math.min(h - PAD_Y, p.y + p.vy * 0.5))
  })
}

function arcPath(sx: number, sy: number, tx: number, ty: number, idx: number) {
  const mx = (sx + tx) / 2
  const my = (sy + ty) / 2
  const dx = tx - sx
  const dy = ty - sy
  const len = Math.sqrt(dx * dx + dy * dy) + 0.01
  const curve = 0.18 * len * (idx % 2 === 0 ? 1 : -1)
  const cx = mx - (dy / len) * curve
  const cy = my + (dx / len) * curve
  return `M ${sx},${sy} Q ${cx},${cy} ${tx},${ty}`
}

// ── Component ────────────────────────────────────────────────────────────────

export default function KnowledgeGraph({ data, decorative = false, biasX = 0.5 }: Props) {
  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [dims, setDims] = useState({ w: 0, h: 0 })
  const dimsRef = useRef({ w: 0, h: 0 })

  // Simulation state (mutable, not React state)
  const simRef = useRef<SimNode[]>([])
  const pmRef = useRef<Record<string, SimNode>>({})
  const frameRef = useRef<number>(0)
  const animatingRef = useRef(false)

  // Drag state
  const dragRef = useRef<string | null>(null)
  const clickBlockedRef = useRef(false) // blocks click if drag occurred

  // Imperative refs to SVG elements
  const nodeElsRef = useRef<Map<string, SVGGElement>>(new Map())
  const edgeElsRef = useRef<(SVGPathElement | null)[]>([])

  // React state for hover (triggers color/label re-render)
  const [hovered, setHovered] = useState<string | null>(null)

  // React state for positions (initial render only; subsequent updates via DOM)
  const [initPositions, setInitPositions] = useState<Record<string, { x: number; y: number }>>({})

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const d = { w: entry.contentRect.width, h: entry.contentRect.height }
      setDims(d)
      dimsRef.current = d
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Initialise simulation when dims are ready
  useEffect(() => {
    if (!dims.w || !dims.h) return

    const nodes = initSimNodes(data.nodes, data.edges, dims.w, dims.h, biasX)
    simRef.current = nodes
    pmRef.current = Object.fromEntries(nodes.map((n) => [n.id, n]))

    // Snapshot for first React render
    setInitPositions(Object.fromEntries(nodes.map((n) => [n.id, { x: n.x, y: n.y }])))
  }, [dims, data])

  // ── Animation loop ─────────────────────────────────────────────────────────
  const startAnimation = useCallback(() => {
    if (animatingRef.current) return
    animatingRef.current = true

    const tick = () => {
      const { w, h } = dimsRef.current
      const nodes = simRef.current
      const pm = pmRef.current
      const drag = dragRef.current

      stepForces(nodes, pm, data.edges, w, h, drag, biasX)

      // Update node DOM elements
      nodes.forEach((node) => {
        const g = nodeElsRef.current.get(node.id)
        if (g) g.setAttribute('transform', `translate(${node.x},${node.y})`)
      })

      // Update edge paths
      data.edges.forEach((edge, i) => {
        const el = edgeElsRef.current[i]
        const s = pm[edge.source]
        const t = pm[edge.target]
        if (el && s && t) el.setAttribute('d', arcPath(s.x, s.y, t.x, t.y, i))
      })

      // Keep running while dragging or nodes have velocity
      const maxV = nodes.reduce((m, n) => Math.max(m, Math.abs(n.vx) + Math.abs(n.vy)), 0)
      if (drag || maxV > 0.3) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        animatingRef.current = false
      }
    }

    frameRef.current = requestAnimationFrame(tick)
  }, [data])

  // Stop animation on unmount
  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  // ── Drag handlers ──────────────────────────────────────────────────────────
  const handleNodeMouseDown = useCallback(
    (nodeId: string) => (e: React.MouseEvent) => {
      if (decorative) return
      e.preventDefault()
      dragRef.current = nodeId
      clickBlockedRef.current = false
      startAnimation()
    },
    [decorative, startAnimation]
  )

  const handleSvgMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const id = dragRef.current
    if (!id) return
    clickBlockedRef.current = true
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return
    const node = pmRef.current[id]
    if (node) {
      node.x = e.clientX - rect.left
      node.y = e.clientY - rect.top
      node.vx = 0
      node.vy = 0
    }
  }, [])

  const handleSvgMouseUp = useCallback(() => {
    dragRef.current = null
  }, [])

  // ── Derived hover state ────────────────────────────────────────────────────
  const connectedIds = useMemo(() => {
    if (decorative || !hovered) return null
    return new Set(
      data.edges
        .filter((e) => e.source === hovered || e.target === hovered)
        .flatMap((e) => [e.source, e.target])
    )
  }, [decorative, hovered, data.edges])

  const isDark = mounted && resolvedTheme === 'dark'
  const maxWeight = Math.max(...data.nodes.map((n) => n.weight), 1)

  // Colour palettes
  const ic = {
    dot: isDark ? '#374151' : '#d1d5db',
    dotActive: isDark ? '#f9fafb' : '#111827',
    dotConnected: isDark ? '#9ca3af' : '#6b7280',
    dotDim: isDark ? '#1f2937' : '#f3f4f6',
    edge: isDark ? '#1f2937' : '#f0f0f0',
    edgeActive: isDark ? '#4b5563' : '#c4c4c4',
    labelMajor: isDark ? '#6b7280' : '#9ca3af',
    labelActive: isDark ? '#f9fafb' : '#111827',
    labelConnected: isDark ? '#9ca3af' : '#6b7280',
  }

  const dc = {
    dot: isDark ? '#4b5563' : '#9ca3af',
    edge: isDark ? '#374151' : '#e5e7eb',
  }

  return (
    <div ref={containerRef} className="h-full w-full">
      {dims.w > 0 && (
        <svg
          ref={svgRef}
          width={dims.w}
          height={dims.h}
          style={{ overflow: 'visible', cursor: dragRef.current ? 'grabbing' : 'default' }}
          onMouseMove={decorative ? undefined : handleSvgMouseMove}
          onMouseUp={decorative ? undefined : handleSvgMouseUp}
          onMouseLeave={decorative ? undefined : handleSvgMouseUp}
        >
          {/* ── Edges ─────────────────────────────────────────────────── */}
          {data.edges.map((edge, i) => {
            const s = initPositions[edge.source] ?? { x: 0, y: 0 }
            const t = initPositions[edge.target] ?? { x: 0, y: 0 }
            const active =
              decorative ||
              !connectedIds ||
              (connectedIds.has(edge.source) && connectedIds.has(edge.target))
            return (
              <path
                key={`${edge.source}-${edge.target}`}
                ref={(el) => {
                  edgeElsRef.current[i] = el
                }}
                d={arcPath(s.x, s.y, t.x, t.y, i)}
                fill="none"
                strokeDasharray="3 5"
                strokeWidth={
                  decorative ? 0.8 : active ? Math.min(1.5, 0.4 + edge.weight * 0.1) : 0.5
                }
                stroke={decorative ? dc.edge : active ? ic.edgeActive : ic.edge}
                style={decorative ? undefined : { transition: 'stroke 0.2s' }}
              />
            )
          })}

          {/* ── Nodes ─────────────────────────────────────────────────── */}
          {data.nodes.map((node) => {
            const pos = initPositions[node.id] ?? { x: 0, y: 0 }
            const isActive = !decorative && hovered === node.id
            const isConnected =
              !decorative && !!connectedIds && connectedIds.has(node.id) && !isActive
            const isDimmed = !decorative && !!connectedIds && !connectedIds.has(node.id)
            const isMajor = node.weight >= maxWeight * 0.5

            const r = decorative
              ? 4 + (node.weight / maxWeight) * 7
              : 5 + (node.weight / maxWeight) * 7

            const showLabel = !decorative && (isMajor || isActive || isConnected)
            const labelAbove = pos.y >= dims.h / 2
            const labelY = labelAbove ? -r - 7 : r + 14

            const dotFill = decorative
              ? dc.dot
              : isActive
                ? ic.dotActive
                : isConnected
                  ? ic.dotConnected
                  : isDimmed
                    ? ic.dotDim
                    : ic.dot

            const labelFill = isActive
              ? ic.labelActive
              : isConnected
                ? ic.labelConnected
                : isMajor && !isDimmed
                  ? ic.labelMajor
                  : 'transparent'

            return (
              <g
                key={node.id}
                ref={(el) => {
                  if (el) nodeElsRef.current.set(node.id, el)
                }}
                transform={`translate(${pos.x},${pos.y})`}
                style={{ cursor: decorative ? 'default' : isActive ? 'pointer' : 'grab' }}
                onMouseEnter={decorative ? undefined : () => setHovered(node.id)}
                onMouseLeave={decorative ? undefined : () => setHovered(null)}
                onMouseDown={decorative ? undefined : handleNodeMouseDown(node.id)}
                onClick={
                  decorative
                    ? undefined
                    : () => {
                        if (!clickBlockedRef.current) router.push(node.href)
                      }
                }
              >
                {/* Larger invisible hit area */}
                {!decorative && <circle cx={0} cy={0} r={r + 14} fill="transparent" />}

                <circle
                  cx={0}
                  cy={0}
                  r={isActive ? r + 2.5 : isConnected ? r + 1 : r}
                  fill={dotFill}
                  style={decorative ? undefined : { transition: 'r 0.15s, fill 0.15s' }}
                />

                {!decorative && (
                  <text
                    x={0}
                    y={labelY}
                    textAnchor="middle"
                    fontSize={9}
                    fontFamily="var(--font-ibm-plex-sans), ui-monospace, monospace"
                    letterSpacing="0.03em"
                    fill={labelFill}
                    opacity={showLabel ? 1 : 0}
                    style={{
                      transition: 'opacity 0.15s, fill 0.15s',
                      userSelect: 'none',
                      pointerEvents: 'none',
                    }}
                  >
                    {node.label}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      )}
    </div>
  )
}
