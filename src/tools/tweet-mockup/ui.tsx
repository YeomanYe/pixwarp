"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import dynamic from "next/dynamic"
import { track, trackError } from "@/lib/analytics"

type Theme = "light" | "dim" | "dark"

const THEME: Record<
  Theme,
  { bg: string; fg: string; muted: string; border: string; like: string; accent: string }
> = {
  light: {
    bg: "#ffffff",
    fg: "#0f1419",
    muted: "#536471",
    border: "#eff3f4",
    like: "#f91880",
    accent: "#1d9bf0",
  },
  dim: {
    bg: "#15202b",
    fg: "#f7f9f9",
    muted: "#8b98a5",
    border: "#38444d",
    like: "#f91880",
    accent: "#1d9bf0",
  },
  dark: {
    bg: "#000000",
    fg: "#e7e9ea",
    muted: "#71767b",
    border: "#2f3336",
    like: "#f91880",
    accent: "#1d9bf0",
  },
}

function formatStat(n: number): string {
  if (n < 1000) return String(n)
  if (n < 1_000_000) return `${(n / 1000).toFixed(n < 10_000 ? 1 : 0).replace(/\.0$/, "")}K`
  return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
}

function TweetInner() {
  const [name, setName] = useState("Jane Cooper")
  const [handle, setHandle] = useState("janecooper")
  const [verified, setVerified] = useState(true)
  const [content, setContent] = useState(
    "Just shipped a thing. Took 2 weeks longer than planned, broke twice in production, and I learned more from it than the last 6 months combined.\n\nWill write up the post-mortem tomorrow.",
  )
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [likes, setLikes] = useState(2400)
  const [retweets, setRetweets] = useState(380)
  const [replies, setReplies] = useState(92)
  const [date, setDate] = useState("3:42 PM · Apr 29, 2026")
  const [theme, setTheme] = useState<Theme>("light")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    track("tool_open", { tool_slug: "tweet-mockup" })
  }, [])

  const t = THEME[theme]

  const handleAvatar = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        setError("Please pick an image file.")
        return
      }
      setError(null)
      if (avatarUrl) URL.revokeObjectURL(avatarUrl)
      setAvatarUrl(URL.createObjectURL(file))
    },
    [avatarUrl],
  )

  const handleExport = useCallback(async () => {
    if (!cardRef.current) return
    setBusy(true)
    setError(null)
    try {
      const { toPng } = await import("html-to-image")
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: t.bg,
      })
      const link = document.createElement("a")
      link.download = `tweet-${handle || "export"}.png`
      link.href = dataUrl
      link.click()
      track("convert_success", { tool_slug: "tweet-mockup" })
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "Export failed")
      trackError("tweet-mockup", err)
    } finally {
      setBusy(false)
    }
  }, [handle, t.bg])

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      {/* Controls */}
      <div className="space-y-4">
        <Field label="Display name">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border bg-[var(--card)] px-3 py-2 text-sm"
          />
        </Field>

        <Field label="@handle">
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value.replace(/^@/, ""))}
            className="w-full rounded-md border bg-[var(--card)] px-3 py-2 text-sm"
          />
        </Field>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={verified}
            onChange={(e) => setVerified(e.target.checked)}
          />
          Verified badge
        </label>

        <Field label="Avatar">
          <div className="flex items-center gap-3">
            <div
              className="h-12 w-12 overflow-hidden rounded-full border bg-[var(--muted-bg)]"
              style={{ flexShrink: 0 }}
            >
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} alt="avatar" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-[var(--muted)]">
                  none
                </div>
              )}
            </div>
            <label className="cursor-pointer rounded-md border px-3 py-1.5 text-xs hover:border-[var(--accent)]">
              Upload
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) handleAvatar(f)
                }}
              />
            </label>
            {avatarUrl && (
              <button
                type="button"
                onClick={() => {
                  if (avatarUrl) URL.revokeObjectURL(avatarUrl)
                  setAvatarUrl(null)
                }}
                className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                Clear
              </button>
            )}
          </div>
        </Field>

        <Field label="Tweet text">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full resize-y rounded-md border bg-[var(--card)] px-3 py-2 text-sm"
          />
        </Field>

        <div className="grid grid-cols-3 gap-3">
          <Field label="Replies">
            <input
              type="number"
              value={replies}
              min={0}
              onChange={(e) => setReplies(Number(e.target.value) || 0)}
              className="w-full rounded-md border bg-[var(--card)] px-3 py-2 text-sm"
            />
          </Field>
          <Field label="Retweets">
            <input
              type="number"
              value={retweets}
              min={0}
              onChange={(e) => setRetweets(Number(e.target.value) || 0)}
              className="w-full rounded-md border bg-[var(--card)] px-3 py-2 text-sm"
            />
          </Field>
          <Field label="Likes">
            <input
              type="number"
              value={likes}
              min={0}
              onChange={(e) => setLikes(Number(e.target.value) || 0)}
              className="w-full rounded-md border bg-[var(--card)] px-3 py-2 text-sm"
            />
          </Field>
        </div>

        <Field label="Date / time">
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-md border bg-[var(--card)] px-3 py-2 text-sm"
          />
        </Field>

        <Field label="Theme">
          <div className="flex gap-2">
            {(["light", "dim", "dark"] as Theme[]).map((th) => (
              <button
                key={th}
                type="button"
                onClick={() => setTheme(th)}
                className={`flex-1 rounded-md border px-3 py-1.5 text-xs capitalize transition ${
                  theme === th
                    ? "border-[var(--accent)] text-[var(--accent)]"
                    : "hover:border-[var(--accent)]"
                }`}
              >
                {th}
              </button>
            ))}
          </div>
        </Field>

        <button
          type="button"
          onClick={handleExport}
          disabled={busy}
          className="w-full rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-fg)] transition hover:bg-[var(--accent-hover)] disabled:opacity-50"
        >
          {busy ? "Exporting…" : "Download PNG (2x)"}
        </button>
        {error && <p className="text-sm text-[var(--error)]">{error}</p>}
      </div>

      {/* Preview */}
      <div className="overflow-auto rounded-lg border bg-[var(--muted-bg)]/30 p-6">
        <div
          ref={cardRef}
          style={{
            background: t.bg,
            color: t.fg,
            border: `1px solid ${t.border}`,
            borderRadius: 16,
            padding: 20,
            maxWidth: 560,
            margin: "0 auto",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: avatarUrl ? "transparent" : "#cbd5e1",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              {avatarUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarUrl}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{name || "Display Name"}</span>
                {verified && (
                  <svg
                    viewBox="0 0 22 22"
                    width={18}
                    height={18}
                    aria-hidden
                    style={{ color: t.accent, flexShrink: 0 }}
                  >
                    <path
                      fill="currentColor"
                      d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                    />
                  </svg>
                )}
              </div>
              <div style={{ color: t.muted, fontSize: 14 }}>@{handle || "handle"}</div>
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              marginTop: 12,
              fontSize: 17,
              lineHeight: 1.45,
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
          >
            {content}
          </div>

          {/* Date */}
          <div style={{ color: t.muted, fontSize: 14, marginTop: 14 }}>{date}</div>

          {/* Stats */}
          <div
            style={{
              marginTop: 14,
              paddingTop: 14,
              borderTop: `1px solid ${t.border}`,
              display: "flex",
              gap: 24,
              fontSize: 14,
              color: t.muted,
            }}
          >
            <div>
              <strong style={{ color: t.fg, marginRight: 4 }}>{formatStat(replies)}</strong>
              Replies
            </div>
            <div>
              <strong style={{ color: t.fg, marginRight: 4 }}>{formatStat(retweets)}</strong>
              Reposts
            </div>
            <div>
              <strong style={{ color: t.fg, marginRight: 4 }}>{formatStat(likes)}</strong>
              Likes
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

export const TweetMockupUI = dynamic(() => Promise.resolve(TweetInner), {
  ssr: false,
  loading: () => (
    <div className="py-12 text-center text-sm text-[var(--muted)]">Loading tweet composer…</div>
  ),
})
