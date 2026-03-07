import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { DemoShowcase } from '@/components/demo/DemoShowcase'
import { WaitlistForm } from '@/components/shared/WaitlistForm'

const BENEFITS = ['Open source', 'Own your data', 'End-to-end encrypted']

const SUBTITLE_DELAY = 0.5
const FORM_DELAY = 0.7
const BENEFITS_DELAY = 0.85

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })


  return (
    <section
      ref={sectionRef}
      id="hero"
      className="pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden"
    >
      <Container>
        <div className="flex flex-col items-center">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-ink leading-[1.08] tracking-tight md:whitespace-nowrap">
                Your thoughts,{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-terracotta italic">beautifully organized.</span>
                  <svg
                    className="absolute w-full h-3 -bottom-1 left-0 text-terracotta/40"
                    viewBox="0 0 200 10"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M0 7 C 40 2, 60 12, 100 5 S 160 2, 200 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : undefined}
                      transition={{
                        duration: 0.7,
                        delay: 0.4,
                        ease: [0.65, 0, 0.35, 1],
                      }}
                    />
                  </svg>
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="text-base md:text-lg text-muted font-sans max-w-lg mx-auto mt-5 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.6,
                delay: SUBTITLE_DELAY,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              One app for inbox, notes, tasks & journal — <span className="font-semibold text-ink">private by design, open at heart.</span>
            </motion.p>

            <motion.div
              className="max-w-md mx-auto mb-4"
              id="waitlist"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.6,
                delay: FORM_DELAY,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <WaitlistForm variant="hero" />
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-2 mb-6 text-sm text-muted"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : undefined}
              transition={{ duration: 0.5, delay: FORM_DELAY + 0.15 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sage" />
              </span>
              <span className="font-mono-accent">Accepting early signups</span>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-5 md:gap-7 text-sm text-muted font-mono-accent uppercase tracking-wide"
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: BENEFITS_DELAY } },
              }}
            >
              {BENEFITS.map((benefit) => (
                <motion.div
                  key={benefit}
                  className="flex items-center gap-2"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                >
                  <div className="rounded-full border border-terracotta/40 p-0.5">
                    <Check className="w-3 h-3 text-terracotta" />
                  </div>
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="mt-12 w-full max-w-4xl relative z-10"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{
              duration: 1,
              delay: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="absolute -inset-4 bg-terracotta/5 blur-3xl rounded-full -z-10" />
            <DemoShowcase />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
