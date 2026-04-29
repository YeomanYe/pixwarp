import type { ToolManifest } from "../types"
import { TweetMockupUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "tweet-mockup",
  category: "creator",
  name: "Tweet Mockup",
  description:
    "Compose a clean, shareable tweet card — set avatar, name, handle, content, likes & retweets — and export as PNG. All local.",
  longDescription: `Need a tweet-shaped graphic for a blog hero, slide, or carousel? A native screenshot looks low-rent — Twitter UI chrome, dark mode mismatch, low-res. This tool builds a clean tweet mockup you fully control: handle, avatar, content, engagement counts, theme.

Everything renders client-side. Your content never touches our server.`,
  keywords: [
    "tweet mockup",
    "tweet mockup generator",
    "tweet to image",
    "x post to image",
    "tweet screenshot generator",
    "twitter card generator",
    "fake tweet generator",
    "tweet png",
  ],
  icon: "twitter",
  related: ["screenshot-mockup", "social-cover"],
  markets: ["global", "cn"],
  pro: { enabled: false, locked: [] },
  faq: [
    {
      q: "Do I need a real tweet URL?",
      a: "No. This is a manual composer — paste any text and customize the metadata. No Twitter / X API calls, no rate limits.",
    },
    {
      q: "Can I match dark mode?",
      a: "Yes. Switch theme in the controls. Output PNG matches whatever theme you pick.",
    },
    {
      q: "Does this verify the tweet is real?",
      a: "No. It's a presentational tool. Use real tweets only — fabricating someone else's tweet is dishonest and may be defamation.",
    },
  ],
  lastUpdated: "2026-04-29",
  Component: TweetMockupUI,
}
