import type { MetadataRoute } from "next"
import { tools } from "@/tools/registry"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pixwarp.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ]
  const toolEntries: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.slug}`,
    lastModified: tool.lastUpdated ? new Date(tool.lastUpdated) : now,
    changeFrequency: "weekly",
    priority: 0.8,
  }))
  return [...staticEntries, ...toolEntries]
}
