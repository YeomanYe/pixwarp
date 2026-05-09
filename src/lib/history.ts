export interface ToolHistoryEntry {
  id: string
  tool: string
  fileName: string
  outputName?: string
  inputBytes?: number
  outputBytes?: number
  createdAt: string
}

const HISTORY_KEY = "pixwarp:recent-history"
const MAX_HISTORY = 20

export function readHistory(): ToolHistoryEntry[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.slice(0, MAX_HISTORY) : []
  } catch {
    return []
  }
}

export function recordHistory(entry: Omit<ToolHistoryEntry, "id" | "createdAt">) {
  if (typeof window === "undefined") return
  const next: ToolHistoryEntry = {
    ...entry,
    id: `${entry.tool}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  }
  const history = [next, ...readHistory()].slice(0, MAX_HISTORY)
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  window.dispatchEvent(new CustomEvent("pixwarp:history"))
}

export function clearHistory() {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(HISTORY_KEY)
  window.dispatchEvent(new CustomEvent("pixwarp:history"))
}
