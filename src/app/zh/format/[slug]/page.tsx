import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { FormatShell } from "@/components/format-shell/FormatShell"
import { formats, getFormatBySlug } from "@/formats/registry"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return formats.map((format) => ({ slug: format.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const format = getFormatBySlug(slug)
  if (!format) return {}

  const title = `.${format.extensions[0]} (${format.name}) 中文格式指南`

  return {
    title,
    description: format.tagline,
    keywords: [...format.keywords, "文件格式", "格式指南"],
    alternates: {
      canonical: `/zh/format/${format.slug}`,
      languages: {
        en: `/format/${format.slug}`,
        zh: `/zh/format/${format.slug}`,
      },
    },
    openGraph: {
      title,
      description: format.tagline,
      url: `/zh/format/${format.slug}`,
      type: "article",
    },
  }
}

export default async function ZhFormatPage({ params }: PageProps) {
  const { slug } = await params
  const format = getFormatBySlug(slug)
  if (!format) notFound()

  return <FormatShell format={format} />
}
