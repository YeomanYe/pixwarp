import type { ToolManifest } from "../types"
import { PngToWebpUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "png-to-webp",
  category: "image",
  name: "PNG to WebP Converter",
  description: "Convert PNG images to WebP locally for smaller website and blog assets.",
  longDescription:
    "PNG is reliable but can be heavy for websites. WebP usually keeps image quality with smaller files and can preserve transparency. PixWarp converts PNG to WebP locally in your browser.",
  howToUse: [
    "Drop one or more PNG images.",
    "Choose a WebP quality level.",
    "Preview the WebP output and size change.",
    "Download the converted WebP files.",
  ],
  outputDetails: [
    "Transparent PNG images can remain transparent in WebP output.",
    "Quality controls size for WebP exports.",
    "The conversion uses browser Canvas and does not upload your source image.",
  ],
  keywords: ["png to webp", "convert png to webp", "png webp converter", "PNG 转 WebP"],
  icon: "image",
  related: ["jpg-to-webp", "webp-to-png", "image-compressor"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "Can WebP keep transparency?",
      a: "Yes. Modern browser WebP export supports alpha, so transparent PNG artwork can stay transparent.",
    },
    {
      q: "Why use WebP instead of PNG?",
      a: "WebP is usually smaller for websites while preserving enough quality for normal viewing.",
    },
  ],
  lastUpdated: "2026-05-11",
  Component: PngToWebpUI,
}
