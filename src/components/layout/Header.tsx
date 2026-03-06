import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Github, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Container } from './Container'
import { NAV_LINKS, GITHUB_URL } from '@/lib/constants'

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
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-[28px] border border-white/70 bg-paper/60 px-4 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-2xl backdrop-saturate-150 sm:px-6">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-terracotta/20 bg-white/80 shadow-sm">
              <img src="/favicon.svg" alt="" className="w-6 h-6" />
            </span>
            <div className="leading-none">
              <span className="block font-serif text-3xl font-medium tracking-tight text-ink transition-colors group-hover:text-terracotta">
                Memry.
              </span>
              <span className="section-kicker hidden text-[10px] text-muted/70 sm:block">
                A Private Memory Atelier
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
            <div className="hidden xl:flex items-center gap-3 rounded-full border border-border/70 bg-white/55 px-4 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sage" />
              </span>
              <span className="section-kicker text-[10px] text-muted">Early access Q2 2026</span>
            </div>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-white/55 text-muted transition-colors hover:text-ink"
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
                <div className="section-kicker text-[10px] text-muted">A private room for notes, tasks, and memory</div>
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
