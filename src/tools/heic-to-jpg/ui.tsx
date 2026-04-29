"use client"

import { useState, useCallback, useRef } from "react"
import dynamic from "next/dynamic"

// heic2any uses browser-only APIs (Worker/canvas), load lazily on the client
type Heic2Any = (opts: { blob: Blob; toType: string; quality?: number }) => Promise<Blob | Blob[]>

interface ConversionResult {
  fileName: string
  heicSize: number
  jpgSize: number
  pngSize: number
  heicUrl: string
  jpgUrl: string
  pngUrl: string
}

type Status = "idle" | "converting" | "done" | "error"

const ACCEPTED_EXTENSIONS = [".heic", ".heif"]

const SAMPLES = [
  { path: "/samples/heic/winter-photo.heic", label: "Yosemite (242 KB)" },
  { path: "/samples/heic/autumn-photo.heic", label: "Autumn pond (287 KB)" },
  { path: "/samples/heic/iphone-portrait.heic", label: "Riverside town (701 KB)" },
  { path: "/samples/heic/lighthouse-9x16.heic", label: "Lighthouse 9:16 (32 KB)" },
]

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function ratio(a: number, b: number): string {
  if (b === 0) return "—"
  const r = a / b
  return r >= 1 ? `${r.toFixed(2)}× larger` : `${(1 / r).toFixed(2)}× smaller`
}

async function loadHeic2Any(): Promise<Heic2Any> {
  const mod = await import("heic2any")
  return (mod.default as unknown as Heic2Any) ?? (mod as unknown as Heic2Any)
}

