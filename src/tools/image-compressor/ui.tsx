"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { track, trackError } from "@/lib/analytics"
import { useConfirm } from "@/components/ConfirmProvider"
import { optimise } from "@jsquash/oxipng"
import { Imagequant, ImagequantImage } from "imagequant"

interface Job {
  id: string
  file: File
  origSize: number
  origUrl: string
  out?: { blob: Blob; url: string; size: number; ext: string }
  error?: string
  busy: boolean
  quality: number
  isLossless: boolean
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function extOf(mime: string): string {
  if (mime === "image/jpeg") return "jpg"
  if (mime === "image/png") return "png"
  if (mime === "image/webp") return "webp"
  if (mime === "image/avif") return "avif"
  return mime.split("/")[1] || "img"
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image()
    img.onload = () => res(img)
    img.onerror = rej
    img.src = url
  })
}

function toExactArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const copy = new Uint8Array(bytes.byteLength)
  copy.set(bytes)
  return copy.buffer
}

async function compressFile(file: File, quality: number, isLossless: boolean): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer()

  if (file.type === "image/png") {
    if (isLossless) {
      const optimised = await optimise(arrayBuffer, { level: 2 })
      return new Blob([optimised], { type: "image/png" })
    }

    let iq: Imagequant | undefined
    let iqImg: ImagequantImage | undefined

    try {
      const url = URL.createObjectURL(file)
      let imageData: ImageData

      try {
        const img = await loadImage(url)
        const canvas = document.createElement("canvas")
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight

        const ctx = canvas.getContext("2d")
        if (!ctx) throw new Error("Canvas context failed")

        ctx.drawImage(img, 0, 0)
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      } finally {
        URL.revokeObjectURL(url)
      }

      iq = new Imagequant()
      iq.set_quality(0, quality)

      const pixels = new Uint8Array(imageData.data.buffer.slice(0))
      iqImg = new ImagequantImage(pixels, imageData.width, imageData.height, 0)

      const quantizedPng = iq.process(iqImg)
      iqImg = undefined
      const polished = await optimise(toExactArrayBuffer(quantizedPng), { level: 1 })

      return new Blob([polished], { type: "image/png" })
    } finally {
      iqImg?.free()
      iq?.free()
    }
  }

  const url = URL.createObjectURL(file)
  try {
    const img = await loadImage(url)
    const canvas = document.createElement("canvas")
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("Canvas context failed")
    ctx.drawImage(img, 0, 0)

    const targetType =
      file.type === "image/jpeg" || file.type === "image/webp" ? file.type : "image/jpeg"
    const effectiveQuality = isLossless ? 1.0 : quality / 100

    return new Promise((res, rej) => {
      canvas.toBlob(
        (b) => (b ? res(b) : rej(new Error("Encoding failed"))),
        targetType,
        effectiveQuality,
      )
    })
  } finally {
    URL.revokeObjectURL(url)
  }
}

