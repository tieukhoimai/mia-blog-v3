'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import type { TopCountry } from '@/lib/analytics'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// GA4 country name → ISO numeric code (world-atlas feature.id)
const COUNTRY_TO_ID: Record<string, string> = {
  'United States': '840',
  Vietnam: '704',
  China: '156',
  India: '356',
  Germany: '276',
  'United Kingdom': '826',
  France: '250',
  Canada: '124',
  Australia: '036',
  Japan: '392',
  'South Korea': '410',
  Singapore: '702',
  Indonesia: '360',
  Brazil: '076',
  Netherlands: '528',
  Italy: '380',
  Spain: '724',
  Poland: '616',
  Sweden: '752',
  Norway: '578',
  Thailand: '764',
  Malaysia: '458',
  Philippines: '608',
  Taiwan: '158',
  'Hong Kong': '344',
  Russia: '643',
  Ukraine: '804',
  Turkey: '792',
  Egypt: '818',
  Nigeria: '566',
  Kenya: '404',
  'South Africa': '710',
  Mexico: '484',
  Argentina: '032',
  Chile: '152',
  Colombia: '170',
  Pakistan: '586',
  Bangladesh: '050',
  Switzerland: '756',
  Belgium: '056',
  Austria: '040',
  'Czech Republic': '203',
  Romania: '642',
  Hungary: '348',
  Portugal: '620',
  Greece: '300',
  Finland: '246',
  Denmark: '208',
  Ireland: '372',
  'New Zealand': '554',
  Israel: '376',
  'United Arab Emirates': '784',
  'Saudi Arabia': '682',
  Iran: '364',
  'Sri Lanka': '144',
  Nepal: '524',
  'Myanmar (Burma)': '104',
  Myanmar: '104',
  Cambodia: '116',
  Latvia: '428',
  Lithuania: '440',
  Estonia: '233',
  Slovakia: '703',
  Croatia: '191',
  Serbia: '688',
  Bulgaria: '100',
  Belarus: '112',
  Kazakhstan: '398',
  Morocco: '504',
  Algeria: '012',
  Ghana: '288',
  Ethiopia: '231',
  Tanzania: '834',
  Peru: '604',
  Ecuador: '218',
  Bolivia: '068',
  Uruguay: '858',
  'Costa Rica': '188',
  Panama: '591',
  'Dominican Republic': '214',
  Jamaica: '388',
}

export default function WorldMap({ data }: { data: TopCountry[] }) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const [tooltip, setTooltip] = useState<{ name: string; users: number } | null>(null)

  const maxUsers = data[0]?.users ?? 1

  const countById: Record<string, number> = {}
  data.forEach((c) => {
    const id = COUNTRY_TO_ID[c.country]
    if (id) countById[id] = c.users
  })

  function getColor(id: string): string {
    const users = countById[id]
    if (!users) return isDark ? '#1f2937' : '#f3f4f6'
    const t = Math.pow(users / maxUsers, 0.4) // sqrt scale so low-traffic countries are still visible
    if (isDark) {
      const r = Math.round(55 + (229 - 55) * t)
      const g = Math.round(65 + (231 - 65) * t)
      const b = Math.round(81 + (235 - 81) * t)
      return `rgb(${r},${g},${b})`
    } else {
      const r = Math.round(243 + (17 - 243) * t)
      const g = Math.round(244 + (24 - 244) * t)
      const b = Math.round(246 + (39 - 246) * t)
      return `rgb(${r},${g},${b})`
    }
  }

  return (
    <div>
      <div className="mb-2 flex h-5 items-center justify-between">
        <p className="text-2xs tracking-[0.13em] text-gray-400 dark:text-gray-600">
          — visitors by country
        </p>
        {tooltip && (
          <p className="font-mono text-xs text-gray-500 dark:text-gray-400">
            {tooltip.name} — {tooltip.users.toLocaleString()}
          </p>
        )}
      </div>
      <div className="overflow-hidden" style={{ marginTop: '-3rem', marginBottom: '-2.5rem' }}>
        <ComposableMap projectionConfig={{ scale: 140 }} style={{ width: '100%', height: 'auto' }}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const id = String(geo.id).padStart(3, '0')
                const hasData = !!countById[id]
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getColor(id)}
                    stroke={isDark ? '#111827' : '#ffffff'}
                    strokeWidth={0.5}
                    onMouseEnter={() => {
                      if (hasData) {
                        const entry = data.find((c) => COUNTRY_TO_ID[c.country] === id)
                        if (entry) setTooltip({ name: entry.country, users: entry.users })
                      }
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    style={{
                      default: { outline: 'none' },
                      hover: {
                        outline: 'none',
                        fill: hasData ? (isDark ? '#e5e7eb' : '#374151') : getColor(id),
                      },
                      pressed: { outline: 'none' },
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  )
}
