import type { FeatureItem as FeatureItemData } from '@/lib/features-data'

interface FeatureItemProps {
  sectionSlug: string
  feature: FeatureItemData
  index: number
}

export function FeatureItem({ sectionSlug, feature, index }: FeatureItemProps) {
  const anchorId = `${sectionSlug}-${feature.slug}`
  const numberLabel = String(index + 1).padStart(2, '0')

  return (
    <article
      id={anchorId}
      className="border-t border-border py-7 first:border-t-0"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[10px] text-terracotta tabular-nums shrink-0 pt-1.5">
          {numberLabel}
        </span>
        <h3 className="font-serif text-[20px] leading-tight text-ink">
          {feature.title}
        </h3>
      </div>
      <p className="mt-2 pl-[calc(1rem+10px)] text-[15px] leading-relaxed text-muted max-w-[60ch]">
        {feature.description}
      </p>
    </article>
  )
}
