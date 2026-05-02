"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  isDanger?: boolean
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isDanger = false,
}: ConfirmDialogProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!mounted || !isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="animate-in fade-in zoom-in relative w-full max-w-sm transform overflow-hidden rounded-xl border bg-[var(--card)] p-6 shadow-2xl transition-all duration-200">
        <h3 className="text-lg font-bold tracking-tight text-[var(--foreground)]">{title}</h3>
        <p className="mt-2 text-sm text-[var(--muted)]">{description}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--muted-bg)]"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-md px-4 py-2 text-sm font-medium text-white transition ${
              isDanger
                ? "bg-[var(--error)] hover:opacity-90"
                : "bg-[var(--accent)] hover:bg-[var(--accent-hover)]"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
