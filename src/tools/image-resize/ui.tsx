"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useState } from "react"
import { FileDropzone } from "@/components/tool-shell/FileDropzone"
import { ProcessingPanel } from "@/components/tool-shell/ProcessingPanel"
import { recordHistory } from "@/lib/history"
import { track, trackError } from "@/lib/analytics"
import { canvasToBlob, downloadUrl, formatBytes, loadImage } from "../shared/image-utils"

type Fit = "contain" | "crop"
interface Result {
  id: string
  name: string
  url: string
  inputSize: number
  outputSize: number
}

function ImageResizeInner() {
  const [width, setWidth] = useState(1200)
  const [height, setHeight] = useState(800)
  const [fit, setFit] = useState<Fit>("contain")
  const [format, setFormat] = useState<"image/jpeg" | "image/png">("image/jpeg")
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<Result[]>([])

  useEffect(() => {
    track("tool_open", { tool_slug: "image-resize" })
    return () => results.forEach((result) => URL.revokeObjectURL(result.url))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const incoming = Array.from(files).filter((file) => file.type.startsWith("image/"))
      if (incoming.length === 0) {
        setStatus("error")
        setError("No image file found.")
        return
      }
      setStatus("processing")
      setError(null)
      const next: Result[] = []
      for (const file of incoming) {
        try {
          track("file_dropped", {
            tool_slug: "image-resize",
            file_type: file.type,
            file_size_kb: Math.round(file.size / 1024),
          })
          const sourceUrl = URL.createObjectURL(file)
          const image = await loadImage(sourceUrl)
          URL.revokeObjectURL(sourceUrl)
          const canvas = document.createElement("canvas")
          canvas.width = width
          canvas.height = height
          const context = canvas.getContext("2d")
          if (!context) throw new Error("Canvas unavailable.")
          context.fillStyle = "#ffffff"
          context.fillRect(0, 0, width, height)
          const scale =
            fit === "crop"
              ? Math.max(width / image.naturalWidth, height / image.naturalHeight)
              : Math.min(width / image.naturalWidth, height / image.naturalHeight)
          const drawWidth = image.naturalWidth * scale
          const drawHeight = image.naturalHeight * scale
          context.drawImage(
            image,
            (width - drawWidth) / 2,
            (height - drawHeight) / 2,
            drawWidth,
            drawHeight,
          )
          const blob = await canvasToBlob(canvas, format, format === "image/jpeg" ? 0.9 : undefined)
          const ext = format === "image/png" ? "png" : "jpg"
          const outputName = `${file.name.replace(/\.[^.]+$/, "")}.${width}x${height}.${ext}`
          const result = {
            id: `${file.name}-${Date.now()}`,
            name: outputName,
            url: URL.createObjectURL(blob),
            inputSize: file.size,
            outputSize: blob.size,
          }
          next.push(result)
          recordHistory({
            tool: "image-resize",
            fileName: file.name,
            outputName,
            inputBytes: file.size,
            outputBytes: blob.size,
          })
        } catch (err) {
          setError(err instanceof Error ? err.message : "Resize failed.")
          trackError("image-resize", err)
        }
      }
      setResults((prev) => [...next, ...prev])
      setStatus(next.length > 0 ? "success" : "error")
      if (next.length > 0)
        track("convert_success", { tool_slug: "image-resize", count: next.length })
    },
    [fit, format, height, width],
  )

  return (
    <div className="space-y-6">
      <FileDropzone
        title="Drop images here"
        description="Resize or crop images locally in your browser."
        accept="image/*"
        onFiles={handleFiles}
      >
        <div className="grid gap-3 text-sm sm:grid-cols-4">
          <label>
            Width
            <input
              className="mt-1 w-full rounded border bg-[var(--card)] px-2 py-1"
              type="number"
              min={1}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
            />
          </label>
          <label>
            Height
            <input
              className="mt-1 w-full rounded border bg-[var(--card)] px-2 py-1"
              type="number"
              min={1}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </label>
          <label>
            Fit
            <select
              className="mt-1 w-full rounded border bg-[var(--card)] px-2 py-1"
              value={fit}
              onChange={(e) => setFit(e.target.value as Fit)}
            >
              <option value="contain">Contain</option>
              <option value="crop">Crop</option>
            </select>
          </label>
          <label>
            Format
            <select
              className="mt-1 w-full rounded border bg-[var(--card)] px-2 py-1"
              value={format}
              onChange={(e) => setFormat(e.target.value as "image/jpeg" | "image/png")}
            >
              <option value="image/jpeg">JPG</option>
              <option value="image/png">PNG</option>
            </select>
          </label>
          <div className="sm:col-span-4">
            <ProcessingPanel state={status} errorText={error ?? "Resize failed."} />
          </div>
        </div>
      </FileDropzone>
      <ResultList results={results} />
    </div>
  )
}

function ResultList({ results }: { results: Result[] }) {
  if (results.length === 0) return null
  return (
    <div className="grid gap-3">
      {results.map((r) => (
        <div
          key={r.id}
          className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-[var(--card)] p-4"
        >
          <div>
            <div className="font-medium">{r.name}</div>
            <div className="text-sm text-[var(--muted)]">
              {formatBytes(r.inputSize)} → {formatBytes(r.outputSize)}
            </div>
          </div>
          <button
            className="rounded-md bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-white"
            onClick={() => downloadUrl(r.url, r.name)}
          >
            Download
          </button>
        </div>
      ))}
    </div>
  )
}

export const ImageResizeUI = dynamic(() => Promise.resolve(ImageResizeInner), { ssr: false })
