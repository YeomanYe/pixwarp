import Link from "next/link"
import { tools, toolsBySlug, categoryLabels } from "@/tools/registry"
import { formats, formatCategoryLabels } from "@/formats/registry"
import { RecentHistory } from "@/components/RecentHistory"
import { ToolSearch } from "@/components/ToolSearch"
import { getCatalogSearchItems } from "@/lib/catalog"
import type { ToolCategory, ToolManifest } from "@/tools/types"

const taskGroups: { title: string; blurb: string; slugs: string[]; cta: string }[] = [
  {
    title: "Convert an image",
    blurb: "Change PNG, JPG, WebP, SVG, HEIC, or favicon files without uploading.",
    slugs: ["png-to-jpg", "avif-to-jpg", "avif-to-png", "jpg-to-webp"],
    cta: "Image converters",
  },
  {
    title: "Make a file smaller",
    blurb: "Compress images, PDFs, and videos when a platform rejects large files.",
    slugs: ["image-compressor", "pdf-compress", "video-compress"],
    cta: "Compression tools",
  },
  {
    title: "Prepare something to post",
    blurb: "Create screenshots, social covers, tweet cards, and favicons for publishing.",
    slugs: ["screenshot-mockup", "social-cover", "tweet-mockup", "favicon-generator"],
    cta: "Creator tools",
  },
  {
    title: "Work with a PDF",
    blurb: "Merge, split, compress, export pages, or turn images into a PDF.",
    slugs: ["pdf-merge", "pdf-split", "pdf-compress", "pdf-to-images"],
    cta: "PDF tools",
  },
]

const popularSlugs = [
  "png-to-jpg",
  "image-compressor",
  "heic-to-jpg",
  "favicon-generator",
  "pdf-compress",
  "screenshot-mockup",
]

const categoryOrder: ToolCategory[] = [
  "image",
  "pdf",
  "creator",
  "screenshot",
  "video",
  "audio",
  "svg",
  "qr",
]

function ToolLinkList({ slugs }: { slugs: string[] }) {
  return (
    <ul className="mt-4 space-y-1.5 text-sm">
      {slugs.map((slug) => {
        const tool = toolsBySlug[slug]
        if (!tool) return null
        return (
          <li key={slug}>
            <Link
              href={`/tools/${slug}`}
              className="inline-flex items-center gap-1.5 text-[var(--foreground)] hover:text-[var(--accent)]"
            >
              <span aria-hidden="true" className="text-[var(--muted)]">
                →
              </span>
              {tool.name}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

function ToolCard({ tool }: { tool: ToolManifest }) {
  const cat = categoryLabels[tool.category]
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group block rounded-lg border bg-[var(--card)] p-5 transition hover:border-[var(--accent)] hover:shadow-sm"
    >
      <div className="mb-2">
        <span
          className="font-mono text-[10px] tracking-widest uppercase"
          style={{ color: cat?.accent }}
        >
          {cat?.label}
        </span>
      </div>
      <div className="font-semibold tracking-tight transition group-hover:text-[var(--accent)]">
        {tool.name}
      </div>
      <p className="mt-1.5 line-clamp-2 text-sm text-[var(--muted)]">{tool.description}</p>
    </Link>
  )
}

export default function HomePage() {
  const searchItems = getCatalogSearchItems("en")
  const popularTools = popularSlugs.map((slug) => toolsBySlug[slug]).filter(Boolean)
  const groupedTools = categoryOrder
    .map((category) => ({
      category,
      meta: categoryLabels[category],
      items: tools.filter((tool) => tool.category === category),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-10">
        <div>
          <div className="inline-flex items-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 font-mono text-xs tracking-widest text-[var(--accent)] uppercase">
            Local media tools
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Pick a task.
            <br />
            <span className="text-[var(--accent)]">Get the file.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-[var(--muted)] sm:text-lg">
            Convert, compress, and prepare media files directly in your browser. No signup, no
            upload flow, no waiting room.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
            <span className="rounded-full border px-3 py-1">Images</span>
            <span className="rounded-full border px-3 py-1">PDFs</span>
            <span className="rounded-full border px-3 py-1">Videos</span>
            <span className="rounded-full border px-3 py-1">Creator assets</span>
          </div>
        </div>
      </section>

      <ToolSearch items={searchItems} />

      <section id="tools" className="mb-14 scroll-mt-20">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Start with a task</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            The fastest path is usually the job you are trying to finish.
          </p>
        </div>
        <ul className="grid gap-3 md:grid-cols-2">
          {taskGroups.map((group) => (
            <li
              key={group.title}
              className="rounded-lg border bg-[var(--card)] p-5 transition hover:border-[var(--accent)] hover:shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-semibold tracking-tight">{group.title}</div>
                  <p className="mt-1.5 max-w-md text-sm text-[var(--muted)]">{group.blurb}</p>
                </div>
                <span className="rounded-full bg-[var(--muted-bg)] px-3 py-1 font-mono text-[10px] tracking-widest text-[var(--muted)] uppercase">
                  {group.cta}
                </span>
              </div>
              <ToolLinkList slugs={group.slugs} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-14">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Popular tools</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Common jobs people usually need first.
            </p>
          </div>
          <a href="#all-tools" className="text-sm font-medium text-[var(--accent)]">
            Browse all tools
          </a>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popularTools.map((tool) => (
            <li key={tool.slug}>
              <ToolCard tool={tool} />
            </li>
          ))}
        </ul>
      </section>

      <section id="all-tools" className="mb-14 scroll-mt-20">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">All tools by category</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Open the category that matches your file. The full list stays here without crowding the
            page.
          </p>
        </div>
        <div className="space-y-3">
          {groupedTools.map((group) => (
            <details
              key={group.category}
              className="rounded-lg border bg-[var(--card)] p-4 open:shadow-sm"
            >
              <summary className="cursor-pointer list-none">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span
                      className="font-mono text-[10px] tracking-widest uppercase"
                      style={{ color: group.meta?.accent }}
                    >
                      {group.meta?.label}
                    </span>
                    <div className="mt-1 font-semibold">{group.meta?.label} tools</div>
                  </div>
                  <span className="rounded-full bg-[var(--muted-bg)] px-3 py-1 text-xs text-[var(--muted)]">
                    {group.items.length} tools
                  </span>
                </div>
              </summary>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="block rounded-md border bg-[var(--muted-bg)] px-3 py-2 text-sm transition hover:border-[var(--accent)]"
                    >
                      <span className="font-medium">{tool.name}</span>
                      <span className="mt-0.5 line-clamp-1 block text-xs text-[var(--muted)]">
                        {tool.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>

      <section id="formats" className="scroll-mt-20">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">File format guides</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Short explanations when you are not sure which format to use.
            </p>
          </div>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {formats.slice(0, 4).map((fmt) => {
            const cat = formatCategoryLabels[fmt.category]
            return (
              <li key={fmt.slug}>
                <Link
                  href={`/format/${fmt.slug}`}
                  className="group block rounded-lg border bg-[var(--card)] p-5 transition hover:border-[var(--accent)] hover:shadow-sm"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className="font-mono text-[10px] tracking-widest uppercase"
                      style={{ color: cat?.accent }}
                    >
                      {cat?.label}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--muted)]">
                      .{fmt.extensions[0]}
                    </span>
                  </div>
                  <div className="font-semibold tracking-tight transition group-hover:text-[var(--accent)]">
                    {fmt.name}
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-sm text-[var(--muted)]">{fmt.tagline}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <RecentHistory />
    </div>
  )
}
