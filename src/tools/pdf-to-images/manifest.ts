import type { ToolManifest } from "../types"
import { PdfToImagesUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "pdf-to-images",
  category: "pdf",
  name: "PDF to Images",
  nameZh: "PDF 转图片",
  description: "Render PDF pages into PNG or JPG images locally in your browser.",
  descriptionZh: "在浏览器内把 PDF 页面渲染成 PNG 或 JPG 图片。",
  longDescription:
    "Export PDF pages as images with pdf.js and Canvas. No server upload is required.",
  howToUse: [
    "Drop a PDF.",
    "Pick image format and scale.",
    "Render pages.",
    "Download page images.",
  ],
  outputDetails: [
    "Exports one image per page.",
    "Higher scale gives sharper but larger images.",
    "Uses browser Canvas rendering.",
  ],
  keywords: ["pdf to images", "pdf to jpg", "pdf to png", "PDF 转图片"],
  related: ["images-to-pdf", "pdf-split"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "Can it export every page?",
      a: "Yes. The current version renders all pages into downloadable images.",
    },
  ],
  lastUpdated: "2026-05-09",
  Component: PdfToImagesUI,
}
