import Link from "next/link"
import type { FormatManifest } from "@/formats/types"
import { getRelatedFormats, formatCategoryLabels } from "@/formats/registry"
import { getToolBySlug } from "@/tools/registry"

interface FormatShellProps {
  format: FormatManifest
}

export function FormatShell({ format }: FormatShellProps) {
  const Component = format.Component
  const cat = formatCategoryLabels[format.category]
  const related = getRelatedFormats(format.slug)
  const relatedTools = format.relatedTools?.map((slug) => getToolBySlug(slug)).filter(Boolean) ?? []

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-8 border-b pb-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs tracking-wider uppercase"
            style={{ color: cat?.accent, borderColor: `${cat?.accent}40` }}
          >
            {cat?.label} format
          </span>
          <span className="font-mono text-xs text-[var(--muted)]">since {format.year}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          .{format.extensions[0]} — {format.fullName}
        </h1>
        <p className="mt-3 max-w-2xl text-base text-[var(--muted)] sm:text-lg">{format.tagline}</p>
      </header>

      {/* Quick facts */}
      <section className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <FactCard label="Extensions" value={format.extensions.map((e) => `.${e}`).join(", ")} />
        <FactCard label="MIME" value={format.mimeTypes.join(", ")} mono />
        <FactCard label="Standard" value={format.standard} />
        <FactCard label="Released" value={String(format.year)} />
      </section>

      {/* About */}
      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">About this format</h2>
        <div className="space-y-3 text-[var(--muted)]">
          {format.description.split("\n\n").map((para, i) => (
            <p key={i}>
              {para.split("**").map((chunk, idx) =>
                idx % 2 === 1 ? (
                  <strong key={idx} className="text-[var(--foreground)]">
                    {chunk}
                  </strong>
                ) : (
                  <span key={idx}>{chunk}</span>
                ),
              )}
            </p>
          ))}
        </div>
      </section>

      {/* Interactive component (Compare widget for HEIC etc.) */}
      {Component && (
        <section className="mb-10 rounded-lg border bg-[var(--card)] p-6">
          <h2 className="mb-4 text-xl font-semibold">Compare on your own photo</h2>
          <Component />
        </section>
      )}

      {/* Pros / Cons */}
      <section className="mb-10 grid gap-4 sm:grid-cols-2">
        <div>
          <h2 className="mb-3 text-lg font-semibold text-[var(--success)]">Pros</h2>
          <ul className="space-y-2 text-sm">
            {format.pros.map((p) => (
              <li key={p} className="relative pl-5 text-[var(--muted)]">
                <span className="absolute left-0 font-mono text-[var(--success)]">+</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-lg font-semibold text-[var(--error)]">Cons</h2>
          <ul className="space-y-2 text-sm">
            {format.cons.map((c) => (
              <li key={c} className="relative pl-5 text-[var(--muted)]">
                <span className="absolute left-0 font-mono text-[var(--error)]">−</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Comparison */}
      {format.comparison.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold">{format.name} vs other formats</h2>
          <div className="overflow-hidden rounded-lg border bg-[var(--card)]">
            <table className="w-full text-sm">
              <thead className="bg-[var(--muted-bg)]/60 text-left">
                <tr>
                  <th className="px-4 py-2 font-mono text-xs tracking-wider text-[var(--muted)] uppercase">
                    vs
                  </th>
                  <th className="px-4 py-2 font-mono text-xs tracking-wider text-[var(--muted)] uppercase">
                    Size
                  </th>
                  <th className="px-4 py-2 font-mono text-xs tracking-wider text-[var(--muted)] uppercase">
                    Quality
                  </th>
                  <th className="px-4 py-2 font-mono text-xs tracking-wider text-[var(--muted)] uppercase">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody>
                {format.comparison.map((c) => (
                  <tr key={c.vs} className="border-t">
                    <td className="px-4 py-3 font-semibold">{c.vs}</td>
                    <td className="px-4 py-3 font-mono text-xs">{c.sizeRatio}</td>
                    <td className="px-4 py-3 text-[var(--muted)]">{c.quality}</td>
                    <td className="px-4 py-3 text-[var(--muted)]">{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Support matrix */}
      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">Where it works</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <SupportCard label="Operating systems" items={format.support.os} />
          <SupportCard label="Browsers" items={format.support.browsers} />
          <SupportCard label="Apps" items={format.support.apps} />
        </div>
      </section>

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <section className="mb-10 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-5">
          <h2 className="mb-3 text-lg font-semibold">Related tools</h2>
          <ul className="space-y-2">
            {relatedTools.map((tool) =>
              tool ? (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="group flex items-center justify-between rounded-md border bg-[var(--card)] px-4 py-3 transition hover:border-[var(--accent)]"
                  >
                    <div>
                      <div className="font-medium group-hover:text-[var(--accent)]">
                        {tool.name}
                      </div>
                      <div className="text-sm text-[var(--muted)]">{tool.description}</div>
                    </div>
                    <span className="font-mono text-sm text-[var(--accent)]">→</span>
                  </Link>
                </li>
              ) : null,
            )}
          </ul>
        </section>
      )}

      {/* FAQ */}
      {format.faq && format.faq.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">Frequently asked questions</h2>
          <dl className="space-y-4">
            {format.faq.map((item) => (
              <div key={item.q} className="border-b pb-4">
                <dt className="font-semibold">{item.q}</dt>
                <dd className="mt-1.5 text-sm text-[var(--muted)]">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Related formats */}
      {related.length > 0 && (
        <section className="border-t pt-8">
          <h2 className="mb-4 text-xl font-semibold">Other {cat?.label.toLowerCase()} formats</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/format/${r.slug}`}
                  className="block rounded-lg border bg-[var(--card)] p-4 transition hover:border-[var(--accent)]"
                >
                  <div className="font-medium">
                    .{r.extensions[0]} {r.name}
                  </div>
                  <div className="mt-1 line-clamp-2 text-sm text-[var(--muted)]">{r.tagline}</div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}

function FactCard({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-md border bg-[var(--card)] p-3">
      <div className="font-mono text-[10px] tracking-widest text-[var(--muted)] uppercase">
        {label}
      </div>
      <div className={`mt-1 text-sm ${mono ? "font-mono" : "font-medium"}`}>{value}</div>
    </div>
  )
}

function SupportCard({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="rounded-md border bg-[var(--card)] p-4">
      <div className="font-mono text-[10px] tracking-widest text-[var(--muted)] uppercase">
        {label}
      </div>
      <ul className="mt-2 space-y-1.5 text-sm text-[var(--muted)]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
