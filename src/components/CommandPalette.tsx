"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import type { CatalogSearchItem } from "@/lib/catalog"

interface CommandPaletteProps {
  items: CatalogSearchItem[]
}

export function CommandPalette({ items }: CommandPaletteProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((value) => !value)
      }
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items.slice(0, 8)
    return items
      .filter((item) =>
        [item.title, item.description, item.label, ...item.keywords]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 8)
  }, [items, query])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md px-3 py-1.5 text-[var(--muted)] transition hover:bg-[var(--muted-bg)] hover:text-[var(--foreground)]"
      >
        Search
        <span className="ml-2 rounded border px-1.5 py-0.5 font-mono text-[10px]">⌘K</span>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 p-4" role="dialog" aria-modal="true">
          <div className="mx-auto mt-20 max-w-xl rounded-xl border bg-[var(--card)] p-4 shadow-xl">
            <div className="flex items-center gap-2">
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search tools or formats..."
                className="w-full rounded-md border bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border px-3 py-2 text-sm"
              >
                Esc
              </button>
            </div>
            <ul className="mt-3 max-h-96 overflow-auto">
              {matches.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 hover:bg-[var(--muted-bg)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium">{item.title}</span>
                      <span className="font-mono text-[10px] text-[var(--muted)] uppercase">
                        {item.label}
                      </span>
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-xs text-[var(--muted)]">
                      {item.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
