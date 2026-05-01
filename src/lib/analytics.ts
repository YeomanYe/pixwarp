import { track as vercelTrack } from "@vercel/analytics"

export type ToolSlug =
  | "screenshot-mockup"
  | "heic-to-jpg"
  | "mp4-to-gif"
  | "tweet-mockup"
  | "social-cover"
  | "qr-code"
  | "image-compressor"
  | "pdf-merge"
  | "pdf-split"
  | "pdf-compress"

type ToolOpenProps = { tool_slug: ToolSlug }

type FileDroppedProps = {
  tool_slug: ToolSlug
  file_type: string
  file_size_kb: number
}

type ConvertSuccessProps = { tool_slug: ToolSlug }

type ConvertErrorProps = {
  tool_slug: ToolSlug
  error_message: string
}

type EventMap = {
  tool_open: ToolOpenProps
  file_dropped: FileDroppedProps
  convert_success: ConvertSuccessProps
  convert_error: ConvertErrorProps
}

export function track<E extends keyof EventMap>(event: E, props: EventMap[E]) {
  vercelTrack(event, props as Record<string, string | number | boolean | null>)
}

export function trackError(slug: ToolSlug, err: unknown) {
  const msg = err instanceof Error ? err.message : String(err)
  track("convert_error", { tool_slug: slug, error_message: msg.slice(0, 200) })
}
