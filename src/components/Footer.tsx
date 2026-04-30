import Link from "next/link"
import { tools } from "@/tools/registry"
import { formats } from "@/formats/registry"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-16 border-t bg-[var(--muted-bg)]/40 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-semibold">PixWarp</div>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Fast, friendly media tools. Drop a file, get the result — no signup, no waiting.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide text-[var(--muted)] uppercase">
              Tools
            </div>
            <ul className="mt-3 space-y-1.5 text-sm">
              {tools.map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/tools/${tool.slug}`} className="hover:text-[var(--accent)]">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide text-[var(--muted)] uppercase">
              Formats
            </div>
            <ul className="mt-3 space-y-1.5 text-sm">
              {formats.map((fmt) => (
                <li key={fmt.slug}>
                  <Link href={`/format/${fmt.slug}`} className="hover:text-[var(--accent)]">
                    .{fmt.extensions[0]} — {fmt.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide text-[var(--muted)] uppercase">
              Connect
            </div>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <a
                  href="https://github.com/YeomanYe/pixwarp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent)]"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between border-t pt-6 text-xs text-[var(--muted)]">
          <span>© {year} PixWarp. All rights reserved.</span>
          <span>Made with care.</span>
        </div>
      </div>
    </footer>
  )
}
