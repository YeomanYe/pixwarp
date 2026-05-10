import type { FormatManifest } from "../types"
import { TiffSamplesWidget } from "./ui"

export const manifest: FormatManifest = {
  slug: "tiff",
  category: "image",
  name: "TIFF",
  fullName: "Tagged Image File Format",
  year: 1986,
  extensions: ["tif", "tiff"],
  mimeTypes: ["image/tiff"],
  standard: "Adobe TIFF 6.0",
  tagline:
    "A flexible high-quality raster image format used for scanning, archiving, photography, and print workflows.",
  description: `TIFF is an older but still important raster image container. It can store uncompressed image data, lossless compression, high bit depth, multiple pages, metadata, and color profiles.

The reason TIFF remains common is reliability in professional workflows. The reason it is painful on the web is the same flexibility: files are often large, browsers rarely render them directly, and many TIFF variants require specialized software.`,
  pros: [
    "Excellent for scans, archives, and print handoff",
    "Supports lossless storage and high bit depth",
    "Can store multiple pages and metadata",
    "Widely supported by professional imaging tools",
  ],
  cons: [
    "Large files compared with web formats",
    "Browsers usually cannot display TIFF directly",
    "Many variants exist, so compatibility can be uneven",
    "Not a practical format for normal websites",
  ],
  comparison: [],
  support: {
    os: ["macOS Preview ✅", "Windows Photos ⚠️", "Linux image viewers ✅"],
    browsers: ["Chrome ❌", "Firefox ❌", "Edge ❌", "Safari ⚠️"],
    apps: ["Photoshop ✅", "Affinity Photo ✅", "GIMP ✅", "ImageMagick ✅", "Preview ✅"],
  },
  keywords: ["tiff format", "tif file", "what is tiff", "open tiff", "tiff 格式"],
  relatedTools: ["images-to-pdf", "image-compressor"],
  relatedFormats: ["avif", "webp"],
  faq: [
    {
      q: "Why will TIFF not open in my browser?",
      a: "TIFF has many encoding variants and is not a web delivery format, so Chrome, Firefox, and Edge usually do not render it directly.",
    },
    {
      q: "When should I use TIFF?",
      a: "Use TIFF for scanning, archiving, print handoff, or professional editing. Convert to JPG, PNG, WebP, or AVIF for websites.",
    },
  ],
  lastUpdated: "2026-05-10",
  Component: TiffSamplesWidget,
}
