"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { track, trackError } from "@/lib/analytics"

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1024 / 1024).toFixed(2)} MB`
}

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

interface CompressResult {
  blob: Blob
  url: string
}

function PdfCompressInner() {
  const [file, setFile] = useState<File | null>(null)
  const [pages, setPages] = useState(0)
  const [quality, setQuality] = useState(75)
  const [dpi, setDpi] = useState(150)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<CompressResult | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    track("tool_open", { tool_slug: "pdf-compress" })
  }, [])

  useEffect(
    () => () => {
      if (result) URL.revokeObjectURL(result.url)
    },
    [result],
  )

  async function pickFile(f: File) {
    if (f.type !== "application/pdf") {
      setError("Please pick a PDF file")
      return
    }
    setError(null)
    if (result) URL.revokeObjectURL(result.url)
    setResult(null)
    track("file_dropped", {
      tool_slug: "pdf-compress",
      file_type: f.type,
      file_size_kb: Math.round(f.size / 1024),
    })
    try {
      const pdfjs = await loadPdfJs()
      const buf = await f.arrayBuffer()
      const doc = await pdfjs.getDocument({ data: buf }).promise
      setFile(f)
      setPages(doc.numPages)
      doc.destroy()
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      setError(`Could not read PDF: ${msg}`)
      trackError("pdf-compress", err)
    }
  }

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    e.target.value = ""
    if (f) await pickFile(f)
  }

  const onDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    const f = e.dataTransfer.files?.[0]
    if (f) await pickFile(f)
  }

  async function compress() {
    if (!file) return
    setBusy(true)
    setError(null)
    setProgress(0)
    if (result) URL.revokeObjectURL(result.url)
    setResult(null)
    try {
      const pdfjs = await loadPdfJs()
      const { PDFDocument } = await import("pdf-lib")
      const buf = await file.arrayBuffer()
      const src = await pdfjs.getDocument({ data: buf }).promise
      const out = await PDFDocument.create()

      const scale = dpi / 72

      for (let i = 1; i <= src.numPages; i++) {
        const page = await src.getPage(i)
        const viewport = page.getViewport({ scale })
        const canvas = document.createElement("canvas")
        canvas.width = Math.ceil(viewport.width)
        canvas.height = Math.ceil(viewport.height)
        const ctx = canvas.getContext("2d")
        if (!ctx) throw new Error("Failed to get canvas context")
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        await page.render({ canvasContext: ctx, viewport, canvas }).promise

        const jpgBlob = await new Promise<Blob | null>((res) =>
          canvas.toBlob(res, "image/jpeg", quality / 100),
        )
        if (!jpgBlob) throw new Error("JPG encode failed")
        const jpgBytes = new Uint8Array(await jpgBlob.arrayBuffer())
        const embedded = await out.embedJpg(jpgBytes)

        const pageOut = out.addPage([viewport.width / scale, viewport.height / scale])
        pageOut.drawImage(embedded, {
          x: 0,
          y: 0,
          width: pageOut.getWidth(),
          height: pageOut.getHeight(),
        })

        page.cleanup()
        setProgress(i / src.numPages)
      }

      src.destroy()
      const bytes = await out.save()
      const blob = new Blob([bytes.slice().buffer], { type: "application/pdf" })
      setResult({ blob, url: URL.createObjectURL(blob) })
      track("convert_success", { tool_slug: "pdf-compress" })
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      setError(msg)
      trackError("pdf-compress", err)
    } finally {
      setBusy(false)
    }
  }

  function download() {
    if (!result || !file) return
    const a = document.createElement("a")
    a.href = result.url
    const base = file.name.replace(/\.pdf$/i, "")
    a.download = `${base}.compressed.pdf`
    a.click()
  }

  const ratio = result && file ? (1 - result.blob.size / file.size) * 100 : null

  return (
    <div>
      <label
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="mb-4 flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-[var(--card)] p-6 text-center transition hover:border-[var(--accent)]"
      >
        {file ? (
          <>
            <p className="text-base font-medium">{file.name}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {pages} pages · {formatBytes(file.size)} · click to swap
            </p>
          </>
        ) : (
          <>
            <p className="text-base font-medium">Drop a PDF or click to pick</p>
            <p className="mt-1 text-sm text-[var(--muted)]">One file at a time</p>
          </>
        )}
        <input type="file" accept="application/pdf" onChange={onPick} className="hidden" />
      </label>

      {file && (
        <>
          <div className="mb-4 grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
            <label className="flex flex-col text-sm">
              <span className="mb-1 font-medium">
                Quality: <span className="font-mono">{quality}</span>
              </span>
              <input
                type="range"
                min={20}
                max={95}
                step={5}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
              />
            </label>

            <label className="flex flex-col text-sm">
              <span className="mb-1 font-medium">
                DPI: <span className="font-mono">{dpi}</span>
              </span>
              <input
                type="range"
                min={72}
                max={250}
                step={10}
                value={dpi}
                onChange={(e) => setDpi(Number(e.target.value))}
              />
            </label>

            <button
              type="button"
              onClick={compress}
              disabled={busy}
              className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? `Compressing… ${Math.round(progress * 100)}%` : "Compress"}
            </button>
          </div>

          {error && (
            <p className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          {result && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border bg-[var(--card)] px-4 py-3 text-sm">
              <span>
                {formatBytes(file.size)} → <strong>{formatBytes(result.blob.size)}</strong>{" "}
                {ratio !== null && (
                  <span className={ratio >= 0 ? "text-emerald-600" : "text-red-600"}>
                    ({ratio >= 0 ? `−${ratio.toFixed(0)}%` : `+${(-ratio).toFixed(0)}%`})
                  </span>
                )}
              </span>
              <button
                type="button"
                onClick={download}
                className="rounded-md bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-white transition hover:opacity-90"
              >
                Download
              </button>
            </div>
          )}

          <p className="mt-3 text-xs text-[var(--muted)]">
            Heads up: vector text becomes raster after compression — copy-paste and search are lost.
            Best for image-heavy or scanned PDFs.
          </p>
        </>
      )}
    </div>
  )
}

export const PdfCompressUI = dynamic(() => Promise.resolve(PdfCompressInner), {
  ssr: false,
  loading: () => (
    <div className="py-12 text-center text-sm text-[var(--muted)]">Loading PDF tool…</div>
  ),
})
