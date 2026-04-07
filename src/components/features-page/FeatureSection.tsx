import { motion } from 'framer-motion'
import type { FeatureSection as FeatureSectionData } from '@/lib/features-data'
import { FeatureItem } from './FeatureItem'

interface FeatureSectionProps {
  section: FeatureSectionData
  isFirst: boolean
}

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export function FeatureSection({ section, isFirst }: FeatureSectionProps) {
  const featureCount = section.features.length

  return (
    <section
      id={section.slug}
      className={isFirst ? 'pt-4' : 'pt-24'}
    >
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className="border-t border-border pt-12 pb-2"
      >
        <h2 className="font-serif text-[40px] leading-none text-ink">
          {section.title}
        </h2>
        <div className="mt-4 h-[2px] w-10 bg-terracotta" />
        <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-muted">
          {featureCount} {featureCount === 1 ? 'feature' : 'features'}
        </p>
      </motion.header>

      <div className="mt-4">
        {section.features.map((feature, index) => (
          <FeatureItem
            key={feature.slug}
            sectionSlug={section.slug}
            feature={feature}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
