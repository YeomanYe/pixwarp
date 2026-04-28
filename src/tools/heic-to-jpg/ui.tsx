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

type Status = "idle" | "converting" | "done" | "error"

const ACCEPTED_EXTENSIONS = [".heic", ".heif"]

function makeOutputName(originalName: string, format: "jpg" | "png"): string {
  const stem = originalName.replace(/\.(heic|heif)$/i, "")
  return `${stem}.${format}`
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function HeicToJpgUIInner() {
  const [files, setFiles] = useState<ConvertedFile[]>([])
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const [format, setFormat] = useState<"jpg" | "png">("jpg")
  const [quality, setQuality] = useState(0.9)
  const dropRef = useRef<HTMLDivElement | null>(null)

  const convertFiles = useCallback(
    async (incoming: File[]) => {
      setStatus("converting")
      setError(null)

      try {
        const heic2anyModule = await import("heic2any")
        const heic2any =
          (heic2anyModule.default as unknown as Heic2Any) ?? (heic2anyModule as unknown as Heic2Any)

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
        void convertFiles(valid)
      }
    },
    [convertFiles],
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
      {/* Controls */}
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

      {/* Status */}
      {status === "converting" && (
        <p className="text-center text-sm text-[var(--muted)]">Converting…</p>
      )}
      {error && (
        <p className="rounded-md border border-[var(--error)]/30 bg-[var(--error)]/10 px-3 py-2 text-sm text-[var(--error)]">
          {error}
        </p>
      )}

      {/* Results */}
      {files.length > 0 && (
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
