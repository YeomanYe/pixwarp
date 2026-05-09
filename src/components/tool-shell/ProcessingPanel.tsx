type ProcessingState = "idle" | "processing" | "success" | "error"

interface ProcessingPanelProps {
  state: ProcessingState
  idleText?: string
  processingText?: string
  successText?: string
  errorText?: string
}

export function ProcessingPanel({
  state,
  idleText = "Drop a file to start.",
  processingText = "Processing locally in your browser...",
  successText = "Done. Your output is ready below.",
  errorText = "Something went wrong. Try another file.",
}: ProcessingPanelProps) {
  const copy = {
    idle: idleText,
    processing: processingText,
    success: successText,
    error: errorText,
  }[state]

  const tone = {
    idle: "border-[var(--border)] text-[var(--muted)]",
    processing: "border-[var(--accent)]/30 text-[var(--accent)]",
    success: "border-emerald-500/30 text-emerald-600",
    error: "border-red-500/30 text-red-600",
  }[state]

  return (
    <div className={`rounded-md border px-3 py-2 text-sm ${tone}`} aria-live="polite">
      {copy}
    </div>
  )
}
