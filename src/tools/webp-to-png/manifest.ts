import type { ToolManifest } from "../types"
import { WebpToPngUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "webp-to-png",
  category: "image",
  name: "WebP to PNG Converter",
  description:
    "Convert WebP images to PNG locally in your browser for design tools, CMS uploads, and older apps.",
  longDescription: `WebP is compact and modern, but some design tools, CMS editors, and older workflows still expect PNG.
This converter decodes WebP in your browser, redraws it on Canvas, and exports a PNG file without uploading your image.`,
  howToUse: [
    "Drop one or more .webp files into the upload area.",
    "PixWarp decodes each image locally using your browser.",
    "Preview the PNG result and compare output size.",
    "Download each PNG file when it is ready.",
  ],
  outputDetails: [
    "Outputs PNG files with transparency preserved when the browser decoder supports it.",
    "PNG can be larger than WebP because it prioritizes compatibility and lossless pixels.",
    "Runs with Canvas APIs in the browser; no server-side image upload is required.",
  ],
  keywords: [
    "webp to png",
    "convert webp to png",
    "webp converter",
    "webp to png online",
    "webp to png no upload",
    "WebP 转 PNG",
    "WebP 图片转换",
  ],
  icon: "image",
  related: ["webp-to-jpg", "image-compressor", "image-resize"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "Are WebP files uploaded?",
      a: "No. The conversion uses browser image decoding and Canvas export. Your source image stays on your device.",
    },
    {
      q: "Why is the PNG bigger than the WebP?",
      a: "WebP is designed for small web delivery. PNG is lossless and widely compatible, so it is often larger.",
    },
    {
      q: "Does transparency survive the conversion?",
      a: "Yes, transparent WebP images are exported with PNG alpha when the browser can decode the source correctly.",
    },
  ],
  lastUpdated: "2026-05-09",
  Component: WebpToPngUI,
}
