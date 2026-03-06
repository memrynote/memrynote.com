import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { WaitlistForm } from '@/components/shared/WaitlistForm'

const PARTICLES = [
  { top: '12%', left: '8%', size: 3, delay: 0, duration: 10 },
  { top: '25%', right: '12%', size: 2, delay: 2, duration: 12 },
  { top: '60%', left: '15%', size: 4, delay: 4, duration: 9 },
  { top: '45%', right: '20%', size: 2, delay: 1, duration: 14 },
  { top: '80%', left: '25%', size: 3, delay: 6, duration: 11 },
  { top: '70%', right: '8%', size: 2, delay: 3, duration: 13 },
  { top: '35%', left: '85%', size: 3, delay: 5, duration: 8 },
  { top: '90%', right: '35%', size: 2, delay: 7, duration: 15 },
]

export function FinalCTA() {
  return (
    <section
      id="waitlist"
      className="zone-dark py-32 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgb(199 91 57 / 0.08), transparent 60%)',
        }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-terracotta" />

      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-terracotta/20"
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            width: p.size,
            height: p.size,
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      <Container size="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h2 className="font-serif text-6xl md:text-7xl font-normal text-ink-inverted mb-6">
            Ready to think beautifully?
          </h2>
          <p className="text-xl text-dark-muted font-sans mb-12 max-w-lg mx-auto leading-relaxed">
            Be the first to try Memry when early access opens.
          </p>

          <div className="conic-border rounded-xl overflow-hidden bg-dark-surface max-w-md mx-auto">
            <div className="p-1">
              <WaitlistForm variant="centered" />
            </div>
          </div>

          <p className="text-sm text-dark-muted/60 mt-6 font-mono-accent">
            We'll never spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
