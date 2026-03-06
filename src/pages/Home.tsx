import { Hero } from '@/components/sections/Hero'
import { Marquee } from '@/components/shared/Marquee'
import { FeatureFlow } from '@/components/sections/FeatureFlow'

import { Features } from '@/components/sections/Features'
import { Comparison } from '@/components/sections/Comparison'

import { FAQ } from '@/components/sections/FAQ'
import { FounderStory } from '@/components/sections/FounderStory'
import { FinalCTA } from '@/components/sections/FinalCTA'

export function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeatureFlow />
      <Features />

      <Comparison />

      <FAQ />
      <FounderStory />
      <FinalCTA />
    </>
  )
}
