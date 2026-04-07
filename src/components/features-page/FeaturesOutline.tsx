import { useMemo } from 'react'
import { useScrollspy } from '@/hooks/useScrollspy'
import { FEATURE_SECTIONS } from '@/lib/features-data'
import { cn } from '@/lib/utils'

const SCROLLSPY_SUPPRESS_MS = 600

export function FeaturesOutline() {
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

  const activeSectionSlug = useMemo(() => {
    if (!activeId) return FEATURE_SECTIONS[0]?.slug ?? null
    if (FEATURE_SECTIONS.some((s) => s.slug === activeId)) return activeId
    const dashIndex = activeId.indexOf('-')
    if (dashIndex === -1) return activeId
    const candidate = activeId.slice(0, dashIndex)
    if (FEATURE_SECTIONS.some((s) => s.slug === candidate)) return candidate
    const longest = FEATURE_SECTIONS.map((s) => s.slug)
      .filter((slug) => activeId.startsWith(`${slug}-`))
      .sort((a, b) => b.length - a.length)[0]
    return longest ?? null
  }, [activeId])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
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
    <nav
      aria-label="Features outline"
      className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pr-4"
    >
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
        On this page
      </p>

      <ul className="mt-4 space-y-1">
        {FEATURE_SECTIONS.map((section) => {
          const isActiveSection = section.slug === activeSectionSlug
          const featureCount = section.features.length

          return (
            <li key={section.slug}>
              <a
                href={`#${section.slug}`}
                onClick={(e) => handleClick(e, section.slug)}
                aria-current={isActiveSection ? 'location' : undefined}
                className={cn(
                  'flex items-center justify-between gap-3 rounded px-2 py-1.5 font-serif text-[15px] transition-colors',
                  isActiveSection
                    ? 'text-ink font-medium'
                    : 'text-muted hover:text-ink',
                )}
              >
                <span className="flex items-center gap-2">
                  {isActiveSection && (
                    <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                  )}
                  {section.title}
                </span>
                <span className="font-mono text-[11px] tabular-nums text-muted">
                  {featureCount}
                </span>
              </a>

              {isActiveSection && (
                <ul className="mt-1 ml-3 border-l border-border pl-3 space-y-0.5">
                  {section.features.map((feature) => {
                    const featureId = `${section.slug}-${feature.slug}`
                    const isActiveFeature = activeId === featureId
                    return (
                      <li key={feature.slug}>
                        <a
                          href={`#${featureId}`}
                          onClick={(e) => handleClick(e, featureId)}
                          aria-current={isActiveFeature ? 'location' : undefined}
                          className={cn(
                            'flex items-center gap-2 rounded px-2 py-1 text-[13px] transition-colors',
                            isActiveFeature
                              ? 'text-terracotta'
                              : 'text-ink/70 hover:text-ink',
                          )}
                        >
                          {isActiveFeature && (
                            <span className="h-1 w-1 rounded-full bg-terracotta" />
                          )}
                          {feature.title}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
