import type { ToolManifest } from "../types"
import { FaviconGeneratorUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "favicon-generator",
  category: "image",
  name: "Favicon Generator",
  description: "Generate favicon.ico and common PNG app icon sizes locally from one source image.",
  longDescription:
    "A website usually needs more than one icon size: favicon.ico for browser tabs, PNG icons for app manifests, and an Apple touch icon for iOS. PixWarp renders the common set from one image in your browser without uploading your logo.",
  howToUse: [
    "Drop a square logo, icon, or SVG file.",
    "PixWarp renders favicon.ico plus PNG icon sizes locally.",
    "Preview the generated file list.",
    "Download the assets you need.",
  ],
  outputDetails: [
    "Generates favicon.ico, 16x16, 32x32, 48x48, 180x180, 192x192, and 512x512 PNG assets.",
    "Artwork is fit inside each square icon while keeping the original aspect ratio.",
    "Transparent source images keep transparent backgrounds when exported as PNG.",
  ],
  keywords: [
    "favicon generator",
    "png to ico",
    "generate favicon",
    "favicon ico generator",
    "网站图标生成",
  ],
  icon: "image",
  related: ["svg-to-png", "png-to-jpg", "image-resize"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "Does this create a real .ico file?",
      a: "Yes. PixWarp builds favicon.ico with multiple PNG-backed icon sizes inside the ICO container.",
    },
    {
      q: "Should the source image be square?",
      a: "Square source artwork gives the cleanest favicon. Non-square artwork is fit inside the icon canvas.",
    },
  ],
  lastUpdated: "2026-05-11",
  Component: FaviconGeneratorUI,
}
