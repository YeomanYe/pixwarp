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
  url: string
  inputSize: number
  outputSize: number
}

function RemoveExifInner() {
  const [format, setFormat] = useState<"image/jpeg" | "image/png">("image/jpeg")
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<Result[]>([])

  useEffect(() => {
    track("tool_open", { tool_slug: "remove-exif" })
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
      const next: Result[] = []
      for (const file of incoming) {
        try {
          track("file_dropped", {
            tool_slug: "remove-exif",
            file_type: file.type,
            file_size_kb: Math.round(file.size / 1024),
          })
          const src = URL.createObjectURL(file)
          const image = await loadImage(src)
          URL.revokeObjectURL(src)
          const canvas = document.createElement("canvas")
          canvas.width = image.naturalWidth
          canvas.height = image.naturalHeight
          const ctx = canvas.getContext("2d")
          if (!ctx) throw new Error("Canvas unavailable.")
          ctx.fillStyle = "#ffffff"
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(image, 0, 0)
          const blob = await canvasToBlob(
            canvas,
            format,
            format === "image/jpeg" ? 0.92 : undefined,
          )
          const ext = format === "image/png" ? "png" : "jpg"
          const outputName = `${file.name.replace(/\.[^.]+$/, "")}.clean.${ext}`
          const result = {
            id: `${file.name}-${Date.now()}`,
            name: outputName,
            url: URL.createObjectURL(blob),
            inputSize: file.size,
            outputSize: blob.size,
          }
          next.push(result)
          recordHistory({
            tool: "remove-exif",
            fileName: file.name,
            outputName,
            inputBytes: file.size,
            outputBytes: blob.size,
          })
        } catch (err) {
          setError(err instanceof Error ? err.message : "Metadata removal failed.")
          trackError("remove-exif", err)
        }
      }
      setResults((prev) => [...next, ...prev])
      setStatus(next.length ? "success" : "error")
      if (next.length) track("convert_success", { tool_slug: "remove-exif", count: next.length })
    },
    [format],
  )

  return (
    <div className="space-y-6">
      <FileDropzone
        title="Drop photos here"
        description="Create clean copies without EXIF/GPS metadata."
        accept="image/*"
        onFiles={handleFiles}
      >
        <div className="space-y-3">
          <label className="text-sm">
            Output{" "}
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as "image/jpeg" | "image/png")}
              className="ml-2 rounded border bg-[var(--card)] px-2 py-1"
            >
              <option value="image/jpeg">JPG</option>
              <option value="image/png">PNG</option>
            </select>
          </label>
          <ProcessingPanel state={status} errorText={error ?? "Metadata removal failed."} />
        </div>
      </FileDropzone>
      <ResultList results={results} />
    </div>
  )
}

function ResultList({ results }: { results: Result[] }) {
  if (!results.length) return null
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
            Download clean copy
          </button>
        </div>
      ))}
    </div>
  )
}

export const RemoveExifUI = dynamic(() => Promise.resolve(RemoveExifInner), { ssr: false })
