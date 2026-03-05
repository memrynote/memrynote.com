import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { DemoShowcase } from '@/components/demo/DemoShowcase'
import { WaitlistForm } from '@/components/shared/WaitlistForm'

const BENEFITS = ['Free to start', 'Own your data', 'End-to-end encrypted']

const WAITLIST_COUNT = 580

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
}

export function Hero() {
  return (
    <section id="hero" className="pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
      <Container>
        <motion.div
          className="max-w-4xl mx-auto text-center mb-10"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={itemVariants}
            className="font-serif text-5xl md:text-7xl font-normal text-ink mb-5 leading-[1.1] tracking-tight text-balance"
          >
            Your thoughts,{' '}
            <span className="text-terracotta italic relative inline-block">
              beautifully organized
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-terracotta/30"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
            .
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted font-sans max-w-2xl mx-auto mb-7 leading-relaxed"
          >
            Notes, tasks, and journal — finally in one place.{' '}
            <span className="text-ink/60">Private, fast, and yours forever.</span>
          </motion.p>

          <motion.div variants={itemVariants} className="max-w-md mx-auto mb-4" id="waitlist">
            <WaitlistForm variant="hero" />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 mb-6 text-sm text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sage" />
            </span>
            <span className="font-mono-accent">
              {WAITLIST_COUNT.toLocaleString()}+ people on the waitlist
            </span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm text-muted font-mono-accent uppercase tracking-wide"
          >
            {BENEFITS.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2">
                <div className="rounded-full border border-terracotta/40 p-0.5">
                  <Check className="w-3 h-3 text-terracotta" />
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto relative z-10"
        >
          <div className="absolute -inset-4 bg-terracotta/5 blur-3xl rounded-full -z-10" />
          <DemoShowcase />
        </motion.div>
      </Container>
    </section>
  )
}
