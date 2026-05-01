"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import QRCode from "qrcode"
import jsQR from "jsqr"
import { track, trackError } from "@/lib/analytics"

type Mode = "generate" | "decode"
type ErrorCorrectionLevel = "L" | "M" | "Q" | "H"

const EC_LEVELS: { id: ErrorCorrectionLevel; label: string; note: string }[] = [
  { id: "L", label: "Low", note: "~7% recovery" },
  { id: "M", label: "Medium", note: "~15% recovery" },
  { id: "Q", label: "Quartile", note: "~25% recovery" },
  { id: "H", label: "High", note: "~30% recovery — best for logo overlay" },
]

function QrCodeInner() {
  const [mode, setMode] = useState<Mode>("generate")

  useEffect(() => {
    track("tool_open", { tool_slug: "qr-code" })
  }, [])

  return (
    <div>
      <div className="mb-6 inline-flex rounded-lg border bg-[var(--card)] p-1">
        {(["generate", "decode"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
              mode === m
                ? "bg-[var(--accent)] text-white"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {m === "generate" ? "Generate" : "Decode"}
          </button>
        ))}
      </div>

      {mode === "generate" ? <GeneratePanel /> : <DecodePanel />}
    </div>
  )
}

function GeneratePanel() {
  const [text, setText] = useState("https://pixwarp.app")
  const [ec, setEc] = useState<ErrorCorrectionLevel>("M")
  const [size, setSize] = useState(512)
  const [pngUrl, setPngUrl] = useState<string | null>(null)
  const [svgString, setSvgString] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!text.trim()) return
    let cancelled = false
    ;(async () => {
      try {
        const canvas = canvasRef.current
        if (!canvas) return
        await QRCode.toCanvas(canvas, text, {
          errorCorrectionLevel: ec,
          width: size,
          margin: 2,
          color: { dark: "#000000", light: "#ffffff" },
        })
        if (cancelled) return
        const png = canvas.toDataURL("image/png")
        const svg = await QRCode.toString(text, {
          type: "svg",
          errorCorrectionLevel: ec,
          margin: 2,
          color: { dark: "#000000", light: "#ffffff" },
        })
        if (cancelled) return
        setPngUrl(png)
        setSvgString(svg)
        setError(null)
      } catch (err) {
        if (cancelled) return
        const msg = err instanceof Error ? err.message : String(err)
        setError(msg)
        setPngUrl(null)
        setSvgString(null)
        trackError("qr-code", err)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [text, ec, size])

  const onDownload = useCallback(
    (kind: "png" | "svg") => {
      const a = document.createElement("a")
      if (kind === "png") {
        const url = canvasRef.current?.toDataURL("image/png")
        if (!url) return
        a.href = url
      } else {
        if (!svgString) return
        a.href = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString)
      }
      a.download = `qr.${kind}`
      a.click()
      track("convert_success", { tool_slug: "qr-code" })
    },
    [svgString],
  )

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div>
        <label className="mb-2 block text-sm font-medium">Text or URL</label>
        <textarea
          value={text}
          onChange={(e) => {
            const v = e.target.value
            setText(v)
            if (!v.trim()) {
              setPngUrl(null)
              setSvgString(null)
              setError(null)
            }
          }}
          placeholder="https://example.com or any text…"
          rows={4}
          className="w-full rounded-md border bg-[var(--card)] p-3 font-mono text-sm focus:border-[var(--accent)] focus:outline-none"
        />

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium">Error correction</label>
          <div className="flex flex-wrap gap-2">
            {EC_LEVELS.map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => setEc(lvl.id)}
                className={`rounded-md border px-3 py-1.5 text-sm transition ${
                  ec === lvl.id
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                    : "hover:border-[var(--accent)]"
                }`}
                title={lvl.note}
              >
                {lvl.label}
              </button>
            ))}
          </div>
          <p className="mt-1.5 text-xs text-[var(--muted)]">
            {EC_LEVELS.find((l) => l.id === ec)?.note}
          </p>
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium">
            Size: <span className="font-mono">{size}px</span>
          </label>
          <input
            type="range"
            min={128}
            max={1024}
            step={32}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="rounded-lg border bg-white p-4">
          <canvas ref={canvasRef} className="block" style={{ maxWidth: "100%", height: "auto" }} />
          {error && <p className="mt-2 max-w-[280px] text-center text-xs text-red-600">{error}</p>}
          {!pngUrl && !error && (
            <p className="mt-2 text-center text-xs text-[var(--muted)]">
              Type something to generate a QR.
            </p>
          )}
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => onDownload("png")}
            disabled={!pngUrl}
            className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Download PNG
          </button>
          <button
            type="button"
            onClick={() => onDownload("svg")}
            disabled={!svgString}
            className="rounded-md border px-4 py-2 text-sm font-medium transition hover:border-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Download SVG
          </button>
        </div>
      </div>
    </div>
  )
}

