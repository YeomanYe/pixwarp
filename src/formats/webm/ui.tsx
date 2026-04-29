interface VideoSample {
  ratio: string
  shape: "wide" | "square" | "portrait"
  label: string
  dimensions: string
  posterUrl: string
  webmUrl: string
  webmName: string
  webmSize: number
  mp4Url: string
  mp4Name: string
  mp4Size: number
  useCase: string
  source: string
}

const SAMPLES: VideoSample[] = [
  {
    ratio: "16:9",
    shape: "wide",
    label: "Wide landscape",
    dimensions: "854 × 480",
    posterUrl: "/samples/webm/bbb-burrow-16x9-poster.jpg",
    webmUrl: "/samples/webm/bbb-burrow-16x9.webm",
    webmName: "bbb-burrow-16x9.webm",
    webmSize: 58_073,
    mp4Url: "/samples/webm/bbb-burrow-16x9.mp4",
    mp4Name: "bbb-burrow-16x9.mp4",
    mp4Size: 98_833,
    useCase: "Modern phone / monitor / video frame",
    source: "Big Buck Bunny · Blender · CC BY 3.0",
  },
  {
    ratio: "1:1",
    shape: "square",
    label: "Square",
    dimensions: "480 × 480",
    posterUrl: "/samples/webm/lunar-1x1-poster.jpg",
    webmUrl: "/samples/webm/lunar-1x1.webm",
    webmName: "lunar-1x1.webm",
    webmSize: 137_337,
    mp4Url: "/samples/webm/lunar-1x1.mp4",
    mp4Name: "lunar-1x1.mp4",
    mp4Size: 268_806,
    useCase: "Instagram post / profile / square video",
    source: "NASA SVS5023 Lunar Polar Wander · Public Domain",
  },
  {
    ratio: "4:5",
    shape: "portrait",
    label: "IG portrait",
    dimensions: "480 × 600",
    posterUrl: "/samples/webm/rocket-4x5-poster.jpg",
    webmUrl: "/samples/webm/rocket-4x5.webm",
    webmName: "rocket-4x5.webm",
    webmSize: 89_206,
    mp4Url: "/samples/webm/rocket-4x5.mp4",
    mp4Name: "rocket-4x5.mp4",
    mp4Size: 184_418,
    useCase: "Instagram portrait video / feed-friendly",
    source: "Sound of All Human Knowledge · Wikimedia · CC BY-SA 4.0",
  },
  {
    ratio: "9:16",
    shape: "portrait",
    label: "Stories / Reels",
    dimensions: "270 × 480",
    posterUrl: "/samples/webm/freddy-9x16-poster.jpg",
    webmUrl: "/samples/webm/freddy-9x16.webm",
    webmName: "freddy-9x16.webm",
    webmSize: 314_503,
    mp4Url: "/samples/webm/freddy-9x16.mp4",
    mp4Name: "freddy-9x16.mp4",
    mp4Size: 336_287,
    useCase: "Stories / Reels / TikTok / phone wallpaper",
    source: "NASA SVS14312 Tropical Cyclone Freddy · Public Domain",
  },
]

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function savings(webm: number, mp4: number): string {
  const pct = Math.round((1 - webm / mp4) * 100)
  return pct > 0 ? `${pct}% smaller` : `${-pct}% larger`
}

export function WebmCompareWidget() {
  return (
    <div className="space-y-5">
      <p className="text-sm text-[var(--muted)]">
        Four real videos at four standard web-video aspect ratios — each shot or rendered{" "}
        <em>natively</em> at its target aspect, no cropping. Sources: Blender open movie (CC BY
        3.0), NASA visualizations (Public Domain), Wikimedia film (CC BY-SA 4.0). Each is encoded as
        both WebM (VP9 CRF 38) and MP4 (H.264 CRF 23) at perceptually-matched quality. Click any
        video to play; click the download links to grab the file.
      </p>

      <div className="space-y-3">
        <h3 className="text-base font-semibold">WebM at common aspect ratios</h3>
        <p className="text-sm text-[var(--muted)]">
          The four canonical web-video aspects — landscape (16:9), square (1:1), IG portrait (4:5),
          and Stories / Reels (9:16). Each card is a real WebM file with its MP4 counterpart for
          direct comparison.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SAMPLES.map((s) => (
            <figure key={s.ratio} className="flex flex-col rounded-lg border bg-[var(--card)] p-3">
              <div
                className={`flex items-center justify-center overflow-hidden rounded bg-black ${
                  s.shape === "portrait" ? "h-80" : s.shape === "square" ? "h-60" : "h-40"
                }`}
              >
                <video
                  src={s.webmUrl}
                  poster={s.posterUrl}
                  controls
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="h-full w-full object-contain"
                  aria-label={`${s.label} WebM sample at ${s.ratio}, ${s.dimensions}`}
                />
              </div>
              <figcaption className="mt-3 space-y-1.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="rounded border border-[var(--accent)]/40 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-[var(--accent)]">
                    {s.ratio}
                  </span>
                  <span className="font-mono text-xs text-[var(--muted)]">{s.dimensions}</span>
                </div>
                <div className="text-sm font-medium">{s.label}</div>
                <div className="text-xs text-[var(--muted)]">{s.useCase}</div>
                <div className="space-y-1 pt-1.5 font-mono text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <a
                      href={s.webmUrl}
                      download={s.webmName}
                      className="text-[var(--accent)] hover:underline"
                    >
                      .webm ↓
                    </a>
                    <span>
                      <strong className="text-[var(--foreground)]">
                        {formatBytes(s.webmSize)}
                      </strong>
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 text-[var(--muted)]">
                    <a
                      href={s.mp4Url}
                      download={s.mp4Name}
                      className="hover:text-[var(--foreground)] hover:underline"
                    >
                      .mp4 ↓
                    </a>
                    <span>{formatBytes(s.mp4Size)}</span>
                  </div>
                </div>
                <div className="pt-1 text-xs text-[var(--muted)]">
                  WebM is{" "}
                  <strong className="text-[var(--accent)]">{savings(s.webmSize, s.mp4Size)}</strong>
                </div>
                <div className="pt-0.5 text-[10px] text-[var(--muted)]/80">{s.source}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="text-xs text-[var(--muted)]">
          Encoder settings: VP9 CRF 38 (libvpx-vp9 -crf 38 -b:v 0) vs H.264 CRF 23 (libx264 -crf
          23). These two CRF points are commonly cited as perceptually-equivalent for typical
          content. Audio stripped from all samples to keep comparisons codec-pure.
        </p>
      </div>
    </div>
  )
}
