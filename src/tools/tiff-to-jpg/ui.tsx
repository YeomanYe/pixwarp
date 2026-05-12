"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import * as UTIF from "utif"
import { useConfirm } from "@/components/ConfirmProvider"
import { FileDropzone } from "@/components/tool-shell/FileDropzone"
import { ProcessingPanel } from "@/components/tool-shell/ProcessingPanel"
import { track, trackError } from "@/lib/analytics"
import { recordHistory } from "@/lib/history"
import { canvasToBlob, downloadUrl as saveUrl, formatBytes } from "../shared/image-utils"

type Status = "idle" | "processing" | "success" | "error"

interface TiffResult {
  id: string
  sourceName: string
  outputName: string
  sourceUrl: string
  outputUrl: string
  sourceFile: File
  sourceSize: number
  outputSize: number
  width: number
  height: number
  quality: number
}

function basename(fileName: string) {
  return fileName.replace(/\.[^.]+$/, "")
}

function isTiff(file: File) {
  const name = file.name.toLowerCase()
  return file.type === "image/tiff" || name.endsWith(".tif") || name.endsWith(".tiff")
}

function ratio(a: number, b: number): string {
  if (b === 0) return "-"
  const r = a / b
  return r >= 1 ? `${r.toFixed(2)}x larger` : `${(1 / r).toFixed(2)}x smaller`
}

