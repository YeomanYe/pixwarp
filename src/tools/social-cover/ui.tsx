"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import dynamic from "next/dynamic"
import { track, trackError } from "@/lib/analytics"

type Ratio = { id: string; label: string; w: number; h: number; note: string }
type Theme = {
  id: string
  label: string
  bg: string
  fg: string
  accent: string
  fontFamily: string
}

const RATIOS: Ratio[] = [
  { id: "16x9", label: "16:9", w: 1200, h: 675, note: "Blog / OG / YouTube" },
  { id: "3x4", label: "3:4", w: 750, h: 1000, note: "RedNote / Pinterest" },
  { id: "9x16", label: "9:16", w: 675, h: 1200, note: "IG / TikTok Story" },
]

const THEMES: Theme[] = [
  {
    id: "sunset",
    label: "Sunset",
    bg: "linear-gradient(135deg, #fb923c 0%, #f43f5e 100%)",
    fg: "#ffffff",
    accent: "#ffe4e6",
    fontFamily: '"Inter", system-ui, sans-serif',
  },
  {
    id: "midnight",
    label: "Midnight",
    bg: "linear-gradient(135deg, #1e3a8a 0%, #6d28d9 100%)",
    fg: "#ffffff",
    accent: "#ddd6fe",
    fontFamily: '"Inter", system-ui, sans-serif',
  },
  {
    id: "mint",
    label: "Mint",
    bg: "linear-gradient(135deg, #14b8a6 0%, #84cc16 100%)",
    fg: "#0f172a",
    accent: "#0f172a",
    fontFamily: '"Inter", system-ui, sans-serif',
  },
  {
    id: "paper",
    label: "Paper",
    bg: "linear-gradient(135deg, #fafafa 0%, #e4e4e7 100%)",
    fg: "#18181b",
    accent: "#f97316",
    fontFamily: '"Inter", system-ui, sans-serif',
  },
  {
    id: "carbon",
    label: "Carbon",
    bg: "linear-gradient(135deg, #18181b 0%, #3f3f46 100%)",
    fg: "#fafafa",
    accent: "#f97316",
    fontFamily: '"Inter", system-ui, sans-serif',
  },
  {
    id: "candy",
    label: "Candy",
    bg: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
    fg: "#ffffff",
    accent: "#fbcfe8",
    fontFamily: '"Inter", system-ui, sans-serif',
  },
]

