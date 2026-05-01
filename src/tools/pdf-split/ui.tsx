"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { track, trackError } from "@/lib/analytics"

type Mode = "ranges" | "every"

interface Output {
  label: string
  url: string
  size: number
  pages: number
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1024 / 1024).toFixed(2)} MB`
}

interface ParsedRange {
  start: number
  end: number
  label: string
}

function parseRanges(input: string, totalPages: number): ParsedRange[] | string {
  const trimmed = input.trim()
  if (!trimmed) return "Enter at least one page or range"
  const parts = trimmed
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  const out: ParsedRange[] = []
  for (const part of parts) {
    const m = /^(\d+)(?:\s*-\s*(\d+))?$/.exec(part)
    if (!m) return `Invalid range: "${part}"`
    const start = Number(m[1])
    const end = m[2] ? Number(m[2]) : start
    if (start < 1 || end < 1) return `Pages must be ≥ 1: "${part}"`
    if (end < start) return `End < start in "${part}"`
    if (end > totalPages) return `Page ${end} > total ${totalPages}`
    out.push({ start, end, label: start === end ? `p${start}` : `p${start}-${end}` })
  }
  return out
}

function PdfSplitInner() {
  const [file, setFile] = useState<File | null>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [mode, setMode] = useState<Mode>("ranges")
  const [rangesInput, setRangesInput] = useState("1")
  const [outputs, setOutputs] = useState<Output[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    track("tool_open", { tool_slug: "pdf-split" })
  }, [])

  useEffect(
    () => () => {
      outputs.forEach((o) => URL.revokeObjectURL(o.url))
    },
    [outputs],
  )

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    e.target.value = ""
    if (f) await loadFile(f)
  }

  const onDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    const f = e.dataTransfer.files?.[0]
    if (f) await loadFile(f)
  }

  async function loadFile(f: File) {
    if (f.type !== "application/pdf") {
      setError("Please pick a PDF file")
      return
    }
    setError(null)
    setOutputs((prev) => {
      prev.forEach((o) => URL.revokeObjectURL(o.url))
      return []
    })
    track("file_dropped", {
      tool_slug: "pdf-split",
      file_type: f.type,
      file_size_kb: Math.round(f.size / 1024),
    })
    try {
      const { PDFDocument } = await import("pdf-lib")
      const buf = await f.arrayBuffer()
      const doc = await PDFDocument.load(buf, { ignoreEncryption: true })
      setFile(f)
      setTotalPages(doc.getPageCount())
      setRangesInput(`1-${doc.getPageCount()}`)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      setError(`Could not read PDF: ${msg}`)
      trackError("pdf-split", err)
    }
  }

  const ranges = useMemo(() => {
    if (mode !== "ranges" || !file) return null
    return parseRanges(rangesInput, totalPages)
  }, [mode, rangesInput, totalPages, file])

  const split = useCallback(async () => {
    if (!file) return
    setBusy(true)
    setError(null)
    setOutputs((prev) => {
      prev.forEach((o) => URL.revokeObjectURL(o.url))
      return []
    })
    try {
      const { PDFDocument } = await import("pdf-lib")
      const buf = await file.arrayBuffer()
      const src = await PDFDocument.load(buf, { ignoreEncryption: true })

      const groups: { label: string; indices: number[] }[] = []
      if (mode === "every") {
        for (let i = 0; i < totalPages; i++) {
          groups.push({ label: `p${i + 1}`, indices: [i] })
        }
      } else {
        if (typeof ranges === "string" || !ranges) {
          setBusy(false)
          setError(typeof ranges === "string" ? ranges : "Invalid ranges")
          return
        }
        for (const r of ranges) {
          const idx: number[] = []
          for (let p = r.start; p <= r.end; p++) idx.push(p - 1)
          groups.push({ label: r.label, indices: idx })
        }
      }

      const outs: Output[] = []
      for (const g of groups) {
        const out = await PDFDocument.create()
        const copied = await out.copyPages(src, g.indices)
        copied.forEach((p) => out.addPage(p))
        const bytes = await out.save()
        const blob = new Blob([bytes.slice().buffer], { type: "application/pdf" })
        outs.push({
          label: g.label,
          url: URL.createObjectURL(blob),
          size: blob.size,
          pages: g.indices.length,
        })
      }
      setOutputs(outs)
      track("convert_success", { tool_slug: "pdf-split" })
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      setError(msg)
      trackError("pdf-split", err)
    } finally {
      setBusy(false)
    }
  }, [file, mode, ranges, totalPages])

  const downloadOne = (o: Output, baseName: string) => {
    const a = document.createElement("a")
    a.href = o.url
    a.download = `${baseName}.${o.label}.pdf`
    a.click()
  }

  const baseName = file ? file.name.replace(/\.pdf$/i, "") : "split"

  const rangesError = mode === "ranges" && file && typeof ranges === "string" ? ranges : null

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
              {totalPages} pages · {formatBytes(file.size)} · click to swap
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
          <div className="mb-4 grid gap-4 sm:grid-cols-[200px_1fr_auto] sm:items-end">
            <div className="inline-flex rounded-lg border bg-[var(--card)] p-1 text-sm">
              {(["ranges", "every"] as Mode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`rounded-md px-3 py-1.5 font-medium transition ${
                    mode === m
                      ? "bg-[var(--accent)] text-white"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {m === "ranges" ? "By ranges" : "Every page"}
                </button>
              ))}
            </div>

            <div>
              {mode === "ranges" ? (
                <>
                  <label className="mb-1 block text-sm font-medium">
                    Ranges <span className="font-normal text-[var(--muted)]">(1-indexed)</span>
                  </label>
                  <input
                    value={rangesInput}
                    onChange={(e) => setRangesInput(e.target.value)}
                    placeholder="1-3, 5, 8-10"
                    className="w-full rounded-md border bg-[var(--card)] px-3 py-2 font-mono text-sm focus:border-[var(--accent)] focus:outline-none"
                  />
                  {rangesError && <p className="mt-1 text-xs text-red-600">{rangesError}</p>}
                </>
              ) : (
                <p className="text-sm text-[var(--muted)]">
                  Will produce {totalPages} files, one per page.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={split}
              disabled={busy || (mode === "ranges" && rangesError !== null)}
              className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? "Splitting…" : "Split"}
            </button>
          </div>

          {error && (
            <p className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          {outputs.length > 0 && (
            <ul className="divide-y rounded-lg border bg-[var(--card)]">
              {outputs.map((o) => (
                <li key={o.label} className="flex items-center gap-3 p-3">
                  <span className="font-mono text-xs text-[var(--muted)]">{o.label}</span>
                  <div className="flex-1 text-sm">
                    {o.pages} {o.pages === 1 ? "page" : "pages"} · {formatBytes(o.size)}
                  </div>
                  <button
                    type="button"
                    onClick={() => downloadOne(o, baseName)}
                    className="rounded-md bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-white transition hover:opacity-90"
                  >
                    Download
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}

export const PdfSplitUI = dynamic(() => Promise.resolve(PdfSplitInner), {
  ssr: false,
  loading: () => (
    <div className="py-12 text-center text-sm text-[var(--muted)]">Loading PDF tool…</div>
  ),
})
