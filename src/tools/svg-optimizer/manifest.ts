import type { ToolManifest } from "../types"
import { SvgOptimizerUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "svg-optimizer",
  category: "svg",
  name: "SVG Optimizer",
  nameZh: "SVG 优化器",
  description: "Clean SVG markup by removing comments, metadata, scripts, and excess whitespace.",
  descriptionZh: "清理 SVG 标记，移除注释、元数据、脚本和多余空白。",
  longDescription:
    "A lightweight local SVG cleaner for quick sharing and embedding. It does not upload SVG code.",
  howToUse: ["Paste or drop SVG text.", "Review the optimized size.", "Download the cleaned SVG."],
  outputDetails: [
    "Removes comments, metadata blocks, script tags, and extra whitespace.",
    "Keeps SVG geometry intact.",
    "Runs as text processing in your browser.",
  ],
  keywords: ["svg optimizer", "minify svg", "clean svg", "SVG 压缩", "SVG 优化"],
  related: ["social-cover", "screenshot-mockup"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "Is this a full SVGO replacement?",
      a: "No. It is a safe lightweight cleaner for common whitespace and metadata bloat.",
    },
  ],
  lastUpdated: "2026-05-09",
  Component: SvgOptimizerUI,
}
