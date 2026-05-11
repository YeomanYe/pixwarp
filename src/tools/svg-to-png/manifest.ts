import type { ToolManifest } from "../types"
import { SvgToPngUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "svg-to-png",
  category: "svg",
  name: "SVG to PNG Converter",
  description: "Render SVG files to PNG locally in your browser.",
  longDescription:
    "SVG is perfect for scalable icons and logos, but many platforms still ask for PNG uploads. PixWarp renders SVG files with the browser image engine and exports PNG through Canvas without uploading the source vector.",
  howToUse: [
    "Drop one or more SVG files.",
    "PixWarp renders each SVG locally in the browser.",
    "Preview the generated PNG output.",
    "Download each PNG file.",
  ],
  outputDetails: [
    "PNG dimensions follow the SVG's intrinsic width and height when the browser can read them.",
    "Transparent SVG backgrounds remain transparent in PNG output.",
    "External fonts or remote images inside an SVG may not render if the browser blocks them.",
  ],
  keywords: ["svg to png", "convert svg to png", "svg png converter", "SVG 转 PNG", "SVG 转图片"],
  icon: "image",
  related: ["svg-optimizer", "png-to-webp", "favicon-generator"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "Are SVG files uploaded?",
      a: "No. SVG rendering and PNG export happen in your browser.",
    },
    {
      q: "Why does my font look different?",
      a: "The browser can only render fonts available in the current page or embedded in the SVG.",
    },
  ],
  lastUpdated: "2026-05-11",
  Component: SvgToPngUI,
}
