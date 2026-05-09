import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ToolShell } from "@/components/tool-shell/ToolShell"
import { getLocalizedTool } from "@/lib/tools"
import { getToolBySlug, tools } from "@/tools/registry"

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
  const localized = getLocalizedTool(tool, "zh")

  return {
    title: `${localized.name} 中文`,
    description: `${localized.description} 文件在浏览器内处理。`,
    keywords: [...tool.keywords, "本地处理", "不上传", "在线工具"],
    alternates: {
      canonical: `/zh/tools/${tool.slug}`,
      languages: {
        en: `/tools/${tool.slug}`,
        zh: `/zh/tools/${tool.slug}`,
      },
    },
    openGraph: {
      title: `${localized.name} 中文`,
      description: localized.description,
      url: `/zh/tools/${tool.slug}`,
      type: "website",
    },
  }
}

export default async function ZhToolPage({ params }: PageProps) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) notFound()
  const localized = getLocalizedTool(tool, "zh")

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${localized.name} 中文`,
    description: localized.description,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any (browser)",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolShell tool={tool} locale="zh" />
    </>
  )
}
