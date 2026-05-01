"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import dynamic from "next/dynamic"

type FrameStyle = "browser-light" | "browser-dark" | "device-mac" | "none"
type Background = {
  id: string
  label: string
  css: string
}

const BACKGROUNDS: Background[] = [
  { id: "sunset", label: "Sunset", css: "linear-gradient(135deg, #fb923c 0%, #f43f5e 100%)" },
  { id: "ocean", label: "Ocean", css: "linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)" },
  { id: "forest", label: "Forest", css: "linear-gradient(135deg, #84cc16 0%, #14b8a6 100%)" },
  { id: "candy", label: "Candy", css: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)" },
  { id: "neutral", label: "Charcoal", css: "linear-gradient(135deg, #18181b 0%, #3f3f46 100%)" },
  { id: "paper", label: "Paper", css: "linear-gradient(135deg, #fafafa 0%, #e4e4e7 100%)" },
]

function MockupInner() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imageName, setImageName] = useState<string>("screenshot")
  const [frame, setFrame] = useState<FrameStyle>("browser-light")
  const [bg, setBg] = useState<Background>(BACKGROUNDS[0])
  const [padding, setPadding] = useState(80)
  const [radius, setRadius] = useState(12)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        setError("Please drop an image file.")
        return
      }
      setError(null)
      setImageName(file.name.replace(/\.[^/.]+$/, ""))
      if (imageUrl) URL.revokeObjectURL(imageUrl)
      setImageUrl(URL.createObjectURL(file))
    },
    [imageUrl],
  )

  useEffect(() => {
    if (imageUrl) return
    const onPaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.matches("input, textarea, [contenteditable='true']")) return
      const items = e.clipboardData?.items
      if (!items) return
      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile()
          if (file) {
            e.preventDefault()
            handleFile(file)
            break
          }
        }
      }
    }
    document.addEventListener("paste", onPaste)
    return () => document.removeEventListener("paste", onPaste)
  }, [imageUrl, handleFile])

  const handlePasteButton = useCallback(async () => {
    try {
      if (!navigator.clipboard?.read) {
        setError("Clipboard not available — paste with Cmd/Ctrl+V instead.")
        return
      }
      const items = await navigator.clipboard.read()
      for (const item of items) {
        const imageType = item.types.find((t) => t.startsWith("image/"))
        if (imageType) {
          const blob = await item.getType(imageType)
          const file = new File([blob], `pasted.${imageType.split("/")[1] || "png"}`, {
            type: imageType,
          })
          handleFile(file)
          return
        }
      }
      setError("No image found in clipboard.")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to read clipboard")
    }
  }, [handleFile])

  const handleExport = useCallback(async () => {
    if (!stageRef.current) return
    setBusy(true)
    try {
      const { toPng } = await import("html-to-image")
      const dataUrl = await toPng(stageRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      })
      const link = document.createElement("a")
      link.download = `${imageName}-mockup.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "Export failed")
    } finally {
      setBusy(false)
    }
  }, [imageName])

  return (
    <div className="space-y-6">
      {!imageUrl ? (
        <div
          onDrop={(e) => {
            e.preventDefault()
            const f = e.dataTransfer.files[0]
            if (f) handleFile(f)
          }}
          onDragOver={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--border)] bg-[var(--muted-bg)]/40 px-6 py-16 text-center"
        >
          <p className="mb-1 text-base font-medium">Drop a screenshot here</p>
          <p className="mb-1 text-sm text-[var(--muted)]">PNG / JPG / WebP — processed locally</p>
          <p className="mb-4 text-xs text-[var(--muted)]">
            or press <kbd className="rounded border px-1 font-mono">⌘V</kbd> /{" "}
            <kbd className="rounded border px-1 font-mono">Ctrl+V</kbd> to paste
          </p>
          <div className="flex w-full flex-col gap-2 min-[580px]:w-auto min-[580px]:flex-row min-[580px]:items-center min-[580px]:justify-center">
            <label className="w-full cursor-pointer rounded-md bg-[var(--accent)] px-4 py-2 text-center text-sm font-medium text-[var(--accent-fg)] transition hover:bg-[var(--accent-hover)] min-[580px]:w-auto">
              Choose image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) handleFile(f)
                }}
                className="hidden"
              />
            </label>
            <button
              type="button"
              onClick={handlePasteButton}
              className="w-full rounded-md border px-4 py-2 text-sm font-medium transition hover:border-[var(--accent)] hover:text-[var(--accent)] min-[580px]:w-auto"
            >
              Paste image
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <div className="mb-2 text-sm font-semibold">Background</div>
              <div className="flex flex-wrap gap-2">
                {BACKGROUNDS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBg(b)}
                    className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs transition ${
                      bg.id === b.id
                        ? "border-[var(--accent)] text-[var(--accent)]"
                        : "hover:border-[var(--accent)]"
                    }`}
                  >
                    <span
                      className="h-4 w-4 rounded-full border"
                      style={{ background: b.css }}
                      aria-hidden
                    />
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm font-semibold">Frame</div>
              <div className="flex flex-wrap gap-2">
                {(["browser-light", "browser-dark", "device-mac", "none"] as FrameStyle[]).map(
                  (f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFrame(f)}
                      className={`rounded-md border px-3 py-1.5 text-xs transition ${
                        frame === f
                          ? "border-[var(--accent)] text-[var(--accent)]"
                          : "hover:border-[var(--accent)]"
                      }`}
                    >
                      {f === "browser-light"
                        ? "Browser Light"
                        : f === "browser-dark"
                          ? "Browser Dark"
                          : f === "device-mac"
                            ? "macOS Window"
                            : "No frame"}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex items-center gap-3 text-sm">
                <span className="w-20 text-[var(--muted)]">Padding</span>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={padding}
                  onChange={(e) => setPadding(Number(e.target.value))}
                  className="flex-1 accent-[var(--accent)]"
                />
                <span className="w-10 text-right font-mono text-xs">{padding}px</span>
              </label>
              <label className="flex items-center gap-3 text-sm">
                <span className="w-20 text-[var(--muted)]">Radius</span>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="flex-1 accent-[var(--accent)]"
                />
                <span className="w-10 text-right font-mono text-xs">{radius}px</span>
              </label>
            </div>
          </div>

          {/* Stage */}
          <div className="overflow-auto rounded-lg border bg-[var(--muted-bg)]/30 p-4">
            <div
              ref={stageRef}
              style={{
                background: bg.css,
                padding,
              }}
              className="mx-auto inline-block"
            >
              <div
                style={{
                  borderRadius: radius,
                  overflow: "hidden",
                  boxShadow: "0 30px 60px -20px rgba(0,0,0,0.4)",
                }}
              >
                {frame === "browser-light" && <BrowserBar variant="light" />}
                {frame === "browser-dark" && <BrowserBar variant="dark" />}
                {frame === "device-mac" && <MacBar />}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Screenshot"
                  style={{ display: "block", maxWidth: 900 }}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExport}
              disabled={busy}
              className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-fg)] transition hover:bg-[var(--accent-hover)] disabled:opacity-50"
            >
              {busy ? "Exporting…" : "Download PNG (2x)"}
            </button>
            <button
              type="button"
              onClick={() => {
                if (imageUrl) URL.revokeObjectURL(imageUrl)
                setImageUrl(null)
                setError(null)
              }}
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Choose another image
            </button>
            {error && <span className="text-sm text-[var(--error)]">{error}</span>}
          </div>
        </>
      )}
    </div>
  )
}

