"use client"

import dynamic from "next/dynamic"
import { useEffect, useMemo, useState } from "react"
import { ProcessingPanel } from "@/components/tool-shell/ProcessingPanel"
import { recordHistory } from "@/lib/history"
import { track } from "@/lib/analytics"
import { downloadUrl, formatBytes } from "../shared/image-utils"

function optimizeSvg(input: string) {
  return input
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<metadata[\s\S]*?<\/metadata>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ")
    .trim()
}

function SvgOptimizerInner() {
  const [source, setSource] = useState("")

  useEffect(() => {
    track("tool_open", { tool_slug: "svg-optimizer" })
  }, [])

  const output = useMemo(() => optimizeSvg(source), [source])
  const inputBytes = new Blob([source]).size
  const outputBytes = new Blob([output]).size
  const state = source ? "success" : "idle"

  const download = () => {
    const blob = new Blob([output], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    downloadUrl(url, "optimized.svg")
    recordHistory({
      tool: "svg-optimizer",
      fileName: "inline.svg",
      outputName: "optimized.svg",
      inputBytes,
      outputBytes,
    })
    track("convert_success", { tool_slug: "svg-optimizer" })
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return (
    <div className="space-y-4">
      <textarea
        value={source}
        onChange={(e) => setSource(e.target.value)}
        placeholder="<svg>...</svg>"
        className="min-h-56 w-full rounded-lg border bg-[var(--card)] p-3 font-mono text-sm"
      />
      <ProcessingPanel
        state={state}
        successText={`Optimized ${formatBytes(inputBytes)} → ${formatBytes(outputBytes)}`}
      />
      <textarea
        readOnly
        value={output}
        className="min-h-40 w-full rounded-lg border bg-[var(--muted-bg)] p-3 font-mono text-sm"
      />
      <button
        disabled={!output}
        onClick={download}
        className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        Download optimized SVG
      </button>
    </div>
  )
}

export const SvgOptimizerUI = dynamic(() => Promise.resolve(SvgOptimizerInner), { ssr: false })
