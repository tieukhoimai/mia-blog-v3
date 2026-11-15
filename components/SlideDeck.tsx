'use client'

/* eslint-disable jsx-a11y/no-noninteractive-tabindex --
   the scroll track is a focusable ARIA carousel region (role="region" +
   tabIndex=0 + arrow-key navigation), the recommended carousel pattern. */

import { useCallback, useEffect, useRef, useState } from 'react'

interface SlideDeckProps {
  /** Number of slide images, named slide-01.png … slide-NN.png under basePath */
  pages: number
  /** Public path to the folder containing slide-NN.png images */
  basePath: string
  /** Public URL of the source PDF, enables the download button */
  pdfUrl?: string
  /** Accessible description of the deck */
  alt?: string
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function SlideDeck({
  pages,
  basePath,
  pdfUrl,
  alt = 'Presentation slide',
}: SlideDeckProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)

  /** Distance between consecutive snap points, measured from the real layout. */
  const getStep = useCallback(() => {
    const track = trackRef.current
    if (!track || track.children.length < 2) return 0
    const first = track.children[0] as HTMLElement
    const second = track.children[1] as HTMLElement
    return second.offsetLeft - first.offsetLeft
  }, [])

  /** scrollLeft that centers slide n, matching the snap-center alignment. */
  const scrollLeftFor = useCallback(
    (n: number) => {
      const track = trackRef.current
      if (!track) return 0
      const child = track.children[Math.min(Math.max(n, 1), pages) - 1] as HTMLElement | undefined
      if (!child) return 0
      return child.offsetLeft - (track.clientWidth - child.clientWidth) / 2
    },
    [pages]
  )

  const goTo = useCallback(
    (n: number) => {
      const track = trackRef.current
      if (!track) return
      const target = Math.min(Math.max(n, 1), pages)
      track.scrollTo({ left: scrollLeftFor(target), behavior: 'smooth' })
    },
    [pages, scrollLeftFor]
  )

  const handleScroll = useCallback(() => {
    const track = trackRef.current
    const step = getStep()
    if (!track || step === 0) return
    setCurrent(Math.min(Math.max(Math.round(track.scrollLeft / step) + 1, 1), pages))
  }, [getStep, pages])

