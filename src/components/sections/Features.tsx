import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { MockupFrame } from '@/components/shared/MockupFrame'
import { FEATURES } from '@/lib/constants'

function FeatureBlock({
  feature,
  index,
  onInView
}: {
  feature: (typeof FEATURES)[number]
  index: number
  onInView: (index: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '-40% 0px -40% 0px' })

  if (isInView) {
    onInView(index)
  }

  return (
    <div ref={ref} className="min-h-[70vh] flex flex-col justify-center py-16">
      <div className="md:hidden mb-8">
        <MockupFrame
          imageSrc={feature.screenshot}
          imageAlt={`${feature.title} feature screenshot`}
        />
      </div>

      <div className="flex items-center gap-4 mb-6">
        <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-terracotta/40 text-terracotta font-serif text-lg">
          {index + 1}
        </span>
        <h3 className="font-serif text-3xl text-ink">{feature.title}</h3>
      </div>

      <div className="relative pl-6 mb-8 border-l-2 border-terracotta/30">
        <p className="text-xl text-terracotta font-serif italic leading-relaxed">
          {feature.tagline}
        </p>
      </div>

      <p className="text-muted text-lg leading-relaxed mb-8">{feature.description}</p>

      <ul className="space-y-3">
        {feature.highlights.map((highlight) => (
          <li
            key={highlight}
            className="flex items-start gap-3 text-sm text-ink/80 font-medium"
          >
            <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-terracotta flex-shrink-0" />
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Features() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="features" className="py-24">
      <Container>
        <SectionHeading
          title="Four pillars of thought"
          subtitle="Everything you need to capture, organize, and act on your ideas. Nothing you don't."
        />

        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          <div className="hidden md:block md:w-1/2">
            <div className="sticky-feature-image">
              <AnimatePresence mode="wait">
                <motion.div
                  key={FEATURES[activeIndex].id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <MockupFrame
                    imageSrc={FEATURES[activeIndex].screenshot}
                    imageAlt={`${FEATURES[activeIndex].title} feature screenshot`}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="md:w-1/2">
            {FEATURES.map((feature, index) => (
              <FeatureBlock
                key={feature.id}
                feature={feature}
                index={index}
                onInView={setActiveIndex}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
