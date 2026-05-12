"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useRef, useState } from "react"
import * as UTIF from "utif"
import { useConfirm } from "@/components/ConfirmProvider"
import { FileDropzone } from "@/components/tool-shell/FileDropzone"
import { ProcessingPanel } from "@/components/tool-shell/ProcessingPanel"
import { track, trackError } from "@/lib/analytics"
import { recordHistory } from "@/lib/history"
import { canvasToBlob, downloadUrl as saveUrl, formatBytes } from "../shared/image-utils"

type Status = "idle" | "processing" | "success" | "error"

interface TiffPngResult {
  id: string
  sourceName: string
  outputName: string
  sourceUrl: string
  outputUrl: string
  sourceSize: number
  outputSize: number
  width: number
  height: number
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

async function decodeTiffToPng(file: File): Promise<TiffPngResult> {
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

  context.putImageData(
    new ImageData(new Uint8ClampedArray(rgba), canvas.width, canvas.height),
    0,
    0,
  )

  const blob = await canvasToBlob(canvas, "image/png")
  const outputName = `${basename(file.name)}.png`
  return {
    id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`,
    sourceName: file.name,
    outputName,
    sourceUrl: URL.createObjectURL(file),
    outputUrl: URL.createObjectURL(blob),
    sourceSize: file.size,
    outputSize: blob.size,
    width: canvas.width,
    height: canvas.height,
  }
}

function TiffToPngInner() {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<TiffPngResult[]>([])
  const resultsRef = useRef<TiffPngResult[]>([])
  const confirm = useConfirm()

  useEffect(() => {
    track("tool_open", { tool_slug: "tiff-to-png" })
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

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const incoming = Array.from(files).filter(isTiff)
    if (incoming.length === 0) {
      setStatus("error")
      setError("No .tif or .tiff file found.")
      return
    }

    setStatus("processing")
    setError(null)
    const converted: TiffPngResult[] = []

    for (const file of incoming) {
      try {
        track("file_dropped", {
          tool_slug: "tiff-to-png",
          file_type: file.type || "image/tiff",
          file_size_kb: Math.round(file.size / 1024),
        })
        const result = await decodeTiffToPng(file)
        converted.push(result)
        recordHistory({
          tool: "tiff-to-png",
          fileName: file.name,
          outputName: result.outputName,
          inputBytes: file.size,
          outputBytes: result.outputSize,
        })
      } catch (conversionError) {
        setError(
          conversionError instanceof Error ? conversionError.message : "TIFF conversion failed.",
        )
        trackError("tiff-to-png", conversionError)
      }
    }

    setResults((previous) => [...converted, ...previous])
    setStatus(converted.length > 0 ? "success" : "error")
    if (converted.length > 0) {
      track("convert_success", { tool_slug: "tiff-to-png", count: converted.length })
    }
  }, [])

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

  return (
    <div className="space-y-6">
      <p className="text-sm text-[var(--muted)]">
        Convert scanner, archive, and print TIFF files into PNG without uploading them. Multi-page
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
          processingText="Decoding TIFF and exporting PNG locally..."
          successText="PNG output is ready below."
          errorText={error ?? "TIFF conversion failed."}
        />
      </FileDropzone>

      <div className="rounded-lg border bg-[var(--card)] px-4 py-3 text-xs text-[var(--muted)]">
        PNG output is exported losslessly without a quality setting.
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
                  description: "This removes the generated PNG previews from this page.",
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
            />
          ))}
        </section>
      ) : null}
    </div>
  )
}

function ResultBlock({ result, onRemove }: { result: TiffPngResult; onRemove: () => void }) {
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
          badge="Decoded"
          format="TIFF decoded preview"
          previewUrl={result.outputUrl}
          previewAlt={`${result.sourceName} decoded preview`}
          size={result.sourceSize}
          ratioLabel="baseline"
          downloadUrl={result.sourceUrl}
          downloadName={result.sourceName}
          note="Preview generated from TIFF pixels; browsers do not render TIFF directly."
        />
        <FormatCard
          badge="Lossless"
          format="PNG output"
          previewUrl={result.outputUrl}
          previewAlt={result.outputName}
          size={result.outputSize}
          ratioLabel={ratio(result.outputSize, result.sourceSize)}
          downloadUrl={result.outputUrl}
          downloadName={result.outputName}
          note="Lossless output with browser-side TIFF decoding."
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

export const TiffToPngUI = dynamic(() => Promise.resolve(TiffToPngInner), { ssr: false })
