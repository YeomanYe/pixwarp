"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useRef, useState } from "react"
import { FileDropzone } from "@/components/tool-shell/FileDropzone"
import { ProcessingPanel } from "@/components/tool-shell/ProcessingPanel"
import { recordHistory } from "@/lib/history"
import { track, trackError } from "@/lib/analytics"
import { canvasToBlob, downloadUrl, formatBytes, loadImage } from "../shared/image-utils"

type Status = "idle" | "processing" | "success" | "error"

interface Asset {
  name: string
  size: number
  url: string
  bytes: number
}

interface FaviconResult {
  id: string
  sourceName: string
  sourceSize: number
  previewUrl: string
  assets: Asset[]
}

const pngSizes = [16, 32, 48, 180, 192, 512]
const icoSizes = [16, 32, 48]

function basename(fileName: string) {
  return fileName.replace(/\.[^.]+$/, "")
}

function drawSquareIcon(image: HTMLImageElement, size: number) {
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext("2d")
  if (!context) throw new Error("Canvas is unavailable in this browser.")
  context.clearRect(0, 0, size, size)

  const scale = Math.min(size / image.naturalWidth, size / image.naturalHeight)
  const width = image.naturalWidth * scale
  const height = image.naturalHeight * scale
  context.drawImage(image, (size - width) / 2, (size - height) / 2, width, height)
  return canvas
}

async function blobToUint8Array(blob: Blob) {
  return new Uint8Array(await blob.arrayBuffer())
}

function buildIco(pngEntries: { size: number; data: Uint8Array }[]) {
  const headerBytes = 6
  const entryBytes = 16
  const imageOffset = headerBytes + pngEntries.length * entryBytes
  const totalBytes = imageOffset + pngEntries.reduce((sum, entry) => sum + entry.data.byteLength, 0)
  const output = new Uint8Array(totalBytes)
  const view = new DataView(output.buffer)

  view.setUint16(0, 0, true)
  view.setUint16(2, 1, true)
  view.setUint16(4, pngEntries.length, true)

  let offset = imageOffset
  pngEntries.forEach((entry, index) => {
    const base = headerBytes + index * entryBytes
    output[base] = entry.size >= 256 ? 0 : entry.size
    output[base + 1] = entry.size >= 256 ? 0 : entry.size
    output[base + 2] = 0
    output[base + 3] = 0
    view.setUint16(base + 4, 1, true)
    view.setUint16(base + 6, 32, true)
    view.setUint32(base + 8, entry.data.byteLength, true)
    view.setUint32(base + 12, offset, true)
    output.set(entry.data, offset)
    offset += entry.data.byteLength
  })

  return new Blob([output], { type: "image/x-icon" })
}

async function generateFavicons(file: File): Promise<FaviconResult> {
  const sourceUrl = URL.createObjectURL(file)
  try {
    const image = await loadImage(sourceUrl)
    const baseName = basename(file.name)
    const assets: Asset[] = []
    const icoPngs: { size: number; data: Uint8Array }[] = []

    for (const size of pngSizes) {
      const canvas = drawSquareIcon(image, size)
      const blob = await canvasToBlob(canvas, "image/png")
      const name =
        size === 180
          ? "apple-touch-icon.png"
          : size === 192
            ? "android-chrome-192x192.png"
            : size === 512
              ? "android-chrome-512x512.png"
              : `favicon-${size}x${size}.png`
      assets.push({ name, size, url: URL.createObjectURL(blob), bytes: blob.size })
      if (icoSizes.includes(size)) {
        icoPngs.push({ size, data: await blobToUint8Array(blob) })
      }
    }

    const icoBlob = buildIco(icoPngs)
    assets.unshift({
      name: "favicon.ico",
      size: 0,
      url: URL.createObjectURL(icoBlob),
      bytes: icoBlob.size,
    })

    return {
      id: `${file.name}-${file.size}-${Date.now()}`,
      sourceName: baseName,
      sourceSize: file.size,
      previewUrl: sourceUrl,
      assets,
    }
  } catch (error) {
    URL.revokeObjectURL(sourceUrl)
    throw error
  }
}

