import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollspy } from '@/hooks/useScrollspy'
import { FEATURE_SECTIONS } from '@/lib/features-data'
import { cn } from '@/lib/utils'

const SCROLLSPY_SUPPRESS_MS = 600

export function FeaturesOutlineMobile() {
  const [isOpen, setIsOpen] = useState(false)
  const pillRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  const observedIds = useMemo(() => {
    const ids: string[] = []
    for (const section of FEATURE_SECTIONS) {
      ids.push(section.slug)
      for (const feature of section.features) {
        ids.push(`${section.slug}-${feature.slug}`)
      }
    }
    return ids
  }, [])

  const { activeId, suppressFor } = useScrollspy(observedIds)

  const activeSectionIndex = useMemo(() => {
    if (!activeId) return 0
    const direct = FEATURE_SECTIONS.findIndex((s) => s.slug === activeId)
    if (direct !== -1) return direct
    const longest = FEATURE_SECTIONS.map((s, i) => ({ slug: s.slug, index: i }))
      .filter((entry) => activeId.startsWith(`${entry.slug}-`))
      .sort((a, b) => b.slug.length - a.slug.length)[0]
    return longest?.index ?? 0
  }, [activeId])

  const activeSection = FEATURE_SECTIONS[activeSectionIndex]
  const activeSectionSlug = activeSection?.slug ?? null

  useEffect(() => {
    if (!isOpen) return

    const focusTimeout = window.setTimeout(() => {
      dialogRef.current?.focus()
    }, 50)

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        pillRef.current?.focus()
        return
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        const active = document.activeElement as HTMLElement | null

        if (e.shiftKey && active === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && active === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKey)
    return () => {
      window.clearTimeout(focusTimeout)
      document.removeEventListener('keydown', handleKey)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleNavigate = (id: string) => {
    setIsOpen(false)
    const target = document.getElementById(id)
    if (!target) return
    suppressFor(SCROLLSPY_SUPPRESS_MS)
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
    if (typeof window !== 'undefined' && window.history) {
      window.history.replaceState(null, '', `#${id}`)
    }
  }

  return (
    <>
      <div className="md:hidden sticky top-[72px] z-30 px-5 py-3 bg-paper/80 backdrop-blur-sm">
        <button
          ref={pillRef}
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-3 rounded-full border border-border bg-card px-4 py-2.5 shadow-card"
        >
          <span className="flex items-center gap-2 font-serif text-[15px] text-ink">
            <ChevronDown className="h-4 w-4 text-muted" strokeWidth={2} />
            {activeSection?.title ?? 'Sections'}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
            {activeSectionIndex + 1} of {FEATURE_SECTIONS.length}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
        {isOpen && (
          <motion.div
            key="dialog"
            ref={dialogRef}
            tabIndex={-1}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Features outline"
            aria-modal={true}
            className="md:hidden fixed left-4 right-4 top-[124px] z-50 max-h-[70vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-elevated"
          >
            <div className="p-4">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                On this page
              </p>
              <ul className="mt-3 space-y-1">
                {FEATURE_SECTIONS.map((section) => {
                  const isActiveSection = section.slug === activeSectionSlug
                  return (
                    <li key={section.slug}>
                      <button
                        type="button"
                        onClick={() => handleNavigate(section.slug)}
                        className={cn(
                          'flex w-full items-center justify-between gap-3 rounded px-2 py-2 font-serif text-[16px] transition-colors',
                          isActiveSection ? 'text-ink font-medium' : 'text-muted',
                        )}
                      >
                        <span className="flex items-center gap-2">
                          {isActiveSection && (
                            <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                          )}
                          {section.title}
                        </span>
                        <span className="font-mono text-[11px] tabular-nums text-muted">
                          {section.features.length}
                        </span>
                      </button>

                      {isActiveSection && (
                        <ul className="mt-1 ml-3 border-l border-border pl-3 space-y-0.5">
                          {section.features.map((feature) => {
                            const featureId = `${section.slug}-${feature.slug}`
                            const isActiveFeature = activeId === featureId
                            return (
                              <li key={feature.slug}>
                                <button
                                  type="button"
                                  onClick={() => handleNavigate(featureId)}
                                  className={cn(
                                    'flex w-full items-center gap-2 rounded px-2 py-1.5 text-[14px] text-left transition-colors',
                                    isActiveFeature
                                      ? 'text-terracotta'
                                      : 'text-ink/70',
                                  )}
                                >
                                  {feature.title}
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
