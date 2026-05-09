import type { ToolManifest } from "./types"
import { manifest as heicToJpgManifest } from "./heic-to-jpg/manifest"
import { manifest as screenshotMockupManifest } from "./screenshot-mockup/manifest"
import { manifest as tweetMockupManifest } from "./tweet-mockup/manifest"
import { manifest as socialCoverManifest } from "./social-cover/manifest"
import { manifest as mp4ToGifManifest } from "./mp4-to-gif/manifest"
import { manifest as pdfCompressManifest } from "./pdf-compress/manifest"
import { manifest as pdfSplitManifest } from "./pdf-split/manifest"
import { manifest as pdfMergeManifest } from "./pdf-merge/manifest"
import { manifest as imageCompressorManifest } from "./image-compressor/manifest"
import { manifest as qrCodeManifest } from "./qr-code/manifest"
import { manifest as webpToPngManifest } from "./webp-to-png/manifest"
import { manifest as webpToJpgManifest } from "./webp-to-jpg/manifest"
import { manifest as imageResizeManifest } from "./image-resize/manifest"
import { manifest as removeExifManifest } from "./remove-exif/manifest"
import { manifest as imagesToPdfManifest } from "./images-to-pdf/manifest"
import { manifest as pdfToImagesManifest } from "./pdf-to-images/manifest"
import { manifest as svgOptimizerManifest } from "./svg-optimizer/manifest"
import { manifest as videoCompressManifest } from "./video-compress/manifest"
import { manifest as audioExtractManifest } from "./audio-extract/manifest"

/**
 * Central registry of all tools.
 *
 * To add a tool:
 *   1. Create `src/tools/<slug>/manifest.ts` exporting a ToolManifest
 *   2. Import + add to the array below
 *
 * Order here drives display order in homepage / sitemap.
 */
export const tools: ToolManifest[] = [
  heicToJpgManifest,
  screenshotMockupManifest,
  tweetMockupManifest,
  socialCoverManifest,
  mp4ToGifManifest,
  pdfCompressManifest,
  pdfSplitManifest,
  pdfMergeManifest,
  imageCompressorManifest,
  webpToPngManifest,
  webpToJpgManifest,
  imageResizeManifest,
  removeExifManifest,
  imagesToPdfManifest,
  pdfToImagesManifest,
  svgOptimizerManifest,
  videoCompressManifest,
  audioExtractManifest,
  qrCodeManifest,
]

export const toolsBySlug = Object.fromEntries(tools.map((t) => [t.slug, t]))

export function getToolBySlug(slug: string): ToolManifest | undefined {
  return toolsBySlug[slug]
}

export function getRelatedTools(slug: string, limit = 3): ToolManifest[] {
  const tool = toolsBySlug[slug]
  if (!tool?.related) {
    return tools.filter((t) => t.slug !== slug && t.category === tool?.category).slice(0, limit)
  }
  return tool.related
    .map((s) => toolsBySlug[s])
    .filter((t): t is ToolManifest => Boolean(t))
    .slice(0, limit)
}

export function getToolsByCategory(category: string): ToolManifest[] {
  return tools.filter((t) => t.category === category)
}

export const categoryLabels: Record<string, { label: string; accent: string }> = {
  video: { label: "Video", accent: "#ef4444" },
  image: { label: "Image", accent: "#3b82f6" },
  screenshot: { label: "Screenshot", accent: "#10b981" },
  svg: { label: "SVG", accent: "#f59e0b" },
  creator: { label: "Creator", accent: "#ec4899" },
  audio: { label: "Audio", accent: "#8b5cf6" },
  pdf: { label: "PDF", accent: "#f43f5e" },
  qr: { label: "QR / Code", accent: "#14b8a6" },
  utility: { label: "Utility", accent: "#6b7280" },
}