  // Keep the counter correct when the viewport is resized
  useEffect(() => {
    const onResize = () => handleScroll()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [handleScroll])

  // Track fullscreen state, including exits via Esc or the browser UI
  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.()
    } else {
      document.exitFullscreen()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      goTo(current + 1)
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goTo(current - 1)
    }
  }

  // Click on the progress bar jumps to the corresponding slide
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const fraction = (e.clientX - rect.left) / rect.width
    goTo(Math.round(fraction * (pages - 1)) + 1)
  }

  // Thumb and fill use the same mapping that handleProgressClick inverts
  const progress = pages > 1 ? (current - 1) / (pages - 1) : 1

  const iconButton =
    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition-colors ' +
    'hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'

  const arrowOverlayClass =
    'flex h-10 w-10 items-center justify-center rounded-full border border-gray-300/80 ' +
    'bg-white/95 text-gray-700 shadow-md backdrop-blur transition-all ' +
    'hover:scale-105 hover:bg-white hover:text-gray-900 active:scale-95 ' +
    'dark:border-gray-600/80 dark:bg-gray-800/95 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white'

  return (
    <figure className="not-prose my-6">
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        ref={containerRef}
        className={
          isFullscreen
            ? 'relative flex h-full flex-col justify-center gap-4 bg-gray-950 p-4 sm:p-8'
            : 'group relative'
        }
        onKeyDown={handleKeyDown}
      >
        <div
          ref={trackRef}
          onScroll={handleScroll}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label={alt}
          className={`flex snap-x snap-mandatory overflow-x-auto rounded-lg [scrollbar-width:none] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 [&::-webkit-scrollbar]:hidden ${
            isFullscreen
              ? 'min-h-0 flex-1 gap-4 bg-transparent p-2 sm:p-4'
              : 'gap-4 border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50 sm:gap-6 sm:p-6'
          }`}
        >
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <div
              key={n}
              className={
                isFullscreen
                  ? 'flex h-full min-w-full snap-center items-center justify-center'
                  : 'min-w-[85%] snap-center sm:min-w-[calc(100%-3rem)]'
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${basePath}/slide-${pad(n)}.png`}
                alt={pages > 1 ? `${alt} (${n} of ${pages})` : alt}
                loading={n === 1 ? 'eager' : 'lazy'}
                className={
                  isFullscreen
                    ? 'max-h-full w-auto max-w-full rounded-md object-contain shadow-lg'
                    : 'h-auto w-full rounded-md bg-white shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-white/10'
                }
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Fullscreen chrome: portrait hint and always-visible arrows */}
        {isFullscreen && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-4 hidden -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-white/10 px-4 py-1.5 text-xs text-gray-200 backdrop-blur portrait:flex"
            >
              <span className="text-base leading-none">↻</span> Rotate your phone for a larger view
            </div>
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              disabled={current === 1}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 disabled:pointer-events-none disabled:opacity-0 sm:left-6"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M12.5 4.5L7 10l5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => goTo(current + 1)}
              disabled={current === pages}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 disabled:pointer-events-none disabled:opacity-0 sm:right-6"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M7.5 4.5L13 10l-5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}

        {/* Edge fades hint at more content in each direction */}
        {!isFullscreen && (
          <>
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-4 left-4 w-10 rounded-l-lg bg-gradient-to-r from-gray-50 to-transparent transition-opacity duration-300 sm:inset-y-6 sm:left-6 sm:w-16 dark:from-gray-900/80 ${
                current === 1 ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-4 right-4 w-10 rounded-r-lg bg-gradient-to-l from-gray-50 to-transparent transition-opacity duration-300 sm:inset-y-6 sm:right-6 sm:w-16 dark:from-gray-900/80 ${
                current === pages ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              disabled={current === 1}
              aria-label="Previous slide"
              className={`${arrowOverlayClass} absolute left-6 top-1/2 -translate-y-1/2 disabled:pointer-events-none disabled:opacity-0 sm:left-10`}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M12.5 4.5L7 10l5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => goTo(current + 1)}
              disabled={current === pages}
              aria-label="Next slide"
              className={`${arrowOverlayClass} absolute right-6 top-1/2 -translate-y-1/2 disabled:pointer-events-none disabled:opacity-0 sm:right-10`}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M7.5 4.5L13 10l-5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}

        {/* Progress bar with counter — click anywhere on the bar to jump */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => goTo(current - 1)}
            disabled={current === 1}
            aria-label="Previous slide"
            className={`${iconButton} disabled:opacity-25 ${isFullscreen ? 'text-gray-300 hover:bg-gray-800 hover:text-white dark:text-gray-300 dark:hover:bg-gray-800' : ''}`}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M12.5 4.5L7 10l5.5 5.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            role="slider"
            aria-label="Slide position"
            aria-valuemin={1}
            aria-valuemax={pages}
            aria-valuenow={current}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onClick={handleProgressClick}
            className="group/bar relative h-6 flex-1 cursor-pointer"
          >
            <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-gray-200 transition-colors group-hover/bar:bg-gray-300 dark:bg-gray-700 dark:group-hover/bar:bg-gray-600">
              <div
                className="h-full rounded-full bg-primary-500 transition-[width] duration-300 ease-out"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div
              className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500 shadow transition-[left] duration-300 ease-out group-hover/bar:scale-125"
              style={{ left: `${progress * 100}%` }}
            />
            <span className="sr-only">{`Slide ${current} of ${pages}`}</span>
          </div>

          <span
            className={`w-16 shrink-0 text-right text-sm font-medium tabular-nums ${
              isFullscreen ? 'text-gray-300' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            {current} / {pages}
          </span>

          <button
            type="button"
            onClick={() => goTo(current + 1)}
            disabled={current === pages}
            aria-label="Next slide"
            className={`${iconButton} disabled:opacity-25 ${isFullscreen ? 'text-gray-300 hover:bg-gray-800 hover:text-white dark:text-gray-300 dark:hover:bg-gray-800' : ''}`}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M7.5 4.5L13 10l-5.5 5.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {pdfUrl && (
            <a
              href={pdfUrl}
              download
              aria-label="Download PDF"
              title="Download PDF"
              className={iconButton}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M10 3v9m0 0l-3.5-3.5M10 12l3.5-3.5M4 15.5h12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            title={isFullscreen ? 'Exit fullscreen (Esc)' : 'Fullscreen'}
            className={iconButton}
          >
            {isFullscreen ? (
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M8 3v3.5A1.5 1.5 0 016.5 8H3m14 0h-3.5A1.5 1.5 0 0112 6.5V3m0 14v-3.5a1.5 1.5 0 011.5-1.5H17M3 12h3.5A1.5 1.5 0 018 13.5V17"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M3 8V3h5m4 0h5v5m0 4v5h-5M8 17H3v-5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </figure>
  )
}
