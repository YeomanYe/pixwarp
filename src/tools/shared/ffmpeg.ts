const FFMPEG_CORE_VERSION = "0.12.10"
const CORE_BASE_URL = `https://unpkg.com/@ffmpeg/core@${FFMPEG_CORE_VERSION}/dist/umd`

let ffmpegPromise: Promise<unknown> | null = null

async function fetchAsBlobUrl(url: string, mime: string): Promise<string> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Failed to load FFmpeg core: ${response.status}`)
  const blob = await response.blob()
  return URL.createObjectURL(new Blob([blob], { type: mime }))
}

export async function loadSharedFfmpeg() {
  if (!ffmpegPromise) {
    ffmpegPromise = (async () => {
      const { FFmpeg } = await import("@ffmpeg/ffmpeg")
      const ffmpeg = new FFmpeg()
      const [coreURL, wasmURL] = await Promise.all([
        fetchAsBlobUrl(`${CORE_BASE_URL}/ffmpeg-core.js`, "text/javascript"),
        fetchAsBlobUrl(`${CORE_BASE_URL}/ffmpeg-core.wasm`, "application/wasm"),
      ])
      await ffmpeg.load({ coreURL, wasmURL })
      return ffmpeg
    })()
  }
  return ffmpegPromise as Promise<{
    writeFile: (name: string, data: Uint8Array) => Promise<void>
    readFile: (name: string) => Promise<Uint8Array | string>
    deleteFile: (name: string) => Promise<void>
    exec: (args: string[]) => Promise<number>
  }>
}
