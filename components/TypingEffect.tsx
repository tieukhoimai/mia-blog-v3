'use client'

import { useEffect, useState } from 'react'

const PHRASE = 'welcome to my collection of data thoughts.'
const TYPE_SPEED = 70

export default function TypingEffect() {
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    if (charIdx >= PHRASE.length) return
    const timer = setTimeout(() => setCharIdx((c) => c + 1), TYPE_SPEED)
    return () => clearTimeout(timer)
  }, [charIdx])

  return (
    <>
      {PHRASE.slice(0, charIdx)}
      <span className="ml-0.5 inline-block h-[0.85em] w-0.5 translate-y-[0.05em] animate-pulse bg-current align-middle" />
    </>
  )
}
