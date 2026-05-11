import type { ComponentType } from "react"

export type ReferencePreviewKind =
  | "image"
  | "video"
  | "audio"
  | "document"
  | "ebook"
  | "archive"
  | "data"
  | "vector"
  | "icon"

export interface ReferencePreviewItem {
  label: string
  size: string
  useCase: string
  note: string
  kind?: ReferencePreviewKind
}

interface ReferencePreviewConfig {
  intro: string
  items: ReferencePreviewItem[]
  sourceNote: string
}

export function createReferencePreview(config: ReferencePreviewConfig): ComponentType {
  function ReferencePreview() {
    return (
      <div className="space-y-5">
        <p className="text-sm text-[var(--muted)]">{config.intro}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {config.items.map((item) => (
            <PreviewCard key={`${item.label}-${item.size}`} item={item} />
          ))}
        </div>
        <p className="text-xs text-[var(--muted)]">{config.sourceNote}</p>
      </div>
    )
  }

  return ReferencePreview
}

function PreviewCard({ item }: { item: ReferencePreviewItem }) {
  return (
    <figure className="rounded-lg border bg-[var(--card)] p-3">
      <div className="flex h-48 items-center justify-center overflow-hidden rounded border bg-[var(--muted-bg)]/40">
        <PreviewArt item={item} />
      </div>
      <figcaption className="mt-3 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded border border-[var(--accent)]/40 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-[var(--accent)]">
            {item.label}
          </span>
          <span className="font-mono text-xs text-[var(--muted)]">{item.size}</span>
        </div>
        <div>
          <h3 className="text-sm font-semibold">{item.useCase}</h3>
          <p className="mt-1 text-xs text-[var(--muted)]">{item.note}</p>
        </div>
      </figcaption>
    </figure>
  )
}

function PreviewArt({ item }: { item: ReferencePreviewItem }) {
  const kind = item.kind ?? "image"

  if (kind === "audio") {
    return (
      <div className="flex h-24 w-56 items-end gap-1">
        {[28, 52, 36, 74, 48, 92, 58, 42, 68, 34, 86, 46, 62, 30].map((height, index) => (
          <span key={index} className="w-2 rounded-t bg-[var(--accent)]/70" style={{ height }} />
        ))}
      </div>
    )
  }

  if (kind === "archive") {
    return (
      <div className="w-64 rounded-md border bg-[var(--card)] p-3 font-mono text-xs text-[var(--muted)]">
        <div>project/</div>
        <div className="pl-4">assets/</div>
        <div className="pl-8">cover.jpg</div>
        <div className="pl-8">chapter-01.txt</div>
        <div className="pl-4">metadata.json</div>
      </div>
    )
  }

  if (kind === "data") {
    return (
      <div className="w-64 rounded-md border bg-[var(--card)] p-3 font-mono text-xs text-[var(--muted)]">
        <div className="grid grid-cols-3 gap-2 border-b pb-1 font-semibold text-[var(--foreground)]">
          <span>id</span>
          <span>name</span>
          <span>value</span>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-2">
          <span>001</span>
          <span>alpha</span>
          <span>42</span>
          <span>002</span>
          <span>beta</span>
          <span>18</span>
        </div>
      </div>
    )
  }

  if (kind === "document" || kind === "ebook") {
    return (
      <div className="flex h-36 w-28 flex-col rounded border bg-white p-3 shadow-sm">
        <div className="mb-3 h-3 w-16 rounded bg-slate-800" />
        <div className="space-y-1.5">
          <div className="h-1.5 rounded bg-slate-300" />
          <div className="h-1.5 rounded bg-slate-300" />
          <div className="h-1.5 w-4/5 rounded bg-slate-300" />
        </div>
        <div className="mt-auto grid grid-cols-2 gap-1">
          <div className="h-8 rounded bg-orange-100" />
          <div className="h-8 rounded bg-slate-100" />
        </div>
      </div>
    )
  }

  if (kind === "video") {
    return (
      <div className="flex aspect-video w-64 items-center justify-center rounded-md bg-slate-900 text-white">
        <div className="h-12 w-12 rounded-full border border-white/40 bg-white/10 text-center leading-[3rem]">
          play
        </div>
      </div>
    )
  }

  if (kind === "vector" || kind === "icon") {
    return (
      <div className="relative h-32 w-32 rounded-md border bg-white">
        <div className="absolute top-8 left-6 h-16 w-20 rotate-[-12deg] rounded border-4 border-orange-500" />
        <div className="absolute top-5 left-12 h-16 w-16 rounded-full border-4 border-blue-500" />
        <div className="absolute bottom-7 left-9 h-4 w-20 rounded-full bg-emerald-500" />
      </div>
    )
  }

  return (
    <div className="grid h-36 w-56 grid-cols-3 gap-2 rounded-md border bg-white p-2">
      <div className="col-span-2 rounded bg-orange-200" />
      <div className="rounded bg-slate-200" />
      <div className="rounded bg-slate-300" />
      <div className="col-span-2 rounded bg-blue-200" />
    </div>
  )
}
