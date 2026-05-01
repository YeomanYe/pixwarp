"use client"

import { useEffect } from "react"
import posthog from "posthog-js"

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "/ingest"

let initialized = false

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (initialized || !KEY) return
    initialized = true
    posthog.init(KEY, {
      api_host: HOST,
      ui_host: "https://us.posthog.com",
      capture_pageview: "history_change",
      capture_exceptions: true,
      defaults: "2025-05-24",
    })
  }, [])
  return children
}
