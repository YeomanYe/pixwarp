"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useState } from "react"
import { FileDropzone } from "@/components/tool-shell/FileDropzone"
import { ProcessingPanel } from "@/components/tool-shell/ProcessingPanel"
import { recordHistory } from "@/lib/history"
import { track, trackError } from "@/lib/analytics"
import { canvasToBlob, downloadUrl, formatBytes } from "../shared/image-utils"

let pdfjsReady: Promise<typeof import("pdfjs-dist")> | null = null
function loadPdfJs() {
  if (!pdfjsReady) {
    pdfjsReady = (async () => {
      const lib = await import("pdfjs-dist")
      lib.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url,
      ).toString()
      return lib
    })()
  }
  return pdfjsReady
}

interface Result {
  name: string
  url: string
  size: number
}

function PdfToImagesInner() {
  const [file, setFile] = useState<File | null>(null)
  const [format, setFormat] = useState<"image/png" | "image/jpeg">("image/png")
  const [scale, setScale] = useState(2)
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<Result[]>([])

  useEffect(() => {
    track("tool_open", { tool_slug: "pdf-to-images" })
    return () => results.forEach((result) => URL.revokeObjectURL(result.url))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFiles = useCallback((files: FileList | File[]) => {
    const picked = Array.from(files).find(
      (f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"),
    )
    if (!picked) {
      setStatus("error")
      setError("No PDF file found.")
      return
    }
    setFile(picked)
    track("file_dropped", {
      tool_slug: "pdf-to-images",
      file_type: picked.type || "application/pdf",
      file_size_kb: Math.round(picked.size / 1024),
    })
  }, [])

  const renderPages = useCallback(async () => {
    if (!file) return
    setStatus("processing")
    setError(null)
    try {
      const pdfjs = await loadPdfJs()
      const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise
      const next: Result[] = []
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale })
        const canvas = document.createElement("canvas")
        canvas.width = Math.ceil(viewport.width)
        canvas.height = Math.ceil(viewport.height)
        const ctx = canvas.getContext("2d")
        if (!ctx) throw new Error("Canvas unavailable.")
        await page.render({ canvasContext: ctx, viewport, canvas }).promise
        const blob = await canvasToBlob(canvas, format, format === "image/jpeg" ? 0.92 : undefined)
        const ext = format === "image/png" ? "png" : "jpg"
        next.push({
          name: `${file.name.replace(/\.pdf$/i, "")}.p${i}.${ext}`,
          url: URL.createObjectURL(blob),
          size: blob.size,
        })
        page.cleanup()
      }
      pdf.destroy()
      setResults(next)
      setStatus("success")
      recordHistory({
        tool: "pdf-to-images",
        fileName: file.name,
        outputName: `${next.length} images`,
        inputBytes: file.size,
        outputBytes: next.reduce((s, r) => s + r.size, 0),
      })
      track("convert_success", { tool_slug: "pdf-to-images", count: next.length })
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Render failed.")
      trackError("pdf-to-images", err)
    }
  }, [file, format, scale])

  return (
    <div className="space-y-6">
      <FileDropzone
        title="Drop a PDF here"
        description="Render every page into images."
        accept="application/pdf,.pdf"
        multiple={false}
        onFiles={handleFiles}
      >
        <div className="grid gap-3 text-sm sm:grid-cols-3">
          <label>
            Format
            <select
              className="ml-2 rounded border bg-[var(--card)] px-2 py-1"
              value={format}
              onChange={(e) => setFormat(e.target.value as "image/png" | "image/jpeg")}
            >
              <option value="image/png">PNG</option>
              <option value="image/jpeg">JPG</option>
            </select>
          </label>
          <label>
            Scale
            <input
              className="ml-2 w-20 rounded border bg-[var(--card)] px-2 py-1"
              type="number"
              min={1}
              max={4}
              step={0.5}
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
            />
          </label>
          <button
            disabled={!file || status === "processing"}
            onClick={renderPages}
            className="rounded-md bg-[var(--accent)] px-3 py-1.5 font-medium text-white disabled:opacity-50"
          >
            Render
          </button>
          <div className="sm:col-span-3">
            <ProcessingPanel state={status} errorText={error ?? "Render failed."} />
          </div>
        </div>
      </FileDropzone>
      {results.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {results.map((r) => (
            <div key={r.name} className="rounded-lg border bg-[var(--card)] p-3">
              <div className="font-medium">{r.name}</div>
              <div className="text-sm text-[var(--muted)]">{formatBytes(r.size)}</div>
              <button
                className="mt-2 rounded-md bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-white"
                onClick={() => downloadUrl(r.url, r.name)}
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const PdfToImagesUI = dynamic(() => Promise.resolve(PdfToImagesInner), { ssr: false })
