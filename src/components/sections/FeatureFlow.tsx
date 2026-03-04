import { motion } from 'framer-motion'
import { Inbox, BookOpen, FileText, CheckSquare } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'

const FLOW_NODES = [
  { id: 'inbox', icon: Inbox, label: 'Inbox', tagline: 'Capture everything', x: 50, y: 10 },
  { id: 'journal', icon: BookOpen, label: 'Journal', tagline: 'Reflect daily', x: 10, y: 50 },
  { id: 'notes', icon: FileText, label: 'Notes', tagline: 'Build knowledge', x: 90, y: 50 },
  { id: 'tasks', icon: CheckSquare, label: 'Tasks', tagline: 'Get it done', x: 50, y: 90 },
] as const

const CONNECTIONS: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [1, 2],
  [0, 3],
]

function buildPath(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.sqrt(dx * dx + dy * dy)
  const nx = -dy / len
  const ny = dx / len
  const curve = len * 0.12
  return `M ${x1} ${y1} Q ${mx + nx * curve} ${my + ny * curve} ${x2} ${y2}`
}

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
}

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 0.4,
    transition: {
      pathLength: { duration: 1.2, delay: 0.3 + i * 0.15, ease: EASE_OUT_EXPO },
      opacity: { duration: 0.4, delay: 0.3 + i * 0.15 },
    },
  }),
}

export function FeatureFlow() {
  const paths = CONNECTIONS.map(([from, to]) => {
    const n1 = FLOW_NODES[from]
    const n2 = FLOW_NODES[to]
    return buildPath(n1.x, n1.y, n2.x, n2.y)
  })

  return (
    <section className="py-24 overflow-hidden">
      <Container>
        <SectionHeading
          title="Everything connects"
          subtitle="Four spaces that work together. Capture in Inbox, reflect in Journal, build in Notes, execute in Tasks."
        />

        {/* Desktop diamond */}
        <motion.div
          className="hidden md:block relative mx-auto max-w-2xl aspect-square"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" fill="none">
            {paths.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                stroke="var(--color-terracotta)"
                strokeWidth="0.3"
                strokeLinecap="round"
                fill="none"
                variants={pathVariants}
                custom={i}
              />
            ))}

            {paths.map((d, i) => (
              <circle key={`dot-${i}`} r="0.8" fill="var(--color-terracotta)" opacity="0.7">
                <animateMotion
                  dur={`${3 + i * 0.5}s`}
                  repeatCount="indefinite"
                  path={d}
                  begin={`${1.5 + i * 0.3}s`}
                />
                <animate
                  attributeName="opacity"
                  values="0;0.7;0.7;0"
                  keyTimes="0;0.1;0.9;1"
                  dur={`${3 + i * 0.5}s`}
                  repeatCount="indefinite"
                  begin={`${1.5 + i * 0.3}s`}
                />
              </circle>
            ))}

            <motion.circle
              cx="50"
              cy="50"
              r="1.5"
              fill="var(--color-terracotta)"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 0.5, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 0.6, ease: EASE_OUT_EXPO }}
            >
              <animate
                attributeName="r"
                values="1.5;2;1.5"
                dur="3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.5;0.3;0.5"
                dur="3s"
                repeatCount="indefinite"
              />
            </motion.circle>
          </svg>

          {FLOW_NODES.map((node) => {
            const Icon = node.icon
            return (
              <motion.div
                key={node.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                variants={nodeVariants}
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="absolute -inset-3 bg-terracotta/10 rounded-full blur-xl" />
                  <div className="relative w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center shadow-card">
                    <Icon className="w-7 h-7 text-terracotta" strokeWidth={1.5} />
                  </div>
                </motion.div>
                <div className="text-center">
                  <span className="block font-serif text-xl text-ink">{node.label}</span>
                  <span className="block text-xs text-muted font-mono tracking-tight mt-0.5">
                    {node.tagline}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Mobile vertical */}
        <motion.div
          className="md:hidden relative flex flex-col items-center gap-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            <line
              x1="50%"
              y1="10%"
              x2="50%"
              y2="90%"
              stroke="var(--color-terracotta)"
              strokeWidth="1"
              strokeOpacity="0.15"
              strokeDasharray="4 6"
            />
            <circle r="3" fill="var(--color-terracotta)" opacity="0.5">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 0,-80 L 0,80" />
              <animate
                attributeName="opacity"
                values="0;0.5;0.5;0"
                keyTimes="0;0.1;0.9;1"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>

          {FLOW_NODES.map((node) => {
            const Icon = node.icon
            return (
              <motion.div
                key={node.id}
                className="relative z-10 flex items-center gap-5 w-full max-w-xs py-5"
                variants={nodeVariants}
              >
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-2 bg-terracotta/8 rounded-full blur-lg" />
                  <div className="relative w-14 h-14 rounded-xl bg-card border border-border flex items-center justify-center shadow-card">
                    <Icon className="w-6 h-6 text-terracotta" strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <span className="block font-serif text-lg text-ink">{node.label}</span>
                  <span className="block text-xs text-muted font-mono tracking-tight">
                    {node.tagline}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}
