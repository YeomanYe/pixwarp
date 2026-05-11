import type { ToolManifest } from "../types"
import { PngToJpgUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "png-to-jpg",
  category: "image",
  name: "PNG to JPG Converter",
  description: "Convert PNG images to smaller JPG files locally in your browser.",
  longDescription:
    "PNG is great for screenshots, UI exports, and transparent artwork. JPG is usually smaller and easier to share in email, CMS uploads, and social platforms. PixWarp converts PNG to JPG with Canvas in your browser, so the source image stays on your device.",
  howToUse: [
    "Drop one or more PNG images into the upload area.",
    "Adjust JPG quality if you want a smaller output.",
    "PixWarp draws each image on Canvas and exports JPG locally.",
    "Download each converted JPG file.",
  ],
  outputDetails: [
    "Transparent PNG areas are flattened onto a white background for JPG output.",
    "Lower quality creates smaller files but can add compression artifacts.",
    "No source image is uploaded to a server.",
  ],
  keywords: ["png to jpg", "png to jpeg", "convert png to jpg", "PNG 转 JPG", "图片转换"],
  icon: "image",
  related: ["jpg-to-png", "png-to-webp", "image-compressor"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "What happens to transparency?",
      a: "JPG does not support transparency, so PixWarp fills transparent areas with white.",
    },
    {
      q: "Are my PNG files uploaded?",
      a: "No. Conversion runs with browser image decoding and Canvas export on your device.",
    },
  ],
  lastUpdated: "2026-05-11",
  Component: PngToJpgUI,
}
