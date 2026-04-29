import type { FormatManifest } from "../types"

export const manifest: FormatManifest = {
  slug: "webm",
  category: "video",
  name: "WebM",
  fullName: "Web Media (Matroska container with VP8/VP9/AV1)",
  year: 2010,
  extensions: ["webm"],
  mimeTypes: ["video/webm", "audio/webm"],
  standard: "Open container (Matroska subset) — codecs VP8 / VP9 / AV1 + Vorbis / Opus",
  tagline:
    "Google's open, royalty-free video format for the web — typically 30-50% smaller than equivalent MP4 / H.264.",
  description: `WebM is a video container created by Google in 2010 specifically for web delivery. Unlike MP4, which carries patent-encumbered codecs (H.264 / H.265) that require licensing fees, WebM uses **open, royalty-free codecs**: VP8 (legacy), VP9 (modern), and AV1 (cutting edge).

The big practical win: **at the same visual quality, WebM is roughly 30% smaller than MP4 H.264**. AV1 inside WebM goes further — often 50% smaller. That's why YouTube serves WebM/VP9 to your browser by default, and why TikTok / Netflix / Twitch are all migrating to AV1.

The catch you hit in real workflows: Apple's Safari historically lagged on WebM support. As of Safari 14.1 (2021) WebM/VP9 is supported, but iOS still favors MP4 for legacy reasons. Most upload forms (Twitter, Slack, Discord) now accept WebM, but a few legacy enterprise tools still expect MP4.`,
  pros: [
    "Royalty-free — no licensing fees for codec or container",
    "30-50% smaller than equivalent H.264 MP4 at same quality",
    "Native browser playback — no plugins ever",
    "Supports HD, 4K, HDR, and even 8K at modern AV1 settings",
    "Streams well — Matroska container has lightweight headers",
    "Backed by YouTube, Netflix, Vimeo, Twitch — production-proven",
  ],
  cons: [
    "iOS / Safari support arrived late — older Apple devices can't decode",
    "Some legacy upload forms still reject .webm extension",
    "Hardware encoding for VP9 / AV1 is less common than H.264",
    "Encoding is slower than H.264 (especially AV1)",
    "Less third-party editor support than MP4 (Premiere, Final Cut prefer MOV/MP4)",
  ],
  comparison: [
    {
      vs: "MP4 (H.264)",
      sizeRatio: "MP4 ≈ 1.3-1.5x larger",
      quality: "Equal at typical bitrates",
      note: "MP4 is universal; WebM is smaller. Both are fine for the web — pick MP4 if you need iMovie / Premiere compatibility.",
    },
    {
      vs: "MP4 (H.265 / HEVC)",
      sizeRatio: "Roughly equal",
      quality: "Equal — both are modern codecs",
      note: "H.265 has the same compression class as VP9, but H.265 is patent-encumbered. WebM/VP9 wins on licensing.",
    },
    {
      vs: "GIF",
      sizeRatio: "GIF ≈ 5-20x larger",
      quality: "GIF is 256 colors; WebM is full color",
      note: "GIF is obsolete for video. WebM with VP9 at the same length is a fraction of the size, with better quality and audio support.",
    },
    {
      vs: "MOV",
      sizeRatio: "Similar (depends on codec inside)",
      quality: "Depends on codec",
      note: "MOV is Apple's container — same role as Matroska/WebM. MOV often holds ProRes / H.264; WebM holds VP9 / AV1.",
    },
    {
      vs: "AVI",
      sizeRatio: "AVI ≈ 2-5x larger",
      quality: "AVI codecs are typically older",
      note: "AVI is a 1990s container. Use it for legacy compatibility only — WebM is the modern web replacement.",
    },
  ],
  support: {
    os: [
      "macOS 11+ (Safari 14.1)",
      "iOS 14.1+ (limited)",
      "Windows 10+ (with codec)",
      "Android 4.0+ ✅",
      "Linux ✅ (native libvpx)",
    ],
    browsers: ["Chrome ✅", "Firefox ✅", "Edge ✅", "Safari 14.1+ ✅", "Older Safari ❌"],
    apps: [
      "VLC ✅",
      "OBS Studio ✅ (record / stream)",
      "ffmpeg ✅ (libvpx-vp9 / libaom-av1)",
      "DaVinci Resolve ✅",
      "Premiere Pro / Final Cut — needs plugin",
    ],
  },
  keywords: [
    "webm file format",
    "what is webm",
    "webm vs mp4",
    "webm vs gif",
    "vp9 codec",
    "av1 codec",
    "open video format",
    "html5 video format",
    "WebM 是什么",
    "WebM 和 MP4 区别",
  ],
  relatedTools: ["mp4-to-gif"],
  relatedFormats: [],
  faq: [
    {
      q: "Why does YouTube prefer WebM?",
      a: "Bandwidth cost. YouTube serves billions of hours of video daily — a 30% codec efficiency improvement saves them hundreds of millions in CDN bills. WebM/VP9 was pushed by Google specifically to skip H.264 / H.265 licensing while gaining compression.",
    },
    {
      q: "Will WebM replace MP4?",
      a: "Probably not in the next 5 years. MP4 (with H.264) is the universal lowest-common-denominator and works everywhere. WebM will dominate streaming (Netflix, YouTube, Twitch) and modern browsers, while MP4 stays the default for downloads, email attachments, and editor exports.",
    },
    {
      q: "What's the difference between VP8, VP9, and AV1 inside WebM?",
      a: "VP8 (2010) was the original — comparable to H.264. VP9 (2013) is the workhorse — comparable to H.265 but royalty-free. AV1 (2018) is the latest — about 30% better than VP9 but much slower to encode. Use VP9 for general purposes; AV1 only when encode time isn't an issue (offline batch).",
    },
    {
      q: "Can I convert MP4 to WebM losslessly?",
      a: "No — both are lossy. Re-encoding MP4 to WebM means decoding the H.264 bitstream and re-encoding with VP9 / AV1, which adds slight quality loss. For best results, encode WebM directly from your master / source file rather than transcoding.",
    },
    {
      q: "Why won't iPhone Safari play some WebM files?",
      a: "iOS Safari adopted WebM late (14.1 in 2021) and still lacks AV1 hardware decode on older devices. If you must support old iPhones, fall back to MP4 / H.264. Modern iPhones (A14 Bionic+) decode VP9; AV1 hardware support arrived with A17 Pro / M3.",
    },
    {
      q: "Is WebM faster to encode than MP4?",
      a: "No, slower. H.264 has decades of hardware acceleration. VP9 software encode is 2-5x slower than x264 at comparable settings; AV1 software encode can be 50x+ slower. The trade-off: WebM ships smaller files, but you wait longer to make them.",
    },
  ],
  lastUpdated: "2026-04-29",
}
