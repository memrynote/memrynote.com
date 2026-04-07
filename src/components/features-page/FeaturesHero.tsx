import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import {
  FEATURES_CADENCE,
  FEATURES_LAST_UPDATED,
  SECTION_COUNT,
  TOTAL_FEATURE_COUNT,
} from '@/lib/features-data'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export function FeaturesHero() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="max-w-3xl"
        >
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
            Everything in Memry · Updated {FEATURES_LAST_UPDATED}
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-terracotta/30 bg-terracotta/8 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-terracotta">
              Pre-release
            </span>
          </div>

          <h1 className="mt-6 font-serif text-[44px] leading-[1.05] text-ink md:text-[64px]">
            Every feature, so far.
          </h1>

          <p className="mt-6 font-serif text-lg leading-relaxed text-muted md:text-xl">
            {TOTAL_FEATURE_COUNT} features across {SECTION_COUNT} sections — and
            growing. Memry is in active development; this page reflects what's
            shipped today, not the full vision.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted">
            <span>{TOTAL_FEATURE_COUNT} features</span>
            <span aria-hidden="true">·</span>
            <span>{SECTION_COUNT} sections</span>
            <span aria-hidden="true">·</span>
            <span>{FEATURES_CADENCE}</span>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
