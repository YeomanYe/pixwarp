import type { ToolManifest } from "../types"
import { TweetToImageUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "tweet-to-image",
  category: "creator",
  name: "Tweet to Image",
  description:
    "Turn any tweet (X post) into a clean, shareable PNG. Customize avatar, name, handle, content, likes & retweets — exported locally.",
  longDescription: `Quoting a tweet in a blog post, slide deck, or LinkedIn carousel? A native screenshot looks low-rent — Twitter UI chrome, dark mode mismatch, low-res. This tool builds a clean tweet card you fully control: handle, avatar, content, engagement counts, theme.

Everything renders client-side. Your tweet content never touches our server.`,
  keywords: [
    "tweet to image",
    "x post to image",
    "tweet screenshot generator",
    "twitter card generator",
    "quote tweet image",
    "tweet png",
    "tweet to png",
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
  Component: TweetToImageUI,
}
