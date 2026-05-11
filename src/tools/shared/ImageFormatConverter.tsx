"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useRef, useState } from "react"
import { FileDropzone } from "@/components/tool-shell/FileDropzone"
import { ProcessingPanel } from "@/components/tool-shell/ProcessingPanel"
import { recordHistory } from "@/lib/history"
import { track, trackError } from "@/lib/analytics"
import type { ToolSlug } from "@/lib/analytics"
import { canvasToBlob, downloadUrl, formatBytes, loadImage } from "./image-utils"

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
}

function basename(fileName: string) {
  return fileName.replace(/\.[^.]+$/, "")
}

async function convertImage(
  file: File,
  config: ImageFormatConverterConfig,
  quality: number,
): Promise<ConversionResult> {
  const sourceUrl = URL.createObjectURL(file)
  try {
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
    const outputName = `${basename(file.name)}.${config.outputExt}`
    return {
      id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`,
      sourceName: file.name,
      outputName,
      sourceUrl,
      outputUrl: URL.createObjectURL(blob),
      sourceSize: file.size,
      outputSize: blob.size,
      width: image.naturalWidth,
      height: image.naturalHeight,
    }
  } catch (error) {
    URL.revokeObjectURL(sourceUrl)
    throw error
  }
}

function ImageFormatConverterInner({ config }: { config: ImageFormatConverterConfig }) {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const [quality, setQuality] = useState(config.defaultQuality ?? 0.9)
  const [results, setResults] = useState<ConversionResult[]>([])
  const resultsRef = useRef<ConversionResult[]>([])
  const hasQuality = config.outputMime !== "image/png"

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
          const result = await convertImage(file, config, quality)
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

  return (
    <div className="space-y-6">
      <p className="text-sm text-[var(--muted)]">{config.intro}</p>

      <FileDropzone
        title={config.dropTitle}
        description={config.dropDescription}
        accept={config.accept}
        onFiles={handleFiles}
      >
        {hasQuality ? (
          <label className="mb-4 block text-left text-sm">
            Quality
            <input
              type="range"
              min={0.4}
              max={1}
              step={0.05}
              value={quality}
              onChange={(event) => setQuality(Number(event.target.value))}
              className="mt-2 w-full"
            />
            <span className="text-xs text-[var(--muted)]">{Math.round(quality * 100)}%</span>
          </label>
        ) : null}
        <ProcessingPanel
          state={status}
          idleText={`Waiting for ${config.inputLabel} images.`}
          processingText={`Converting ${config.inputLabel} to ${config.outputLabel} locally...`}
          successText={`${config.outputLabel} output is ready below.`}
          errorText={error ?? "Conversion failed."}
        />
      </FileDropzone>

      {results.length > 0 ? (
        <section className="grid gap-4">
          <h2 className="text-lg font-semibold">Converted images ({results.length})</h2>
          {results.map((result) => (
            <article key={result.id} className="rounded-lg border bg-[var(--card)] p-4">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-medium">{result.outputName}</h3>
                  <p className="text-xs text-[var(--muted)]">
                    {result.width} x {result.height} · {formatBytes(result.sourceSize)} →{" "}
                    {formatBytes(result.outputSize)}
                  </p>
                </div>
                <button
                  className="rounded-md bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-[var(--accent-fg)]"
                  onClick={() => downloadUrl(result.outputUrl, result.outputName)}
                >
                  Download
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <PreviewCard label={config.inputLabel} url={result.sourceUrl} />
                <PreviewCard label={config.outputLabel} url={result.outputUrl} />
              </div>
            </article>
          ))}
        </section>
      ) : null}
    </div>
  )
}

function PreviewCard({ label, url }: { label: string; url: string }) {
  return (
    <div className="rounded-md border bg-[var(--muted-bg)] p-3">
      <div className="mb-2 text-xs font-medium text-[var(--muted)]">{label}</div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt="" className="max-h-72 w-full rounded object-contain" />
    </div>
  )
}

export function createImageFormatConverter(config: ImageFormatConverterConfig) {
  const Converter = () => <ImageFormatConverterInner config={config} />
  return dynamic(() => Promise.resolve(Converter), { ssr: false })
}