function FaviconGeneratorInner() {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<FaviconResult[]>([])
  const resultsRef = useRef<FaviconResult[]>([])

  useEffect(() => {
    track("tool_open", { tool_slug: "favicon-generator" })
  }, [])

  useEffect(() => {
    resultsRef.current = results
  }, [results])

  useEffect(() => {
    return () => {
      resultsRef.current.forEach((result) => {
        URL.revokeObjectURL(result.previewUrl)
        result.assets.forEach((asset) => URL.revokeObjectURL(asset.url))
      })
    }
  }, [])

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const incoming = Array.from(files).filter(
      (file) => file.type.startsWith("image/") || /\.(svg|png|jpe?g|webp)$/i.test(file.name),
    )
    if (incoming.length === 0) {
      setStatus("error")
      setError("No image file found.")
      return
    }

    setStatus("processing")
    setError(null)
    const generated: FaviconResult[] = []

    for (const file of incoming) {
      try {
        track("file_dropped", {
          tool_slug: "favicon-generator",
          file_type: file.type,
          file_size_kb: Math.round(file.size / 1024),
        })
        const result = await generateFavicons(file)
        generated.push(result)
        recordHistory({
          tool: "favicon-generator",
          fileName: file.name,
          outputName: "favicon.ico + PNG set",
          inputBytes: file.size,
          outputBytes: result.assets.reduce((sum, asset) => sum + asset.bytes, 0),
        })
      } catch (generationError) {
        setError(generationError instanceof Error ? generationError.message : "Generation failed.")
        trackError("favicon-generator", generationError)
      }
    }

    setResults((previous) => [...generated, ...previous])
    setStatus(generated.length > 0 ? "success" : "error")
    if (generated.length > 0) {
      track("convert_success", { tool_slug: "favicon-generator", count: generated.length })
    }
  }, [])

  return (
    <div className="space-y-6">
      <p className="text-sm text-[var(--muted)]">
        Generate favicon.ico plus common PNG icon sizes for websites, PWAs, and app manifests. All
        icon rendering happens locally in the browser.
      </p>

      <FileDropzone
        title="Drop a logo or icon here"
        description="PNG, JPG, WebP, and SVG inputs supported — square artwork works best"
        accept=".png,.jpg,.jpeg,.webp,.svg,image/*"
        onFiles={handleFiles}
      >
        <ProcessingPanel
          state={status}
          idleText="Waiting for a logo or source icon."
          processingText="Rendering favicon assets locally..."
          successText="Favicon assets are ready below."
          errorText={error ?? "Generation failed."}
        />
      </FileDropzone>

      {results.length > 0 ? (
        <section className="grid gap-4">
          <h2 className="text-lg font-semibold">Generated favicon sets ({results.length})</h2>
          {results.map((result) => (
            <article key={result.id} className="rounded-lg border bg-[var(--card)] p-4">
              <div className="mb-4 flex flex-wrap items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={result.previewUrl}
                  alt=""
                  className="h-16 w-16 rounded-md border bg-[var(--muted-bg)] object-contain p-2"
                />
                <div>
                  <h3 className="font-medium">{result.sourceName}</h3>
                  <p className="text-xs text-[var(--muted)]">
                    Source {formatBytes(result.sourceSize)} · {result.assets.length} files
                  </p>
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {result.assets.map((asset) => (
                  <div
                    key={asset.name}
                    className="flex items-center justify-between gap-3 rounded-md border bg-[var(--muted-bg)] p-3"
                  >
                    <div>
                      <div className="text-sm font-medium">{asset.name}</div>
                      <div className="text-xs text-[var(--muted)]">
                        {asset.size ? `${asset.size} x ${asset.size} · ` : ""}
                        {formatBytes(asset.bytes)}
                      </div>
                    </div>
                    <button
                      className="rounded-md bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-[var(--accent-fg)]"
                      onClick={() => downloadUrl(asset.url, asset.name)}
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      ) : null}
    </div>
  )
}

export const FaviconGeneratorUI = dynamic(() => Promise.resolve(FaviconGeneratorInner), {
  ssr: false,
})
