"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { useConfirm } from "@/components/ConfirmProvider"
import { FileDropzone } from "@/components/tool-shell/FileDropzone"
import { ProcessingPanel } from "@/components/tool-shell/ProcessingPanel"
import { recordHistory } from "@/lib/history"
import { track, trackError } from "@/lib/analytics"
import type { ToolSlug } from "@/lib/analytics"
import { canvasToBlob, downloadUrl as saveUrl, formatBytes, loadImage } from "./image-utils"

type Status = "idle" | "processing" | "success" | "error"

interface ImageFormatConverterConfig {
  toolSlug: ToolSlug
  intro: string
  dropTitle: string
  dropDescription: string
  accept: string
  inputLabel: string
  outputLabel: string
  outputMime: "image/jpeg" | "image/png" | "image/webp"
  outputExt: "jpg" | "png" | "webp"
  defaultQuality?: number
  fillBackground?: string
  filterFile: (file: File) => boolean
  noFileError: string
}

interface ConversionResult {
  id: string
  sourceName: string
  outputName: string
  sourceUrl: string
  outputUrl: string
  sourceSize: number
  outputSize: number
  width: number
  height: number
  quality: number
}

function basename(fileName: string) {
  return fileName.replace(/\.[^.]+$/, "")
}

function ratio(a: number, b: number): string {
  if (b === 0) return "-"
  const r = a / b
  return r >= 1 ? `${r.toFixed(2)}x larger` : `${(1 / r).toFixed(2)}x smaller`
}

async function encodeUrl(
  sourceUrl: string,
  config: ImageFormatConverterConfig,
  quality: number,
): Promise<{ blob: Blob; width: number; height: number }> {
  const image = await loadImage(sourceUrl)
  const canvas = document.createElement("canvas")
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight
  const context = canvas.getContext("2d")
  if (!context) throw new Error("Canvas is unavailable in this browser.")

  if (config.fillBackground) {
    context.fillStyle = config.fillBackground
    context.fillRect(0, 0, canvas.width, canvas.height)
  }
  context.drawImage(image, 0, 0)

  const blob = await canvasToBlob(
    canvas,
    config.outputMime,
    config.outputMime === "image/png" ? undefined : quality,
  )
  return { blob, width: image.naturalWidth, height: image.naturalHeight }
}