function CoverInner() {
  const [ratio, setRatio] = useState<Ratio>(RATIOS[0])
  const [theme, setTheme] = useState<Theme>(THEMES[0])
  const [eyebrow, setEyebrow] = useState("Essay · 2026")
  const [title, setTitle] = useState("How we shipped a tool in 14 days without burning out")
  const [subtitle, setSubtitle] = useState(
    "Three rules, two principles, and one ugly compromise that made it work.",
  )
  const [author, setAuthor] = useState("by @yourhandle")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    track("tool_open", { tool_slug: "social-cover" })
  }, [])

  const handleExport = useCallback(async () => {
    if (!stageRef.current) return
    setBusy(true)
    setError(null)
    try {
      const { toPng } = await import("html-to-image")
      const dataUrl = await toPng(stageRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        width: ratio.w,
        height: ratio.h,
      })
      const link = document.createElement("a")
      link.download = `cover-${ratio.id}-${theme.id}.png`
      link.href = dataUrl
      link.click()
      track("convert_success", { tool_slug: "social-cover" })
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "Export failed")
      trackError("social-cover", err)
    } finally {
      setBusy(false)
    }
  }, [ratio, theme])

  // Scale stage to fit preview area while keeping export resolution true
  const previewMaxW = 540
  const previewMaxH = 540
  const scale = Math.min(previewMaxW / ratio.w, previewMaxH / ratio.h)

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      {/* Controls */}
      <div className="space-y-4">
        <Field label="Aspect ratio">
          <div className="grid grid-cols-3 gap-2">
            {RATIOS.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRatio(r)}
                className={`rounded-md border px-2 py-2 text-center transition ${
                  ratio.id === r.id
                    ? "border-[var(--accent)] text-[var(--accent)]"
                    : "hover:border-[var(--accent)]"
                }`}
              >
                <div className="text-xs font-semibold">{r.label}</div>
                <div className="mt-0.5 text-[10px] text-[var(--muted)]">{r.note}</div>
              </button>
            ))}
          </div>
        </Field>

        <Field label="Theme">
          <div className="grid grid-cols-3 gap-2">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t)}
                className={`flex flex-col items-center gap-1 rounded-md border p-2 text-xs transition ${
                  theme.id === t.id
                    ? "border-[var(--accent)] text-[var(--accent)]"
                    : "hover:border-[var(--accent)]"
                }`}
              >
                <span className="h-6 w-full rounded" style={{ background: t.bg }} aria-hidden />
                {t.label}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Eyebrow (top label)">
          <input
            type="text"
            value={eyebrow}
            onChange={(e) => setEyebrow(e.target.value)}
            className="w-full rounded-md border bg-[var(--card)] px-3 py-2 text-sm"
          />
        </Field>

        <Field label="Title">
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={3}
            className="w-full resize-y rounded-md border bg-[var(--card)] px-3 py-2 text-sm"
          />
        </Field>

        <Field label="Subtitle">
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            rows={2}
            className="w-full resize-y rounded-md border bg-[var(--card)] px-3 py-2 text-sm"
          />
        </Field>

        <Field label="Byline">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full rounded-md border bg-[var(--card)] px-3 py-2 text-sm"
          />
        </Field>

        <button
          type="button"
          onClick={handleExport}
          disabled={busy}
          className="w-full rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-fg)] transition hover:bg-[var(--accent-hover)] disabled:opacity-50"
        >
          {busy ? "Exporting…" : `Download PNG (${ratio.w * 2}×${ratio.h * 2})`}
        </button>
        {error && <p className="text-sm text-[var(--error)]">{error}</p>}
      </div>

      {/* Preview */}
      <div className="overflow-hidden rounded-lg border bg-[var(--muted-bg)]/30 p-6">
        <div className="flex items-center justify-center">
          <div
            style={{
              width: ratio.w * scale,
              height: ratio.h * scale,
              position: "relative",
              boxShadow: "0 30px 60px -20px rgba(0,0,0,0.3)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <div
              ref={stageRef}
              style={{
                width: ratio.w,
                height: ratio.h,
                background: theme.bg,
                color: theme.fg,
                fontFamily: theme.fontFamily,
                position: "absolute",
                top: 0,
                left: 0,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                padding: ratio.w >= ratio.h ? 64 : 56,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                {eyebrow && (
                  <div
                    style={{
                      fontSize: ratio.w >= ratio.h ? 20 : 22,
                      letterSpacing: 4,
                      textTransform: "uppercase",
                      fontWeight: 600,
                      opacity: 0.85,
                      color: theme.accent,
                    }}
                  >
                    {eyebrow}
                  </div>
                )}
              </div>

              <div>
                <h1
                  style={{
                    fontSize:
                      ratio.id === "16x9"
                        ? title.length > 60
                          ? 56
                          : 72
                        : title.length > 60
                          ? 64
                          : 84,
                    lineHeight: 1.1,
                    fontWeight: 800,
                    margin: 0,
                    letterSpacing: -1,
                  }}
                >
                  {title}
                </h1>
                {subtitle && (
                  <p
                    style={{
                      marginTop: 24,
                      fontSize: ratio.w >= ratio.h ? 24 : 28,
                      lineHeight: 1.4,
                      opacity: 0.85,
                      maxWidth: ratio.w >= ratio.h ? "85%" : "100%",
                    }}
                  >
                    {subtitle}
                  </p>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: ratio.w >= ratio.h ? 18 : 22,
                  opacity: 0.8,
                }}
              >
                <span>{author}</span>
                <span style={{ fontFamily: "ui-monospace, monospace" }}>pixwarp.app</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 text-xs font-semibold tracking-wider text-[var(--muted)] uppercase">
        {label}
      </div>
      {children}
    </div>
  )
}

export const SocialCoverUI = dynamic(() => Promise.resolve(CoverInner), {
  ssr: false,
  loading: () => (
    <div className="py-12 text-center text-sm text-[var(--muted)]">Loading cover designer…</div>
  ),
})
