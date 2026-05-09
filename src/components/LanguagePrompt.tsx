"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const KEY = "pixwarp:language-prompt-dismissed"

export function LanguagePrompt() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const prefersZh = navigator.language.toLowerCase().startsWith("zh")
    const onZhRoute = window.location.pathname.startsWith("/zh")
    const dismissed = window.localStorage.getItem(KEY) === "1"
    const shouldShow = prefersZh && !onZhRoute && !dismissed
    window.setTimeout(() => setShow(shouldShow), 0)
  }, [])

  if (!show) return null

  return (
    <div className="border-b bg-[var(--accent)]/10 px-4 py-2 text-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2">
        <span>检测到中文浏览器语言，是否切换到中文版本？</span>
        <div className="flex items-center gap-2">
          <Link
            href="/zh"
            className="rounded-md bg-[var(--accent)] px-3 py-1 text-xs font-medium text-[var(--accent-fg)]"
          >
            切换中文
          </Link>
          <button
            type="button"
            onClick={() => {
              window.localStorage.setItem(KEY, "1")
              setShow(false)
            }}
            className="rounded-md px-2 py-1 text-xs text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            暂不
          </button>
        </div>
      </div>
    </div>
  )
}
