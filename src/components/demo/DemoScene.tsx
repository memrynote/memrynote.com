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
      className="relative bg-white rounded-b-xl overflow-hidden select-none aspect-video"
      onClick={onToggle}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={clip.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <Scene playing={playing} onDurationDetected={onDurationDetected} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
