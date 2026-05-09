import Link from "next/link"
import { ToolSearch } from "@/components/ToolSearch"
import { getCatalogSearchItems } from "@/lib/catalog"
import { tools, categoryLabels } from "@/tools/registry"
import { formats, formatCategoryLabels } from "@/formats/registry"

export const metadata = {
  title: "PixWarp 中文 — 本地媒体工具箱",
  description: "在浏览器内完成图片、PDF、视频和创作者素材处理。不上传、不注册、无水印。",
  alternates: {
    canonical: "/zh",
    languages: {
      en: "/",
      zh: "/zh",
    },
  },
}

export default function ZhHomePage() {
  const searchItems = getCatalogSearchItems("zh")

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="mb-16 text-center">
        <div className="inline-flex items-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 font-mono text-xs tracking-widest text-[var(--accent)] uppercase">
          本地处理 · 直接下载 · 无需注册
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          浏览器里的
          <br />
          <span className="text-[var(--accent)]">媒体工具箱</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-[var(--muted)] sm:text-lg">
          转换、压缩、生成封面和处理 PDF。文件尽量在你的浏览器内完成处理，不需要上传到服务器。
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href="#tools"
            className="rounded-md bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--accent-fg)] transition hover:bg-[var(--accent-hover)]"
          >
            浏览工具
          </a>
        </div>
      </section>

      <ToolSearch
        items={searchItems}
        placeholder="搜索工具、格式或任务，例如 WebP、PDF、压缩..."
        emptyText="暂时没有匹配的工具。"
      />

      <section id="tools" className="scroll-mt-20">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">全部工具</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const cat = categoryLabels[tool.category]
            return (
              <li key={tool.slug}>
                <Link
                  href={`/zh/tools/${tool.slug}`}
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
                  <p className="mt-1.5 line-clamp-2 text-sm text-[var(--muted)]">
                    {tool.description}
                  </p>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section id="formats" className="mt-16 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">文件格式指南</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {formats.map((format) => {
            const cat = formatCategoryLabels[format.category]
            return (
              <li key={format.slug}>
                <Link
                  href={`/zh/format/${format.slug}`}
                  className="group block rounded-lg border bg-[var(--card)] p-5 transition hover:border-[var(--accent)] hover:shadow-sm"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className="font-mono text-[10px] tracking-widest uppercase"
                      style={{ color: cat?.accent }}
                    >
                      {cat?.label} format
                    </span>
                    <span className="font-mono text-[10px] text-[var(--muted)]">
                      since {format.year}
                    </span>
                  </div>
                  <div className="font-semibold tracking-tight transition group-hover:text-[var(--accent)]">
                    .{format.extensions[0]} — {format.name}
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-sm text-[var(--muted)]">
                    {format.tagline}
                  </p>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