function DecodePanel() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [decoded, setDecoded] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const decodeFile = useCallback(async (file: File) => {
    setBusy(true)
    setError(null)
    setDecoded(null)
    try {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)

      track("file_dropped", {
        tool_slug: "qr-code",
        file_type: file.type || "unknown",
        file_size_kb: Math.round(file.size / 1024),
      })

      const img = await loadImage(url)
      const canvas = document.createElement("canvas")
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Failed to get canvas context")
      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const result = jsQR(imageData.data, imageData.width, imageData.height)
      if (!result) {
        throw new Error("No QR code found in this image")
      }
      setDecoded(result.data)
      track("convert_success", { tool_slug: "qr-code" })
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      setError(msg)
      trackError("qr-code", err)
    } finally {
      setBusy(false)
    }
  }, [])

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) void decodeFile(file)
  }

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) void decodeFile(file)
  }

  useEffect(() => {
    const handler = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return
      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile()
          if (file) {
            void decodeFile(file)
            return
          }
        }
      }
    }
    window.addEventListener("paste", handler)
    return () => window.removeEventListener("paste", handler)
  }, [decodeFile])

  const isUrl = decoded ? /^https?:\/\//i.test(decoded) : false

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <label
        htmlFor="qr-decode-file"
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-[var(--card)] p-6 text-center transition hover:border-[var(--accent)]"
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="QR source" className="max-h-64 max-w-full rounded border" />
        ) : (
          <>
            <p className="text-base font-medium">Drop, paste, or click to pick an image</p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              PNG, JPG, WebP — anything with a QR in it
            </p>
          </>
        )}
        <input
          id="qr-decode-file"
          type="file"
          accept="image/*"
          onChange={onPick}
          className="hidden"
        />
      </label>

      <div className="flex flex-col">
        <label className="mb-2 block text-sm font-medium">Decoded</label>
        <div className="min-h-[160px] flex-1 rounded-md border bg-[var(--card)] p-4 font-mono text-sm break-all">
          {busy && <span className="text-[var(--muted)]">Decoding…</span>}
          {!busy && error && <span className="text-red-600">{error}</span>}
          {!busy && !error && decoded && <span>{decoded}</span>}
          {!busy && !error && !decoded && (
            <span className="text-[var(--muted)]">Drop an image on the left to decode.</span>
          )}
        </div>
        {decoded && (
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(decoded)}
              className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              Copy
            </button>
            {isUrl && (
              <a
                href={decoded}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border px-4 py-2 text-sm font-medium transition hover:border-[var(--accent)]"
              >
                Open link
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error("Failed to load image"))
    img.src = src
  })
}

export const QrCodeUI = dynamic(() => Promise.resolve(QrCodeInner), {
  ssr: false,
  loading: () => (
    <div className="py-12 text-center text-sm text-[var(--muted)]">Loading QR tool…</div>
  ),
})
