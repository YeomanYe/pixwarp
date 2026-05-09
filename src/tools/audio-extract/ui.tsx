"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useState } from "react"
import { FileDropzone } from "@/components/tool-shell/FileDropzone"
import { ProcessingPanel } from "@/components/tool-shell/ProcessingPanel"
import { recordHistory } from "@/lib/history"
import { track, trackError } from "@/lib/analytics"
import { downloadUrl, formatBytes } from "../shared/image-utils"
import { loadSharedFfmpeg } from "../shared/ffmpeg"

function AudioExtractInner() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{ url: string; size: number } | null>(null)

  useEffect(() => {
    track("tool_open", { tool_slug: "audio-extract" })
    return () => {
      if (result) URL.revokeObjectURL(result.url)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pick = useCallback((files: FileList | File[]) => {
    const video = Array.from(files).find(
      (f) => f.type.startsWith("video/") || f.type.startsWith("audio/"),
    )
    if (!video) return
    setFile(video)
    track("file_dropped", {
      tool_slug: "audio-extract",
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
      const output = "audio.mp3"
      await ffmpeg.writeFile(input, await fetchFile(file))
      await ffmpeg.exec(["-i", input, "-vn", "-acodec", "libmp3lame", "-q:a", "2", output])
      const data = (await ffmpeg.readFile(output)) as Uint8Array
      const blob = new Blob([data.slice().buffer], { type: "audio/mpeg" })
      if (result) URL.revokeObjectURL(result.url)
      setResult({ url: URL.createObjectURL(blob), size: blob.size })
      setStatus("success")
      recordHistory({
        tool: "audio-extract",
        fileName: file.name,
        outputName: "audio.mp3",
        inputBytes: file.size,
        outputBytes: blob.size,
      })
      track("convert_success", { tool_slug: "audio-extract" })
      try {
        await ffmpeg.deleteFile(input)
        await ffmpeg.deleteFile(output)
      } catch {}
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Audio extraction failed.")
      trackError("audio-extract", err)
    }
  }, [file, result])

  return (
    <div className="space-y-6">
      <FileDropzone
        title="Drop a video here"
        description="Extract MP3 audio locally. FFmpeg core loads on first use."
        accept="video/*,audio/*"
        multiple={false}
        onFiles={pick}
      >
        <div className="space-y-3">
          <button
            disabled={!file || status === "processing"}
            onClick={run}
            className="rounded-md bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
          >
            Extract audio
          </button>
          <ProcessingPanel state={status} errorText={error ?? "Audio extraction failed."} />
        </div>
      </FileDropzone>
      {file && (
        <p className="text-sm text-[var(--muted)]">
          Source: {file.name} · {formatBytes(file.size)}
        </p>
      )}
      {result && (
        <div className="rounded-lg border bg-[var(--card)] p-4">
          <div className="font-medium">audio.mp3</div>
          <div className="text-sm text-[var(--muted)]">{formatBytes(result.size)}</div>
          <audio className="mt-3 w-full" src={result.url} controls />
          <button
            onClick={() => downloadUrl(result.url, "audio.mp3")}
            className="mt-3 rounded-md bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-white"
          >
            Download MP3
          </button>
        </div>
      )}
    </div>
  )
}

export const AudioExtractUI = dynamic(() => Promise.resolve(AudioExtractInner), { ssr: false })
