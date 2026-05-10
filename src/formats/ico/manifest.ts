import type { FormatManifest } from "../types"
import { IcoSamplesWidget } from "./ui"

export const manifest: FormatManifest = {
  slug: "ico",
  category: "image",
  name: "ICO",
  fullName: "Microsoft Icon",
  year: 1985,
  extensions: ["ico"],
  mimeTypes: ["image/x-icon", "image/vnd.microsoft.icon"],
  standard: "Microsoft Windows icon container",
  tagline: "A multi-size icon container used for favicons, Windows shortcuts, and desktop apps.",
  description: `ICO is not just a single bitmap. It is a container that can hold multiple icon images at different sizes and bit depths, often including PNG-compressed entries for larger icons.

That is why favicons still commonly use .ico: one file can include 16 px, 32 px, 48 px, and 256 px versions, letting browsers and operating systems choose the right representation.`,
  pros: [
    "Can store multiple icon sizes in one file",
    "Still widely supported for browser favicons",
    "Works well for Windows desktop shortcuts",
    "Can contain PNG-compressed high-resolution icon entries",
  ],
  cons: [
    "Awkward to edit compared with PNG or SVG",
    "Not useful for photos or regular web images",
    "Metadata and embedded sizes are not obvious from the extension",
    "Modern app icon workflows often prefer SVG or PNG source assets",
  ],
  comparison: [],
  support: {
    os: ["Windows ✅", "macOS ✅ for preview/use", "Linux ✅"],
    browsers: ["Chrome ✅", "Firefox ✅", "Edge ✅", "Safari ✅"],
    apps: ["Windows Explorer ✅", "Browser favicon loaders ✅", "Figma ⚠️", "ImageMagick ✅"],
  },
  keywords: ["ico format", "ico file", "favicon ico", "windows icon file", "ico 格式"],
  relatedTools: ["svg-optimizer"],
  relatedFormats: ["svg"],
  faq: [
    {
      q: "Why does one ICO file contain multiple sizes?",
      a: "Operating systems and browsers need icons at different scales. ICO stores several images in one file so the viewer can pick the best size.",
    },
    {
      q: "Should I use ICO or SVG for a favicon?",
      a: "Use ICO when you need broad legacy favicon compatibility. Use SVG or PNG alongside it for modern browsers and high-density displays.",
    },
  ],
  lastUpdated: "2026-05-10",
  Component: IcoSamplesWidget,
}
