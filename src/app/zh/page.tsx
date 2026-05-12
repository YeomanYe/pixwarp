import Link from "next/link"
import { RecentHistory } from "@/components/RecentHistory"
import { ToolSearch } from "@/components/ToolSearch"
import { getCatalogSearchItems } from "@/lib/catalog"
import { getLocalizedTool } from "@/lib/tools"
import { tools, toolsBySlug, categoryLabels } from "@/tools/registry"
import { formats, formatCategoryLabels } from "@/formats/registry"
import type { ToolCategory, ToolManifest } from "@/tools/types"

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

const taskGroups: { title: string; blurb: string; slugs: string[]; cta: string }[] = [
  {
    title: "转换图片格式",
    blurb: "处理 PNG、JPG、WebP、SVG、HEIC 和 favicon，不需要上传文件。",
    slugs: ["png-to-jpg", "avif-to-jpg", "tiff-to-jpg", "jpg-to-webp"],
    cta: "图片转换",
  },
  {
    title: "压缩文件体积",
    blurb: "图片、PDF、视频太大时，先在浏览器内压缩再下载。",
    slugs: ["image-compressor", "pdf-compress", "video-compress"],
    cta: "压缩工具",
  },
  {
    title: "准备发布素材",
    blurb: "生成截图美化图、社媒封面、Tweet 卡片和网站图标。",
    slugs: ["screenshot-mockup", "social-cover", "tweet-mockup", "favicon-generator"],
    cta: "创作者工具",
  },
  {
    title: "处理 PDF",
    blurb: "合并、拆分、压缩、导出页面，或者把图片整理成 PDF。",
    slugs: ["pdf-merge", "pdf-split", "pdf-compress", "pdf-to-images"],
    cta: "PDF 工具",
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
        const localized = getLocalizedTool(tool, "zh")
        return (
          <li key={slug}>
            <Link
              href={`/zh/tools/${slug}`}
              className="inline-flex items-center gap-1.5 text-[var(--foreground)] hover:text-[var(--accent)]"
            >
              <span aria-hidden="true" className="text-[var(--muted)]">
                →
              </span>
              {localized.name}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

function ToolCard({ tool }: { tool: ToolManifest }) {
  const cat = categoryLabels[tool.category]
  const localized = getLocalizedTool(tool, "zh")
  return (
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
        {localized.name}
      </div>
      <p className="mt-1.5 line-clamp-2 text-sm text-[var(--muted)]">{localized.description}</p>
    </Link>
  )
}

export default function ZhHomePage() {
  const searchItems = getCatalogSearchItems("zh")
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
        <div className="inline-flex items-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 font-mono text-xs tracking-widest text-[var(--accent)] uppercase">
          本地媒体工具
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          先选任务，
          <br />
          <span className="text-[var(--accent)]">再拿结果。</span>
        </h1>
        <p className="mt-6 max-w-xl text-base text-[var(--muted)] sm:text-lg">
          转换、压缩和准备媒体文件。文件尽量在浏览器内完成处理，不需要注册，也不需要等待上传队列。
        </p>
        <div className="mt-6 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
          <span className="rounded-full border px-3 py-1">图片</span>
          <span className="rounded-full border px-3 py-1">PDF</span>
          <span className="rounded-full border px-3 py-1">视频</span>
          <span className="rounded-full border px-3 py-1">创作者素材</span>
        </div>
      </section>

      <ToolSearch
        items={searchItems}
        placeholder="搜索工具、格式或任务，例如 WebP、PDF、压缩..."
        emptyText="暂时没有匹配的工具。"
      />

      <section id="tools" className="mb-14 scroll-mt-20">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">按任务开始</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">不知道工具名时，先从要完成的事情进入。</p>
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
            <h2 className="text-2xl font-semibold tracking-tight">常用工具</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">多数人会先用到的几个入口。</p>
          </div>
          <a href="#all-tools" className="text-sm font-medium text-[var(--accent)]">
            查看全部工具
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
          <h2 className="text-2xl font-semibold tracking-tight">按类别浏览全部工具</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            打开和你文件类型匹配的类别，完整工具列表不会挤在第一屏。
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
                    <div className="mt-1 font-semibold">{group.meta?.label} 工具</div>
                  </div>
                  <span className="rounded-full bg-[var(--muted-bg)] px-3 py-1 text-xs text-[var(--muted)]">
                    {group.items.length} 个
                  </span>
                </div>
              </summary>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((tool) => {
                  const localized = getLocalizedTool(tool, "zh")
                  return (
                    <li key={tool.slug}>
                      <Link
                        href={`/zh/tools/${tool.slug}`}
                        className="block rounded-md border bg-[var(--muted-bg)] px-3 py-2 text-sm transition hover:border-[var(--accent)]"
                      >
                        <span className="font-medium">{localized.name}</span>
                        <span className="mt-0.5 line-clamp-1 block text-xs text-[var(--muted)]">
                          {localized.description}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </details>
          ))}
        </div>
      </section>

      <section id="formats" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">文件格式指南</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">不确定该用哪种格式时，先看简短说明。</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {formats.slice(0, 4).map((format) => {
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
                      {cat?.label}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--muted)]">
                      .{format.extensions[0]}
                    </span>
                  </div>
                  <div className="font-semibold tracking-tight transition group-hover:text-[var(--accent)]">
                    {format.name}
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

      <RecentHistory />
    </div>
  )
}
