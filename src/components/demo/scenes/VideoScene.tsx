import { useRef, useEffect } from 'react'
import type { SceneProps } from '../types'

interface VideoSceneProps extends SceneProps {
  src: string
}

export function VideoScene({ src, playing, onDurationDetected }: VideoSceneProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (playing) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [playing])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    if (playing) {
      video.play().catch(() => {})
    }
  }, [src, playing])

  const handleLoadedMetadata = () => {
    const video = videoRef.current
    if (!video || !onDurationDetected) return
    onDurationDetected(video.duration * 1000)
  }

  return (
    <div className="overflow-hidden rounded-lg">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        className="w-full h-auto scale-[1.02]"
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  )
}
