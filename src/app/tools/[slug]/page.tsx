import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { tools, getToolBySlug } from "@/tools/registry"
import { ToolShell } from "@/components/tool-shell/ToolShell"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) return {}

  return {
    title: tool.name,
    description: tool.description,
    keywords: tool.keywords,
    alternates: {
      canonical: `/tools/${tool.slug}`,
      languages: {
        en: `/tools/${tool.slug}`,
        zh: `/zh/tools/${tool.slug}`,
      },
    },
    openGraph: {
      title: tool.name,
      description: tool.description,
      url: `/tools/${tool.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.name,
      description: tool.description,
    },
  }
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) notFound()

  // JSON-LD WebApplication schema for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: tool.name,
        description: tool.description,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any (browser)",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      ...(tool.howToUse
        ? [
            {
              "@type": "HowTo",
              name: `How to use ${tool.name}`,
              step: tool.howToUse.map((step, index) => ({
                "@type": "HowToStep",
                position: index + 1,
                text: step,
              })),
            },
          ]
        : []),
      ...(tool.faq
        ? [
            {
              "@type": "FAQPage",
              mainEntity: tool.faq.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            },
          ]
        : []),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolShell tool={tool} />
    </>
  )
}
