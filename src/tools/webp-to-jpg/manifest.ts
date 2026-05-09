import type { ToolManifest } from "../types"
import { WebpToJpgUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "webp-to-jpg",
  category: "image",
  name: "WebP to JPG Converter",
  nameZh: "WebP 转 JPG",
  description: "Convert WebP images to JPG locally with adjustable quality.",
  descriptionZh: "在浏览器内把 WebP 图片转换为 JPG，并可调节输出质量。",
  longDescription:
    "WebP is efficient for websites, but JPG still works better in many CMS, email, and legacy workflows. This tool decodes WebP locally and exports browser-generated JPG files.",
  howToUse: [
    "Drop one or more WebP images.",
    "Choose the JPG quality level.",
    "Preview the output size and image.",
    "Download the generated JPG files.",
  ],
  outputDetails: [
    "Outputs standard image/jpeg files.",
    "Transparent pixels are flattened onto a white background.",
    "Quality controls compression and file size.",
  ],
  keywords: ["webp to jpg", "webp to jpeg", "convert webp", "webp converter", "WebP 转 JPG"],
  related: ["webp-to-png", "image-compressor"],
  markets: ["global", "cn"],
  faq: [
    { q: "Does this upload my image?", a: "No. The conversion runs with browser Canvas APIs." },
    {
      q: "What happens to transparency?",
      a: "JPG does not support alpha transparency, so transparent pixels are rendered over white.",
    },
  ],
  lastUpdated: "2026-05-09",
  Component: WebpToJpgUI,
}
