import type { ToolManifest } from "../types"
import { PdfCompressUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "pdf-compress",
  category: "pdf",
  name: "PDF Compress",
  description:
    "Shrink PDFs by re-rendering each page as a JPG inside a fresh PDF — runs entirely in your browser.",
  longDescription: `Drop a PDF, pick a quality and DPI, and the tool renders every page with PDF.js, re-encodes it as a JPG, and rebuilds a new PDF with pdf-lib — all in your browser. No upload, no signup.

Best for image-heavy or scanned PDFs, where compression delivers real savings (often 50-80% smaller). Vector-text-only PDFs may not shrink much because the rasterized JPGs still carry the same pixel area as the original vector strokes.`,
  keywords: [
    "pdf compress",
    "compress pdf online",
    "shrink pdf",
    "pdf size reducer",
    "pdf compress no upload",
    "pdf 压缩",
    "在线压缩 pdf",
  ],
  icon: "file-archive",
  related: ["pdf-merge", "pdf-split"],
  markets: ["global"],
  faq: [
    {
      q: "Does my PDF get uploaded?",
      a: "No. Compression happens entirely in your browser. Your file never leaves your device.",
    },
    {
      q: "Why is my text now an image?",
      a: "v1 compression rasterizes each page — vector text becomes a JPG. You lose copy-paste, search, and accessibility from the original. The trade-off is real, often-large size reduction. If you need to keep selectable text, don't compress aggressively or skip this tool.",
    },
    {
      q: "Which DPI and quality should I pick?",
      a: "150 DPI + quality 75 is a good baseline — looks fine on screen and in most prints. For screen-only viewing, 120 DPI + quality 65 typically halves the file size again. For print-quality output, use 200+ DPI and quality 85+.",
    },
    {
      q: "What if the output is bigger than the original?",
      a: "Some PDFs (mostly vector, already optimized) get bigger when rasterized. The tool shows you the before/after — if it's bigger, just keep the original.",
    },
  ],
  lastUpdated: "2026-05-01",
  Component: PdfCompressUI,
}
