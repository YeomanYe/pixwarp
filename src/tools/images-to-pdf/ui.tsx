"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useState } from "react"
import { FileDropzone } from "@/components/tool-shell/FileDropzone"
import { ProcessingPanel } from "@/components/tool-shell/ProcessingPanel"
import { recordHistory } from "@/lib/history"
import { track, trackError } from "@/lib/analytics"
import { canvasToBlob, downloadUrl, formatBytes, loadImage } from "../shared/image-utils"

interface Item {
  id: string
  file: File
  url: string
}

function ImagesToPdfInner() {
  const [items, setItems] = useState<Item[]>([])
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)
  const [output, setOutput] = useState<{ url: string; size: number } | null>(null)

  useEffect(() => {
    track("tool_open", { tool_slug: "images-to-pdf" })
    return () => {
      items.forEach((item) => URL.revokeObjectURL(item.url))
      if (output) URL.revokeObjectURL(output.url)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addFiles = useCallback((files: FileList | File[]) => {
    const incoming = Array.from(files).filter((file) => file.type.startsWith("image/"))
    const next = incoming.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      url: URL.createObjectURL(file),
    }))
    next.forEach((item) =>
      track("file_dropped", {
        tool_slug: "images-to-pdf",
        file_type: item.file.type,
        file_size_kb: Math.round(item.file.size / 1024),
      }),
    )
    setItems((prev) => [...prev, ...next])
  }, [])

  const generate = useCallback(async () => {
    if (!items.length) return
    setStatus("processing")
    setError(null)
    try {
      const { PDFDocument } = await import("pdf-lib")
      const pdf = await PDFDocument.create()
      for (const item of items) {
        const img = await loadImage(item.url)
        const canvas = document.createElement("canvas")
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext("2d")
        if (!ctx) throw new Error("Canvas unavailable.")
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
        const jpg = await canvasToBlob(canvas, "image/jpeg", 0.92)
        const embedded = await pdf.embedJpg(new Uint8Array(await jpg.arrayBuffer()))
        const page = pdf.addPage([img.naturalWidth, img.naturalHeight])
        page.drawImage(embedded, { x: 0, y: 0, width: img.naturalWidth, height: img.naturalHeight })
      }
      const bytes = await pdf.save()
      const blob = new Blob([bytes.slice().buffer], { type: "application/pdf" })
      if (output) URL.revokeObjectURL(output.url)
      const url = URL.createObjectURL(blob)
      setOutput({ url, size: blob.size })
      setStatus("success")
      const inputBytes = items.reduce((sum, item) => sum + item.file.size, 0)
      recordHistory({
        tool: "images-to-pdf",
        fileName: `${items.length} images`,
        outputName: "images.pdf",
        inputBytes,
        outputBytes: blob.size,
      })
      track("convert_success", { tool_slug: "images-to-pdf", count: items.length })
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "PDF generation failed.")
      trackError("images-to-pdf", err)
    }
  }, [items, output])

  return (
    <div className="space-y-6">
      <FileDropzone
        title="Drop images here"
        description="Add images and turn them into one PDF."
        accept="image/*"
        onFiles={addFiles}
      >
        <ProcessingPanel state={status} errorText={error ?? "PDF generation failed."} />
      </FileDropzone>
      {items.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">{items.length} images</h2>
            <button
              onClick={generate}
              className="rounded-md bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-white"
            >
              Generate PDF
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {items.map((item) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={item.id}
                src={item.url}
                alt={item.file.name}
                className="h-28 rounded border object-cover"
              />
            ))}
          </div>
        </section>
      )}
      {output && (
        <div className="rounded-lg border bg-[var(--card)] p-4">
          <div className="font-medium">images.pdf</div>
          <div className="text-sm text-[var(--muted)]">{formatBytes(output.size)}</div>
          <button
            className="mt-3 rounded-md bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-white"
            onClick={() => downloadUrl(output.url, "images.pdf")}
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  )
}

export const ImagesToPdfUI = dynamic(() => Promise.resolve(ImagesToPdfInner), { ssr: false })
