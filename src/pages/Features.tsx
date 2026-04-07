import { Container } from '@/components/layout/Container'
import { PageHead } from '@/components/shared/PageHead'
import { FeatureSection } from '@/components/features-page/FeatureSection'
import { FeaturesCTA } from '@/components/features-page/FeaturesCTA'
import { FeaturesHero } from '@/components/features-page/FeaturesHero'
import { FeaturesOutline } from '@/components/features-page/FeaturesOutline'
import { FeaturesOutlineMobile } from '@/components/features-page/FeaturesOutlineMobile'
import { FEATURE_SECTIONS } from '@/lib/features-data'

export function FeaturesPage() {
  return (
    <main>
      <PageHead page="features" />

      <FeaturesHero />

      <FeaturesOutlineMobile />

      <Container>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="hidden md:block">
            <FeaturesOutline />
          </aside>

          <div className="min-w-0">
            <div className="max-w-[680px]">
              {FEATURE_SECTIONS.map((section, index) => (
                <FeatureSection
                  key={section.slug}
                  section={section}
                  isFirst={index === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>

      <FeaturesCTA />
    </main>
  )
}