function HeicToJpgUIInner() {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ConversionResult | null>(null)
  const dropRef = useRef<HTMLDivElement | null>(null)

  const convertFile = useCallback(async (file: File) => {
    setStatus("converting")
    setError(null)
    try {
      const heic2any = await loadHeic2Any()
      const jpgBlobRaw = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.9 })
      const jpgBlob = Array.isArray(jpgBlobRaw) ? jpgBlobRaw[0] : jpgBlobRaw
      const pngBlobRaw = await heic2any({ blob: file, toType: "image/png" })
      const pngBlob = Array.isArray(pngBlobRaw) ? pngBlobRaw[0] : pngBlobRaw

      setResult((prev) => {
        if (prev) {
          URL.revokeObjectURL(prev.heicUrl)
          URL.revokeObjectURL(prev.jpgUrl)
          URL.revokeObjectURL(prev.pngUrl)
        }
        return {
          fileName: file.name.replace(/\.(heic|heif)$/i, ""),
          heicSize: file.size,
          jpgSize: jpgBlob.size,
          pngSize: pngBlob.size,
          heicUrl: URL.createObjectURL(file),
          jpgUrl: URL.createObjectURL(jpgBlob),
          pngUrl: URL.createObjectURL(pngBlob),
        }
      })
      setStatus("done")
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "Conversion failed")
      setStatus("error")
    }
  }, [])

  const loadSample = useCallback(
    async (samplePath: string) => {
      try {
        setError(null)
        const res = await fetch(samplePath)
        if (!res.ok) throw new Error(`Failed to load sample (${res.status})`)
        const blob = await res.blob()
        const fileName = samplePath.split("/").pop() ?? "sample.heic"
        const file = new File([blob], fileName, { type: "image/heic" })
        await convertFile(file)
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : "Failed to load sample")
      }
    },
    [convertFile],
  )

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return
      const list = Array.from(fileList)
      const first = list.find((f) => {
        const lower = f.name.toLowerCase()
        return ACCEPTED_EXTENSIONS.some((ext) => lower.endsWith(ext))
      })
      if (!first) {
        setError("No .heic or .heif file found.")
        return
      }
      if (list.length > 1) {
        setError(
          `Picked ${first.name}. Tool processes one file at a time — drop the others one by one.`,
        )
      } else {
        setError(null)
      }
      void convertFile(first)
    },
    [convertFile],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      dropRef.current?.classList.remove("ring-2", "ring-[var(--accent)]")
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles],
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dropRef.current?.classList.add("ring-2", "ring-[var(--accent)]")
  }, [])

  const handleDragLeave = useCallback(() => {
    dropRef.current?.classList.remove("ring-2", "ring-[var(--accent)]")
  }, [])

  const handleClear = useCallback(() => {
    if (result) {
      URL.revokeObjectURL(result.heicUrl)
      URL.revokeObjectURL(result.jpgUrl)
      URL.revokeObjectURL(result.pngUrl)
    }
    setResult(null)
    setStatus("idle")
    setError(null)
  }, [result])

  return (
    <div className="space-y-6">
      <p className="text-sm text-[var(--muted)]">
        Drop a HEIC and see your photo decoded in-browser, alongside JPG and PNG re-encodes with
        real file sizes. All processing is local — your file is never uploaded.
      </p>

      {/* Drop zone */}
      <div
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--border)] bg-[var(--muted-bg)]/40 px-6 py-12 text-center transition"
      >
        <p className="mb-1 text-base font-medium">Drop a HEIC file here</p>
        <p className="mb-4 text-sm text-[var(--muted)]">
          or click to browse — auto-converts to both JPG and PNG, locally
        </p>
        <label className="cursor-pointer rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-fg)] transition hover:bg-[var(--accent-hover)]">
          Choose file
          <input
            type="file"
            accept=".heic,.heif,image/heic,image/heif"
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
        </label>
      </div>

      {/* Sample shortcuts (visible until first result) */}
      {!result && status !== "converting" && (
        <div className="rounded-lg border bg-[var(--muted-bg)]/30 p-4">
          <div className="mb-2 text-sm font-semibold">No HEIC handy? Try a sample:</div>
          <div className="flex flex-wrap gap-2 text-xs">
            {SAMPLES.map((s) => (
              <button
                key={s.path}
                type="button"
                onClick={() => loadSample(s.path)}
                className="rounded-md border bg-[var(--card)] px-3 py-1.5 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Status / errors */}
      {status === "converting" && (
        <p className="text-center text-sm text-[var(--muted)]">Decoding HEIC and re-encoding…</p>
      )}
      {error && (
        <p className="rounded-md border border-[var(--error)]/30 bg-[var(--error)]/10 px-3 py-2 text-sm text-[var(--error)]">
          {error}
        </p>
      )}

      {/* Result */}
      {result && (
        <div className="space-y-5">
          {/* Main preview — uses PNG (lossless) so this is exactly the HEIC content */}
          <figure className="overflow-hidden rounded-lg border bg-[var(--card)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result.pngUrl}
              alt={`${result.fileName} HEIC content rendered`}
              className="block h-auto w-full"
              style={{ maxHeight: 560, objectFit: "contain" }}
            />
            <figcaption className="border-t bg-[var(--muted-bg)]/40 px-4 py-2 text-xs text-[var(--muted)]">
              <strong className="text-[var(--foreground)]">{result.fileName}.heic</strong> · decoded
              in your browser via WebAssembly. Browsers can&apos;t display HEIC bytes natively, but
              the rendered pixels above are the exact original content (lossless PNG re-encode used
              for display).
            </figcaption>
          </figure>

          {/* Size comparison table */}
          <div className="overflow-hidden rounded-lg border bg-[var(--card)]">
            <table className="w-full text-sm">
              <thead className="bg-[var(--muted-bg)]/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-mono text-xs tracking-wider text-[var(--muted)] uppercase">
                    Format
                  </th>
                  <th className="px-4 py-2 font-mono text-xs tracking-wider text-[var(--muted)] uppercase">
                    Size
                  </th>
                  <th className="px-4 py-2 font-mono text-xs tracking-wider text-[var(--muted)] uppercase">
                    vs HEIC
                  </th>
                  <th className="px-4 py-2 font-mono text-xs tracking-wider text-[var(--muted)] uppercase">
                    Download
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 font-medium">HEIC (original)</td>
                  <td className="px-4 py-3 font-mono">{formatBytes(result.heicSize)}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">baseline</td>
                  <td className="px-4 py-3">
                    <a
                      href={result.heicUrl}
                      download={`${result.fileName}.heic`}
                      className="text-[var(--accent)] hover:underline"
                    >
                      .heic ↓
                    </a>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">JPG (quality 90)</td>
                  <td className="px-4 py-3 font-mono">{formatBytes(result.jpgSize)}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {ratio(result.jpgSize, result.heicSize)}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={result.jpgUrl}
                      download={`${result.fileName}.jpg`}
                      className="text-[var(--accent)] hover:underline"
                    >
                      .jpg ↓
                    </a>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">PNG (lossless)</td>
                  <td className="px-4 py-3 font-mono">{formatBytes(result.pngSize)}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {ratio(result.pngSize, result.heicSize)}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={result.pngUrl}
                      download={`${result.fileName}.png`}
                      className="text-[var(--accent)] hover:underline"
                    >
                      .png ↓
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            Clear and convert another
          </button>
        </div>
      )}
    </div>
  )
}

// Disable SSR — heic2any references `window` / Web Workers
export const HeicToJpgUI = dynamic(() => Promise.resolve(HeicToJpgUIInner), {
  ssr: false,
  loading: () => (
    <div className="py-12 text-center text-sm text-[var(--muted)]">Loading converter…</div>
  ),
})
