"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useState } from "react"
import { FileDropzone } from "@/components/tool-shell/FileDropzone"
import { ProcessingPanel } from "@/components/tool-shell/ProcessingPanel"
import { recordHistory } from "@/lib/history"
import { track, trackError } from "@/lib/analytics"
import { canvasToBlob, downloadUrl, formatBytes, loadImage } from "../shared/image-utils"

interface Result {
  id: string
  name: string
  inputSize: number
  outputSize: number
  url: string
}

function WebpToJpgInner() {
  const [quality, setQuality] = useState(86)
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<Result[]>([])

  useEffect(() => {
    track("tool_open", { tool_slug: "webp-to-jpg" })
    return () => results.forEach((result) => URL.revokeObjectURL(result.url))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const incoming = Array.from(files).filter(
        (file) => file.type === "image/webp" || file.name.toLowerCase().endsWith(".webp"),
      )
      if (incoming.length === 0) {
        setStatus("error")
        setError("No WebP image found.")
        return
      }
      setStatus("processing")
      setError(null)
      const next: Result[] = []
      for (const file of incoming) {
        try {
          track("file_dropped", {
            tool_slug: "webp-to-jpg",
            file_type: file.type || "image/webp",
            file_size_kb: Math.round(file.size / 1024),
          })
          const sourceUrl = URL.createObjectURL(file)
          const image = await loadImage(sourceUrl)
          URL.revokeObjectURL(sourceUrl)
          const canvas = document.createElement("canvas")
          canvas.width = image.naturalWidth
          canvas.height = image.naturalHeight
          const context = canvas.getContext("2d")
          if (!context) throw new Error("Canvas is unavailable.")
          context.fillStyle = "#ffffff"
          context.fillRect(0, 0, canvas.width, canvas.height)
          context.drawImage(image, 0, 0)
          const blob = await canvasToBlob(canvas, "image/jpeg", quality / 100)
          const outputName = `${file.name.replace(/\.webp$/i, "")}.jpg`
          const result = {
            id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            name: outputName,
            inputSize: file.size,
            outputSize: blob.size,
            url: URL.createObjectURL(blob),
          }
          next.push(result)
          recordHistory({
            tool: "webp-to-jpg",
            fileName: file.name,
            outputName,
            inputBytes: file.size,
            outputBytes: blob.size,
          })
        } catch (conversionError) {
          setError(
            conversionError instanceof Error ? conversionError.message : "Conversion failed.",
          )
          trackError("webp-to-jpg", conversionError)
        }
      }
      setResults((previous) => [...next, ...previous])
      setStatus(next.length > 0 ? "success" : "error")
      if (next.length > 0)
        track("convert_success", { tool_slug: "webp-to-jpg", count: next.length })
    },
    [quality],
  )

  return (
    <div className="space-y-6">
      <FileDropzone
        title="Drop WebP images here"
        description="Convert WebP to JPG locally. Transparent areas become white."
        accept=".webp,image/webp"
        onFiles={handleFiles}
      >
        <div className="space-y-3">
          <label className="flex items-center justify-center gap-3 text-sm">
            <span>JPG quality</span>
            <input
              type="range"
              min={40}
              max={100}
              step={2}
              value={quality}
              onChange={(event) => setQuality(Number(event.target.value))}
              className="accent-[var(--accent)]"
            />
            <span className="w-10 font-mono">{quality}%</span>
          </label>
          <ProcessingPanel state={status} errorText={error ?? "Conversion failed."} />
        </div>
      </FileDropzone>
      <ResultList results={results} />
    </div>
  )
}

function ResultList({ results }: { results: Result[] }) {
  if (results.length === 0) return null
  return (
    <section className="grid gap-3">
      {results.map((result) => (
        <article
          key={result.id}
          className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-[var(--card)] p-4"
        >
          <div>
            <div className="font-medium">{result.name}</div>
            <div className="text-sm text-[var(--muted)]">
              {formatBytes(result.inputSize)} → {formatBytes(result.outputSize)}
            </div>
          </div>
          <button
            type="button"
            onClick={() => downloadUrl(result.url, result.name)}
            className="rounded-md bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-white"
          >
            Download JPG
          </button>
        </article>
      ))}
    </section>
  )
}

export const WebpToJpgUI = dynamic(() => Promise.resolve(WebpToJpgInner), { ssr: false })
