import { useEffect, useRef, useState } from 'react'

interface UseScrollspyOptions {
  rootMargin?: string
}

interface UseScrollspyResult {
  activeId: string | null
  suppressFor: (ms: number) => void
}

const DEFAULT_ROOT_MARGIN = '-96px 0px -55% 0px'

/**
 * Tracks which element from a list of ids is currently in view.
 *
 * Uses IntersectionObserver. Callers should memoize the `ids` array
 * to avoid recreating the observer on every render.
 *
 * Returns the active id (sticky — keeps the most recent active id when
 * nothing is in view) and a `suppressFor` escape hatch that lets click
 * handlers temporarily silence updates while smooth-scroll runs.
 */
export function useScrollspy(
  ids: string[],
  { rootMargin = DEFAULT_ROOT_MARGIN }: UseScrollspyOptions = {},
): UseScrollspyResult {
  const [activeId, setActiveId] = useState<string | null>(null)
  const suppressedUntilRef = useRef<number>(0)
  const lastSeenRef = useRef<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || ids.length === 0) {
      return
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < suppressedUntilRef.current) {
          return
        }

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const aIndex = ids.indexOf(a.target.id)
            const bIndex = ids.indexOf(b.target.id)
            return aIndex - bIndex
          })

        if (visible.length > 0) {
          const nextId = visible[0].target.id
          lastSeenRef.current = nextId
          setActiveId(nextId)
          return
        }

        if (lastSeenRef.current) {
          setActiveId(lastSeenRef.current)
        }
      },
      {
        rootMargin,
        threshold: 0,
      },
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [ids, rootMargin])

  const suppressFor = (ms: number) => {
    suppressedUntilRef.current = Date.now() + ms
  }

  return { activeId, suppressFor }
}
