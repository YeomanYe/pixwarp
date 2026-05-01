import type { ToolManifest } from "../types"
import { ImageCompressorUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "image-compressor",
  category: "image",
  name: "Image Compressor",
  description:
    "Shrink JPG, PNG, and WebP images right in your browser — adjustable quality, instant before/after comparison.",
  longDescription: `Drop one or many images and tune the quality slider. The tool re-encodes each image with HTML Canvas right in your browser — your files never leave the device.

Best results: JPG and WebP at 70–85% quality typically halve the file size with no visible difference. PNG with transparency is re-encoded as PNG (lossless) or as WebP (much smaller).`,
  keywords: [
    "image compressor",
    "compress image online",
    "compress jpg",
    "compress png",
    "compress webp",
    "image compressor no upload",
    "图片压缩",
    "在线压缩 图片",
  ],
  icon: "image",
  related: ["heic-to-jpg"],
  markets: ["global"],
  faq: [
    {
      q: "Does my image get uploaded?",
      a: "No. Compression runs in your browser via the HTML Canvas API. Your file never leaves your device.",
    },
    {
      q: "Which format should I pick?",
      a: "WebP usually wins for both photos and graphics — typically 25-35% smaller than JPG at the same visual quality, and it supports transparency. JPG is best for maximum compatibility (older email clients, some legacy CMSes). PNG is for cases where you must keep lossless transparency.",
    },
    {
      q: "Why is my PNG barely smaller?",
      a: "PNG is lossless — quality is fixed. Real shrink for PNG comes from converting to JPG or WebP. If your PNG has transparency, switch to WebP to keep the alpha channel and still get a big size cut.",
    },
    {
      q: "What's the file size limit?",
      a: "There's no hard limit, but very large images (>50MP) may be slow on older devices because the browser has to decode and re-encode them in memory.",
    },
  ],
  lastUpdated: "2026-05-01",
  Component: ImageCompressorUI,
}
