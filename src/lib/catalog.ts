import { tools } from "@/tools/registry"
import { formats } from "@/formats/registry"
import { getLocalizedTool } from "./tools"

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
    ...tools.map((tool) => {
      const localized = getLocalizedTool(tool, locale)
      return {
        href: `${prefix}/tools/${tool.slug}`,
        title: localized.name,
        description: localized.description,
        label: locale === "zh" ? "工具" : "Tool",
        keywords: tool.keywords,
      }
    }),
    ...formats.map((format) => ({
      href: `${prefix}/format/${format.slug}`,
      title: `.${format.extensions[0]} — ${format.name}`,
      description: format.tagline,
      label: "Format",
      keywords: format.keywords,
    })),
  ]
}
