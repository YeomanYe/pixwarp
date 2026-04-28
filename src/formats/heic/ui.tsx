"use client"

import { useState, useCallback } from "react"
import dynamic from "next/dynamic"

type Heic2Any = (opts: { blob: Blob; toType: string; quality?: number }) => Promise<Blob | Blob[]>

interface ComparisonResult {
  heicSize: number
  jpgSize: number
  pngSize: number
  jpgUrl: string
  pngUrl: string
  heicUrl: string
  fileName: string
}

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

function HeicCompareInner() {
  const [result, setResult] = useState<ComparisonResult | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const processFile = useCallback(async (file: File) => {
    setBusy(true)
    setError(null)
    try {
      const heic2anyModule = await import("heic2any")
      const heic2any =
        (heic2anyModule.default as unknown as Heic2Any) ?? (heic2anyModule as unknown as Heic2Any)

      const jpgBlobRaw = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.9 })
      const jpgBlob = Array.isArray(jpgBlobRaw) ? jpgBlobRaw[0] : jpgBlobRaw

      const pngBlobRaw = await heic2any({ blob: file, toType: "image/png" })
      const pngBlob = Array.isArray(pngBlobRaw) ? pngBlobRaw[0] : pngBlobRaw

      setResult({
        heicSize: file.size,
        jpgSize: jpgBlob.size,
        pngSize: pngBlob.size,
        heicUrl: URL.createObjectURL(file),
        jpgUrl: URL.createObjectURL(jpgBlob),
        pngUrl: URL.createObjectURL(pngBlob),
        fileName: file.name.replace(/\.(heic|heif)$/i, ""),
      })
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "Failed to process file")
    } finally {
      setBusy(false)
    }
  }, [])

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return
      const file = fileList[0]
      const lower = file.name.toLowerCase()
      if (!lower.endsWith(".heic") && !lower.endsWith(".heif")) {
        setError(`Not a HEIC file: ${file.name}`)
        return
      }
      void processFile(file)
    },
    [processFile],
  )

  const handleClear = useCallback(() => {
    if (result) {
      URL.revokeObjectURL(result.heicUrl)
      URL.revokeObjectURL(result.jpgUrl)
      URL.revokeObjectURL(result.pngUrl)
    }
    setResult(null)
    setError(null)
  }, [result])

  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--muted)]">
        Drop a HEIC photo here. Your file is converted to JPG and PNG <strong>locally</strong> — it
        never leaves your device. Compare the file sizes and preview side-by-side, then download all
        three formats.
      </p>

      <div
        onDrop={(e) => {
          e.preventDefault()
          handleFiles(e.dataTransfer.files)
        }}
        onDragOver={(e) => e.preventDefault()}
        className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--border)] bg-[var(--muted-bg)]/40 px-6 py-10 text-center"
      >
        <p className="mb-3 text-sm font-medium">Drop a HEIC file to compare</p>
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

      {busy && <p className="text-center text-sm text-[var(--muted)]">Converting and analyzing…</p>}
      {error && (
        <p className="rounded-md border border-[var(--error)]/30 bg-[var(--error)]/10 px-3 py-2 text-sm text-[var(--error)]">
          {error}
        </p>
      )}

      {result && (
        <div className="space-y-4">
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
                <tr className="border-t">
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

          {/* Side-by-side preview */}
          <div>
            <div className="mb-2 text-sm font-semibold">Side-by-side preview</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <figure className="rounded-lg border bg-[var(--card)] p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={result.jpgUrl}
                  alt="JPG render"
                  className="h-auto w-full rounded object-contain"
                  style={{ maxHeight: 400 }}
                />
                <figcaption className="mt-2 text-center text-xs text-[var(--muted)]">
                  JPG · {formatBytes(result.jpgSize)}
                </figcaption>
              </figure>
              <figure className="rounded-lg border bg-[var(--card)] p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={result.pngUrl}
                  alt="PNG render"
                  className="h-auto w-full rounded object-contain"
                  style={{ maxHeight: 400 }}
                />
                <figcaption className="mt-2 text-center text-xs text-[var(--muted)]">
                  PNG · {formatBytes(result.pngSize)}
                </figcaption>
              </figure>
            </div>
            <p className="mt-2 text-xs text-[var(--muted)]">
              Note: HEIC itself does not render in most browsers — that&apos;s why you only see JPG
              and PNG previews above.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            Clear and try another file
          </button>
        </div>
      )}
    </div>
  )
}

export const HeicCompareWidget = dynamic(() => Promise.resolve(HeicCompareInner), {
  ssr: false,
  loading: () => (
    <div className="py-8 text-center text-sm text-[var(--muted)]">Loading widget…</div>
  ),
})
