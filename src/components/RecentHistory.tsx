"use client"

import { useEffect, useState } from "react"
import { clearHistory, readHistory, type ToolHistoryEntry } from "@/lib/history"

function formatBytes(bytes?: number) {
  if (!bytes) return "n/a"
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

export function RecentHistory() {
  const [items, setItems] = useState<ToolHistoryEntry[]>([])

  useEffect(() => {
    const sync = () => setItems(readHistory())
    sync()
    window.addEventListener("storage", sync)
    window.addEventListener("pixwarp:history", sync)
    return () => {
      window.removeEventListener("storage", sync)
      window.removeEventListener("pixwarp:history", sync)
    }
  }, [])

  if (items.length === 0) return null

  return (
    <section className="mt-16 rounded-xl border bg-[var(--card)] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold tracking-tight">Recent local results</h2>
        <button
          type="button"
          onClick={clearHistory}
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          Clear
        </button>
      </div>
      <ul className="divide-y">
        {items.slice(0, 6).map((item) => (
          <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{item.outputName ?? item.fileName}</div>
              <div className="mt-0.5 text-xs text-[var(--muted)]">
                {item.tool} · {formatBytes(item.inputBytes)} → {formatBytes(item.outputBytes)}
              </div>
            </div>
            <time className="font-mono text-[10px] text-[var(--muted)]">
              {new Date(item.createdAt).toLocaleString()}
            </time>
          </li>
        ))}
      </ul>
    </section>
  )
}
