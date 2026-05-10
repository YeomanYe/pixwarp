import type { FormatManifest } from "../types"
import { SvgSamplesWidget } from "./ui"

export const manifest: FormatManifest = {
  slug: "svg",
  category: "image",
  name: "SVG",
  fullName: "Scalable Vector Graphics",
  year: 2001,
  extensions: ["svg"],
  mimeTypes: ["image/svg+xml"],
  standard: "W3C SVG",
  tagline: "A text-based vector image format for icons, diagrams, logos, and scalable artwork.",
  description: `SVG describes graphics as XML: paths, shapes, gradients, text, filters, and metadata instead of pixels. That makes it ideal for icons, logos, diagrams, and maps that must stay sharp at any size.

SVG is powerful because it is both an image and a document. That also means untrusted SVG can contain scripts, external references, and complex filters. Production workflows should optimize and sanitize SVG before publishing.`,
  pros: [
    "Scales without pixelation",
    "Great for icons, logos, diagrams, and maps",
    "Can be styled, compressed, and inspected as text",
    "Browser-native and usually tiny for simple artwork",
  ],
  cons: [
    "Bad fit for photos",
    "Complex SVGs can be huge and slow",
    "Untrusted SVG needs sanitizing before use",
    "Fonts and filters may render differently between apps",
  ],
  comparison: [],
  support: {
    os: ["macOS ✅", "Windows ✅", "Linux ✅", "iOS ✅", "Android ✅"],
    browsers: ["Chrome ✅", "Firefox ✅", "Edge ✅", "Safari ✅"],
    apps: ["Figma ✅", "Illustrator ✅", "Inkscape ✅", "Sketch ✅", "Most CMS uploaders ⚠️"],
  },
  keywords: ["svg format", "what is svg", "svg file", "svg optimizer", "svg 格式"],
  relatedTools: ["svg-optimizer"],
  relatedFormats: ["webp", "avif"],
  faq: [
    {
      q: "Is SVG an image or code?",
      a: "Both. SVG is an XML document that browsers render as an image, which is why SVG is easy to edit but should be sanitized when it comes from untrusted sources.",
    },
    {
      q: "Should I use SVG for photos?",
      a: "No. Use raster formats such as AVIF, WebP, JPG, or PNG for photos. SVG is best for shapes, icons, diagrams, and maps.",
    },
  ],
  lastUpdated: "2026-05-10",
  Component: SvgSamplesWidget,
}
