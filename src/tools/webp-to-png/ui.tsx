"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { FileDropzone } from "@/components/tool-shell/FileDropzone"
import { ProcessingPanel } from "@/components/tool-shell/ProcessingPanel"
import { track, trackError } from "@/lib/analytics"
import { useConfirm } from "@/components/ConfirmProvider"

interface ConversionResult {
  id: string
  fileName: string
  sourceSize: number
  outputSize: number
  sourceUrl: string
  outputUrl: string
  width: number
  height: number
}

type Status = "idle" | "processing" | "success" | "error"

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error("The browser could not decode this WebP image."))
    image.src = url
  })
}

async function convertWebpToPng(file: File): Promise<ConversionResult> {
  const sourceUrl = URL.createObjectURL(file)
  try {
    const image = await loadImage(sourceUrl)
    const canvas = document.createElement("canvas")
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    const context = canvas.getContext("2d")
    if (!context) throw new Error("Canvas is unavailable in this browser.")
    context.drawImage(image, 0, 0)

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => (result ? resolve(result) : reject(new Error("PNG export failed."))),
        "image/png",
      )
    })

    return {
      id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`,
      fileName: file.name.replace(/\.webp$/i, ""),
      sourceSize: file.size,
      outputSize: blob.size,
      sourceUrl,
      outputUrl: URL.createObjectURL(blob),
      width: image.naturalWidth,
      height: image.naturalHeight,
    }
  } catch (error) {
    URL.revokeObjectURL(sourceUrl)
    throw error
  }
}

function WebpToPngUIInner() {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<ConversionResult[]>([])
  const resultsRef = useRef<ConversionResult[]>([])
  const confirm = useConfirm()

  useEffect(() => {
    track("tool_open", { tool_slug: "webp-to-png" })
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

  const handleFiles = useCallback(async (fileList: FileList | File[]) => {
    const incoming = Array.from(fileList).filter(
      (file) => file.type === "image/webp" || file.name.toLowerCase().endsWith(".webp"),
    )
    if (incoming.length === 0) {
      setStatus("error")
      setError("No .webp file found.")
      return
    }

    setStatus("processing")
    setError(null)
    const converted: ConversionResult[] = []

    for (const file of incoming) {
      track("file_dropped", {
        tool_slug: "webp-to-png",
        file_type: file.type || "image/webp",
        file_size_kb: Math.round(file.size / 1024),
      })
      try {
        converted.push(await convertWebpToPng(file))
      } catch (conversionError) {
        trackError("webp-to-png", conversionError)
        setError(conversionError instanceof Error ? conversionError.message : "Conversion failed.")
      }
    }

    if (converted.length > 0) {
      setResults((previous) => [...converted, ...previous])
      setStatus("success")
      track("convert_success", { tool_slug: "webp-to-png", count: converted.length })
    } else {
      setStatus("error")
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
        Convert WebP files into PNG for design tools, CMS uploads, and older apps. Everything runs
        with browser decoding and Canvas export.
      </p>

      <FileDropzone
        title="Drop WebP images here"
        description="or click to browse — multiple files supported, processed locally"
        accept=".webp,image/webp"
        onFiles={handleFiles}
      >
        <ProcessingPanel
          state={status}
          idleText="Waiting for WebP images."
          processingText="Converting WebP to PNG locally..."
          successText="PNG output is ready below."
          errorText={error ?? "Conversion failed."}
        />
      </FileDropzone>

      {results.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Converted images ({results.length})</h2>
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
          <div className="grid gap-4">
            {results.map((result) => (
              <article key={result.id} className="rounded-lg border bg-[var(--card)] p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-medium">{result.fileName}.png</h3>
                    <p className="text-xs text-[var(--muted)]">
                      {result.width} × {result.height} · WebP {formatBytes(result.sourceSize)} → PNG{" "}
                      {formatBytes(result.outputSize)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      confirm({
                        title: "Remove conversion?",
                        description: "This removes this result from the list.",
                        confirmText: "Remove",
                        isDanger: true,
                        onConfirm: () => removeResult(result.id),
                      })
                    }
                    className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <PreviewCard
                    label="Original WebP"
                    url={result.sourceUrl}
                    fileName={`${result.fileName}.webp`}
                    size={result.sourceSize}
                  />
                  <PreviewCard
                    label="PNG output"
                    url={result.outputUrl}
                    fileName={`${result.fileName}.png`}
                    size={result.outputSize}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function PreviewCard({
  label,
  url,
  fileName,
  size,
}: {
  label: string
  url: string
  fileName: string
  size: number
}) {
  return (
    <div className="rounded-md border bg-[var(--background)] p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-[var(--muted)]">{label}</span>
        <span className="font-mono text-[10px] text-[var(--muted)]">{formatBytes(size)}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={label} className="h-44 w-full rounded object-contain" />
      <a
        href={url}
        download={fileName}
        className="mt-3 inline-flex rounded-md bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-[var(--accent-fg)] transition hover:bg-[var(--accent-hover)]"
      >
        Download
      </a>
    </div>
  )
}

export const WebpToPngUI = dynamic(() => Promise.resolve(WebpToPngUIInner), { ssr: false })
