import Link from "next/link"
import { tools, categoryLabels } from "@/tools/registry"

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="mb-16 text-center">
        <div className="inline-flex items-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 font-mono text-xs tracking-widest text-[var(--accent)] uppercase">
          Browser-local · No upload
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Media tools that
          <br />
          <span className="text-[var(--accent)]">stay on your device</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-[var(--muted)] sm:text-lg">
          Free, fast, private. Convert, compress, and craft your media right in the browser. No
          upload, no signup, no watermark.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <a
            href="#tools"
            className="rounded-md bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--accent-fg)] transition hover:bg-[var(--accent-hover)]"
          >
            Browse tools
          </a>
          <Link
            href="/pricing"
            className="rounded-md border px-5 py-2.5 text-sm font-medium transition hover:border-[var(--accent)]"
          >
            Pricing
          </Link>
        </div>
      </section>

      {/* Tools grid */}
      <section id="tools" className="scroll-mt-20">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">All tools</h2>
        {tools.length === 0 ? (
          <p className="text-[var(--muted)]">No tools yet. Stay tuned.</p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => {
              const cat = categoryLabels[tool.category]
              return (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="group block rounded-lg border bg-[var(--card)] p-5 transition hover:border-[var(--accent)] hover:shadow-sm"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span
                        className="font-mono text-[10px] tracking-widest uppercase"
                        style={{ color: cat?.accent }}
                      >
                        {cat?.label}
                      </span>
                      {tool.pro?.enabled && (
                        <span className="font-mono text-[10px] tracking-widest text-[var(--pro)] uppercase">
                          Pro
                        </span>
                      )}
                    </div>
                    <div className="font-semibold tracking-tight transition group-hover:text-[var(--accent)]">
                      {tool.name}
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-sm text-[var(--muted)]">
                      {tool.description}
                    </p>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
