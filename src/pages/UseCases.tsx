import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { WaitlistForm } from '@/components/shared/WaitlistForm'
import { PageHead } from '@/components/shared/PageHead'
import { USE_CASES } from '@/lib/constants'

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
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
  }
}

export function UseCasesPage() {
  return (
    <main className="pt-24">
      <PageHead page="useCases" />
      <section className="py-16">
        <Container>
          <SectionHeading
            title="Built for how you think"
            subtitle="Whether you're shipping code, studying for exams, managing clients, or organizing life — Memry adapts to your workflow."
          />

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
