import type { ToolManifest } from "../types"
import { VideoCompressUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "video-compress",
  category: "video",
  name: "Video Compress",
  nameZh: "视频压缩",
  description: "Compress MP4/WebM videos locally with FFmpeg.wasm.",
  descriptionZh: "使用 FFmpeg.wasm 在浏览器内压缩 MP4/WebM 视频。",
  longDescription:
    "Reduce video size without uploading it. Best for short clips and social previews.",
  howToUse: [
    "Drop a video.",
    "Choose CRF quality.",
    "Compress locally.",
    "Download the smaller MP4.",
  ],
  outputDetails: [
    "Outputs H.264 MP4 when the browser FFmpeg core supports it.",
    "Lower CRF means higher quality and larger output.",
    "Large videos can take time and memory.",
  ],
  keywords: ["video compress", "compress mp4", "compress video no upload", "视频压缩"],
  related: ["mp4-to-gif", "audio-extract"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "Is this good for long videos?",
      a: "It is best for short clips. Very large files may exceed browser memory.",
    },
  ],
  lastUpdated: "2026-05-09",
  Component: VideoCompressUI,
}
