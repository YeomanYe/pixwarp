import type { ToolManifest } from "../types"
import { ImageCompressorUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "image-compressor",
  category: "image",
  name: "Image Compressor",
  description:
    "Shrink JPG, PNG, and WebP images right in your browser — adjustable quality, side-by-side comparison.",
  longDescription: `Drop one or many images and tune the quality slider. The tool re-encodes each image with HTML Canvas right in your browser — your files never leave the device.

Best results: JPG and WebP at 70–85% quality typically halve the file size with no visible difference. PNG supports both lossless optimization and lossy palette quantization while staying in .png.`,
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
      q: "How does the quality slider work?",
      a: "For JPG and WebP, the quality slider controls the compression level. In PNG lossy mode it reduces the palette with controlled quality loss while keeping a PNG output. In PNG lossless mode the slider is disabled because the image data stays visually identical.",
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
