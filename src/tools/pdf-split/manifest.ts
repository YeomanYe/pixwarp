import type { ToolManifest } from "../types"
import { PdfSplitUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "pdf-split",
  category: "pdf",
  name: "PDF Split",
  description:
    "Extract page ranges from a PDF or split it into individual pages — runs entirely in your browser.",
  longDescription: `Drop a single PDF, then either type page ranges (e.g. \`1-3, 5, 8-10\`) to extract specific sections, or split the document into one PDF per page. Everything runs in your browser via pdf-lib — your file never leaves your device.

Common cases: pull one chapter out of a long report, extract a single signed page, break a 200-page scan into individual pages for filing.`,
  keywords: [
    "pdf split",
    "split pdf online",
    "extract pdf pages",
    "pdf splitter",
    "pdf split no upload",
    "pdf 拆分",
    "pdf 提取页面",
  ],
  icon: "scissors",
  related: ["pdf-merge", "pdf-compress"],
  markets: ["global"],
  faq: [
    {
      q: "Does my PDF get uploaded?",
      a: "No. Splitting happens entirely in your browser via pdf-lib. Your file never leaves your device.",
    },
    {
      q: "What does the page-range syntax look like?",
      a: 'Comma-separated. Ranges use a dash. Examples: "1" (just page 1), "1-3" (pages 1, 2, 3), "1-3, 5, 8-10" (three separate output PDFs). Pages are 1-indexed.',
    },
    {
      q: "What's the difference between ranges and per-page split?",
      a: "Ranges produce one PDF per range, named by the range. Per-page split produces one PDF per single page, useful when you need every page as its own file.",
    },
    {
      q: "What if I need a single ZIP of all the outputs?",
      a: "v1 lists each output PDF for individual download. ZIP packaging would require an extra library — let us know if you want it.",
    },
  ],
  lastUpdated: "2026-05-01",
  Component: PdfSplitUI,
}
