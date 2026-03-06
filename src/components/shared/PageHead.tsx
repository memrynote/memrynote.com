import { Helmet } from 'react-helmet-async'
import { getCanonicalUrl, getJsonLd, PAGE_META } from '@/lib/seo'

interface PageHeadProps {
  page: keyof typeof PAGE_META
  jsonLd?: boolean
}

export function PageHead({ page, jsonLd }: PageHeadProps) {
  const meta = PAGE_META[page]
  const canonical = getCanonicalUrl(meta.path)

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />

      <meta property="twitter:title" content={meta.title} />
      <meta property="twitter:description" content={meta.description} />
      <meta property="twitter:url" content={canonical} />

      {jsonLd && (
        <script type="application/ld+json">{getJsonLd()}</script>
      )}
    </Helmet>
  )
}
