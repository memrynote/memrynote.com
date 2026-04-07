import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { WaitlistForm } from '@/components/shared/WaitlistForm'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export function FeaturesCTA() {
  return (
    <section className="bg-paper-alt py-24 mt-24">
      <Container size="sm">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="text-center"
        >
          <h2 className="font-serif text-[36px] leading-tight text-ink">
            And there's more.
          </h2>
          <p className="mt-4 font-serif text-lg italic text-muted">
            Memry ships new features every week.
            <br />
            Get on the waitlist to follow along.
          </p>
          <div className="mt-8">
            <WaitlistForm variant="centered" />
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
