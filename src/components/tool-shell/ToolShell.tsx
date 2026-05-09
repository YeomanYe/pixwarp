import Link from "next/link"
import type { ToolManifest } from "@/tools/types"
import { getRelatedTools, categoryLabels } from "@/tools/registry"
import { getLocalizedTool } from "@/lib/tools"

interface ToolShellProps {
  tool: ToolManifest
  locale?: "en" | "zh"
}

const copy = {
  en: {
    about: "About this tool",
    howTo: "How to use",
    privacy: "Privacy",
    privacyBody:
      "Processing happens in your browser whenever the tool can run locally. Your source files are not uploaded to PixWarp servers.",
    output: "Output details",
    comparison: "PixWarp vs upload tools",
    faq: "Frequently asked questions",
    related: "Related tools",
  },
  zh: {
    about: "关于这个工具",
    howTo: "使用步骤",
    privacy: "隐私说明",
    privacyBody:
      "只要工具可以在浏览器内完成处理，源文件就不会上传到 PixWarp 服务器。处理过程在你的设备本地进行。",
    output: "输出说明",
    comparison: "PixWarp 与上传型工具对比",
    faq: "常见问题",
    related: "相关工具",
  },
}

export function ToolShell({ tool, locale = "en" }: ToolShellProps) {
  const Component = tool.Component
  const related = getRelatedTools(tool.slug)
  const categoryMeta = categoryLabels[tool.category]
  const t = copy[locale]
  const localized = getLocalizedTool(tool, locale)

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
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{localized.name}</h1>
        <p className="mt-3 max-w-2xl text-base text-[var(--muted)] sm:text-lg">
          {localized.description}
        </p>
      </header>

      <div className="mb-12 rounded-lg border bg-[var(--card)] p-6">
        <Component />
      </div>

      {localized.longDescription && (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold">{t.about}</h2>
          <div className="prose prose-sm max-w-none text-[var(--muted)]">
            {localized.longDescription}
          </div>
        </section>
      )}

      {localized.howToUse && localized.howToUse.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold">{t.howTo}</h2>
          <ol className="grid gap-3 sm:grid-cols-2">
            {localized.howToUse.map((step, index) => (
              <li key={step} className="rounded-lg border bg-[var(--card)] p-4">
                <div className="font-mono text-xs text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="mb-12 grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border bg-[var(--card)] p-4">
          <h2 className="text-base font-semibold">{t.privacy}</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">{t.privacyBody}</p>
        </div>
        {localized.outputDetails && localized.outputDetails.length > 0 ? (
          <div className="rounded-lg border bg-[var(--card)] p-4">
            <h2 className="text-base font-semibold">{t.output}</h2>
            <ul className="mt-2 space-y-1.5 text-sm text-[var(--muted)]">
              {localized.outputDetails.map((detail) => (
                <li key={detail}>• {detail}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      {localized.comparison.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold">{t.comparison}</h2>
          <div className="overflow-hidden rounded-lg border bg-[var(--card)]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--muted-bg)]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Feature</th>
                  <th className="px-4 py-3 font-semibold">PixWarp</th>
                  <th className="px-4 py-3 font-semibold">Upload tools</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {localized.comparison.map((row) => (
                  <tr key={row.feature}>
                    <td className="px-4 py-3 font-medium">{row.feature}</td>
                    <td className="px-4 py-3 text-[var(--muted)]">{row.pixwarp}</td>
                    <td className="px-4 py-3 text-[var(--muted)]">{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {localized.faq && localized.faq.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold">{t.faq}</h2>
          <dl className="space-y-4">
            {localized.faq.map((item) => (
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
          <h2 className="mb-4 text-xl font-semibold">{t.related}</h2>
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
