import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { TWITTER_DEV_URL } from '@/lib/constants'

export function FounderStory() {
  return (
    <section className="py-24 border-t border-border/40">
      <Container size="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-terracotta/10 border border-terracotta/20 flex items-center justify-center">
                <span className="font-serif text-3xl text-terracotta">K</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="font-serif text-2xl text-ink">Why I'm building Memry</h3>
                <span className="text-xs font-mono-accent uppercase tracking-wider text-terracotta bg-terracotta/10 px-2 py-0.5 rounded">
                  Solo dev
                </span>
              </div>

              <div className="space-y-3 text-muted leading-relaxed">
                <p>
                  I've tried every PKM tool out there. Notion was powerful but slow and cloud-dependent.
                  Obsidian was fast but needed 20 plugins to feel complete. Logseq was interesting but
                  lacked a proper task system. None of them felt like <em>one</em> tool.
                </p>
                <p>
                  So I'm building the app I wished existed — where notes, tasks, journal, and inbox
                  live together natively. Local-first, so it's instant. Markdown files, so your data
                  is truly yours. No plugin maze, no cloud lock-in.
                </p>
                <p className="text-ink font-medium">
                  Memry is an indie project built with care, not a VC-funded race to monetize your data.
                </p>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <a
                  href={TWITTER_DEV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-terracotta hover:underline"
                >
                  Follow @h4yfans for updates →
                </a>
                <a
                  href="https://github.com/memrynote/memrynote"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-ink transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
