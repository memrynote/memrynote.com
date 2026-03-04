import { motion } from 'framer-motion'
import { Inbox, BookOpen, FileText, CheckSquare, ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'

const WORKFLOW_STEPS = [
  {
    icon: Inbox,
    label: 'Capture',
    description: 'Thought pops up? Toss it in the Inbox. No organizing, no friction.',
  },
  {
    icon: BookOpen,
    label: 'Reflect',
    description: 'Your daily journal surfaces context — schedule, tasks, recent captures.',
  },
  {
    icon: FileText,
    label: 'Connect',
    description: 'Link notes together with [[wiki-links]]. Ideas form a web, not a pile.',
  },
  {
    icon: CheckSquare,
    label: 'Execute',
    description: 'Turn insights into tasks. Kanban, calendar, or list — your call.',
  },
] as const

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export function FeatureFlow() {
  return (
    <section className="py-24 overflow-hidden">
      <Container>
        <SectionHeading
          title="From thought to done"
          subtitle="A natural flow that matches how your brain actually works."
        />

        <div className="max-w-4xl mx-auto mt-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 relative">
            {WORKFLOW_STEPS.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div className="relative mb-5">
                    <div className="absolute -inset-3 bg-terracotta/8 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-16 h-16 rounded-2xl bg-white border border-border flex items-center justify-center shadow-sm group-hover:border-terracotta/30 transition-colors">
                      <Icon className="w-7 h-7 text-terracotta" strokeWidth={1.5} />
                    </div>
                  </div>

                  <span className="text-xs font-mono-accent uppercase tracking-wider text-terracotta mb-2">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-serif text-xl text-ink mb-2">{step.label}</h3>
                  <p className="text-sm text-muted leading-relaxed max-w-[200px]">
                    {step.description}
                  </p>

                  {index < WORKFLOW_STEPS.length - 1 && (
                    <div className="hidden md:flex absolute top-8 -right-4 z-10 text-terracotta/30">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted/70 font-mono-accent">
              Everything stays connected. A journal entry can reference a note. A note can spawn a task. A task links back to its source.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
