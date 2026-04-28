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
