"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import dynamic from "next/dynamic"
import { track, trackError } from "@/lib/analytics"

// heic2any uses browser-only APIs (Worker/canvas), load lazily on the client
type Heic2Any = (opts: { blob: Blob; toType: string; quality?: number }) => Promise<Blob | Blob[]>

interface ConversionResult {
  id: string
  fileName: string
  heicSize: number
  jpgSize: number
  pngSize: number
  heicUrl: string
  jpgUrl: string
  pngUrl: string
  jpgQuality: number
}

type Status = "idle" | "converting" | "done" | "error"

const ACCEPTED_EXTENSIONS = [".heic", ".heif"]

const SAMPLES = [
  { path: "/samples/heic/winter-photo.heic", label: "Yosemite (242 KB)" },
  { path: "/samples/heic/autumn-photo.heic", label: "Autumn pond (287 KB)" },
  { path: "/samples/heic/iphone-portrait.heic", label: "Riverside town (701 KB)" },
  { path: "/samples/heic/lighthouse-9x16.heic", label: "Lighthouse 9:16 (32 KB)" },
]

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function ratio(a: number, b: number): string {
  if (b === 0) return "—"
  const r = a / b
  return r >= 1 ? `${r.toFixed(2)}× larger` : `${(1 / r).toFixed(2)}× smaller`
}

async function loadHeic2Any(): Promise<Heic2Any> {
  const mod = await import("heic2any")
  return (mod.default as unknown as Heic2Any) ?? (mod as unknown as Heic2Any)
}

// Re-encode JPG from the lossless PNG pixel data without re-decoding HEIC
async function reencodeJpg(
  sourceUrl: string,
  quality: number,
): Promise<{ blob: Blob; url: string }> {
  const img = new Image()
  img.src = sourceUrl
  await new Promise<void>((resolve, reject) => {
    if (img.complete && img.naturalWidth > 0) resolve()
    else {
      img.onload = () => resolve()
      img.onerror = () => reject(new Error("Failed to load source image"))
    }
  })
  const canvas = document.createElement("canvas")
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Canvas 2D context unavailable")
  ctx.drawImage(img, 0, 0)
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("JPG encode failed"))),
      "image/jpeg",
      quality / 100,
    )
  })
  return { blob, url: URL.createObjectURL(blob) }
}

