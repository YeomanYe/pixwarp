import Link from "next/link"

interface FormatRow {
  name: string
  url: string
  download: string
  size: number
  note: string
  ratio: string
  preview?: string
}

const SAMPLE_ROWS: FormatRow[] = [
  {
    name: "HEIC (original)",
    url: "/samples/heic/winter-photo.heic",
    download: "winter-photo.heic",
    size: 248_006,
    note: "Apple iOS default — half the size of JPG",
    ratio: "baseline",
  },
  {
    name: "JPG (quality 90)",
    url: "/samples/heic/winter-photo.jpg",
    download: "winter-photo.jpg",
    size: 687_840,
    note: "Universal compatibility, lossy compression",
    ratio: "2.77× larger",
    preview: "/samples/heic/winter-photo.jpg",
  },
  {
    name: "PNG (lossless)",
    url: "/samples/heic/winter-photo.png",
    download: "winter-photo.png",
    size: 2_421_339,
    note: "Lossless, but no advantage for photos",
    ratio: "9.76× larger",
    preview: "/samples/heic/winter-photo.png",
  },
]

interface AspectSample {
  ratio: string
  shape: "wide" | "square" | "portrait"
  label: string
  dimensions: string
  preview: string
  heicUrl: string
  heicName: string
  heicSize: number
  jpgSize: number
  useCase: string
}

