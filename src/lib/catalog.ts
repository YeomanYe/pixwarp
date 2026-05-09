import { tools } from "@/tools/registry"
import { formats } from "@/formats/registry"

export interface CatalogSearchItem {
  href: string
  title: string
  description: string
  label: string
  keywords: string[]
}

export function getCatalogSearchItems(locale: "en" | "zh" = "en"): CatalogSearchItem[] {
  const prefix = locale === "zh" ? "/zh" : ""
  return [
    ...tools.map((tool) => ({
      href: `${prefix}/tools/${tool.slug}`,
      title: tool.name,
      description: tool.description,
      label: "Tool",
      keywords: tool.keywords,
    })),
    ...formats.map((format) => ({
      href: `${prefix}/format/${format.slug}`,
      title: `.${format.extensions[0]} — ${format.name}`,
      description: format.tagline,
      label: "Format",
      keywords: format.keywords,
    })),
  ]
}
