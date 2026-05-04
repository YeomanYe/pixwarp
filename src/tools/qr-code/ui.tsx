"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import QRCode from "qrcode"
import jsQR from "jsqr"
import { track, trackError } from "@/lib/analytics"

type ErrorCorrectionLevel = "L" | "M" | "Q" | "H"

const EC_LEVELS: { id: ErrorCorrectionLevel; label: string; note: string }[] = [
  { id: "L", label: "Low", note: "7% recovery" },
  { id: "M", label: "Med", note: "15% recovery" },
  { id: "Q", label: "Quart", note: "25% recovery" },
  { id: "H", label: "High", note: "30% recovery" },
]

function QrCodeInner() {
  const [text, setText] = useState("https://pixwarp.app")
  const [ec, setEc] = useState<ErrorCorrectionLevel>("M")
  const [pngUrl, setPngUrl] = useState<string | null>(null)
  const [svgString, setSvgString] = useState<string | null>(null)
  const [genError, setGenError] = useState<string | null>(null)
  const [decodeError, setDecodeError] = useState<string | null>(null)
  const [isDecoding, setIsDecoding] = useState(false)
  const [copying, setCopying] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    track("tool_open", { tool_slug: "qr-code" })
  }, [])

  // Generator Logic
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (!text.trim()) {
        if (!cancelled) {
          setPngUrl(null)
          setSvgString(null)
          setGenError(null)
        }
        return
      }

      try {
        const canvas = canvasRef.current
        if (!canvas) return
        await QRCode.toCanvas(canvas, text, {
          errorCorrectionLevel: ec,
          width: 800,
          margin: 1,
          color: { dark: "#000000", light: "#ffffff" },
        })
        if (cancelled) return
        const png = canvas.toDataURL("image/png")
        const svg = await QRCode.toString(text, {
          type: "svg",
          errorCorrectionLevel: ec,
          margin: 1,
          color: { dark: "#000000", light: "#ffffff" },
        })
        if (cancelled) return
        setPngUrl(png)
        setSvgString(svg)
        setGenError(null)
      } catch (err) {
        if (cancelled) return
        const msg = err instanceof Error ? err.message : String(err)
        setGenError(msg)
        setPngUrl(null)
        setSvgString(null)
        trackError("qr-code", err)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [text, ec])

  // Decoder Logic
  const decodeFile = useCallback(async (file: File) => {
    setIsDecoding(true)
    setDecodeError(null)
    setGenError(null)
    try {
      const url = URL.createObjectURL(file)
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
        throw new Error("No QR code detected in the pasted/dropped image.")
      }
      setText(result.data)
      track("convert_success", { tool_slug: "qr-code", type: "decode" })
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      setDecodeError(msg)
      trackError("qr-code", err)
    } finally {
      setIsDecoding(false)
    }
  }, [])

  const onPasteFromClipboard = async () => {
    try {
      const items = await navigator.clipboard.read()
      let foundImage = false
      for (const item of items) {
        for (const type of item.types) {
          if (type.startsWith("image/")) {
            const blob = await item.getType(type)
            const file = new File([blob], "pasted-qr.png", { type })
            void decodeFile(file)
            foundImage = true
            break
          }
        }
        if (foundImage) break
      }
      if (!foundImage) {
        setDecodeError("No image found in your clipboard.")
      }
    } catch {
      setDecodeError("Clipboard access denied or unsupported. Try manually pasting (Ctrl+V).")
    }
  }

  const onCopyToClipboard = async () => {
    if (!pngUrl) return
    setCopying(true)
    try {
      const response = await fetch(pngUrl)
      const blob = await response.blob()
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ])
      track("convert_success", { tool_slug: "qr-code", type: "copy" })
    } catch (err) {
      trackError("qr-code", err)
      alert("Failed to copy image. Try right-clicking the QR code and selecting 'Copy image'.")
    } finally {
      setCopying(false)
    }
  }

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) void decodeFile(file)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) void decodeFile(file)
  }

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
      track("convert_success", { tool_slug: "qr-code", type: "download", kind })
    },
    [svgString],
  )

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

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
      <div className="flex-1 space-y-6">
        <div className="relative">
          <label className="mb-2 block text-sm font-bold tracking-tight">
            Content (Text or URL)
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter content to generate, or use the 'Paste' button on the right to extract..."
            rows={8}
            className="border-border bg-card focus:border-accent w-full rounded-2xl border-2 p-4 font-mono text-sm shadow-sm transition-all focus:outline-none"
          />
          {decodeError && (
            <div className="bg-error/5 text-error border-error/10 mt-2 flex items-center gap-2 rounded-lg border p-3 text-xs font-medium">
              <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {decodeError}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold tracking-tight">Error Correction</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {EC_LEVELS.map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => setEc(lvl.id)}
                className={`flex flex-col items-center rounded-xl border-2 px-3 py-3 transition-all active:scale-95 ${
                  ec === lvl.id
                    ? "border-accent bg-accent/5 ring-accent ring-1"
                    : "border-border hover:border-accent/40"
                }`}
              >
                <span className={`text-sm font-black ${ec === lvl.id ? "text-accent" : ""}`}>
                  {lvl.label}
                </span>
                <span className="mt-0.5 text-[9px] font-medium tracking-wider uppercase opacity-60">
                  {lvl.note}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[400px]">
        <div className="sticky top-6 space-y-4">
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            className="group border-border hover:border-accent relative aspect-square w-full overflow-hidden rounded-[2.5rem] border-2 border-dashed bg-white shadow-sm transition-all"
          >
            <div
              className={`flex h-full w-full items-center justify-center p-4 transition-opacity ${isDecoding ? "opacity-20" : "opacity-100"}`}
            >
              <canvas ref={canvasRef} className="h-auto max-h-full max-w-full" />
              {!text.trim() && !genError && (
                <div className="text-muted flex flex-col items-center">
                  <svg
                    className="mb-2 h-10 w-10 opacity-20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <p className="text-xs font-medium italic">Ready to generate</p>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onPick}
              className="absolute inset-0 z-20 cursor-pointer opacity-0"
            />

            {isDecoding && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
                <div className="border-accent h-10 w-10 animate-spin rounded-full border-4 border-t-transparent" />
                <p className="text-accent mt-4 text-sm font-black tracking-tight">
                  Extracting Content...
                </p>
              </div>
            )}

            {!isDecoding && (
              <div className="bg-accent pointer-events-none absolute inset-x-0 bottom-0 z-10 flex translate-y-full flex-col items-center justify-center py-4 text-white transition-transform group-hover:translate-y-0">
                <p className="text-[10px] font-black tracking-[0.2em] uppercase">
                  Drop or click to Extract
                </p>
              </div>
            )}

            {genError && (
              <div className="bg-error/5 absolute inset-0 flex items-center justify-center p-6 text-center">
                <p className="text-error text-xs font-bold">{genError}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onDownload("png")}
              disabled={!pngUrl || isDecoding}
              className="group bg-accent text-accent-fg shadow-accent/20 hover:bg-accent-hover hover:shadow-accent/30 relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl py-4 text-xs font-black shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:pointer-events-none disabled:opacity-50"
            >
              <span>Download PNG</span>
            </button>
            <button
              type="button"
              onClick={onCopyToClipboard}
              disabled={!pngUrl || copying || isDecoding}
              className="border-border bg-card hover:border-accent hover:bg-muted-bg flex items-center justify-center gap-2 rounded-2xl border-2 py-4 text-xs font-bold transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50"
            >
              {copying ? "Copying..." : "Copy Image"}
            </button>
            <button
              type="button"
              onClick={() => onDownload("svg")}
              disabled={!svgString || isDecoding}
              className="border-border bg-card hover:border-accent hover:bg-muted-bg flex items-center justify-center gap-2 rounded-2xl border-2 py-4 text-xs font-bold transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50"
            >
              Save as SVG
            </button>
            <button
              type="button"
              onClick={onPasteFromClipboard}
              disabled={isDecoding}
              className="border-border bg-card hover:border-accent hover:bg-muted-bg flex items-center justify-center gap-2 rounded-2xl border-2 py-4 text-xs font-bold transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50"
            >
              Paste & Extract
            </button>
          </div>

          <p className="text-muted text-center text-[10px] font-bold tracking-wider uppercase">
            Supports PNG/JPG extraction via Clipboard or Drag
          </p>
        </div>
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
    <div className="text-muted animate-pulse py-12 text-center text-sm">
      Initializing QR Engine...
    </div>
  ),
})
