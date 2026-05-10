import type { FormatManifest } from "../types"
import { AvifSamplesWidget } from "./ui"

export const manifest: FormatManifest = {
  slug: "avif",
  category: "image",
  name: "AVIF",
  fullName: "AV1 Image File Format",
  year: 2019,
  extensions: ["avif"],
  mimeTypes: ["image/avif"],
  standard: "AV1 still image in the HEIF container",
  tagline:
    "A modern web image format based on AV1, built for very small photo files, HDR, transparency, and animation.",
  description: `AVIF stores still images with the AV1 codec inside an ISO-based image container. It is most useful for web photos where file size matters and the audience uses modern browsers.

AVIF can carry lossy photos, lossless images, transparency, HDR color, and even image sequences. The trade-off is tooling: browser support is now strong, but many older editors, CMS uploaders, and email clients still expect JPG, PNG, or WebP.`,
  pros: [
    "Excellent compression for photos and web artwork",
    "Supports alpha transparency",
    "Supports HDR and wide color workflows",
    "Royalty-free AV1 codec family",
    "Native support in modern Chrome, Firefox, Edge, and Safari",
  ],
  cons: [
    "Older browsers and image editors may not open it",
    "Encoding is slower than JPG or WebP",
    "Some CMS and social upload forms still reject .avif",
    "Not a safe choice for email attachments or print workflows",
  ],
  comparison: [],
  support: {
    os: ["macOS 13+ ✅", "iOS 16+ ✅", "Windows 10/11 ✅ via modern browsers", "Linux ✅"],
    browsers: ["Chrome ✅", "Firefox ✅", "Edge ✅", "Safari 16.4+ ✅", "IE 11 ❌"],
    apps: [
      "Figma ✅",
      "Photoshop ✅ newer versions",
      "ImageMagick ✅",
      "Squoosh ✅",
      "Older CMS uploaders ⚠️",
    ],
  },
  keywords: ["avif format", "what is avif", "avif file", "avif image", "avif 格式"],
  relatedTools: ["image-compressor"],
  relatedFormats: ["webp", "heic"],
  faq: [
    {
      q: "Why do websites use AVIF?",
      a: "AVIF often produces smaller image files than JPG or WebP at similar visual quality, especially for photographic images.",
    },
    {
      q: "Can I use AVIF everywhere?",
      a: "Use it on modern websites, but keep JPG, PNG, or WebP alternatives for older software, email, and upload forms.",
    },
  ],
  lastUpdated: "2026-05-10",
  Component: AvifSamplesWidget,
}
