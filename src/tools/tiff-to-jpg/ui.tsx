"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useRef, useState } from "react"
import * as UTIF from "utif"
import { FileDropzone } from "@/components/tool-shell/FileDropzone"
import { ProcessingPanel } from "@/components/tool-shell/ProcessingPanel"
import { track, trackError } from "@/lib/analytics"
import { recordHistory } from "@/lib/history"
import { canvasToBlob, downloadUrl, formatBytes } from "../shared/image-utils"

type Status = "idle" | "processing" | "success" | "error"

interface TiffResult {
  id: string
  sourceName: string
  outputName: string
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

async function decodeTiffToJpg(file: File, quality: number): Promise<TiffResult> {
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

  context.fillStyle = "#ffffff"
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.putImageData(
    new ImageData(new Uint8ClampedArray(rgba), canvas.width, canvas.height),
    0,
    0,
  )

  const flattened = document.createElement("canvas")
  flattened.width = canvas.width
  flattened.height = canvas.height
  const flatContext = flattened.getContext("2d")
  if (!flatContext) throw new Error("Canvas is unavailable in this browser.")
  flatContext.fillStyle = "#ffffff"
  flatContext.fillRect(0, 0, flattened.width, flattened.height)
  flatContext.drawImage(canvas, 0, 0)

  const blob = await canvasToBlob(flattened, "image/jpeg", quality)
  const outputName = `${basename(file.name)}.jpg`
  return {
    id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`,
    sourceName: file.name,
    outputName,
    outputUrl: URL.createObjectURL(blob),
    sourceSize: file.size,
    outputSize: blob.size,
    width: canvas.width,
    height: canvas.height,
  }
}

function TiffToJpgInner() {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const [quality, setQuality] = useState(90)
  const [results, setResults] = useState<TiffResult[]>([])
  const resultsRef = useRef<TiffResult[]>([])

  useEffect(() => {
    track("tool_open", { tool_slug: "tiff-to-jpg" })
  }, [])

  useEffect(() => {
    resultsRef.current = results
  }, [results])

  useEffect(() => {
    return () => {
      resultsRef.current.forEach((result) => URL.revokeObjectURL(result.outputUrl))
    }
  }, [])

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const incoming = Array.from(files).filter(isTiff)
      if (incoming.length === 0) {
        setStatus("error")
        setError("No .tif or .tiff file found.")
        return
      }

      setStatus("processing")
      setError(null)
      const converted: TiffResult[] = []

      for (const file of incoming) {
        try {
          track("file_dropped", {
            tool_slug: "tiff-to-jpg",
            file_type: file.type || "image/tiff",
            file_size_kb: Math.round(file.size / 1024),
          })
          const result = await decodeTiffToJpg(file, quality / 100)
          converted.push(result)
          recordHistory({
            tool: "tiff-to-jpg",
            fileName: file.name,
            outputName: result.outputName,
            inputBytes: file.size,
            outputBytes: result.outputSize,
          })
        } catch (conversionError) {
          setError(
            conversionError instanceof Error ? conversionError.message : "TIFF conversion failed.",
          )
          trackError("tiff-to-jpg", conversionError)
        }
      }

      setResults((previous) => [...converted, ...previous])
      setStatus(converted.length > 0 ? "success" : "error")
      if (converted.length > 0) {
        track("convert_success", { tool_slug: "tiff-to-jpg", count: converted.length })
      }
    },
    [quality],
  )

  return (
    <div className="space-y-6">
      <p className="text-sm text-[var(--muted)]">
        Convert scanner, archive, and print TIFF files into JPG without uploading them. Multi-page
        TIFF files export the first decodable image page.
      </p>

      <FileDropzone
        title="Drop TIFF images here"
        description="or click to browse - .tif and .tiff files supported, processed locally"
        accept=".tif,.tiff,image/tiff"
        onFiles={handleFiles}
      >
        <label className="mb-4 flex items-center justify-center gap-3 text-sm">
          <span className="text-[var(--muted)]">JPG output quality</span>
          <input
            type="range"
            min={40}
            max={100}
            step={5}
            value={quality}
            onChange={(event) => setQuality(Number(event.target.value))}
            className="w-40 accent-[var(--accent)]"
          />
          <span className="w-8 text-right font-mono text-xs">{quality}%</span>
        </label>
        <ProcessingPanel
          state={status}
          idleText="Waiting for TIFF source images."
          processingText="Decoding TIFF and exporting JPG locally..."
          successText="JPG output is ready below."
          errorText={error ?? "TIFF conversion failed."}
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
                    {result.width} x {result.height} - {formatBytes(result.sourceSize)} to{" "}
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
              <div className="rounded-md border bg-[var(--muted-bg)] p-3">
                <div className="mb-2 text-xs font-medium text-[var(--muted)]">JPG output</div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={result.outputUrl}
                  alt=""
                  className="max-h-72 w-full rounded object-contain"
                />
              </div>
            </article>
          ))}
        </section>
      ) : null}
    </div>
  )
}

export const TiffToJpgUI = dynamic(() => Promise.resolve(TiffToJpgInner), { ssr: false })
