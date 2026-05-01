"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import dynamic from "next/dynamic"
import { track, trackError } from "@/lib/analytics"

type Stage = "idle" | "loading-core" | "ready" | "converting" | "done" | "error"

const FFMPEG_CORE_VERSION = "0.12.10"
const CORE_BASE_URL = `https://unpkg.com/@ffmpeg/core@${FFMPEG_CORE_VERSION}/dist/umd`

function Mp4ToGifInner() {
  const [stage, setStage] = useState<Stage>("idle")
  const [progress, setProgress] = useState(0)
  const [log, setLog] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [gifUrl, setGifUrl] = useState<string | null>(null)
  const [gifSize, setGifSize] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

  // Settings
  const [fps, setFps] = useState(12)
  const [width, setWidth] = useState(480)
  const [trimStart, setTrimStart] = useState(0)
  const [duration, setDuration] = useState(6)

  // Lazy ffmpeg ref
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ffmpegRef = useRef<any>(null)

  useEffect(() => {
    track("tool_open", { tool_slug: "mp4-to-gif" })
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      if (gifUrl) URL.revokeObjectURL(gifUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadCore = useCallback(async () => {
    if (ffmpegRef.current) return ffmpegRef.current

    setStage("loading-core")
    setLog("Loading FFmpeg WebAssembly core (~30 MB, first time only)…")

    const { FFmpeg } = await import("@ffmpeg/ffmpeg")
    const { toBlobURL } = await import("@ffmpeg/util")
    const ffmpeg = new FFmpeg()

    ffmpeg.on("log", ({ message }: { message: string }) => {
      setLog(message)
    })
    ffmpeg.on("progress", ({ progress }: { progress: number }) => {
      setProgress(Math.max(0, Math.min(1, progress)))
    })

    await ffmpeg.load({
      coreURL: await toBlobURL(`${CORE_BASE_URL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${CORE_BASE_URL}/ffmpeg-core.wasm`, "application/wasm"),
    })

    ffmpegRef.current = ffmpeg
    setStage("ready")
    setLog("Core loaded.")
    return ffmpeg
  }, [])

  const handleFile = useCallback(
    (f: File) => {
      if (!f.type.startsWith("video/")) {
        setError("Please pick a video file (MP4 / WebM / MOV).")
        return
      }
      setError(null)
      track("file_dropped", {
        tool_slug: "mp4-to-gif",
        file_type: f.type,
        file_size_kb: Math.round(f.size / 1024),
      })
      setGifUrl(null)
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setPreviewUrl(URL.createObjectURL(f))
      setFile(f)
    },
    [previewUrl],
  )

  const convert = useCallback(async () => {
    if (!file) return
    setError(null)
    setProgress(0)
    setGifUrl(null)
    setGifSize(0)

    try {
      const ffmpeg = await loadCore()
      setStage("converting")

      const { fetchFile } = await import("@ffmpeg/util")
      const inputName = "input" + (file.name.match(/\.\w+$/)?.[0] || ".mp4")
      const paletteName = "palette.png"
      const outputName = "output.gif"

      await ffmpeg.writeFile(inputName, await fetchFile(file))

      // 2-pass: generate palette → use palette
      // pass 1
      await ffmpeg.exec([
        "-ss",
        String(trimStart),
        "-t",
        String(duration),
        "-i",
        inputName,
        "-vf",
        `fps=${fps},scale=${width}:-1:flags=lanczos,palettegen=stats_mode=diff`,
        paletteName,
      ])

      // pass 2
      await ffmpeg.exec([
        "-ss",
        String(trimStart),
        "-t",
        String(duration),
        "-i",
        inputName,
        "-i",
        paletteName,
        "-lavfi",
        `fps=${fps},scale=${width}:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=5`,
        "-loop",
        "0",
        outputName,
      ])

      const data = (await ffmpeg.readFile(outputName)) as Uint8Array
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob = new Blob([data as any], { type: "image/gif" })
      const url = URL.createObjectURL(blob)
      if (gifUrl) URL.revokeObjectURL(gifUrl)
      setGifUrl(url)
      setGifSize(blob.size)
      setStage("done")
      track("convert_success", { tool_slug: "mp4-to-gif" })

      // cleanup
      try {
        await ffmpeg.deleteFile(inputName)
        await ffmpeg.deleteFile(paletteName)
        await ffmpeg.deleteFile(outputName)
      } catch {
        // noop
      }
    } catch (err) {
      console.error(err)
      setStage("error")
      setError(err instanceof Error ? err.message : "Conversion failed")
      trackError("mp4-to-gif", err)
    }
  }, [file, loadCore, fps, width, trimStart, duration, gifUrl])

  const formatBytes = (b: number) => {
    if (b < 1024) return `${b} B`
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`
    return `${(b / (1024 * 1024)).toFixed(2)} MB`
  }

  return (
    <div className="space-y-6">
      {!file ? (
        <div
          onDrop={(e) => {
            e.preventDefault()
            const f = e.dataTransfer.files[0]
            if (f) handleFile(f)
          }}
          onDragOver={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--border)] bg-[var(--muted-bg)]/40 px-6 py-16 text-center"
        >
          <p className="mb-1 text-base font-medium">Drop a short video here</p>
          <p className="mb-4 text-sm text-[var(--muted)]">
            MP4 / WebM / MOV — best ≤ 10 s — processed locally
          </p>
          <label className="cursor-pointer rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-fg)] transition hover:bg-[var(--accent-hover)]">
            Choose video
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) handleFile(f)
              }}
            />
          </label>
          {error && <p className="mt-3 text-sm text-[var(--error)]">{error}</p>}
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Preview */}
            <div className="space-y-2">
              <div className="text-xs font-semibold tracking-wider text-[var(--muted)] uppercase">
                Source
              </div>
              {previewUrl && (
                <video
                  src={previewUrl}
                  controls
                  className="w-full rounded-md border bg-black"
                  style={{ maxHeight: 320 }}
                />
              )}
              <p className="text-xs text-[var(--muted)]">
                {file.name} · {formatBytes(file.size)}
              </p>
            </div>

            {/* Settings */}
            <div className="space-y-3">
              <div className="text-xs font-semibold tracking-wider text-[var(--muted)] uppercase">
                Settings
              </div>

              <Slider label="FPS" value={fps} min={5} max={30} onChange={setFps} suffix="" />
              <Slider
                label="Width"
                value={width}
                min={160}
                max={960}
                step={20}
                onChange={setWidth}
                suffix="px"
              />
              <Slider
                label="Start"
                value={trimStart}
                min={0}
                max={60}
                step={0.5}
                onChange={setTrimStart}
                suffix="s"
                fixed={1}
              />
              <Slider
                label="Duration"
                value={duration}
                min={1}
                max={20}
                step={0.5}
                onChange={setDuration}
                suffix="s"
                fixed={1}
              />
            </div>
          </div>

          {/* Action / progress */}
          <div className="space-y-3 rounded-lg border bg-[var(--card)] p-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={convert}
                disabled={stage === "loading-core" || stage === "converting"}
                className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-fg)] transition hover:bg-[var(--accent-hover)] disabled:opacity-50"
              >
                {stage === "loading-core"
                  ? "Loading core…"
                  : stage === "converting"
                    ? "Converting…"
                    : "Convert to GIF"}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (previewUrl) URL.revokeObjectURL(previewUrl)
                  if (gifUrl) URL.revokeObjectURL(gifUrl)
                  setFile(null)
                  setPreviewUrl(null)
                  setGifUrl(null)
                  setStage("ready")
                  setProgress(0)
                  setError(null)
                }}
                className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                Choose another
              </button>
              {gifUrl && (
                <a
                  href={gifUrl}
                  download={`${file.name.replace(/\.[^/.]+$/, "")}.gif`}
                  className="ml-auto rounded-md border border-[var(--accent)] px-3 py-1.5 text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent)]/10"
                >
                  Download GIF · {formatBytes(gifSize)}
                </a>
              )}
            </div>

            {(stage === "loading-core" || stage === "converting") && (
              <div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[var(--muted-bg)]">
                  <div
                    className="h-full bg-[var(--accent)] transition-all"
                    style={{
                      width: stage === "loading-core" ? "30%" : `${Math.round(progress * 100)}%`,
                    }}
                  />
                </div>
                <p className="mt-2 truncate font-mono text-xs text-[var(--muted)]">{log}</p>
              </div>
            )}

            {stage === "error" && error && <p className="text-sm text-[var(--error)]">{error}</p>}

            {gifUrl && (
              <div className="pt-2">
                <div className="mb-2 text-xs font-semibold tracking-wider text-[var(--muted)] uppercase">
                  Output
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={gifUrl}
                  alt="Converted GIF"
                  className="rounded-md border"
                  style={{ maxWidth: "100%", maxHeight: 480 }}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  suffix,
  fixed = 0,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (n: number) => void
  suffix: string
  fixed?: number
}) {
  return (
    <label className="flex items-center gap-3 text-sm">
      <span className="w-20 text-[var(--muted)]">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 accent-[var(--accent)]"
      />
      <span className="w-16 text-right font-mono text-xs">
        {value.toFixed(fixed)}
        {suffix}
      </span>
    </label>
  )
}

export const Mp4ToGifUI = dynamic(() => Promise.resolve(Mp4ToGifInner), {
  ssr: false,
  loading: () => (
    <div className="py-12 text-center text-sm text-[var(--muted)]">Loading converter…</div>
  ),
})
