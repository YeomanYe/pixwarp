"use client"

import { useState, useCallback, useRef } from "react"
import dynamic from "next/dynamic"

// heic2any uses browser-only APIs (Worker/canvas), load lazily on the client
type Heic2Any = (opts: { blob: Blob; toType: string; quality?: number }) => Promise<Blob | Blob[]>

interface ConvertedFile {
  id: string
  originalName: string
  outputName: string
  outputBlob: Blob
  outputUrl: string
  originalSize: number
  outputSize: number
}

interface CompareResult {
  fileName: string
  heicSize: number
  jpgSize: number
  pngSize: number
  heicUrl: string
  jpgUrl: string
  pngUrl: string
}

type Mode = "convert" | "compare"
type Status = "idle" | "converting" | "done" | "error"

const ACCEPTED_EXTENSIONS = [".heic", ".heif"]

const COMPARE_SAMPLES = [
  { path: "/samples/heic/winter-photo.heic", label: "Winter (242 KB)" },
  { path: "/samples/heic/autumn-photo.heic", label: "Autumn (287 KB)" },
  { path: "/samples/heic/iphone-portrait.heic", label: "Portrait (701 KB)" },
  { path: "/samples/heic/live-photo.heic", label: "Live Photo (774 KB)" },
]

function makeOutputName(originalName: string, format: "jpg" | "png"): string {
  const stem = originalName.replace(/\.(heic|heif)$/i, "")
  return `${stem}.${format}`
}

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

