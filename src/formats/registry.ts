import type { FormatManifest } from "./types"
import { manifest as heicManifest } from "./heic/manifest"
import { manifest as webmManifest } from "./webm/manifest"

export const formats: FormatManifest[] = [heicManifest, webmManifest]

export const formatsBySlug = Object.fromEntries(formats.map((f) => [f.slug, f]))

export function getFormatBySlug(slug: string): FormatManifest | undefined {
  return formatsBySlug[slug]
}

export function getRelatedFormats(slug: string, limit = 3): FormatManifest[] {
  const fmt = formatsBySlug[slug]
  if (!fmt?.relatedFormats) {
    return formats.filter((f) => f.slug !== slug && f.category === fmt?.category).slice(0, limit)
  }
  return fmt.relatedFormats
    .map((s) => formatsBySlug[s])
    .filter((f): f is FormatManifest => Boolean(f))
    .slice(0, limit)
}

export const formatCategoryLabels: Record<string, { label: string; accent: string }> = {
  image: { label: "Image", accent: "#3b82f6" },
  video: { label: "Video", accent: "#ef4444" },
  audio: { label: "Audio", accent: "#8b5cf6" },
  document: { label: "Document", accent: "#10b981" },
  data: { label: "Data", accent: "#f59e0b" },
  archive: { label: "Archive", accent: "#6b7280" },
  font: { label: "Font", accent: "#ec4899" },
  "3d": { label: "3D", accent: "#14b8a6" },
}