const ASPECT_SAMPLES: AspectSample[] = [
  {
    ratio: "16:9",
    shape: "wide",
    label: "Wide landscape",
    dimensions: "1440 × 810",
    preview: "/samples/heic/winter-16x9.jpg",
    heicUrl: "/samples/heic/winter-16x9.heic",
    heicName: "winter-16x9.heic",
    heicSize: 348_755,
    jpgSize: 580_976,
    useCase: "Modern phone / monitor / video frame",
  },
  {
    ratio: "1:1",
    shape: "square",
    label: "Square",
    dimensions: "854 × 854",
    preview: "/samples/heic/town-square-1x1.jpg",
    heicUrl: "/samples/heic/town-square-1x1.heic",
    heicName: "town-square-1x1.heic",
    heicSize: 212_724,
    jpgSize: 356_621,
    useCase: "Instagram post / profile / album cover",
  },
  {
    ratio: "4:5",
    shape: "portrait",
    label: "IG portrait",
    dimensions: "800 × 1000",
    preview: "/samples/heic/grassland-4x5.jpg",
    heicUrl: "/samples/heic/grassland-4x5.heic",
    heicName: "grassland-4x5.heic",
    heicSize: 87_392,
    jpgSize: 163_894,
    useCase: "Instagram portrait post / feed-friendly crop",
  },
  {
    ratio: "3:4",
    shape: "portrait",
    label: "Portrait / tall",
    dimensions: "720 × 960",
    preview: "/samples/heic/autumn-3x4.jpg",
    heicUrl: "/samples/heic/autumn-3x4.heic",
    heicName: "autumn-3x4.heic",
    heicSize: 229_155,
    jpgSize: 422_253,
    useCase: "Phone photo / Xiaohongshu / portrait shoot",
  },
  {
    ratio: "2:3",
    shape: "portrait",
    label: "Pinterest pin",
    dimensions: "800 × 1200",
    preview: "/samples/heic/dock-2x3.jpg",
    heicUrl: "/samples/heic/dock-2x3.heic",
    heicName: "dock-2x3.heic",
    heicSize: 55_680,
    jpgSize: 138_445,
    useCase: "Pinterest pin / postcard / vertical poster",
  },
  {
    ratio: "9:16",
    shape: "portrait",
    label: "Stories / Reels",
    dimensions: "540 × 960",
    preview: "/samples/heic/lighthouse-9x16.jpg",
    heicUrl: "/samples/heic/lighthouse-9x16.heic",
    heicName: "lighthouse-9x16.heic",
    heicSize: 33_038,
    jpgSize: 80_881,
    useCase: "Stories / Reels / TikTok / phone wallpaper",
  },
]

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function HeicCompareWidget() {
  return (
    <div className="space-y-5">
      <p className="text-sm text-[var(--muted)]">
        The same winter landscape, encoded as HEIC, JPG (quality 90), and PNG (lossless). File sizes
        below are real — verify with{" "}
        <code className="rounded bg-[var(--muted-bg)] px-1 py-0.5 font-mono text-xs">sips</code> or
        any HEIC tool. To see the actual rendered images side by side, open the{" "}
        <Link href="/tools/heic-to-jpg" className="text-[var(--accent)] hover:underline">
          HEIC converter
        </Link>{" "}
        and pick a sample under the Compare tab.
      </p>

      {/* Size comparison table */}
      <div className="overflow-hidden rounded-lg border bg-[var(--card)]">
        <table className="w-full text-sm">
          <thead className="bg-[var(--muted-bg)]/50 text-left">
            <tr>
              <th className="px-4 py-2 font-mono text-xs tracking-wider text-[var(--muted)] uppercase">
                Format
              </th>
              <th className="px-4 py-2 font-mono text-xs tracking-wider text-[var(--muted)] uppercase">
                Size
              </th>
              <th className="px-4 py-2 font-mono text-xs tracking-wider text-[var(--muted)] uppercase">
                vs HEIC
              </th>
              <th className="px-4 py-2 font-mono text-xs tracking-wider text-[var(--muted)] uppercase">
                Note
              </th>
              <th className="px-4 py-2 font-mono text-xs tracking-wider text-[var(--muted)] uppercase">
                Download
              </th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_ROWS.map((row, i) => (
              <tr key={row.name} className={i === 0 ? "" : "border-t"}>
                <td className="px-4 py-3 font-medium">{row.name}</td>
                <td className="px-4 py-3 font-mono">{formatBytes(row.size)}</td>
                <td className="px-4 py-3 text-[var(--muted)]">{row.ratio}</td>
                <td className="px-4 py-3 text-[var(--muted)]">{row.note}</td>
                <td className="px-4 py-3">
                  <a
                    href={row.url}
                    download={row.download}
                    className="text-[var(--accent)] hover:underline"
                  >
                    .{row.download.split(".").pop()} ↓
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Aspect ratio showcase */}
      <div className="space-y-3 pt-2">
        <div>
          <h3 className="text-base font-semibold">HEIC at common aspect ratios</h3>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Six different scenes at six standard aspect ratios — landscape, square, and the four
            mobile / social ratios you actually upload (Stories 9:16, Pinterest 2:3, classic 3:4, IG
            portrait 4:5). Each card is a separate HEIC file you can download.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {ASPECT_SAMPLES.map((s) => (
            <figure key={s.ratio} className="flex flex-col rounded-lg border bg-[var(--card)] p-3">
              <div
                className={`flex items-center justify-center overflow-hidden rounded bg-[var(--muted-bg)]/40 ${
                  s.shape === "portrait" ? "h-80" : s.shape === "square" ? "h-60" : "h-36"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.preview}
                  alt={`${s.label} HEIC sample at ${s.ratio}, ${s.dimensions}`}
                  className="h-full w-full object-cover"
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
                <div className="flex items-center justify-between pt-1.5 text-xs">
                  <span className="font-mono">
                    HEIC{" "}
                    <strong className="text-[var(--foreground)]">{formatBytes(s.heicSize)}</strong>{" "}
                    <span className="text-[var(--muted)]">vs JPG {formatBytes(s.jpgSize)}</span>
                  </span>
                  <a
                    href={s.heicUrl}
                    download={s.heicName}
                    className="text-[var(--accent)] hover:underline"
                  >
                    .heic ↓
                  </a>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="text-xs text-[var(--muted)]">
          The previews above are JPG renders (HEIC won&apos;t display in your browser). The download
          is the real HEIC file — feed it to the converter to see how it decodes.
        </p>
      </div>

      {/* CTA to interactive tool */}
      <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-4">
        <p className="mb-2 text-sm">
          <strong>Want to compare your own photo?</strong> Drop a HEIC into our converter and see
          the real size difference for your file — fully local, no upload.
        </p>
        <Link
          href="/tools/heic-to-jpg"
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:underline"
        >
          Open HEIC to JPG converter →
        </Link>
      </div>
    </div>
  )
}
