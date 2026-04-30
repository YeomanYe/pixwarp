import type { ToolManifest } from "../types"
import { Mp4ToGifUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "mp4-to-gif",
  category: "video",
  name: "MP4 to GIF Converter",
  description:
    "Drop a short MP4 or WebM, get a polished GIF in seconds. FPS, width, and palette all tunable, FFmpeg.wasm runs right in your browser.",
  longDescription: `Need a GIF for a README, a Slack reaction, a tweet? Online converters are free until your video has anything sensitive in it (it doesn't matter that they "promise" not to keep it — you can't audit them).

This tool runs a real FFmpeg compiled to WebAssembly inside your browser. The video is read from your disk into memory, processed locally, and the GIF is downloaded — never uploaded.

Best results: ≤ 10 seconds source clip, 480px wide, 12-15 fps. Larger sources still work but eat RAM.`,
  keywords: [
    "mp4 to gif",
    "video to gif",
    "mp4 to gif converter",
    "online gif maker",
    "ffmpeg wasm",
    "convert mp4 to gif local",
    "webm to gif",
  ],
  icon: "video",
  related: ["screenshot-mockup"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "What's the file size limit?",
      a: "Hard limit is your browser's memory. Practical limit: a 10-second 1080p MP4 (~20 MB) is fine. Bigger may stall.",
    },
    {
      q: "Why is the GIF bigger than the MP4?",
      a: "GIFs use a 256-color palette and lossless compression — they will be larger than equivalent MP4 / WebM. Trim the clip, lower fps, or reduce width to shrink.",
    },
    {
      q: "Does this upload my video?",
      a: "No. FFmpeg runs as WebAssembly inside the page. The video bytes never leave your computer.",
    },
    {
      q: "Why does the first conversion take a few seconds longer?",
      a: "Loading the FFmpeg WebAssembly core (~30 MB) on first use. After that it's cached.",
    },
  ],
  lastUpdated: "2026-04-29",
  Component: Mp4ToGifUI,
}
