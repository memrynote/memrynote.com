import { Hero } from '@/components/sections/Hero'
import { FeatureFlow } from '@/components/sections/FeatureFlow'
import { SavingsCalculator } from '@/components/sections/SavingsCalculator'
import { Features } from '@/components/sections/Features'
import { Comparison } from '@/components/sections/Comparison'
import { Pricing } from '@/components/sections/Pricing'
import { FAQ } from '@/components/sections/FAQ'
import { FounderStory } from '@/components/sections/FounderStory'
import { FinalCTA } from '@/components/sections/FinalCTA'

export function Home() {
  return (
    <>
      <Hero />
      <FeatureFlow />
      <Features />
      <SavingsCalculator />
      <Comparison />
      <Pricing />
      <FAQ />
      <FounderStory />
      <FinalCTA />
    </>
  )
}
