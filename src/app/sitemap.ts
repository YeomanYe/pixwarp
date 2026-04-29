import type { MetadataRoute } from "next"
import { tools } from "@/tools/registry"
import { formats } from "@/formats/registry"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pixwarp.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
  ]
  const toolEntries: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.slug}`,
    lastModified: tool.lastUpdated ? new Date(tool.lastUpdated) : now,
    changeFrequency: "weekly",
    priority: 0.8,
  }))
  const formatEntries: MetadataRoute.Sitemap = formats.map((f) => ({
    url: `${BASE_URL}/format/${f.slug}`,
    lastModified: f.lastUpdated ? new Date(f.lastUpdated) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }))
  return [...staticEntries, ...toolEntries, ...formatEntries]
}
