import type { ComponentType } from "react"

export type ToolCategory =
  | "video"
  | "image"
  | "screenshot"
  | "svg"
  | "creator"
  | "audio"
  | "pdf"
  | "qr"
  | "utility"

export interface ToolManifest {
  /** Unique slug — used in URL `/tools/[slug]` */
  slug: string

  /** Sub-vertical, drives cross-link grouping + accent color */
  category: ToolCategory

  /** Display name */
  name: string

  /** One-line description for SEO + cards */
  description: string

  /** Long-form description for tool page hero (supports markdown-lite) */
  longDescription?: string

  /** SEO keywords array — first one is primary */
  keywords: string[]

  /** Lucide icon name for the tool card */
  icon?: string

  /** Slugs of related tools (for "Related Tools" cross-link section) */
  related?: string[]

  /** Markets this tool is shown in. Defaults to ['global']. */
  markets?: ("global" | "cn")[]

  /** FAQ entries — each one becomes long-tail SEO content */
  faq?: { q: string; a: string }[]

  /** When was this tool last meaningfully updated (ISO date) */
  lastUpdated?: string

  /** Component that renders the tool's working UI */
  Component: ComponentType
}
