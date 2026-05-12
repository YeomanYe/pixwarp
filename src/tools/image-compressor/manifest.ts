import type { ToolManifest } from "../types"
import { ImageCompressorUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "image-compressor",
  category: "image",
  name: "Image Compressor",
  description:
    "Shrink JPG, PNG, and WebP images right in your browser with WASM codecs and side-by-side comparison.",
  longDescription: `Drop one or many images and tune the quality slider. The tool compresses images with browser-local WASM codecs: mozjpeg for JPG, libwebp for WebP, oxipng for PNG lossless optimization, and imagequant for PNG lossy palette compression.

Best results: JPG and WebP at 70–85% quality typically shrink photos with no obvious visible difference. PNG supports both lossless optimization and lossy palette quantization while staying in .png. WebP supports lossy and lossless modes.`,
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
  related: ["webp-to-png", "heic-to-jpg"],
  markets: ["global"],
  faq: [
    {
      q: "Does my image get uploaded?",
      a: "No. Compression runs in your browser with WASM codecs. Your file never leaves your device.",
    },
    {
      q: "How does the quality slider work?",
      a: "For JPG and lossy WebP, the quality slider controls the compression level. In PNG lossy mode it reduces the palette with controlled quality loss while keeping a PNG output. PNG and WebP lossless modes disable the slider because the image data is preserved visually.",
    },
    {
      q: "Why is my PNG barely smaller?",
      a: "PNG size depends heavily on how many unique colors and transparent edges the image has. Flat graphics usually shrink well in PNG lossy mode, while already-optimized screenshots may only see a small reduction unless you switch away from lossless mode.",
    },
    {
      q: "What's the file size limit?",
      a: "There's no hard limit, but very large images (>50MP) may be slow on older devices because the browser has to decode and re-encode them in memory.",
    },
  ],
  lastUpdated: "2026-05-01",
  Component: ImageCompressorUI,
}