function ImageCompressorInner() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [globalQuality, setGlobalQuality] = useState(80)
  const [globalLossless, setGlobalLossless] = useState(false)
  const dropRef = useRef<HTMLDivElement | null>(null)
  const jobsRef = useRef<Job[]>([])
  const confirm = useConfirm()

  useEffect(() => {
    track("tool_open", { tool_slug: "image-compressor" })
  }, [])

  useEffect(() => {
    jobsRef.current = jobs
  }, [jobs])

  const runOne = useCallback(
    async (id: string, overrideQuality?: number, overrideLossless?: boolean, manualJob?: Job) => {
      let targetFile: File
      let targetQuality: number
      let targetLossless: boolean

      if (manualJob) {
        targetFile = manualJob.file
        targetQuality = overrideQuality ?? manualJob.quality
        targetLossless = overrideLossless ?? manualJob.isLossless
      } else {
        const j = jobs.find((x) => x.id === id)
        if (!j) return
        targetFile = j.file
        targetQuality = overrideQuality ?? j.quality
        targetLossless = overrideLossless ?? j.isLossless
      }

      setJobs((prev) =>
        prev.map((x) =>
          x.id === id
            ? {
                ...x,
                busy: true,
                error: undefined,
                quality: targetQuality,
                isLossless: targetLossless,
              }
            : x,
        ),
      )

      try {
        const blob = await compressFile(targetFile, targetQuality, targetLossless)
        const outMime = blob.type
        const ext = extOf(outMime)
        const url = URL.createObjectURL(blob)

        setJobs((prev) =>
          prev.map((x) =>
            x.id === id
              ? (() => {
                  if (x.out) URL.revokeObjectURL(x.out.url)
                  return {
                    ...x,
                    busy: false,
                    out: { blob, url, size: blob.size, ext },
                  }
                })()
              : x,
          ),
        )
        track("convert_success", { tool_slug: "image-compressor" })
      } catch (err) {
        trackError("image-compressor", err)
        setJobs((prev) =>
          prev.map((x) =>
            x.id === id
              ? { ...x, busy: false, error: err instanceof Error ? err.message : String(err) }
              : x,
          ),
        )
      }
    },
    [jobs],
  )

  const addFiles = useCallback(
    (fileList: FileList | File[] | null) => {
      if (!fileList) return
      const incoming = Array.from(fileList).filter((f) => f.type.startsWith("image/"))
      if (incoming.length === 0) return

      const newJobs: Job[] = incoming.map((file) => ({
        id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        origSize: file.size,
        origUrl: URL.createObjectURL(file),
        busy: true,
        quality: globalQuality,
        isLossless: globalLossless && file.type !== "image/jpeg",
      }))

      setJobs((prev) => [...newJobs, ...prev])

      newJobs.forEach((j) => {
        runOne(j.id, j.quality, j.isLossless, j)
      })

      incoming.forEach((file) => {
        track("file_dropped", {
          tool_slug: "image-compressor",
          file_type: file.type,
          file_size_kb: Math.round(file.size / 1024),
        })
      })
    },
    [globalLossless, globalQuality, runOne],
  )

  // Clipboard paste support
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return
      const files: File[] = []
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith("image/")) {
          const file = items[i].getAsFile()
          if (file) files.push(file)
        }
      }
      if (files.length > 0) addFiles(files)
    }
    window.addEventListener("paste", handlePaste)
    return () => window.removeEventListener("paste", handlePaste)
  }, [addFiles])

  useEffect(() => {
    return () => {
      jobsRef.current.forEach((j) => {
        URL.revokeObjectURL(j.origUrl)
        if (j.out) URL.revokeObjectURL(j.out.url)
      })
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      dropRef.current?.classList.remove("ring-2", "ring-[var(--accent)]")
      addFiles(e.dataTransfer.files)
    },
    [addFiles],
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dropRef.current?.classList.add("ring-2", "ring-[var(--accent)]")
  }, [])

  const handleDragLeave = useCallback(() => {
    dropRef.current?.classList.remove("ring-2", "ring-[var(--accent)]")
  }, [])

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

  const handleClear = useCallback(() => {
    jobs.forEach((j) => {
      URL.revokeObjectURL(j.origUrl)
      if (j.out) URL.revokeObjectURL(j.out.url)
    })
    setJobs([])
  }, [jobs])

  return (
    <div className="space-y-6">
      <p className="text-sm text-[var(--muted)]">
        Professional image compression powered by Squoosh WASM codecs. Featuring oxipng for lossless
        optimization and imagequant for lossy quantization. Processed locally — your files never
        leave your computer.
      </p>

      {/* Drop zone */}
      <div
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--border)] bg-[var(--muted-bg)]/40 px-6 py-12 text-center transition"
      >
        <p className="mb-1 text-base font-medium">Drop images here</p>
        <p className="mb-4 text-sm text-[var(--muted)]">
          or click to browse — supports JPG, PNG, WebP (Ctrl+V to paste)
        </p>
        <label className="cursor-pointer rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-fg)] transition hover:bg-[var(--accent-hover)]">
          Choose files
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => addFiles(e.target.files)}
            className="hidden"
          />
        </label>
      </div>

      {/* Global Config Bar */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-lg border bg-[var(--card)] px-4 py-3 text-sm">
        <label
          className={`flex items-center gap-3 transition-opacity ${globalLossless ? "opacity-30" : ""}`}
        >
          <span className="text-[var(--muted)]">Compression quality</span>
          <input
            type="range"
            min={5}
            max={100}
            step={5}
            value={globalQuality}
            disabled={globalLossless}
            onChange={(e) => setGlobalQuality(Number(e.target.value))}
            className="w-40 accent-[var(--accent)] disabled:cursor-not-allowed"
          />
          <span className="w-8 text-right font-mono text-xs">{globalQuality}%</span>
        </label>

        <div className="flex items-center gap-2">
          <span className="text-[var(--muted)]">Mode:</span>
          <div className="flex items-center gap-1 rounded-md bg-[var(--muted-bg)] p-0.5">
            <button
              onClick={() => setGlobalLossless(false)}
              className={`rounded px-3 py-1 text-xs font-medium transition ${
                !globalLossless
                  ? "bg-[var(--card)] text-[var(--accent)] shadow-sm"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              Lossy
            </button>
            <button
              onClick={() => setGlobalLossless(true)}
              className={`rounded px-3 py-1 text-xs font-medium transition ${
                globalLossless
                  ? "bg-[var(--card)] text-[var(--accent)] shadow-sm"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              Lossless
            </button>
          </div>
        </div>

        <span className="ml-auto text-xs text-[var(--muted)]">
          Default for new uploads. Adjust per-image below anytime.
        </span>
      </div>

      {/* Results list */}
      {jobs.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Images ({jobs.length})</h2>
            <button
              type="button"
              onClick={() =>
                confirm({
                  title: "Clear all results?",
                  description: "This will remove all compressed images from the list.",
                  confirmText: "Clear all",
                  isDanger: true,
                  onConfirm: handleClear,
                })
              }
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Clear all
            </button>
          </div>
          {jobs.map((j) => (
            <ResultBlock
              key={j.id}
              job={j}
              onRemove={() =>
                confirm({
                  title: "Remove image?",
                  description: "This will remove this image from the list.",
                  confirmText: "Remove",
                  isDanger: true,
                  onConfirm: () => removeJob(j.id),
                })
              }
              onQualityChange={(q) => runOne(j.id, q, j.isLossless)}
              onModeChange={(l) => runOne(j.id, j.quality, l)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ResultBlock({
  job,
  onRemove,
  onQualityChange,
  onModeChange,
}: {
  job: Job
  onRemove: () => void
  onQualityChange: (q: number) => void
  onModeChange: (l: boolean) => void
}) {
  const [localQuality, setLocalQuality] = useState(job.quality)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pending = localQuality !== job.quality || job.busy
  const isPng = job.file.type === "image/png"

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  const handleSliderChange = (q: number) => {
    setLocalQuality(q)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      onQualityChange(q)
    }, 300)
  }

  const ratioLabel = job.out
    ? `${((1 - job.out.size / job.origSize) * 100).toFixed(1)}% smaller`
    : "..."

  return (
    <section className="space-y-3 rounded-lg border bg-[var(--card)]/30 p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="truncate font-medium">{job.file.name}</h3>
        <button
          type="button"
          onClick={onRemove}
          className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          Remove
        </button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <FormatCard
          badge="Original"
          format={extOf(job.file.type).toUpperCase()}
          previewUrl={job.origUrl}
          previewAlt="Original image"
          size={job.origSize}
          ratioLabel="baseline"
          downloadUrl={job.origUrl}
          downloadName={job.file.name}
          note="Original source file"
        />
        <FormatCard
          badge={job.busy ? "Processing..." : `Compressed ${pending ? "..." : ""}`}
          format={job.out ? job.out.ext.toUpperCase() : "..."}
          previewUrl={job.out ? job.out.url : job.origUrl}
          previewAlt="Compressed image"
          size={job.out ? job.out.size : 0}
          ratioLabel={job.out ? ratioLabel : "calculating..."}
          downloadUrl={job.out ? job.out.url : "#"}
          downloadName={job.out ? `${job.file.name.replace(/\.[^.]+$/, "")}.${job.out.ext}` : ""}
          note={
            job.isLossless
              ? "Lossless (oxipng WASM)"
              : isPng
                ? `Lossy WASM (imagequant)`
                : `Quality ${localQuality}%`
          }
          extra={
            <div className="space-y-2">
              <div className="flex w-fit items-center gap-1 rounded-md bg-[var(--muted-bg)] p-0.5">
                <button
                  onClick={() => onModeChange(false)}
                  className={`rounded px-2 py-0.5 text-[10px] font-medium transition ${
                    !job.isLossless
                      ? "bg-[var(--card)] text-[var(--accent)] shadow-sm"
                      : "text-[var(--muted)]"
                  }`}
                >
                  Lossy
                </button>
                <button
                  onClick={() => onModeChange(true)}
                  disabled={job.file.type === "image/jpeg"}
                  className={`rounded px-2 py-0.5 text-[10px] font-medium transition ${
                    job.isLossless
                      ? "bg-[var(--card)] text-[var(--accent)] shadow-sm"
                      : "text-[var(--muted)]"
                  } disabled:opacity-30`}
                >
                  Lossless
                </button>
              </div>
              {!job.isLossless && (
                <label className="flex items-center gap-2 text-xs">
                  <span className="text-[10px] text-[var(--muted)]">Q</span>
                  <input
                    type="range"
                    min={5}
                    max={100}
                    step={5}
                    value={localQuality}
                    onChange={(e) => handleSliderChange(Number(e.target.value))}
                    className="flex-1 accent-[var(--accent)]"
                  />
                  <span className="w-7 text-right font-mono text-[10px]">{localQuality}%</span>
                </label>
              )}
            </div>
          }
        />
      </div>
      {job.error && <p className="mt-2 text-xs text-[var(--error)]">Error: {job.error}</p>}
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
      <div className="flex aspect-[16/9] items-center justify-center overflow-hidden bg-[var(--muted-bg)]/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={previewUrl} alt={previewAlt} className="h-full w-full object-contain" />
      </div>
      <figcaption className="flex flex-1 flex-col gap-2 border-t p-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">{format}</span>
          <span className="rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[9px] tracking-wider text-[var(--muted)] uppercase">
            {badge}
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-2 text-sm">
          <span className="font-mono text-xs">{size > 0 ? formatBytes(size) : "..."}</span>
          <span className="text-[10px] text-[var(--muted)]">{ratioLabel}</span>
        </div>
        <div className="text-[10px] text-[var(--muted)]">{note}</div>
        {extra}
        <a
          href={downloadUrl}
          download={downloadName}
          className={`mt-auto rounded-md border border-[var(--accent)]/40 px-3 py-1.5 text-center text-xs font-medium text-[var(--accent)] transition hover:bg-[var(--accent)]/10 ${
            !downloadName ? "pointer-events-none opacity-30" : ""
          }`}
        >
          Download {downloadName ? `.${downloadName.split(".").pop()}` : ""}
        </a>
      </figcaption>
    </figure>
  )
}

export const ImageCompressorUI = dynamic(() => Promise.resolve(ImageCompressorInner), {
  ssr: false,
  loading: () => (
    <div className="py-12 text-center text-sm text-[var(--muted)]">Loading compressor…</div>
  ),
})
