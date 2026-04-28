import type { ToolManifest } from "../types"
import { ScreenshotMockupUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "screenshot-mockup",
  category: "screenshot",
  name: "Screenshot Mockup Generator",
  description:
    "Drop any screenshot, get a beautiful version with browser frame, gradient background, and shadow. All rendered locally — never uploaded.",
  longDescription: `Plain screenshots look amateur. A screenshot wrapped in a browser frame, sitting on a colorful gradient background with a soft drop shadow, looks shipped. Use this to dress up your blog hero images, X / Twitter posts, OG images, and product launch announcements.

Everything renders in your browser — your image never leaves your device.`,
  keywords: [
    "screenshot mockup",
    "pretty screenshot",
    "browser frame screenshot",
    "screenshot to image online",
    "og image generator",
    "blog hero image",
    "twitter screenshot",
  ],
  icon: "image",
  related: ["heic-to-jpg"],
  markets: ["global", "cn"],
  pro: { enabled: false, locked: [] },
  faq: [
    {
      q: "Does my screenshot get uploaded?",
      a: "No. The whole pipeline (load image, compose canvas, export PNG) runs in your browser. There is no server.",
    },
    {
      q: "What output resolution?",
      a: "PNG at the size you set. Output retina (2x) is recommended for crisp Twitter / blog uploads.",
    },
    {
      q: "Can I add my own logo / watermark?",
      a: "Pro feature — coming soon. For now you can compose the screenshot first, then add branding in your editor of choice.",
    },
  ],
  lastUpdated: "2026-04-29",
  Component: ScreenshotMockupUI,
}
