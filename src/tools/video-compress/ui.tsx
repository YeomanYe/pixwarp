"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useState } from "react"
import { FileDropzone } from "@/components/tool-shell/FileDropzone"
import { ProcessingPanel } from "@/components/tool-shell/ProcessingPanel"
import { recordHistory } from "@/lib/history"
import { track, trackError } from "@/lib/analytics"
import { downloadUrl, formatBytes } from "../shared/image-utils"
import { loadSharedFfmpeg } from "../shared/ffmpeg"

function VideoCompressInner() {
  const [file, setFile] = useState<File | null>(null)
  const [crf, setCrf] = useState(28)
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{ url: string; size: number } | null>(null)

  useEffect(() => {
    track("tool_open", { tool_slug: "video-compress" })
    return () => {
      if (result) URL.revokeObjectURL(result.url)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pick = useCallback((files: FileList | File[]) => {
    const video = Array.from(files).find((f) => f.type.startsWith("video/"))
    if (!video) return
    setFile(video)
    track("file_dropped", {
      tool_slug: "video-compress",
      file_type: video.type,
      file_size_kb: Math.round(video.size / 1024),
    })
  }, [])

  const run = useCallback(async () => {
    if (!file) return
    setStatus("processing")
    setError(null)
    try {
      const ffmpeg = await loadSharedFfmpeg()
      const { fetchFile } = await import("@ffmpeg/util")
      const input = "input" + (file.name.match(/\.\w+$/)?.[0] ?? ".mp4")
      const output = "compressed.mp4"
      await ffmpeg.writeFile(input, await fetchFile(file))
      await ffmpeg.exec([
        "-i",
        input,
        "-vcodec",
        "libx264",
        "-crf",
        String(crf),
        "-preset",
        "veryfast",
        "-movflags",
        "faststart",
        output,
      ])
      const data = (await ffmpeg.readFile(output)) as Uint8Array
      const blob = new Blob([data.slice().buffer], { type: "video/mp4" })
      if (result) URL.revokeObjectURL(result.url)
      setResult({ url: URL.createObjectURL(blob), size: blob.size })
      setStatus("success")
      recordHistory({
        tool: "video-compress",
        fileName: file.name,
        outputName: "compressed.mp4",
        inputBytes: file.size,
        outputBytes: blob.size,
      })
      track("convert_success", { tool_slug: "video-compress" })
      try {
        await ffmpeg.deleteFile(input)
        await ffmpeg.deleteFile(output)
      } catch {}
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Compression failed.")
      trackError("video-compress", err)
    }
  }, [crf, file, result])

  return (
    <div className="space-y-6">
      <FileDropzone
        title="Drop a video here"
        description="Compress short videos locally. The FFmpeg core downloads on first use."
        accept="video/*"
        multiple={false}
        onFiles={pick}
      >
        <div className="space-y-3">
          <label className="text-sm">
            CRF{" "}
            <input
              type="range"
              min={18}
              max={38}
              value={crf}
              onChange={(e) => setCrf(Number(e.target.value))}
              className="mx-3 accent-[var(--accent)]"
            />
            {crf}
          </label>
          <button
            disabled={!file || status === "processing"}
            onClick={run}
            className="rounded-md bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
          >
            Compress
          </button>
          <ProcessingPanel state={status} errorText={error ?? "Compression failed."} />
        </div>
      </FileDropzone>
      {file && (
        <p className="text-sm text-[var(--muted)]">
          Source: {file.name} · {formatBytes(file.size)}
        </p>
      )}
      {result && (
        <div className="rounded-lg border bg-[var(--card)] p-4">
          <div className="font-medium">compressed.mp4</div>
          <div className="text-sm text-[var(--muted)]">{formatBytes(result.size)}</div>
          <button
            onClick={() => downloadUrl(result.url, "compressed.mp4")}
            className="mt-3 rounded-md bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-white"
          >
            Download
          </button>
        </div>
      )}
    </div>
  )
}

export const VideoCompressUI = dynamic(() => Promise.resolve(VideoCompressInner), { ssr: false })