function HeicToJpgUIInner() {
  const [mode, setMode] = useState<Mode>("convert")
  const [files, setFiles] = useState<ConvertedFile[]>([])
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const [format, setFormat] = useState<"jpg" | "png">("jpg")
  const [quality, setQuality] = useState(0.9)
  const [compareResult, setCompareResult] = useState<CompareResult | null>(null)
  const dropRef = useRef<HTMLDivElement | null>(null)

  const convertFiles = useCallback(
    async (incoming: File[]) => {
      setStatus("converting")
      setError(null)

      try {
        const heic2any = await loadHeic2Any()
        const mime = format === "jpg" ? "image/jpeg" : "image/png"
        const next: ConvertedFile[] = []

        for (const file of incoming) {
          const blob = await heic2any({
            blob: file,
            toType: mime,
            quality: format === "jpg" ? quality : undefined,
          })
          const outputBlob = Array.isArray(blob) ? blob[0] : blob
          const outputName = makeOutputName(file.name, format)
          next.push({
            id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            originalName: file.name,
            outputName,
            outputBlob,
            outputUrl: URL.createObjectURL(outputBlob),
            originalSize: file.size,
            outputSize: outputBlob.size,
          })
        }

        setFiles((prev) => [...prev, ...next])
        setStatus("done")
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : "Conversion failed")
        setStatus("error")
      }
    },
    [format, quality],
  )

  const compareFile = useCallback(async (file: File) => {
    setStatus("converting")
    setError(null)
    try {
      const heic2any = await loadHeic2Any()
      const jpgBlobRaw = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.9 })
      const jpgBlob = Array.isArray(jpgBlobRaw) ? jpgBlobRaw[0] : jpgBlobRaw
      const pngBlobRaw = await heic2any({ blob: file, toType: "image/png" })
      const pngBlob = Array.isArray(pngBlobRaw) ? pngBlobRaw[0] : pngBlobRaw

      // Free old object URLs first
      setCompareResult((prev) => {
        if (prev) {
          URL.revokeObjectURL(prev.heicUrl)
          URL.revokeObjectURL(prev.jpgUrl)
          URL.revokeObjectURL(prev.pngUrl)
        }
        return {
          fileName: file.name.replace(/\.(heic|heif)$/i, ""),
          heicSize: file.size,
          jpgSize: jpgBlob.size,
          pngSize: pngBlob.size,
          heicUrl: URL.createObjectURL(file),
          jpgUrl: URL.createObjectURL(jpgBlob),
          pngUrl: URL.createObjectURL(pngBlob),
        }
      })
      setStatus("done")
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "Compare failed")
      setStatus("error")
    }
  }, [])

  const loadCompareSample = useCallback(
    async (samplePath: string) => {
      try {
        const res = await fetch(samplePath)
        if (!res.ok) throw new Error(`Failed to load sample (${res.status})`)
        const blob = await res.blob()
        const fileName = samplePath.split("/").pop() ?? "sample.heic"
        const file = new File([blob], fileName, { type: "image/heic" })
        await compareFile(file)
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : "Failed to load sample")
      }
    },
    [compareFile],
  )

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return
      const valid: File[] = []
      const skipped: string[] = []
      for (const file of Array.from(fileList)) {
        const lower = file.name.toLowerCase()
        if (ACCEPTED_EXTENSIONS.some((ext) => lower.endsWith(ext))) {
          valid.push(file)
        } else {
          skipped.push(file.name)
        }
      }
      if (skipped.length > 0) {
        setError(`Skipped non-HEIC: ${skipped.join(", ")}`)
      }
      if (valid.length > 0) {
        if (mode === "compare") {
          void compareFile(valid[0])
        } else {
          void convertFiles(valid)
        }
      }
    },
    [mode, convertFiles, compareFile],
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

  const handleClear = useCallback(() => {
    files.forEach((f) => URL.revokeObjectURL(f.outputUrl))
    setFiles([])
    setStatus("idle")
    setError(null)
  }, [files])

  return (
    <div className="space-y-6">
      {/* Mode tabs */}
      <div className="flex gap-1 rounded-md border bg-[var(--muted-bg)]/40 p-1 text-sm">
        <button
          type="button"
          onClick={() => setMode("convert")}
          className={`flex-1 rounded px-3 py-1.5 transition ${
            mode === "convert"
              ? "bg-[var(--card)] font-medium shadow-sm"
              : "text-[var(--muted)] hover:text-[var(--foreground)]"
          }`}
        >
          Convert
        </button>
        <button
          type="button"
          onClick={() => setMode("compare")}
          className={`flex-1 rounded px-3 py-1.5 transition ${
            mode === "compare"
              ? "bg-[var(--card)] font-medium shadow-sm"
              : "text-[var(--muted)] hover:text-[var(--foreground)]"
          }`}
        >
          Compare formats
        </button>
      </div>

      {mode === "convert" ? (
        <p className="text-sm text-[var(--muted)]">
          Drop one or more HEIC files. They&apos;re converted locally to your chosen format and
          ready to download.
        </p>
      ) : (
        <p className="text-sm text-[var(--muted)]">
          Drop a single HEIC and see what it looks like as JPG and PNG side-by-side, with the real
          file sizes for that exact photo.
        </p>
      )}

      {/* Convert-mode controls */}
      {mode === "convert" && (
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <label className="flex items-center gap-2">
            <span className="text-[var(--muted)]">Output</span>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as "jpg" | "png")}
              className="rounded-md border bg-[var(--card)] px-2 py-1 text-sm"
            >
              <option value="jpg">JPG</option>
              <option value="png">PNG</option>
            </select>
          </label>
          {format === "jpg" && (
            <label className="flex items-center gap-2">
              <span className="text-[var(--muted)]">Quality</span>
              <input
                type="range"
                min="0.5"
                max="1"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-32 accent-[var(--accent)]"
              />
              <span className="font-mono text-xs">{Math.round(quality * 100)}</span>
            </label>
          )}
        </div>
      )}

      {/* Drop zone */}
      <div
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--border)] bg-[var(--muted-bg)]/40 px-6 py-12 text-center transition"
      >
        <p className="mb-1 text-base font-medium">
          {mode === "convert" ? "Drop HEIC files here" : "Drop a single HEIC to compare"}
        </p>
        <p className="mb-4 text-sm text-[var(--muted)]">
          {mode === "convert"
            ? "or click to browse — multiple files supported, processed locally"
            : "or click to browse — converts to JPG + PNG side-by-side"}
        </p>
        <label className="cursor-pointer rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-fg)] transition hover:bg-[var(--accent-hover)]">
          {mode === "convert" ? "Choose files" : "Choose file"}
          <input
            type="file"
            accept=".heic,.heif,image/heic,image/heif"
            multiple={mode === "convert"}
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
        </label>
      </div>

      {/* Compare-mode samples */}
      {mode === "compare" && !compareResult && status !== "converting" && (
        <div className="rounded-lg border bg-[var(--muted-bg)]/30 p-4">
          <div className="mb-2 text-sm font-semibold">No HEIC handy? Try a sample:</div>
          <div className="flex flex-wrap gap-2 text-xs">
            {COMPARE_SAMPLES.map((s) => (
              <button
                key={s.path}
                type="button"
                onClick={() => loadCompareSample(s.path)}
                className="rounded-md border bg-[var(--card)] px-3 py-1.5 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Status */}
      {status === "converting" && (
        <p className="text-center text-sm text-[var(--muted)]">Converting…</p>
      )}
      {error && (
        <p className="rounded-md border border-[var(--error)]/30 bg-[var(--error)]/10 px-3 py-2 text-sm text-[var(--error)]">
          {error}
        </p>
      )}

      {/* Convert-mode results */}
      {mode === "convert" && files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Converted ({files.length})</h3>
            <button
              type="button"
              onClick={handleClear}
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Clear all
            </button>
          </div>
          <ul className="space-y-2">
            {files.map((file) => (
              <li
                key={file.id}
                className="flex items-center justify-between gap-4 rounded-md border bg-[var(--card)] px-3 py-2 text-sm"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{file.outputName}</div>
                  <div className="text-xs text-[var(--muted)]">
                    {formatBytes(file.originalSize)} → {formatBytes(file.outputSize)} (
                    {Math.round((file.outputSize / file.originalSize) * 100)}%)
                  </div>
                </div>
                <a
                  href={file.outputUrl}
                  download={file.outputName}
                  className="rounded-md border px-3 py-1 text-xs font-medium hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Compare-mode results */}
      {mode === "compare" && compareResult && (
        <div className="space-y-4">
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
                    Download
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">HEIC (original)</td>
                  <td className="px-4 py-3 font-mono">{formatBytes(compareResult.heicSize)}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">baseline</td>
                  <td className="px-4 py-3">
                    <a
                      href={compareResult.heicUrl}
                      download={`${compareResult.fileName}.heic`}
                      className="text-[var(--accent)] hover:underline"
                    >
                      .heic ↓
                    </a>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">JPG (quality 90)</td>
                  <td className="px-4 py-3 font-mono">{formatBytes(compareResult.jpgSize)}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {ratio(compareResult.jpgSize, compareResult.heicSize)}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={compareResult.jpgUrl}
                      download={`${compareResult.fileName}.jpg`}
                      className="text-[var(--accent)] hover:underline"
                    >
                      .jpg ↓
                    </a>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">PNG (lossless)</td>
                  <td className="px-4 py-3 font-mono">{formatBytes(compareResult.pngSize)}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {ratio(compareResult.pngSize, compareResult.heicSize)}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={compareResult.pngUrl}
                      download={`${compareResult.fileName}.png`}
                      className="text-[var(--accent)] hover:underline"
                    >
                      .png ↓
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <div className="mb-2 text-sm font-semibold">Side-by-side preview</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <figure className="rounded-lg border bg-[var(--card)] p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={compareResult.jpgUrl}
                  alt="JPG render"
                  className="h-auto w-full rounded object-contain"
                  style={{ maxHeight: 400 }}
                />
                <figcaption className="mt-2 text-center text-xs text-[var(--muted)]">
                  JPG · {formatBytes(compareResult.jpgSize)}
                </figcaption>
              </figure>
              <figure className="rounded-lg border bg-[var(--card)] p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={compareResult.pngUrl}
                  alt="PNG render"
                  className="h-auto w-full rounded object-contain"
                  style={{ maxHeight: 400 }}
                />
                <figcaption className="mt-2 text-center text-xs text-[var(--muted)]">
                  PNG · {formatBytes(compareResult.pngSize)}
                </figcaption>
              </figure>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (compareResult) {
                URL.revokeObjectURL(compareResult.heicUrl)
                URL.revokeObjectURL(compareResult.jpgUrl)
                URL.revokeObjectURL(compareResult.pngUrl)
              }
              setCompareResult(null)
              setStatus("idle")
              setError(null)
            }}
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            Clear and try another file
          </button>
        </div>
      )}
    </div>
  )
}

// Disable SSR — heic2any references `window` / Web Workers
export const HeicToJpgUI = dynamic(() => Promise.resolve(HeicToJpgUIInner), {
  ssr: false,
  loading: () => (
    <div className="py-12 text-center text-sm text-[var(--muted)]">Loading converter…</div>
  ),
})
