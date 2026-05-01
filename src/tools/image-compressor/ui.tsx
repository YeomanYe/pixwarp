"use client"

import { useCallback, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { track, trackError } from "@/lib/analytics"

type OutFormat = "auto" | "image/jpeg" | "image/webp" | "image/png"

interface Job {
  id: string
  file: File
  origSize: number
  origUrl: string
  out?: { blob: Blob; url: string; size: number; ext: string }
  error?: string
  busy: boolean
}

const FORMAT_LABEL: Record<OutFormat, string> = {
  auto: "Auto (keep original)",
  "image/jpeg": "JPG",
  "image/webp": "WebP",
  "image/png": "PNG (lossless)",
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1024 / 1024).toFixed(2)} MB`
}

function pickAuto(file: File): Exclude<OutFormat, "auto"> {
  if (file.type === "image/png") return "image/png"
  if (file.type === "image/webp") return "image/webp"
  return "image/jpeg"
}

function extOf(mime: string): string {
  if (mime === "image/jpeg") return "jpg"
  if (mime === "image/webp") return "webp"
  if (mime === "image/png") return "png"
  return "bin"
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error("Failed to load image"))
    img.src = src
  })
}

async function compressFile(file: File, format: OutFormat, quality: number): Promise<Blob> {
  const url = URL.createObjectURL(file)
  try {
    const img = await loadImage(url)
    const canvas = document.createElement("canvas")
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("Failed to get canvas context")
    ctx.drawImage(img, 0, 0)
    const outMime = format === "auto" ? pickAuto(file) : format
    const blob = await new Promise<Blob | null>((res) =>
      canvas.toBlob(res, outMime, outMime === "image/png" ? undefined : quality / 100),
    )
    if (!blob) throw new Error("Failed to encode image")
    return blob
  } finally {
    URL.revokeObjectURL(url)
  }
}

function ImageCompressorInner() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [format, setFormat] = useState<OutFormat>("auto")
  const [quality, setQuality] = useState(80)
  const [batchBusy, setBatchBusy] = useState(false)

  useEffect(() => {
    track("tool_open", { tool_slug: "image-compressor" })
  }, [])

  useEffect(
    () => () => {
      jobs.forEach((j) => {
        URL.revokeObjectURL(j.origUrl)
        if (j.out) URL.revokeObjectURL(j.out.url)
      })
    },
    [jobs],
  )

  const addFiles = useCallback((files: FileList | File[]) => {
    const incoming = Array.from(files).filter((f) => f.type.startsWith("image/"))
    setJobs((prev) => [
      ...prev,
      ...incoming.map((file) => ({
        id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        origSize: file.size,
        origUrl: URL.createObjectURL(file),
        busy: false,
      })),
    ])
    incoming.forEach((file) => {
      track("file_dropped", {
        tool_slug: "image-compressor",
        file_type: file.type,
        file_size_kb: Math.round(file.size / 1024),
      })
    })
  }, [])

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files)
    e.target.value = ""
  }

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files)
  }

  const removeJob = useCallback((id: string) => {
    setJobs((prev) => {
      const j = prev.find((x) => x.id === id)
      if (j) {
        URL.revokeObjectURL(j.origUrl)
        if (j.out) URL.revokeObjectURL(j.out.url)
      }
      return prev.filter((x) => x.id !== id)
    })
  }, [])

  const runOne = useCallback(
    async (id: string) => {
      const j = jobs.find((x) => x.id === id)
      if (!j) return
      setJobs((prev) => prev.map((x) => (x.id === id ? { ...x, busy: true, error: undefined } : x)))
      try {
        const blob = await compressFile(j.file, format, quality)
        const outMime = blob.type
        const ext = extOf(outMime)
        const url = URL.createObjectURL(blob)
        setJobs((prev) =>
          prev.map((x) =>
            x.id === id
              ? {
                  ...x,
                  busy: false,
                  out: { blob, url, size: blob.size, ext },
                }
              : x,
          ),
        )
        track("convert_success", { tool_slug: "image-compressor" })
      } catch (err) {
        setJobs((prev) =>
          prev.map((x) =>
            x.id === id
              ? { ...x, busy: false, error: err instanceof Error ? err.message : String(err) }
              : x,
          ),
        )
        trackError("image-compressor", err)
      }
    },
    [jobs, format, quality],
  )

  const runAll = useCallback(async () => {
    setBatchBusy(true)
    for (const j of jobs) {
      if (!j.out) await runOne(j.id)
    }
    setBatchBusy(false)
  }, [jobs, runOne])

  const downloadOne = (j: Job) => {
    if (!j.out) return
    const a = document.createElement("a")
    a.href = j.out.url
    const base = j.file.name.replace(/\.[^.]+$/, "")
    a.download = `${base}.compressed.${j.out.ext}`
    a.click()
  }

  const totals = jobs.reduce(
    (acc, j) => {
      acc.orig += j.origSize
      acc.out += j.out?.size ?? 0
      return acc
    },
    { orig: 0, out: 0 },
  )

  return (
    <div>
      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_220px_220px_auto]">
        <label
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex min-h-[80px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-[var(--card)] p-4 text-center transition hover:border-[var(--accent)]"
        >
          <p className="text-sm font-medium">Drop images or click to add</p>
          <p className="mt-0.5 text-xs text-[var(--muted)]">JPG, PNG, WebP — multiple OK</p>
          <input type="file" accept="image/*" multiple onChange={onPick} className="hidden" />
        </label>

        <label className="flex flex-col text-sm">
          <span className="mb-1 font-medium">Output format</span>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as OutFormat)}
            className="rounded-md border bg-[var(--card)] px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none"
          >
            {(Object.keys(FORMAT_LABEL) as OutFormat[]).map((f) => (
              <option key={f} value={f}>
                {FORMAT_LABEL[f]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col text-sm">
          <span className="mb-1 font-medium">
            Quality: <span className="font-mono">{quality}</span>
            {format === "image/png" && (
              <span className="ml-1 text-xs text-[var(--muted)]">(N/A for PNG)</span>
            )}
          </span>
          <input
            type="range"
            min={10}
            max={100}
            step={5}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            disabled={format === "image/png"}
            className="w-full"
          />
        </label>

        <button
          type="button"
          onClick={runAll}
          disabled={batchBusy || jobs.length === 0}
          className="self-end rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {batchBusy ? "Compressing…" : `Compress ${jobs.length || ""}`.trim()}
        </button>
      </div>

      {jobs.length === 0 && (
        <div className="rounded-lg border border-dashed py-12 text-center text-sm text-[var(--muted)]">
          No images yet. Drop some on the left.
        </div>
      )}

      {jobs.length > 0 && (
        <>
          <ul className="divide-y rounded-lg border bg-[var(--card)]">
            {jobs.map((j) => {
              const ratio = j.out ? (1 - j.out.size / j.origSize) * 100 : null
              return (
                <li key={j.id} className="flex items-center gap-4 p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={j.origUrl}
                    alt=""
                    className="h-14 w-14 flex-shrink-0 rounded border object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{j.file.name}</div>
                    <div className="mt-0.5 text-xs text-[var(--muted)]">
                      {formatBytes(j.origSize)}
                      {j.out && (
                        <>
                          {" → "}
                          <span className="font-medium text-[var(--foreground)]">
                            {formatBytes(j.out.size)}
                          </span>
                          {ratio !== null && (
                            <span
                              className={
                                ratio >= 0 ? "ml-1.5 text-emerald-600" : "ml-1.5 text-red-600"
                              }
                            >
                              {ratio >= 0 ? `−${ratio.toFixed(0)}%` : `+${(-ratio).toFixed(0)}%`}
                            </span>
                          )}
                        </>
                      )}
                      {j.error && <span className="ml-1.5 text-red-600">{j.error}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!j.out && (
                      <button
                        type="button"
                        onClick={() => runOne(j.id)}
                        disabled={j.busy}
                        className="rounded-md border px-3 py-1.5 text-xs transition hover:border-[var(--accent)] disabled:opacity-50"
                      >
                        {j.busy ? "…" : "Compress"}
                      </button>
                    )}
                    {j.out && (
                      <button
                        type="button"
                        onClick={() => downloadOne(j)}
                        className="rounded-md bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-white transition hover:opacity-90"
                      >
                        Download
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeJob(j.id)}
                      className="rounded-md px-2 py-1.5 text-xs text-[var(--muted)] transition hover:text-red-600"
                      aria-label="Remove"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>

          {totals.out > 0 && (
            <div className="mt-3 rounded-md bg-[var(--card)] px-4 py-2 text-sm">
              <span className="text-[var(--muted)]">Total:</span> {formatBytes(totals.orig)} →{" "}
              <strong>{formatBytes(totals.out)}</strong>{" "}
              <span className="text-emerald-600">
                (−{((1 - totals.out / totals.orig) * 100).toFixed(0)}%)
              </span>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export const ImageCompressorUI = dynamic(() => Promise.resolve(ImageCompressorInner), {
  ssr: false,
  loading: () => (
    <div className="py-12 text-center text-sm text-[var(--muted)]">Loading compressor…</div>
  ),
})
