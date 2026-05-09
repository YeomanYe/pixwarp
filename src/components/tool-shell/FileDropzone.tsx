"use client"

import { useRef, type DragEvent, type ReactNode } from "react"

interface FileDropzoneProps {
  title: string
  description: string
  accept?: string
  multiple?: boolean
  actionLabel?: string
  children?: ReactNode
  onFiles: (files: FileList | File[]) => void
}

export function FileDropzone({
  title,
  description,
  accept,
  multiple = true,
  actionLabel = "Choose files",
  children,
  onFiles,
}: FileDropzoneProps) {
  const dropRef = useRef<HTMLDivElement | null>(null)

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    dropRef.current?.classList.remove("ring-2", "ring-[var(--accent)]")
    onFiles(event.dataTransfer.files)
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    dropRef.current?.classList.add("ring-2", "ring-[var(--accent)]")
  }

  const handleDragLeave = () => {
    dropRef.current?.classList.remove("ring-2", "ring-[var(--accent)]")
  }

  return (
    <div
      ref={dropRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--border)] bg-[var(--muted-bg)]/40 px-6 py-12 text-center transition"
    >
      <p className="mb-1 text-base font-medium">{title}</p>
      <p className="mb-4 max-w-xl text-sm text-[var(--muted)]">{description}</p>
      <label className="cursor-pointer rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-fg)] transition hover:bg-[var(--accent-hover)]">
        {actionLabel}
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(event) => {
            if (event.target.files) onFiles(event.target.files)
            event.target.value = ""
          }}
          className="hidden"
        />
      </label>
      {children ? <div className="mt-4 w-full max-w-xl">{children}</div> : null}
    </div>
  )
}
