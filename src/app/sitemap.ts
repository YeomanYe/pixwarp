import type { MetadataRoute } from "next"
import { tools } from "@/tools/registry"
import { formats } from "@/formats/registry"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pixwarp.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/zh`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ]
  const toolEntries: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.slug}`,
    lastModified: tool.lastUpdated ? new Date(tool.lastUpdated) : now,
    changeFrequency: "weekly",
    priority: 0.8,
  }))
  const zhToolEntries: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${BASE_URL}/zh/tools/${tool.slug}`,
    lastModified: tool.lastUpdated ? new Date(tool.lastUpdated) : now,
    changeFrequency: "weekly",
    priority: 0.75,
  }))
  const formatEntries: MetadataRoute.Sitemap = formats.map((f) => ({
    url: `${BASE_URL}/format/${f.slug}`,
    lastModified: f.lastUpdated ? new Date(f.lastUpdated) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }))
  const zhFormatEntries: MetadataRoute.Sitemap = formats.map((f) => ({
    url: `${BASE_URL}/zh/format/${f.slug}`,
    lastModified: f.lastUpdated ? new Date(f.lastUpdated) : now,
    changeFrequency: "monthly",
    priority: 0.65,
  }))
  return [...staticEntries, ...toolEntries, ...zhToolEntries, ...formatEntries, ...zhFormatEntries]
}
