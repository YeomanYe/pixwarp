import type { ComponentType } from "react"

export type FormatCategory =
  | "image"
  | "video"
  | "audio"
  | "document"
  | "data"
  | "archive"
  | "font"
  | "3d"

export interface FormatComparison {
  /** Other format slug or display name */
  vs: string
  /** Average size relative to this format (e.g., "2.0x" means JPG is 2x bigger) */
  sizeRatio: string
  /** Quality verdict */
  quality: string
  /** One-line trade-off */
  note: string
}

export interface FormatSupport {
  os: string[]
  browsers: string[]
  apps: string[]
}

export interface FormatManifest {
  slug: string
  category: FormatCategory
  /** Display name (e.g. "HEIC") */
  name: string
  /** Full name (e.g. "High Efficiency Image Container") */
  fullName: string
  /** Year first released / standardized */
  year: number
  /** Common file extensions (without dot) */
  extensions: string[]
  /** MIME types */
  mimeTypes: string[]
  /** Underlying standard / parent spec */
  standard: string
  /** One-line definition */
  tagline: string
  /** Long-form description */
  description: string
  /** Pros list */
  pros: string[]
  /** Cons list */
  cons: string[]
  /** Comparison with related formats */
  comparison: FormatComparison[]
  /** Support matrix */
  support: FormatSupport
  /** SEO keywords */
  keywords: string[]
  /** Related tools (slug) */
  relatedTools?: string[]
  /** Related formats (slug) */
  relatedFormats?: string[]
  /** FAQ */
  faq?: { q: string; a: string }[]
  /** Last updated ISO date */
  lastUpdated?: string
  /** Optional custom interactive component (e.g. demo / compare widget) */
  Component?: ComponentType
}
