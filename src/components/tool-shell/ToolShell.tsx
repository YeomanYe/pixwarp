import Link from "next/link"
import type { ToolManifest } from "@/tools/types"
import { getRelatedTools, categoryLabels } from "@/tools/registry"

interface ToolShellProps {
  tool: ToolManifest
}

export function ToolShell({ tool }: ToolShellProps) {
  const Component = tool.Component
  const related = getRelatedTools(tool.slug)
  const categoryMeta = categoryLabels[tool.category]

  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 border-b pb-6">
        <div className="mb-3 flex items-center gap-2">
          <span
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs tracking-wider uppercase"
            style={{ color: categoryMeta?.accent, borderColor: `${categoryMeta?.accent}40` }}
          >
            {categoryMeta?.label}
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{tool.name}</h1>
        <p className="mt-3 max-w-2xl text-base text-[var(--muted)] sm:text-lg">
          {tool.description}
        </p>
      </header>

      <div className="mb-12 rounded-lg border bg-[var(--card)] p-6">
        <Component />
      </div>

      {tool.longDescription && (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold">About this tool</h2>
          <div className="prose prose-sm max-w-none text-[var(--muted)]">
            {tool.longDescription}
          </div>
        </section>
      )}

      {tool.faq && tool.faq.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold">Frequently asked questions</h2>
          <dl className="space-y-4">
            {tool.faq.map((item) => (
              <div key={item.q} className="border-b pb-4">
                <dt className="font-semibold">{item.q}</dt>
                <dd className="mt-1.5 text-sm text-[var(--muted)]">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t pt-8">
          <h2 className="mb-4 text-xl font-semibold">Related tools</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/tools/${r.slug}`}
                  className="block rounded-lg border bg-[var(--card)] p-4 transition hover:border-[var(--accent)]"
                >
                  <div className="font-medium">{r.name}</div>
                  <div className="mt-1 line-clamp-2 text-sm text-[var(--muted)]">
                    {r.description}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
