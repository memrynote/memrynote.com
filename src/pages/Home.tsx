import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'
import { SecurityShowcase } from '@/components/sections/SecurityShowcase'
import { FounderStory } from '@/components/sections/FounderStory'
import { FinalCTA } from '@/components/sections/FinalCTA'

export function Home() {
  return (
    <>
      <Hero />
      <Features />
      <SecurityShowcase />
      <FounderStory />
      <FinalCTA />
    </>
  )
}
