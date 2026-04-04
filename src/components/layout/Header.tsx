import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Github, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Container } from './Container'
import { NAV_LINKS, GITHUB_URL, DISCORD_URL, REDDIT_URL } from '@/lib/constants'

function useScrollToSection() {
  const navigate = useNavigate()
  const location = useLocation()

  return (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const element = document.getElementById(id)

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else if (location.pathname !== '/') {
      navigate('/' + href)
    }
  }
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const scrollToSection = useScrollToSection()

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <Container size="full">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-[28px] border border-white/70 bg-paper/60 px-4 py-2 shadow-[0_4px_30px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-2xl backdrop-saturate-150 sm:px-5">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-terracotta/20 bg-white/80 shadow-sm">
              <img src="/favicon.svg" alt="" className="w-5 h-5" />
            </span>
            <div className="leading-none">
              <span className="flex items-center gap-2">
                <span className="block font-serif text-2xl font-medium tracking-tight text-ink transition-colors group-hover:text-terracotta">
                  Memry.
                </span>
                <span className="rounded-full bg-terracotta/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-terracotta">
                  Preview
                </span>
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-2 rounded-full border border-border/70 bg-white/55 p-1.5">
            {NAV_LINKS.map((link) =>
              link.href.startsWith('/') ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-white hover:text-ink"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-white hover:text-ink"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-white/55 text-muted transition-colors hover:text-ink"
              aria-label="Join our Discord"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
              </svg>
            </a>
            <a
              href={REDDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-white/55 text-muted transition-colors hover:text-ink"
              aria-label="Join r/MemryNote"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.066 13.71c.147.422.22.864.22 1.317 0 2.78-3.2 5.027-7.153 5.027S4 17.807 4 15.027c0-.453.073-.895.22-1.317a1.607 1.607 0 0 1-.634-1.283 1.625 1.625 0 0 1 2.768-1.152 8.07 8.07 0 0 1 4.358-1.378l.82-3.862a.342.342 0 0 1 .406-.265l2.73.577a1.14 1.14 0 1 1-.13.614l-2.44-.516-.738 3.47a8.026 8.026 0 0 1 4.296 1.368 1.625 1.625 0 0 1 2.768 1.152c0 .503-.228.953-.586 1.252h.018zM9.066 14.5c-.9 0-1.627.727-1.627 1.624s.727 1.625 1.627 1.625c.9 0 1.627-.728 1.627-1.625 0-.897-.727-1.625-1.627-1.625zm5.868 0c-.9 0-1.627.727-1.627 1.624s.727 1.625 1.627 1.625c.9 0 1.627-.728 1.627-1.625 0-.897-.728-1.625-1.627-1.625zm-4.797 4.337a.19.19 0 0 1 .265-.027c.774.594 1.853.867 2.864.773a3.705 3.705 0 0 0 2.864-.773.19.19 0 0 1 .238.293c-.9.74-2.088 1.09-3.102 1.09-1.015 0-2.202-.35-3.102-1.09a.19.19 0 0 1-.027-.266z" />
              </svg>
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-white/55 text-muted transition-colors hover:text-ink"
              aria-label="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <Button
              variant="default"
              size="sm"
              className="rounded-full px-6"
              asChild
            >
              <a href="#waitlist" onClick={(e) => scrollToSection(e, '#waitlist')}>
                Join waitlist
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden rounded-full border border-border/70 bg-white/60 p-3 text-ink transition-colors hover:text-terracotta"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden px-3 pt-3 sm:px-6"
          >
            <Container size="full">
              <div className="mx-auto flex max-w-6xl flex-col gap-4 rounded-[28px] border border-white/70 bg-paper/90 p-5 shadow-[var(--shadow-float)] backdrop-blur-xl">
                {NAV_LINKS.map((link) =>
                  link.href.startsWith('/') ? (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-2xl border border-border/60 bg-white/65 px-4 py-3 text-xl font-serif font-medium text-ink transition-colors hover:text-terracotta"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        scrollToSection(e, link.href)
                        setMobileMenuOpen(false)
                      }}
                      className="rounded-2xl border border-border/60 bg-white/65 px-4 py-3 text-xl font-serif font-medium text-ink transition-colors hover:text-terracotta"
                    >
                      {link.label}
                    </a>
                  )
                )}
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-white/65 px-4 py-3 text-lg font-medium text-muted transition-colors hover:text-ink"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
                    </svg>
                    Discord
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href={REDDIT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-white/65 px-4 py-3 text-lg font-medium text-muted transition-colors hover:text-ink"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.066 13.71c.147.422.22.864.22 1.317 0 2.78-3.2 5.027-7.153 5.027S4 17.807 4 15.027c0-.453.073-.895.22-1.317a1.607 1.607 0 0 1-.634-1.283 1.625 1.625 0 0 1 2.768-1.152 8.07 8.07 0 0 1 4.358-1.378l.82-3.862a.342.342 0 0 1 .406-.265l2.73.577a1.14 1.14 0 1 1-.13.614l-2.44-.516-.738 3.47a8.026 8.026 0 0 1 4.296 1.368 1.625 1.625 0 0 1 2.768 1.152c0 .503-.228.953-.586 1.252h.018zM9.066 14.5c-.9 0-1.627.727-1.627 1.624s.727 1.625 1.627 1.625c.9 0 1.627-.728 1.627-1.625 0-.897-.727-1.625-1.627-1.625zm5.868 0c-.9 0-1.627.727-1.627 1.624s.727 1.625 1.627 1.625c.9 0 1.627-.728 1.627-1.625 0-.897-.728-1.625-1.627-1.625zm-4.797 4.337a.19.19 0 0 1 .265-.027c.774.594 1.853.867 2.864.773a3.705 3.705 0 0 0 2.864-.773.19.19 0 0 1 .238.293c-.9.74-2.088 1.09-3.102 1.09-1.015 0-2.202-.35-3.102-1.09a.19.19 0 0 1-.027-.266z" />
                    </svg>
                    Reddit
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-white/65 px-4 py-3 text-lg font-medium text-muted transition-colors hover:text-ink"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-5 h-5" />
                    GitHub
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <Button variant="default" className="mt-2 w-full rounded-full" asChild>
                  <a href="#waitlist" onClick={(e) => { scrollToSection(e, '#waitlist'); setMobileMenuOpen(false) }}>
                    Join Waitlist
                  </a>
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
