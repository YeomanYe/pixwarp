import type { ToolManifest } from "../types"
import { PdfMergeUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "pdf-merge",
  category: "pdf",
  name: "PDF Merge",
  description:
    "Combine multiple PDFs into a single file — reorder freely, runs entirely in your browser.",
  longDescription: `Drop two or more PDFs, reorder them with up / down buttons, and download a single merged PDF. The merge runs entirely in your browser using pdf-lib — your documents never leave your device.

Common cases: combine scanned pages into one report, stitch chapters into a single ebook, batch contracts into one signing pack.`,
  keywords: [
    "pdf merge",
    "merge pdf online",
    "combine pdf",
    "pdf joiner",
    "pdf merger no upload",
    "pdf 合并",
    "在线合并 pdf",
  ],
  icon: "file-stack",
  related: ["pdf-split", "pdf-compress"],
  markets: ["global"],
  faq: [
    {
      q: "Does my PDF get uploaded?",
      a: "No. Merging happens entirely in your browser using pdf-lib. Your files never leave your device.",
    },
    {
      q: "How many PDFs can I merge at once?",
      a: "There's no hard limit, but very large totals (>500MB combined) may run into browser memory limits.",
    },
    {
      q: "Are bookmarks, links, and form fields preserved?",
      a: "Page content (text, images, vector graphics) is preserved exactly. Document-level metadata (outlines, named destinations) and form fields can be partially preserved depending on the source PDFs.",
    },
    {
      q: "Can I reorder pages within a PDF, not just merge whole files?",
      a: "v1 merges whole files in the order you list them. For per-page reordering or extraction, use the PDF Split tool to break a PDF into individual pages first, then re-merge.",
    },
  ],
  lastUpdated: "2026-05-01",
  Component: PdfMergeUI,
}
