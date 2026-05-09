"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import type { CatalogSearchItem } from "@/lib/catalog"

interface ToolSearchProps {
  items: CatalogSearchItem[]
  placeholder?: string
  emptyText?: string
}

export function ToolSearch({
  items,
  placeholder = "Search tools, formats, or tasks...",
  emptyText = "No matching tool yet.",
}: ToolSearchProps) {
  const [query, setQuery] = useState("")
  const normalizedQuery = query.trim().toLowerCase()

  const matches = useMemo(() => {
    if (!normalizedQuery) return []
    return items
      .map((item) => {
        const haystack = [item.title, item.description, item.label, ...item.keywords]
          .join(" ")
          .toLowerCase()
        return { item, score: haystack.includes(normalizedQuery) ? 1 : 0 }
      })
      .filter((entry) => entry.score > 0)
      .slice(0, 8)
  }, [items, normalizedQuery])

  return (
    <section className="mb-16 rounded-xl border bg-[var(--card)] p-4 text-left shadow-sm sm:p-5">
      <label className="block text-sm font-medium" htmlFor="tool-search">
        Find a tool
      </label>
      <input
        id="tool-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        className="mt-3 w-full rounded-md border bg-[var(--background)] px-3 py-2 text-sm transition outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
      />
      {normalizedQuery ? (
        <div className="mt-4">
          {matches.length > 0 ? (
            <ul className="grid gap-2 sm:grid-cols-2">
              {matches.map(({ item }) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-md border bg-[var(--background)] p-3 transition hover:border-[var(--accent)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium">{item.title}</span>
                      <span className="font-mono text-[10px] tracking-widest text-[var(--muted)] uppercase">
                        {item.label}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-[var(--muted)]">
                      {item.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--muted)]">{emptyText}</p>
          )}
        </div>
      ) : null}
    </section>
  )
}
