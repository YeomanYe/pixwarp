import type { ToolManifest } from "../types"
import { JpgToPngUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "jpg-to-png",
  category: "image",
  name: "JPG to PNG Converter",
  description: "Convert JPG and JPEG images to PNG locally in your browser.",
  longDescription:
    "JPG is compact for photos, but PNG is often easier for design tools, UI assets, and lossless editing. PixWarp decodes the JPG in your browser and exports a PNG without sending the file away.",
  howToUse: [
    "Drop one or more JPG or JPEG images.",
    "PixWarp decodes each image locally.",
    "Preview the generated PNG output.",
    "Download each PNG file.",
  ],
  outputDetails: [
    "PNG output is lossless, so it may be larger than the original JPG.",
    "The conversion does not recreate transparency because JPG does not contain alpha data.",
    "Runs locally with browser Canvas APIs.",
  ],
  keywords: ["jpg to png", "jpeg to png", "convert jpg to png", "JPG 转 PNG", "JPEG 转 PNG"],
  icon: "image",
  related: ["png-to-jpg", "jpg-to-webp", "image-resize"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "Why is the PNG bigger than the JPG?",
      a: "PNG keeps pixels lossless. JPG is a lossy photo format designed for smaller files.",
    },
    {
      q: "Does this add transparency?",
      a: "No. JPG files do not include transparency, so the PNG keeps the visible pixels from the source image.",
    },
  ],
  lastUpdated: "2026-05-11",
  Component: JpgToPngUI,
}
