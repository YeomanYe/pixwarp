import type { ToolManifest } from "../types"
import { SocialCoverUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "social-cover",
  category: "creator",
  name: "Social Media Cover Generator",
  description:
    "Generate a polished cover image for blog posts, X posts, RedNote, or OG images — pick aspect ratio, type your title, download.",
  longDescription: `Writing a blog post or thread, but the cover image is "draft me an asset in Figma" away from being done? Generate one in 30 seconds. Pick aspect ratio (3:4 for RedNote, 9:16 for Stories, 16:9 for OG / blog hero), type your title and subtitle, choose a gradient — done.

Renders fully in your browser. The exported PNG is high-resolution (2x) and ready to upload.`,
  keywords: [
    "social media cover generator",
    "og image generator",
    "blog hero generator",
    "rednote cover",
    "xiaohongshu cover",
    "twitter card image",
    "thread cover",
    "instagram story cover",
  ],
  icon: "image",
  related: ["screenshot-mockup", "tweet-mockup"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "What aspect ratios are supported?",
      a: "3:4 (RedNote / Pinterest), 9:16 (Instagram / TikTok Stories), 16:9 (blog hero / OG image / YouTube thumbnail).",
    },
    {
      q: "Can I upload a custom background?",
      a: "Not yet — current MVP uses curated gradients. If you have a strong use case, open a GitHub issue.",
    },
    {
      q: "What resolution is the export?",
      a: "All exports are at 2x pixel ratio. 16:9 outputs at 2400×1350, 3:4 at 1500×2000, 9:16 at 1350×2400.",
    },
  ],
  lastUpdated: "2026-04-29",
  Component: SocialCoverUI,
}
