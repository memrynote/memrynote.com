import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { WaitlistForm } from '@/components/shared/WaitlistForm'
import { USE_CASES } from '@/lib/constants'
import { cn } from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
}

function LeanCards() {
  return (
    <motion.div
      className="grid md:grid-cols-2 gap-6 lg:gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
    >
      {USE_CASES.map((useCase) => (
        <motion.div
          key={useCase.id}
          variants={cardVariants}
          className="group relative rounded-2xl border border-border bg-card p-8 hover:border-terracotta/40 hover:shadow-card transition-all duration-300"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-terracotta/20 bg-terracotta/5">
              <useCase.icon className="w-6 h-6 text-terracotta" />
            </div>
            <h3 className="font-serif text-2xl text-ink">{useCase.title}</h3>
          </div>

          <p className="text-muted italic font-serif text-lg mb-6 border-l-2 border-terracotta/20 pl-4">
            "{useCase.painQuote}"
          </p>

          <ul className="space-y-2.5">
            {useCase.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-ink/80 font-medium">
                <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-terracotta flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  )
}

function DetailedCards() {
  return (
    <motion.div
      className="grid md:grid-cols-2 gap-6 lg:gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
    >
      {USE_CASES.map((useCase) => (
        <motion.div
          key={useCase.id}
          variants={cardVariants}
          className="group relative rounded-2xl border border-border bg-card p-8 lg:p-10 hover:border-terracotta/40 hover:shadow-card transition-all duration-300"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl border border-terracotta/20 bg-terracotta/5">
              <useCase.icon className="w-7 h-7 text-terracotta" />
            </div>
            <h3 className="font-serif text-2xl lg:text-3xl text-ink">{useCase.title}</h3>
          </div>

          <div className="mb-6">
            <h4 className="text-xs font-mono-accent uppercase tracking-wider text-terracotta mb-2">The problem</h4>
            <p className="text-muted leading-relaxed">{useCase.pain}</p>
          </div>

          <div className="mb-6">
            <h4 className="text-xs font-mono-accent uppercase tracking-wider text-sage mb-2">How Memry helps</h4>
            <p className="text-muted leading-relaxed">{useCase.solution}</p>
          </div>

          <div className="mb-6">
            <h4 className="text-xs font-mono-accent uppercase tracking-wider text-muted/80 mb-3">Key features</h4>
            <ul className="grid grid-cols-2 gap-2">
              {useCase.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-ink/80 font-medium">
                  <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-terracotta flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-5 border-t border-border/50">
            <h4 className="text-xs font-mono-accent uppercase tracking-wider text-muted/80 mb-3">Workflow</h4>
            <div className="flex flex-wrap items-center gap-2 text-sm text-ink/70">
              {useCase.workflow.map((step, i) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="font-medium">{step}</span>
                  {i < useCase.workflow.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-terracotta/50" />
                  )}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export function UseCasesPage() {
  const [variant, setVariant] = useState<'lean' | 'detailed'>('lean')

  return (
    <main className="pt-24">
      <section className="py-16">
        <Container>
          <SectionHeading
            title="Built for how you think"
            subtitle="Whether you're shipping code, studying for exams, managing clients, or organizing life — Memry adapts to your workflow."
          />

          <div className="flex justify-center gap-2 mb-12">
            <button
              onClick={() => setVariant('lean')}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-medium transition-all',
                variant === 'lean'
                  ? 'bg-ink text-paper'
                  : 'bg-transparent text-muted border border-border hover:text-ink hover:border-ink/30'
              )}
            >
              Overview
            </button>
            <button
              onClick={() => setVariant('detailed')}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-medium transition-all',
                variant === 'detailed'
                  ? 'bg-ink text-paper'
                  : 'bg-transparent text-muted border border-border hover:text-ink hover:border-ink/30'
              )}
            >
              Detailed
            </button>
          </div>

          {variant === 'lean' ? <LeanCards /> : <DetailedCards />}
        </Container>
      </section>

      <section className="py-24">
        <Container size="sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-ink mb-6">
              Ready to simplify?
            </h2>
            <p className="text-xl text-muted font-sans mb-12 max-w-lg mx-auto leading-relaxed">
              Join the waitlist and be first to experience a calmer way to work.
            </p>
            <WaitlistForm variant="centered" />
          </motion.div>
        </Container>
      </section>
    </main>
  )
}
