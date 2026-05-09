import type { ToolManifest } from "../types"
import { AudioExtractUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "audio-extract",
  category: "audio",
  name: "Extract Audio from Video",
  nameZh: "从视频提取音频",
  description: "Extract an MP3 audio track from video locally with FFmpeg.wasm.",
  descriptionZh: "使用 FFmpeg.wasm 在浏览器内从视频提取 MP3 音频。",
  longDescription: "Turn short videos into audio files without uploading the source video.",
  howToUse: ["Drop a video.", "Run extraction.", "Download MP3 output."],
  outputDetails: [
    "Outputs MP3 audio.",
    "Works best for short clips.",
    "Runs locally after FFmpeg core loads.",
  ],
  keywords: ["extract audio from video", "video to mp3", "mp4 to mp3", "视频提取音频"],
  related: ["video-compress", "mp4-to-gif"],
  markets: ["global", "cn"],
  faq: [{ q: "Does this upload my video?", a: "No. FFmpeg runs in your browser." }],
  lastUpdated: "2026-05-09",
  Component: AudioExtractUI,
}
