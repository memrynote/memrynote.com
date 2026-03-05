import { AnimatePresence, motion } from 'framer-motion'
import { CLIPS } from './types'
import { InboxScene } from './scenes/InboxScene'
import { JournalScene } from './scenes/JournalScene'
import { NotesScene } from './scenes/NotesScene'
import { TasksScene } from './scenes/TasksScene'

const SCENE_MAP = {
  inbox: InboxScene,
  journal: JournalScene,
  notes: NotesScene,
  tasks: TasksScene,
} as const

interface DemoSceneProps {
  activeIndex: number
  playing: boolean
  onToggle: () => void
  onDurationDetected: (ms: number) => void
}

export function DemoScene({ activeIndex, playing, onToggle, onDurationDetected }: DemoSceneProps) {
  const clip = CLIPS[activeIndex]
  const Scene = SCENE_MAP[clip.id]
  return (
    <div
      className="relative bg-white rounded-b-xl overflow-hidden select-none"
      onClick={onToggle}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={clip.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Scene playing={playing} onDurationDetected={onDurationDetected} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
