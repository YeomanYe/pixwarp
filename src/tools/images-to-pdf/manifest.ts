import type { ToolManifest } from "../types"
import { ImagesToPdfUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "images-to-pdf",
  category: "pdf",
  name: "Images to PDF",
  nameZh: "图片转 PDF",
  description: "Combine JPG, PNG, WebP, and other images into a single PDF locally.",
  descriptionZh: "在浏览器内把多张图片合并为一个 PDF。",
  longDescription:
    "Build a PDF from images without uploading them. Each image becomes one page in the output document.",
  howToUse: ["Drop images.", "Reorder if needed.", "Generate and download the PDF."],
  outputDetails: [
    "Each image becomes one PDF page.",
    "Page size follows the image aspect ratio.",
    "Generated with pdf-lib in your browser.",
  ],
  keywords: ["images to pdf", "jpg to pdf", "png to pdf", "图片转 PDF"],
  related: ["pdf-merge", "pdf-split"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "Can I add multiple images?",
      a: "Yes. Drop all images at once or add more before generating.",
    },
  ],
  lastUpdated: "2026-05-09",
  Component: ImagesToPdfUI,
}
