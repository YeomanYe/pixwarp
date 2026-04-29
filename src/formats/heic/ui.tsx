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
  label: string
  shape: "wide" | "square" | "portrait"
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
    label: "Wide / Panorama",
    shape: "wide",
    dimensions: "1440 × 540",
    preview: "/samples/heic/winter-wide.jpg",
    heicUrl: "/samples/heic/winter-wide.heic",
    heicName: "winter-wide.heic",
    heicSize: 245_026,
    jpgSize: 403_280,
    useCase: "Banner / website hero / cinematic crop",
  },
  {
    label: "Square",
    shape: "square",
    dimensions: "960 × 960",
    preview: "/samples/heic/autumn-square.jpg",
    heicUrl: "/samples/heic/autumn-square.heic",
    heicName: "autumn-square.heic",
    heicSize: 296_093,
    jpgSize: 554_879,
    useCase: "Instagram post / profile / album cover",
  },
  {
    label: "Portrait / Tall",
    shape: "portrait",
    dimensions: "540 × 960",
    preview: "/samples/heic/person-portrait.jpg",
    heicUrl: "/samples/heic/person-portrait.heic",
    heicName: "person-portrait.heic",
    heicSize: 141_646,
    jpgSize: 243_405,
    useCase: "Story / Reels / phone wallpaper",
  },
]

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function HeicCompareWidget() {
  const jpg = SAMPLE_ROWS[1]
  const png = SAMPLE_ROWS[2]

  return (
    <div className="space-y-5">
      <p className="text-sm text-[var(--muted)]">
        Below is the same photo in three formats — a winter landscape originally shot in HEIC. The
        file sizes are real (just convert it yourself with{" "}
        <code className="rounded bg-[var(--muted-bg)] px-1 py-0.5 font-mono text-xs">sips</code> or
        any HEIC tool to verify).
      </p>

      {/* Side-by-side preview */}
      <div className="grid gap-3 sm:grid-cols-2">
        <figure className="rounded-lg border bg-[var(--card)] p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={jpg.preview!}
            alt="Winter photo rendered as JPG"
            className="h-auto w-full rounded object-contain"
            style={{ maxHeight: 360 }}
          />
          <figcaption className="mt-2 text-center text-xs text-[var(--muted)]">
            JPG · {formatBytes(jpg.size)}
          </figcaption>
        </figure>
        <figure className="rounded-lg border bg-[var(--card)] p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={png.preview!}
            alt="Winter photo rendered as PNG"
            className="h-auto w-full rounded object-contain"
            style={{ maxHeight: 360 }}
          />
          <figcaption className="mt-2 text-center text-xs text-[var(--muted)]">
            PNG · {formatBytes(png.size)}
          </figcaption>
        </figure>
      </div>
      <p className="text-xs text-[var(--muted)]">
        The HEIC original is not previewed — most browsers (including Chrome and Firefox) can&apos;t
        decode HEIC natively. That&apos;s the practical point: HEIC is smaller, but you usually have
        to convert it before posting it anywhere outside Apple&apos;s ecosystem.
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
          <h3 className="text-base font-semibold">HEIC works for any aspect ratio</h3>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Wide panoramas, square social posts, tall portraits — same format, same compression
            advantage. Each example below is a real HEIC file you can download.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {ASPECT_SAMPLES.map((s) => (
            <figure key={s.label} className="flex flex-col rounded-lg border bg-[var(--card)] p-3">
              <div
                className={`flex items-center justify-center overflow-hidden rounded bg-[var(--muted-bg)]/40 ${
                  s.shape === "portrait" ? "h-72" : s.shape === "square" ? "h-56" : "h-32"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.preview}
                  alt={`${s.label} HEIC sample, ${s.dimensions}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 space-y-1.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium">{s.label}</span>
                  <span className="font-mono text-xs text-[var(--muted)]">{s.dimensions}</span>
                </div>
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
