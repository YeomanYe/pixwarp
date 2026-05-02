"use client"

import { useCallback, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { track, trackError } from "@/lib/analytics"
import { useConfirm } from "@/components/ConfirmProvider"

interface PdfItem {
  id: string
  file: File
  pages?: number
  size: number
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1024 / 1024).toFixed(2)} MB`
}

function PdfMergeInner() {
  const [items, setItems] = useState<PdfItem[]>([])
  const [merging, setMerging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [outUrl, setOutUrl] = useState<string | null>(null)
  const [outSize, setOutSize] = useState(0)
  const confirm = useConfirm()

  useEffect(() => {
    track("tool_open", { tool_slug: "pdf-merge" })
  }, [])

  useEffect(
    () => () => {
      if (outUrl) URL.revokeObjectURL(outUrl)
    },
    [outUrl],
  )

  const addFiles = useCallback(async (files: FileList | File[]) => {
    const incoming = Array.from(files).filter((f) => f.type === "application/pdf")
    if (incoming.length === 0) return
    const { PDFDocument } = await import("pdf-lib")
    const newItems: PdfItem[] = []
    for (const file of incoming) {
      let pages: number | undefined
      try {
        const buf = await file.arrayBuffer()
        const doc = await PDFDocument.load(buf, { ignoreEncryption: true })
        pages = doc.getPageCount()
      } catch {
        pages = undefined
      }
      newItems.push({
        id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        size: file.size,
        pages,
      })
      track("file_dropped", {
        tool_slug: "pdf-merge",
        file_type: file.type,
        file_size_kb: Math.round(file.size / 1024),
      })
    }
    setItems((prev) => [...prev, ...newItems])
  }, [])

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) void addFiles(e.target.files)
    e.target.value = ""
  }

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files) void addFiles(e.dataTransfer.files)
  }

  const move = (id: string, delta: -1 | 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === id)
      if (i < 0) return prev
      const j = i + delta
      if (j < 0 || j >= prev.length) return prev
      const next = [...prev]
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
  }

  const remove = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id))
  }

  const merge = useCallback(async () => {
    if (items.length < 2) {
      setError("Add at least 2 PDFs to merge")
      return
    }
    setMerging(true)
    setError(null)
    if (outUrl) URL.revokeObjectURL(outUrl)
    setOutUrl(null)
    try {
      const { PDFDocument } = await import("pdf-lib")
      const out = await PDFDocument.create()
      for (const it of items) {
        const buf = await it.file.arrayBuffer()
        const src = await PDFDocument.load(buf, { ignoreEncryption: true })
        const indices = src.getPageIndices()
        const copied = await out.copyPages(src, indices)
        copied.forEach((p) => out.addPage(p))
      }
      const bytes = await out.save()
      // Wrap the Uint8Array view in a fresh ArrayBuffer so Blob accepts it cleanly across TS versions.
      const blob = new Blob([bytes.slice().buffer], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      setOutUrl(url)
      setOutSize(blob.size)
      track("convert_success", { tool_slug: "pdf-merge" })
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      setError(msg)
      trackError("pdf-merge", err)
    } finally {
      setMerging(false)
    }
  }, [items, outUrl])

  const download = () => {
    if (!outUrl) return
    const a = document.createElement("a")
    a.href = outUrl
    a.download = "merged.pdf"
    a.click()
  }

  const totalSize = items.reduce((acc, x) => acc + x.size, 0)
  const totalPages = items.reduce((acc, x) => acc + (x.pages ?? 0), 0)

  return (
    <div>
      <label
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="mb-4 flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-[var(--card)] p-6 text-center transition hover:border-[var(--accent)]"
      >
        <p className="text-base font-medium">Drop PDFs or click to add</p>
        <p className="mt-1 text-sm text-[var(--muted)]">Add as many as you want</p>
        <input type="file" accept="application/pdf" multiple onChange={onPick} className="hidden" />
      </label>

      {items.length === 0 && (
        <div className="rounded-lg border border-dashed py-10 text-center text-sm text-[var(--muted)]">
          No PDFs yet.
        </div>
      )}

      {items.length > 0 && (
        <>
          <ol className="divide-y rounded-lg border bg-[var(--card)]">
            {items.map((it, i) => (
              <li key={it.id} className="flex items-center gap-3 p-3">
                <span className="w-6 text-right font-mono text-xs text-[var(--muted)]">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{it.file.name}</div>
                  <div className="mt-0.5 text-xs text-[var(--muted)]">
                    {formatBytes(it.size)}
                    {typeof it.pages === "number" && ` · ${it.pages} pages`}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => move(it.id, -1)}
                    disabled={i === 0}
                    aria-label="Move up"
                    className="rounded-md border px-2 py-1 text-xs transition hover:border-[var(--accent)] disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => move(it.id, 1)}
                    disabled={i === items.length - 1}
                    aria-label="Move down"
                    className="rounded-md border px-2 py-1 text-xs transition hover:border-[var(--accent)] disabled:opacity-30"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      confirm({
                        title: "Remove PDF?",
                        description: "This will remove this PDF from the merge list.",
                        confirmText: "Remove",
                        isDanger: true,
                        onConfirm: () => remove(it.id),
                      })
                    }
                    aria-label="Remove"
                    className="rounded-md px-2 py-1 text-xs text-[var(--muted)] transition hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-md bg-[var(--card)] px-4 py-2 text-sm">
            <span className="text-[var(--muted)]">
              {items.length} files · {totalPages || "?"} pages · {formatBytes(totalSize)}
            </span>
            <div className="flex items-center gap-2">
              {outUrl && (
                <span className="text-xs text-emerald-600">Ready · {formatBytes(outSize)}</span>
              )}
              <button
                type="button"
                onClick={merge}
                disabled={merging || items.length < 2}
                className="rounded-md border px-3 py-1.5 text-sm font-medium transition hover:border-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {merging ? "Merging…" : "Merge"}
              </button>
              <button
                type="button"
                onClick={download}
                disabled={!outUrl}
                className="rounded-md bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download
              </button>
            </div>
          </div>

          {error && (
            <p className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
        </>
      )}
    </div>
  )
}

export const PdfMergeUI = dynamic(() => Promise.resolve(PdfMergeInner), {
  ssr: false,
  loading: () => (
    <div className="py-12 text-center text-sm text-[var(--muted)]">Loading PDF tool…</div>
  ),
})