async function decodeTiffToJpg(file: File, quality: number): Promise<TiffResult> {
  const buffer = await file.arrayBuffer()
  const ifds = UTIF.decode(buffer)
  if (ifds.length === 0) {
    throw new Error("No image pages found in this TIFF file.")
  }

  let decoded = ifds[0]
  let rgba: Uint8Array | null = null
  for (const ifd of ifds) {
    try {
      UTIF.decodeImage(buffer, ifd)
      if (!ifd.width || !ifd.height) continue
      rgba = UTIF.toRGBA8(ifd)
      decoded = ifd
      break
    } catch {
      continue
    }
  }

  if (!rgba || !decoded.width || !decoded.height) {
    throw new Error("This TIFF variant could not be decoded in the browser.")
  }

  const canvas = document.createElement("canvas")
  canvas.width = decoded.width
  canvas.height = decoded.height
  const context = canvas.getContext("2d")
  if (!context) throw new Error("Canvas is unavailable in this browser.")

  context.fillStyle = "#ffffff"
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.putImageData(
    new ImageData(new Uint8ClampedArray(rgba), canvas.width, canvas.height),
    0,
    0,
  )

  const flattened = document.createElement("canvas")
  flattened.width = canvas.width
  flattened.height = canvas.height
  const flatContext = flattened.getContext("2d")
  if (!flatContext) throw new Error("Canvas is unavailable in this browser.")
  flatContext.fillStyle = "#ffffff"
  flatContext.fillRect(0, 0, flattened.width, flattened.height)
  flatContext.drawImage(canvas, 0, 0)

  const blob = await canvasToBlob(flattened, "image/jpeg", quality)
  const outputName = `${basename(file.name)}.jpg`
  return {
    id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`,
    sourceName: file.name,
    outputName,
    sourceUrl: URL.createObjectURL(file),
    outputUrl: URL.createObjectURL(blob),
    sourceFile: file,
    sourceSize: file.size,
    outputSize: blob.size,
    width: canvas.width,
    height: canvas.height,
    quality: Math.round(quality * 100),
  }
}

function TiffToJpgInner() {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const [quality, setQuality] = useState(90)
  const [results, setResults] = useState<TiffResult[]>([])
  const resultsRef = useRef<TiffResult[]>([])
  const confirm = useConfirm()

  useEffect(() => {
    track("tool_open", { tool_slug: "tiff-to-jpg" })
  }, [])

  useEffect(() => {
    resultsRef.current = results
  }, [results])

  useEffect(() => {
    return () => {
      resultsRef.current.forEach((result) => {
        URL.revokeObjectURL(result.sourceUrl)
        URL.revokeObjectURL(result.outputUrl)
      })
    }
  }, [])

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const incoming = Array.from(files).filter(isTiff)
      if (incoming.length === 0) {
        setStatus("error")
        setError("No .tif or .tiff file found.")
        return
      }

      setStatus("processing")
      setError(null)
      const converted: TiffResult[] = []

      for (const file of incoming) {
        try {
          track("file_dropped", {
            tool_slug: "tiff-to-jpg",
            file_type: file.type || "image/tiff",
            file_size_kb: Math.round(file.size / 1024),
          })
          const result = await decodeTiffToJpg(file, quality / 100)
          converted.push(result)
          recordHistory({
            tool: "tiff-to-jpg",
            fileName: file.name,
            outputName: result.outputName,
            inputBytes: file.size,
            outputBytes: result.outputSize,
          })
        } catch (conversionError) {
          setError(
            conversionError instanceof Error ? conversionError.message : "TIFF conversion failed.",
          )
          trackError("tiff-to-jpg", conversionError)
        }
      }

      setResults((previous) => [...converted, ...previous])
      setStatus(converted.length > 0 ? "success" : "error")
      if (converted.length > 0) {
        track("convert_success", { tool_slug: "tiff-to-jpg", count: converted.length })
      }
    },
    [quality],
  )

  const removeResult = useCallback((id: string) => {
    setResults((previous) => {
      const target = previous.find((result) => result.id === id)
      if (target) {
        URL.revokeObjectURL(target.sourceUrl)
        URL.revokeObjectURL(target.outputUrl)
      }
      return previous.filter((result) => result.id !== id)
    })
  }, [])

  const clearResults = useCallback(() => {
    results.forEach((result) => {
      URL.revokeObjectURL(result.sourceUrl)
      URL.revokeObjectURL(result.outputUrl)
    })
    setResults([])
    setStatus("idle")
    setError(null)
  }, [results])

  const adjustJpgQuality = useCallback(
    async (id: string, nextQuality: number) => {
      const target = results.find((result) => result.id === id)
      if (!target) return
      try {
        const next = await decodeTiffToJpg(target.sourceFile, nextQuality / 100)
        URL.revokeObjectURL(next.sourceUrl)
        setResults((previous) =>
          previous.map((result) => {
            if (result.id !== id) return result
            URL.revokeObjectURL(result.outputUrl)
            return {
              ...result,
              outputUrl: next.outputUrl,
              outputSize: next.outputSize,
              quality: nextQuality,
            }
          }),
        )
      } catch (conversionError) {
        setError(conversionError instanceof Error ? conversionError.message : "Re-encode failed.")
        trackError("tiff-to-jpg", conversionError)
      }
    },
    [results],
  )

  return (
    <div className="space-y-6">
      <p className="text-sm text-[var(--muted)]">
        Convert scanner, archive, and print TIFF files into JPG without uploading them. Multi-page
        TIFF files export the first decodable image page.
      </p>

      <FileDropzone
        title="Drop TIFF images here"
        description="or click to browse - .tif and .tiff files supported, processed locally"
        accept=".tif,.tiff,image/tiff"
        onFiles={handleFiles}
      >
        <ProcessingPanel
          state={status}
          idleText="Waiting for TIFF source images."
          processingText="Decoding TIFF and exporting JPG locally..."
          successText="JPG output is ready below."
          errorText={error ?? "TIFF conversion failed."}
        />
      </FileDropzone>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-lg border bg-[var(--card)] px-4 py-3 text-sm">
        <label className="flex items-center gap-3">
          <span className="text-[var(--muted)]">JPG output quality</span>
          <input
            type="range"
            min={40}
            max={100}
            step={1}
            value={quality}
            onChange={(event) => setQuality(Number(event.target.value))}
            className="w-40 accent-[var(--accent)]"
          />
          <span className="w-9 text-right font-mono text-xs">{quality}</span>
        </label>
        <span className="text-xs text-[var(--muted)]">
          Default for new conversions. Each result below has its own slider too.
        </span>
      </div>

      {results.length > 0 ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Converted ({results.length})</h2>
            <button
              type="button"
              onClick={() =>
                confirm({
                  title: "Clear all conversions?",
                  description: "This removes the generated JPG previews from this page.",
                  confirmText: "Clear all",
                  isDanger: true,
                  onConfirm: clearResults,
                })
              }
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Clear all
            </button>
          </div>
          {results.map((result) => (
            <ResultBlock
              key={result.id}
              result={result}
              onRemove={() =>
                confirm({
                  title: "Remove conversion?",
                  description: "This removes this result from the list.",
                  confirmText: "Remove",
                  isDanger: true,
                  onConfirm: () => removeResult(result.id),
                })
              }
              onQualityChange={(nextQuality) => adjustJpgQuality(result.id, nextQuality)}
            />
          ))}
        </section>
      ) : null}
    </div>
  )
}

function ResultBlock({
  result,
  onRemove,
  onQualityChange,
}: {
  result: TiffResult
  onRemove: () => void
  onQualityChange: (quality: number) => void
}) {
  const [localQuality, setLocalQuality] = useState(result.quality)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pending = localQuality !== result.quality

  const handleSliderChange = (nextQuality: number) => {
    setLocalQuality(nextQuality)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      onQualityChange(nextQuality)
    }, 200)
  }

  return (
    <section className="space-y-3 rounded-lg border bg-[var(--card)]/30 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-medium">{result.outputName}</h3>
          <p className="text-xs text-[var(--muted)]">
            {result.width} x {result.height} - {formatBytes(result.sourceSize)} to{" "}
            {formatBytes(result.outputSize)}
          </p>
        </div>
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
          format="TIFF source"
          previewUrl={result.outputUrl}
          previewAlt={`${result.sourceName} decoded preview`}
          size={result.sourceSize}
          ratioLabel="baseline"
          downloadUrl={result.sourceUrl}
          downloadName={result.sourceName}
          note="Decoded locally from the TIFF pixels."
        />
        <FormatCard
          badge={`Quality ${localQuality}${pending ? "..." : ""}`}
          format="JPG output"
          previewUrl={result.outputUrl}
          previewAlt={result.outputName}
          size={result.outputSize}
          ratioLabel={ratio(result.outputSize, result.sourceSize)}
          downloadUrl={result.outputUrl}
          downloadName={result.outputName}
          note="Lossy output. Drag the slider to re-encode."
          extra={
            <label className="flex items-center gap-2 text-xs">
              <span className="text-[var(--muted)]">Q</span>
              <input
                type="range"
                min={40}
                max={100}
                step={1}
                value={localQuality}
                onChange={(event) => handleSliderChange(Number(event.target.value))}
                className="flex-1 accent-[var(--accent)]"
              />
              <span className="w-7 text-right font-mono">{localQuality}</span>
            </label>
          }
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
  extra?: ReactNode
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
        <div className="flex items-center justify-between gap-3">
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
        <button
          type="button"
          onClick={() => saveUrl(downloadUrl, downloadName)}
          className="mt-auto rounded-md border border-[var(--accent)]/40 px-3 py-1.5 text-center text-xs font-medium text-[var(--accent)] transition hover:bg-[var(--accent)]/10"
        >
          Download .{downloadName.split(".").pop()}
        </button>
      </figcaption>
    </figure>
  )
}

export const TiffToJpgUI = dynamic(() => Promise.resolve(TiffToJpgInner), { ssr: false })