function HeicToJpgUIInner() {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<ConversionResult[]>([])
  const [jpgQuality, setJpgQuality] = useState(90)
  const dropRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    track("tool_open", { tool_slug: "heic-to-jpg" })
  }, [])

  const convertFile = useCallback(
    async (file: File) => {
      setStatus("converting")
      setError(null)
      track("file_dropped", {
        tool_slug: "heic-to-jpg",
        file_type: file.type || "image/heic",
        file_size_kb: Math.round(file.size / 1024),
      })
      try {
        const heic2any = await loadHeic2Any()
        const q = jpgQuality / 100
        const jpgBlobRaw = await heic2any({ blob: file, toType: "image/jpeg", quality: q })
        const jpgBlob = Array.isArray(jpgBlobRaw) ? jpgBlobRaw[0] : jpgBlobRaw
        const pngBlobRaw = await heic2any({ blob: file, toType: "image/png" })
        const pngBlob = Array.isArray(pngBlobRaw) ? pngBlobRaw[0] : pngBlobRaw

        const newResult: ConversionResult = {
          id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          fileName: file.name.replace(/\.(heic|heif)$/i, ""),
          heicSize: file.size,
          jpgSize: jpgBlob.size,
          pngSize: pngBlob.size,
          heicUrl: URL.createObjectURL(file),
          jpgUrl: URL.createObjectURL(jpgBlob),
          pngUrl: URL.createObjectURL(pngBlob),
          jpgQuality,
        }
        setResults((prev) => [newResult, ...prev])
        setStatus("done")
        track("convert_success", { tool_slug: "heic-to-jpg" })
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : "Conversion failed")
        setStatus("error")
        trackError("heic-to-jpg", err)
      }
    },
    [jpgQuality],
  )

  const loadSample = useCallback(
    async (samplePath: string) => {
      try {
        setError(null)
        const res = await fetch(samplePath)
        if (!res.ok) throw new Error(`Failed to load sample (${res.status})`)
        const blob = await res.blob()
        const fileName = samplePath.split("/").pop() ?? "sample.heic"
        const file = new File([blob], fileName, { type: "image/heic" })
        await convertFile(file)
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : "Failed to load sample")
      }
    },
    [convertFile],
  )

  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return
      const list = Array.from(fileList)
      const valid = list.filter((f) => {
        const lower = f.name.toLowerCase()
        return ACCEPTED_EXTENSIONS.some((ext) => lower.endsWith(ext))
      })
      const skipped = list.length - valid.length
      if (valid.length === 0) {
        setError("No .heic or .heif file found.")
        return
      }
      setError(skipped > 0 ? `Skipped ${skipped} non-HEIC file(s).` : null)
      for (const file of valid) {
        await convertFile(file)
      }
    },
    [convertFile],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      dropRef.current?.classList.remove("ring-2", "ring-[var(--accent)]")
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles],
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dropRef.current?.classList.add("ring-2", "ring-[var(--accent)]")
  }, [])

  const handleDragLeave = useCallback(() => {
    dropRef.current?.classList.remove("ring-2", "ring-[var(--accent)]")
  }, [])

  const removeResult = useCallback((id: string) => {
    setResults((prev) => {
      const removed = prev.find((r) => r.id === id)
      if (removed) {
        URL.revokeObjectURL(removed.heicUrl)
        URL.revokeObjectURL(removed.jpgUrl)
        URL.revokeObjectURL(removed.pngUrl)
      }
      return prev.filter((r) => r.id !== id)
    })
  }, [])

  const adjustJpgQuality = useCallback(
    async (id: string, quality: number) => {
      const target = results.find((r) => r.id === id)
      if (!target) return
      try {
        const { blob, url } = await reencodeJpg(target.pngUrl, quality)
        setResults((prev) =>
          prev.map((r) => {
            if (r.id !== id) return r
            URL.revokeObjectURL(r.jpgUrl)
            return { ...r, jpgUrl: url, jpgSize: blob.size, jpgQuality: quality }
          }),
        )
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : "Re-encode failed")
      }
    },
    [results],
  )

  const handleClear = useCallback(() => {
    results.forEach((r) => {
      URL.revokeObjectURL(r.heicUrl)
      URL.revokeObjectURL(r.jpgUrl)
      URL.revokeObjectURL(r.pngUrl)
    })
    setResults([])
    setStatus("idle")
    setError(null)
  }, [results])

  return (
    <div className="space-y-6">
      <p className="text-sm text-[var(--muted)]">
        Drop one or more HEIC files. Each gets decoded in-browser and shown alongside JPG and PNG
        re-encodes with real file sizes. Drop more anytime — they stack below.
      </p>

      {/* Drop zone */}
      <div
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--border)] bg-[var(--muted-bg)]/40 px-6 py-12 text-center transition"
      >
        <p className="mb-1 text-base font-medium">Drop HEIC files here</p>
        <p className="mb-4 text-sm text-[var(--muted)]">
          or click to browse — multiple files supported, processed locally
        </p>
        <label className="cursor-pointer rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-fg)] transition hover:bg-[var(--accent-hover)]">
          Choose files
          <input
            type="file"
            accept=".heic,.heif,image/heic,image/heif"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
        </label>
      </div>

      {/* Encoding controls */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-lg border bg-[var(--card)] px-4 py-3 text-sm">
        <label className="flex items-center gap-3">
          <span className="text-[var(--muted)]">JPG quality</span>
          <input
            type="range"
            min={10}
            max={100}
            step={1}
            value={jpgQuality}
            onChange={(e) => setJpgQuality(Number(e.target.value))}
            className="w-40 accent-[var(--accent)]"
          />
          <span className="w-8 text-right font-mono text-xs">{jpgQuality}</span>
        </label>
        <span className="text-xs text-[var(--muted)]">PNG is lossless — no quality setting</span>
        <span className="ml-auto text-xs text-[var(--muted)]">
          Default for new conversions. Each result below has its own slider too.
        </span>
      </div>

      {/* Sample shortcuts (always visible — adds to the list) */}
      <div className="rounded-lg border bg-[var(--muted-bg)]/30 p-4">
        <div className="mb-2 text-sm font-semibold">No HEIC handy? Try a sample:</div>
        <div className="flex flex-wrap gap-2 text-xs">
          {SAMPLES.map((s) => (
            <button
              key={s.path}
              type="button"
              onClick={() => loadSample(s.path)}
              disabled={status === "converting"}
              className="rounded-md border bg-[var(--card)] px-3 py-1.5 transition hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-50"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Status / errors */}
      {status === "converting" && (
        <p className="text-center text-sm text-[var(--muted)]">Decoding HEIC and re-encoding…</p>
      )}
      {error && (
        <p className="rounded-md border border-[var(--error)]/30 bg-[var(--error)]/10 px-3 py-2 text-sm text-[var(--error)]">
          {error}
        </p>
      )}

      {/* Results list */}
      {results.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Converted ({results.length})</h2>
            <button
              type="button"
              onClick={handleClear}
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Clear all
            </button>
          </div>
          {results.map((r) => (
            <ResultBlock
              key={r.id}
              result={r}
              onRemove={() => removeResult(r.id)}
              onJpgQualityChange={(q) => adjustJpgQuality(r.id, q)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ResultBlock({
  result,
  onRemove,
  onJpgQualityChange,
}: {
  result: ConversionResult
  onRemove: () => void
  onJpgQualityChange: (quality: number) => void
}) {
  // Local slider value for instant UI feedback; commits to parent debounced.
  // When local diverges from result.jpgQuality, a re-encode is pending.
  const [localQuality, setLocalQuality] = useState(result.jpgQuality)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pending = localQuality !== result.jpgQuality

  const handleSliderChange = (q: number) => {
    setLocalQuality(q)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      onJpgQualityChange(q)
    }, 200)
  }

  return (
    <section className="space-y-3 rounded-lg border bg-[var(--card)]/30 p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="truncate font-medium">{result.fileName}.heic</h3>
        <button
          type="button"
          onClick={onRemove}
          className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          Remove
        </button>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <FormatCard
          badge="Original"
          format="HEIC"
          previewUrl={result.pngUrl}
          previewAlt={`${result.fileName} HEIC content (decoded in browser)`}
          size={result.heicSize}
          ratioLabel="baseline"
          downloadUrl={result.heicUrl}
          downloadName={`${result.fileName}.heic`}
          note="Decoded in-browser via WebAssembly"
        />
        <FormatCard
          badge={`Quality ${localQuality}${pending ? "…" : ""}`}
          format="JPG"
          previewUrl={result.jpgUrl}
          previewAlt={`${result.fileName} as JPG`}
          size={result.jpgSize}
          ratioLabel={ratio(result.jpgSize, result.heicSize)}
          downloadUrl={result.jpgUrl}
          downloadName={`${result.fileName}.jpg`}
          note="Lossy · drag the slider to re-encode"
          extra={
            <label className="flex items-center gap-2 text-xs">
              <span className="text-[var(--muted)]">Q</span>
              <input
                type="range"
                min={10}
                max={100}
                step={1}
                value={localQuality}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className="flex-1 accent-[var(--accent)]"
              />
              <span className="w-7 text-right font-mono">{localQuality}</span>
            </label>
          }
        />
        <FormatCard
          badge="Lossless"
          format="PNG"
          previewUrl={result.pngUrl}
          previewAlt={`${result.fileName} as PNG`}
          size={result.pngSize}
          ratioLabel={ratio(result.pngSize, result.heicSize)}
          downloadUrl={result.pngUrl}
          downloadName={`${result.fileName}.png`}
          note="Identical to HEIC pixel-for-pixel"
        />
      </div>
    </section>
  )
}

interface FormatCardProps {
  badge: string
  format: string
  previewUrl: string
  previewAlt: string
  size: number
  ratioLabel: string
  downloadUrl: string
  downloadName: string
  note: string
  extra?: React.ReactNode
}

function FormatCard({
  badge,
  format,
  previewUrl,
  previewAlt,
  size,
  ratioLabel,
  downloadUrl,
  downloadName,
  note,
  extra,
}: FormatCardProps) {
  return (
    <figure className="flex flex-col overflow-hidden rounded-lg border bg-[var(--card)]">
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-[var(--muted-bg)]/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={previewUrl} alt={previewAlt} className="h-full w-full object-contain" />
      </div>
      <figcaption className="flex flex-1 flex-col gap-2 border-t p-3">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold">{format}</span>
          <span className="rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-[var(--muted)] uppercase">
            {badge}
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-2 text-sm">
          <span className="font-mono">{formatBytes(size)}</span>
          <span className="text-xs text-[var(--muted)]">{ratioLabel}</span>
        </div>
        <div className="text-xs text-[var(--muted)]">{note}</div>
        {extra}
        <a
          href={downloadUrl}
          download={downloadName}
          className="mt-auto rounded-md border border-[var(--accent)]/40 px-3 py-1.5 text-center text-xs font-medium text-[var(--accent)] transition hover:bg-[var(--accent)]/10"
        >
          Download .{downloadName.split(".").pop()}
        </a>
      </figcaption>
    </figure>
  )
}

// Disable SSR — heic2any references `window` / Web Workers
export const HeicToJpgUI = dynamic(() => Promise.resolve(HeicToJpgUIInner), {
  ssr: false,
  loading: () => (
    <div className="py-12 text-center text-sm text-[var(--muted)]">Loading converter…</div>
  ),
})
