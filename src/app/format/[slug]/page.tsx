import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { formats, getFormatBySlug } from "@/formats/registry"
import { FormatShell } from "@/components/format-shell/FormatShell"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return formats.map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const format = getFormatBySlug(slug)
  if (!format) return {}

  const title = `.${format.extensions[0]} (${format.name}) — File Format Guide`
  const description = format.tagline

  return {
    title,
    description,
    keywords: format.keywords,
    alternates: {
      canonical: `/format/${format.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/format/${format.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function FormatPage({ params }: PageProps) {
  const { slug } = await params
  const format = getFormatBySlug(slug)
  if (!format) notFound()

  // JSON-LD: Article schema for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${format.name} (.${format.extensions[0]}) — ${format.fullName}`,
    description: format.tagline,
    keywords: format.keywords.join(", "),
    datePublished: format.lastUpdated,
    dateModified: format.lastUpdated,
    mainEntity: {
      "@type": "Thing",
      name: format.fullName,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FormatShell format={format} />
    </>
  )
}