function BrowserBar({ variant }: { variant: "light" | "dark" }) {
  const isLight = variant === "light"
  return (
    <div
      style={{
        background: isLight ? "#f4f4f5" : "#27272a",
        padding: "10px 12px",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div style={{ display: "flex", gap: 6 }}>
        <span style={dot("#ef4444")} />
        <span style={dot("#f59e0b")} />
        <span style={dot("#22c55e")} />
      </div>
      <div
        style={{
          flex: 1,
          marginLeft: 8,
          height: 22,
          borderRadius: 6,
          background: isLight ? "#ffffff" : "#18181b",
          color: isLight ? "#71717a" : "#a1a1aa",
          fontSize: 11,
          display: "flex",
          alignItems: "center",
          paddingLeft: 10,
          fontFamily: "ui-monospace, monospace",
        }}
      >
        pixwarp.app
      </div>
    </div>
  )
}

function MacBar() {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #38383d 0%, #2c2c30 100%)",
        padding: "8px 12px",
        display: "flex",
        gap: 6,
      }}
    >
      <span style={dot("#ff5f57")} />
      <span style={dot("#febc2e")} />
      <span style={dot("#28c840")} />
    </div>
  )
}

function dot(color: string): React.CSSProperties {
  return {
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: color,
    display: "inline-block",
  }
}

export const ScreenshotMockupUI = dynamic(() => Promise.resolve(MockupInner), {
  ssr: false,
  loading: () => (
    <div className="py-12 text-center text-sm text-[var(--muted)]">Loading mockup composer…</div>
  ),
})
