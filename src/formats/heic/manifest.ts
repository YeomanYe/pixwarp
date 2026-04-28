import type { FormatManifest } from "../types"
import { HeicCompareWidget } from "./ui"

// HeicCompareWidget is now a server-rendered static demo (no client interactivity).

export const manifest: FormatManifest = {
  slug: "heic",
  category: "image",
  name: "HEIC",
  fullName: "High Efficiency Image Container",
  year: 2017,
  extensions: ["heic", "heif"],
  mimeTypes: ["image/heic", "image/heif"],
  standard: "ISO/IEC 23008-12 (HEIF) — uses HEVC (H.265) codec",
  tagline:
    "Apple's default photo format on iOS — half the file size of JPEG at the same visual quality.",
  description: `HEIC stands for **High Efficiency Image Container** — it's Apple's name for files that follow the HEIF (High Efficiency Image File Format) standard. Apple started using it as the default for iPhone photos in iOS 11 (released in 2017). Since then, every modern iPhone takes HEIC photos by default.

The big win: **HEIC files are about half the size of JPEG**, while keeping the same visual quality. The math: a 4 MB JPEG photo becomes a 2 MB HEIC photo with no visible difference.

The catch: many tools, websites, and Windows / Linux apps still don't read HEIC natively. That's why "HEIC to JPG converter" is one of the most-searched image conversion queries on Google.`,
  pros: [
    "About 50% smaller files than JPEG at the same quality",
    "Supports 16-bit color depth (vs JPEG's 8-bit)",
    "Stores image sequences (Live Photos / bursts) as one file",
    "Stores transparency (alpha channel)",
    "Supports image edits + original together (non-destructive)",
    "Embeds depth maps from iPhone Portrait mode",
  ],
  cons: [
    "Patent-protected (HEVC codec) — tooling adoption is slow",
    "Most websites won't accept HEIC uploads",
    "Windows requires a paid extension to view",
    "Linux support varies by distro",
    "Some older social platforms strip HEIC silently",
  ],
  comparison: [
    {
      vs: "JPG",
      sizeRatio: "JPG ≈ 2.0x larger",
      quality: "Equal at typical settings",
      note: "JPG is universally supported but ages poorly. HEIC wins on size + features (depth, alpha, sequences).",
    },
    {
      vs: "PNG",
      sizeRatio: "PNG ≈ 4-8x larger",
      quality: "PNG is lossless, HEIC is lossy by default",
      note: "PNG for screenshots / graphics with text. HEIC for photos. Different use cases.",
    },
    {
      vs: "WebP",
      sizeRatio: "Roughly equal",
      quality: "Equal at typical settings",
      note: "WebP wins on browser support; HEIC wins on iOS / native macOS integration.",
    },
    {
      vs: "AVIF",
      sizeRatio: "AVIF ≈ 0.7x (smaller)",
      quality: "AVIF slightly better at low bitrates",
      note: "AVIF is the modern successor — better compression but slower to encode.",
    },
  ],
  support: {
    os: [
      "macOS Sierra+ (2017)",
      "iOS 11+ (2017)",
      "Windows 10/11 (with paid HEIF Extension)",
      "Android 9+ (limited)",
      "Linux (via libheif)",
    ],
    browsers: [
      "Safari ✅",
      "Chrome ❌ (decode only via JS libs)",
      "Firefox ❌",
      "Edge ❌ (needs Windows extension)",
    ],
    apps: [
      "Apple Photos / Preview ✅",
      "Adobe Photoshop (with plugin)",
      "Affinity Photo ✅",
      "GIMP (via plugin)",
      "Most online tools — needs conversion to JPG/PNG first",
    ],
  },
  keywords: [
    "heic file format",
    "what is heic",
    "heic vs jpg",
    "heic vs png",
    "heic file structure",
    "iPhone photo format",
    "HEVC image",
    "HEIC 是什么",
    "HEIC 文件格式",
  ],
  relatedTools: ["heic-to-jpg"],
  relatedFormats: [],
  faq: [
    {
      q: "Why is HEIC the default on iPhone?",
      a: "Apple adopted HEIC in iOS 11 (2017) because it cuts file size in half versus JPEG. Storage is the most user-visible cost on phones — smaller photos = more photos before running out of space.",
    },
    {
      q: "Will HEIC replace JPG?",
      a: "Probably not in the next 5 years. JPEG is too entrenched in legacy software. The successor most likely to win mainstream is AVIF, which has better compression and is patent-free.",
    },
    {
      q: "Does converting HEIC to JPG lose quality?",
      a: "Yes, slightly — both are lossy formats and recompressing always degrades a tiny amount. For typical iPhone photos the loss is invisible at 90%+ JPG quality. Use PNG if you need lossless.",
    },
    {
      q: "Can I open HEIC on Windows for free?",
      a: "Officially Microsoft sells a HEIF Image Extension for $0.99. Unofficially, free converters (like our /tools/heic-to-jpg) work without installing anything.",
    },
    {
      q: "Why don't websites accept HEIC uploads?",
      a: "HEVC (the codec inside HEIC) is patent-protected, and many web services don't pay the license fees. Plus older browsers don't decode HEIC, so most sites convert to JPG/PNG before storing.",
    },
    {
      q: "How does HEIC compare to AVIF?",
      a: "Both use modern codecs (HEIC uses HEVC, AVIF uses AV1). AVIF compresses ~30% better and is patent-free, which is why Chrome, Firefox, and most CDNs are pushing AVIF. AVIF will likely surpass HEIC outside Apple's ecosystem.",
    },
  ],
  lastUpdated: "2026-04-28",
  Component: HeicCompareWidget,
}
