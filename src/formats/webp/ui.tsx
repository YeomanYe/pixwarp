interface WebpSample {
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
}

const SAMPLES: WebpSample[] = [
  {
    title: "Allean Forest Loch Tummel",
    capability: "Photo",
    dimensions: "1080 x 813",
    fileSize: 171_956,
    url: "/samples/webp/allean-forest-loch-tummel.webp",
    download: "allean-forest-loch-tummel.webp",
    source: "Rowyn flowerdew · Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Allean_forest_loch_tummel.webp",
    license: "CC0",
    shape: "wide",
    note: "Native WebP landscape photo downloaded at its original Commons resolution.",
  },
  {
    title: "Musandam Peninsula Aerial",
    capability: "Aerial photo",
    dimensions: "2448 x 1632",
    fileSize: 863_338,
    url: "/samples/webp/musandam-peninsula-aerial.webp",
    download: "musandam-peninsula-aerial.webp",
    source: "Rita Willaert · Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Musandam_Peninsula_aerial.webp",
    license: "CC BY 2.5",
    shape: "wide",
    note: "A higher-resolution WebP photo showing how the format carries detailed natural texture.",
  },
  {
    title: "Lake Louise Square",
    capability: "Square image",
    dimensions: "3000 x 3000",
    fileSize: 522_318,
    url: "/samples/webp/lake-louise-square.webp",
    download: "lake-louise-square.webp",
    source: "Victor Smith · Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Beautiful_Landscape_At_Lake_Louise.webp",
    license: "CC BY-SA 4.0",
    shape: "square",
    note: "A native square WebP asset, useful for profile, catalog, and social-media style layouts.",
  },
  {
    title: "Tree Matrix at Gryteskog",
    capability: "High-resolution portrait",
    dimensions: "3966 x 4958",
    fileSize: 10_279_230,
    url: "/samples/webp/tree-matrix-portrait.webp",
    download: "tree-matrix-portrait.webp",
    source: "Trakesh.photography · Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Amazing_tree_matrix_at_Gryteskog.webp",
    license: "CC BY-SA 4.0",
    shape: "portrait",
    note: "A tall high-resolution WebP image kept at the downloaded native dimensions.",
  },
  {
    title: "Transparent Gear",
    capability: "Alpha channel",
    dimensions: "512 x 512",
    fileSize: 6_162,
    url: "/samples/webp/transparent-gear.webp",
    download: "transparent-gear.webp",
    source: "Kurt Kaiser · Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Gear-icon-transparent-background.png",
    license: "CC0",
    shape: "icon",
    note: "Converted from the original transparent PNG to lossless WebP without resizing.",
  },
  {
    title: "Simple Animated Clock",
    capability: "Animation + transparency",
    dimensions: "211 x 211",
    fileSize: 600_504,
    url: "/samples/webp/simple-animated-clock.webp",
    download: "simple-animated-clock.webp",
    source: "HFWMan · Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Simple_Animated_Clock.webp",
    license: "CC BY-SA 4.0",
    shape: "icon",
    note: "An animated WebP with transparency, downloaded locally and displayed as-is.",
  },
]

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function previewHeight(shape: WebpSample["shape"]): string {
  if (shape === "portrait") return "h-96"
  if (shape === "square") return "h-72"
  if (shape === "icon") return "h-48"
  return "h-56"
}

export function WebpSamplesWidget() {
  return (
    <div className="space-y-5">
      <p className="text-sm text-[var(--muted)]">
        Six locally stored WebP files at their original downloaded dimensions. These are not cropped
        or resized for the guide; each preview keeps the full image visible inside its card.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {SAMPLES.map((sample) => (
          <figure key={sample.url} className="flex flex-col rounded-lg border bg-[var(--card)] p-3">
            <div
              className={`flex ${previewHeight(
                sample.shape,
              )} items-center justify-center overflow-hidden rounded border bg-[var(--muted-bg)]/35`}
              style={
                sample.shape === "icon"
                  ? {
                      backgroundImage:
                        "linear-gradient(45deg, rgba(0,0,0,.08) 25%, transparent 25%), linear-gradient(-45deg, rgba(0,0,0,.08) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(0,0,0,.08) 75%), linear-gradient(-45deg, transparent 75%, rgba(0,0,0,.08) 75%)",
                      backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0",
                      backgroundSize: "16px 16px",
                    }
                  : undefined
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sample.url}
                alt={`${sample.title} WebP sample at ${sample.dimensions}`}
                loading="lazy"
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
              </div>
              <div className="flex items-center justify-between gap-3 pt-1 font-mono text-xs">
                <span>
                  <strong className="text-[var(--foreground)]">
                    {formatBytes(sample.fileSize)}
                  </strong>{" "}
                  <span className="text-[var(--muted)]">WebP</span>
                </span>
                <a
                  href={sample.url}
                  download={sample.download}
                  className="text-[var(--accent)] hover:underline"
                >
                  .webp ↓
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

      <p className="text-xs text-[var(--muted)]">
        Attribution metadata is mirrored in{" "}
        <code className="rounded bg-[var(--muted-bg)] px-1 py-0.5 font-mono">
          public/samples/webp/attribution.json
        </code>
        . The transparent gear is the only converted file; conversion preserved the source
        resolution.
      </p>
    </div>
  )
}
