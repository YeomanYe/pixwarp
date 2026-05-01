import type { FormatManifest } from "../types"

export const manifest: FormatManifest = {
  slug: "webp",
  category: "image",
  name: "WebP",
  fullName: "Web Picture format",
  year: 2010,
  extensions: ["webp"],
  mimeTypes: ["image/webp"],
  standard: "Google open format — VP8 (lossy) / WebP lossless / WebP animation",
  tagline:
    "Google's open image format for the web — typically 25-35% smaller than JPG at the same visual quality, with optional transparency and animation.",
  description: `WebP is an image format Google released in 2010, derived from the VP8 video codec. It supports three modes in one container:

- **Lossy** — like JPG, but smaller (~25-35% on average) at the same perceived quality.
- **Lossless** — like PNG, but ~26% smaller on average. Keeps the alpha channel.
- **Animation** — like GIF, but full color and a fraction of the size.

That single-format flexibility is the killer feature: a designer can deliver one .webp asset that replaces a JPG, a PNG, *or* an animated GIF depending on the source. Browser support is now universal — all modern browsers including Safari (14+, mid-2020) decode WebP natively.

The friction left in real workflows: legacy CMSes and image editors are still catching up. Photoshop got native WebP support in 23.2 (2022); macOS Preview got it in macOS 11. If you hit a tool that can't open a .webp, the fastest fix is to convert to JPG or PNG.`,
  pros: [
    "25-35% smaller than JPG at the same visual quality (lossy)",
    "~26% smaller than PNG at the same content (lossless)",
    "Supports transparency in BOTH lossy and lossless modes (JPG can't)",
    "Supports animation — full color, way smaller than GIF",
    "Royalty-free open format from Google",
    "Native support across all modern browsers (Safari 14+)",
  ],
  cons: [
    "Older Safari (< 14, before mid-2020) can't decode",
    "Some legacy CMS / upload forms still reject .webp",
    "Older image editors need plugins or won't open it at all",
    "Most email clients don't render WebP — fall back to JPG/PNG for embedded images",
    "Print workflows still expect JPG/TIFF — WebP is web-first",
  ],
  comparison: [
    {
      vs: "JPG",
      sizeRatio: "JPG ≈ 1.3-1.5x larger",
      quality: "Equal at typical settings",
      note: "JPG is universally supported (every tool ever made). WebP is smaller and supports transparency. Use JPG for email and legacy upload forms; use WebP for everything web.",
    },
    {
      vs: "PNG",
      sizeRatio: "PNG ≈ 1.3x larger (lossless WebP)",
      quality: "Equal — both lossless",
      note: "PNG is the safe choice for screenshots, logos, and assets needing pixel-perfect transparency. WebP lossless is a smaller drop-in if your tooling supports it.",
    },
    {
      vs: "AVIF",
      sizeRatio: "AVIF ≈ 0.7x (smaller)",
      quality: "AVIF slightly better at low bitrates",
      note: "AVIF is the modern successor — even smaller files, better at very low bitrates. WebP wins on compatibility today; AVIF wins on compression. Many sites ship both with <picture>.",
    },
    {
      vs: "HEIC",
      sizeRatio: "Roughly equal",
      quality: "Equal at typical settings",
      note: "HEIC dominates Apple's photo pipeline; WebP dominates the web. They're peers technically — WebP wins on browser support, HEIC wins on iOS/macOS native integration.",
    },
    {
      vs: "GIF",
      sizeRatio: "GIF ≈ 5-20x larger (animation)",
      quality: "GIF is 256 colors; WebP is full color",
      note: "For animation, WebP is a strict upgrade — full color, alpha, way smaller. GIF still wins on universal email / Slack support.",
    },
  ],
  support: {
    os: [
      "macOS 11+ ✅ (Big Sur, native Preview support)",
      "iOS 14+ ✅ (Safari, Photos)",
      "Windows 10+ ✅ (native, Edge / Chrome)",
      "Android 4.0+ ✅",
      "Linux ✅ (libwebp universal)",
    ],
    browsers: [
      "Chrome ✅",
      "Firefox ✅ (since 65)",
      "Edge ✅",
      "Safari 14+ ✅",
      "Safari < 14 ❌",
      "IE 11 ❌",
    ],
    apps: [
      "Photoshop 23.2+ ✅ (native, prior versions need plugin)",
      "Figma ✅",
      "Sketch ✅",
      "Affinity Photo ✅",
      "macOS Preview ✅ (Big Sur+)",
      "Microsoft Office 2019+ ✅",
      "WordPress ✅ (native uploader since 5.8)",
    ],
  },
  keywords: [
    "webp format",
    "what is webp",
    "webp vs jpg",
    "webp vs png",
    "webp vs avif",
    "convert webp to jpg",
    "webp file format",
    "google webp",
    "webp 格式",
    "webp 是什么",
  ],
  relatedTools: ["image-compressor", "heic-to-jpg"],
  relatedFormats: ["heic"],
  faq: [
    {
      q: "Why is WebP smaller than JPG at the same quality?",
      a: 'WebP uses block-based prediction (inherited from the VP8 video codec) before applying transform coding. JPG uses simpler 8x8 DCT blocks with no prediction. Prediction means WebP can describe most blocks as "like the neighbor with these tweaks" instead of encoding from scratch — fewer bits per block.',
    },
    {
      q: "Can I open a .webp file in Photoshop?",
      a: "Yes if you're on Photoshop 23.2 (2022) or newer — native support. Older versions need the WebPShop plugin from Google.",
    },
    {
      q: "Is WebP fully supported in Safari now?",
      a: "Yes since Safari 14 (released September 2020). Older Safari (and any iOS device older than iOS 14) cannot decode WebP — fall back to JPG/PNG with the <picture> element if you need legacy support.",
    },
    {
      q: "Should I switch from JPG to WebP for my site?",
      a: "Almost always yes for hero images, gallery thumbnails, and anything not destined for email. Use the <picture> element with a JPG fallback for the long tail of older browsers. For sites that don't care about Safari < 14, just use WebP directly.",
    },
    {
      q: "WebP or AVIF — which should I pick?",
      a: 'Today: ship both with <picture><source type="image/avif"><source type="image/webp"><img src="fallback.jpg">. AVIF gives the best compression where supported (modern Chrome / Firefox / Safari 16.4+); WebP catches everything since 2020; JPG is the final safety net.',
    },
  ],
  lastUpdated: "2026-05-01",
}
