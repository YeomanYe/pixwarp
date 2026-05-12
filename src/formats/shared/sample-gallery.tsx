export interface FormatGuideSample {
  title: string
  capability: string
  dimensions: string
  fileSize: number
  url: string
  download: string
  source: string
  sourceUrl: string
  license: string
  shape: "wide" | "square" | "portrait" | "icon"
  note: string
  previewUrl?: string
  previewNote?: string
  checkerboard?: boolean
  aspectRatio?: string
}

interface FormatSampleGalleryProps {
  intro: string
  samples: FormatGuideSample[]
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function previewHeight(shape: FormatGuideSample["shape"]): string {
  if (shape === "portrait") return "h-96"
  if (shape === "square") return "h-72"
  if (shape === "icon") return "h-48"
  return "h-56"
}

function extension(fileName: string): string {
  return fileName.split(".").pop() ?? "file"
}

const checkerboardStyle = {
  backgroundImage:
    "linear-gradient(45deg, rgba(0,0,0,.08) 25%, transparent 25%), linear-gradient(-45deg, rgba(0,0,0,.08) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(0,0,0,.08) 75%), linear-gradient(-45deg, transparent 75%, rgba(0,0,0,.08) 75%)",
  backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0",
  backgroundSize: "16px 16px",
}

export function FormatSampleGallery({ intro, samples }: FormatSampleGalleryProps) {
  return (
    <div className="space-y-5">
      <p className="text-sm text-[var(--muted)]">{intro}</p>

      <div className="columns-1 gap-4 sm:columns-2">
        {samples.map((sample) => (
          <figure
            key={sample.url}
            className="mb-4 flex break-inside-avoid flex-col rounded-lg border bg-[var(--card)] p-3"
          >
            <div
              className={`flex ${
                sample.aspectRatio ? "w-full" : previewHeight(sample.shape)
              } items-center justify-center overflow-hidden rounded border bg-[var(--muted-bg)]/35`}
              style={{
                ...(sample.checkerboard ? checkerboardStyle : undefined),
                ...(sample.aspectRatio ? { aspectRatio: sample.aspectRatio } : undefined),
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sample.previewUrl ?? sample.url}
                alt={`${sample.title} sample preview for ${sample.dimensions}`}
                loading="eager"
                className="h-full w-full object-contain"
              />
            </div>

            <figcaption className="mt-3 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded border border-[var(--accent)]/40 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-[var(--accent)]">
                  {sample.capability}
                </span>
                <span className="font-mono text-xs text-[var(--muted)]">{sample.dimensions}</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold">{sample.title}</h3>
                <p className="mt-1 text-xs text-[var(--muted)]">{sample.note}</p>
                {sample.previewNote ? (
                  <p className="mt-1 text-[10px] text-[var(--muted)]/80">{sample.previewNote}</p>
                ) : null}
              </div>
              <div className="flex items-center justify-between gap-3 pt-1 font-mono text-xs">
                <span>
                  <strong className="text-[var(--foreground)]">
                    {formatBytes(sample.fileSize)}
                  </strong>{" "}
                  <span className="text-[var(--muted)]">{extension(sample.download)}</span>
                </span>
                <a
                  href={sample.url}
                  download={sample.download}
                  className="text-[var(--accent)] hover:underline"
                >
                  .{extension(sample.download)} ↓
                </a>
              </div>
              <div className="text-[10px] text-[var(--muted)]/85">
                <a
                  href={sample.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--foreground)] hover:underline"
                >
                  {sample.source}
                </a>{" "}
                · {sample.license}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
