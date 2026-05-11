import type { ToolManifest } from "../types"
import { JpgToWebpUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "jpg-to-webp",
  category: "image",
  name: "JPG to WebP Converter",
  description: "Convert JPG images to compact WebP files locally in your browser.",
  longDescription:
    "WebP can make website photos smaller while keeping good visual quality. PixWarp converts JPG to WebP in the browser, making it useful for blog images, landing pages, and product screenshots that should load faster.",
  howToUse: [
    "Drop one or more JPG or JPEG images.",
    "Pick a WebP quality level.",
    "PixWarp exports WebP files locally with Canvas.",
    "Download each optimized WebP image.",
  ],
  outputDetails: [
    "Lower quality creates smaller WebP files.",
    "WebP is widely supported in modern browsers.",
    "No upload is required; the browser does the conversion.",
  ],
  keywords: ["jpg to webp", "jpeg to webp", "convert jpg to webp", "JPG 转 WebP", "WebP 转换"],
  icon: "image",
  related: ["png-to-webp", "webp-to-jpg", "image-compressor"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "Is WebP smaller than JPG?",
      a: "Often yes, especially for web delivery. Results depend on the source image and quality setting.",
    },
    {
      q: "Does PixWarp upload the photo?",
      a: "No. JPG decoding and WebP export happen inside your browser.",
    },
  ],
  lastUpdated: "2026-05-11",
  Component: JpgToWebpUI,
}
