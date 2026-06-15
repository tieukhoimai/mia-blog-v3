'use client'

import { useEffect, useState } from 'react'

const PHRASES = ['welcome to my structured thoughts on data, software, and lately — AI agents']

const TYPE_SPEED = 70
const DELETE_SPEED = 35
const PAUSE_AFTER = 2200
const PAUSE_BEFORE = 500

export default function TypingEffect() {
  const [text, setText] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = PHRASES[phraseIdx]
    const isLast = phraseIdx === PHRASES.length - 1

    // Stop permanently once the last phrase is fully typed
    if (isLast && charIdx === phrase.length) return

    let delay = deleting ? DELETE_SPEED : TYPE_SPEED
    if (!deleting && charIdx === phrase.length) delay = PAUSE_AFTER
    if (deleting && charIdx === 0) delay = PAUSE_BEFORE

    const timer = setTimeout(() => {
      if (!deleting && charIdx < phrase.length) {
        setText(phrase.slice(0, charIdx + 1))
        setCharIdx((c) => c + 1)
      } else if (!deleting && charIdx === phrase.length) {
        setDeleting(true)
      } else if (deleting && charIdx > 0) {
        setText(phrase.slice(0, charIdx - 1))
        setCharIdx((c) => c - 1)
      } else {
        setDeleting(false)
        setPhraseIdx((i) => i + 1)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [charIdx, deleting, phraseIdx])

  return (
    <>
      {text}
      <span className="ml-0.5 inline-block h-[0.85em] w-0.5 translate-y-[0.05em] animate-pulse bg-current align-middle" />
    </>
  )
}