async function convertImage(
  file: File,
  config: ImageFormatConverterConfig,
  quality: number,
): Promise<ConversionResult> {
  const sourceUrl = URL.createObjectURL(file)
  try {
    const { blob, width, height } = await encodeUrl(sourceUrl, config, quality)
    const outputName = `${basename(file.name)}.${config.outputExt}`
    return {
      id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`,
      sourceName: file.name,
      outputName,
      sourceUrl,
      outputUrl: URL.createObjectURL(blob),
      sourceSize: file.size,
      outputSize: blob.size,
      width,
      height,
      quality: Math.round(quality * 100),
    }
  } catch (error) {
    URL.revokeObjectURL(sourceUrl)
    throw error
  }
}

function ImageFormatConverterInner({ config }: { config: ImageFormatConverterConfig }) {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const [quality, setQuality] = useState(Math.round((config.defaultQuality ?? 0.9) * 100))
  const [results, setResults] = useState<ConversionResult[]>([])
  const resultsRef = useRef<ConversionResult[]>([])
  const hasQuality = config.outputMime !== "image/png"
  const confirm = useConfirm()

  useEffect(() => {
    track("tool_open", { tool_slug: config.toolSlug })
  }, [config.toolSlug])

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
      const incoming = Array.from(files).filter(config.filterFile)
      if (incoming.length === 0) {
        setStatus("error")
        setError(config.noFileError)
        return
      }

      setStatus("processing")
      setError(null)
      const converted: ConversionResult[] = []

      for (const file of incoming) {
        try {
          track("file_dropped", {
            tool_slug: config.toolSlug,
            file_type: file.type,
            file_size_kb: Math.round(file.size / 1024),
          })
          const result = await convertImage(file, config, quality / 100)
          converted.push(result)
          recordHistory({
            tool: config.toolSlug,
            fileName: file.name,
            outputName: result.outputName,
            inputBytes: file.size,
            outputBytes: result.outputSize,
          })
        } catch (conversionError) {
          setError(
            conversionError instanceof Error ? conversionError.message : "Conversion failed.",
          )
          trackError(config.toolSlug, conversionError)
        }
      }

      setResults((previous) => [...converted, ...previous])
      setStatus(converted.length > 0 ? "success" : "error")
      if (converted.length > 0) {
        track("convert_success", { tool_slug: config.toolSlug, count: converted.length })
      }
    },
    [config, quality],
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

  const adjustOutputQuality = useCallback(
    async (id: string, nextQuality: number) => {
      const target = results.find((result) => result.id === id)
      if (!target) return

      try {
        const { blob } = await encodeUrl(target.sourceUrl, config, nextQuality / 100)
        setResults((previous) =>
          previous.map((result) => {
            if (result.id !== id) return result
            URL.revokeObjectURL(result.outputUrl)
            return {
              ...result,
              outputUrl: URL.createObjectURL(blob),
              outputSize: blob.size,
              quality: nextQuality,
            }
          }),
        )
      } catch (reencodeError) {
        setError(reencodeError instanceof Error ? reencodeError.message : "Re-encode failed.")
        trackError(config.toolSlug, reencodeError)
      }
    },
    [config, results],
  )

  return (
    <div className="space-y-6">
      <p className="text-sm text-[var(--muted)]">{config.intro}</p>

      <FileDropzone
        title={config.dropTitle}
        description={config.dropDescription}
        accept={config.accept}
        onFiles={handleFiles}
      >
        <ProcessingPanel
          state={status}
          idleText={`Waiting for ${config.inputLabel} images.`}
          processingText={`Converting ${config.inputLabel} to ${config.outputLabel} locally...`}
          successText={`${config.outputLabel} is ready below.`}
          errorText={error ?? "Conversion failed."}
        />
      </FileDropzone>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-lg border bg-[var(--card)] px-4 py-3 text-sm">
        {hasQuality ? (
          <label className="flex items-center gap-3">
            <span className="text-[var(--muted)]">{config.outputLabel} quality</span>
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
        ) : (
          <span className="text-xs text-[var(--muted)]">
            {config.outputLabel} is exported losslessly without a quality setting.
          </span>
        )}
        {hasQuality ? (
          <span className="text-xs text-[var(--muted)]">
            Default for new conversions. Each result below has its own slider too.
          </span>
        ) : null}
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
                  description: "This removes the generated previews from this page.",
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
              config={config}
              result={result}
              hasQuality={hasQuality}
              onRemove={() =>
                confirm({
                  title: "Remove conversion?",
                  description: "This removes this result from the list.",
                  confirmText: "Remove",
                  isDanger: true,
                  onConfirm: () => removeResult(result.id),
                })
              }
              onQualityChange={(nextQuality) => adjustOutputQuality(result.id, nextQuality)}
            />
          ))}
        </section>
      ) : null}
    </div>
  )
}

function ResultBlock({
  config,
  result,
  hasQuality,
  onRemove,
  onQualityChange,
}: {
  config: ImageFormatConverterConfig
  result: ConversionResult
  hasQuality: boolean
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
          format={config.inputLabel}
          previewUrl={result.sourceUrl}
          previewAlt={result.sourceName}
          size={result.sourceSize}
          ratioLabel="baseline"
          downloadUrl={result.sourceUrl}
          downloadName={result.sourceName}
          note="Original file, decoded locally by the browser."
        />
        <FormatCard
          badge={hasQuality ? `Quality ${localQuality}${pending ? "..." : ""}` : "Lossless"}
          format={config.outputLabel}
          previewUrl={result.outputUrl}
          previewAlt={result.outputName}
          size={result.outputSize}
          ratioLabel={ratio(result.outputSize, result.sourceSize)}
          downloadUrl={result.outputUrl}
          downloadName={result.outputName}
          note={
            hasQuality
              ? "Lossy output. Drag the slider to re-encode."
              : "Lossless output with browser rendering."
          }
          extra={
            hasQuality ? (
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
            ) : null
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

export function createImageFormatConverter(config: ImageFormatConverterConfig) {
  const Converter = () => <ImageFormatConverterInner config={config} />
  return dynamic(() => Promise.resolve(Converter), { ssr: false })
}
