import Link from "next/link"
import { Logo } from "./Logo"

export function Nav() {
  return (
    <nav className="sticky top-0 z-40 border-b bg-[var(--background)]/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <Logo size={28} />
          <span>PixWarp</span>
        </Link>
        <div className="flex items-center gap-1 text-sm">
          <Link
            href="/#tools"
            className="rounded-md px-3 py-1.5 text-[var(--muted)] transition hover:bg-[var(--muted-bg)] hover:text-[var(--foreground)]"
          >
            Tools
          </Link>
          <Link
            href="/#formats"
            className="rounded-md px-3 py-1.5 text-[var(--muted)] transition hover:bg-[var(--muted-bg)] hover:text-[var(--foreground)]"
          >
            Formats
          </Link>
          <Link
            href="/pricing"
            className="rounded-md px-3 py-1.5 text-[var(--muted)] transition hover:bg-[var(--muted-bg)] hover:text-[var(--foreground)]"
          >
            Pricing
          </Link>
          <a
            href="https://github.com/YeomanYe/pixwarp"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-3 py-1.5 text-[var(--muted)] transition hover:bg-[var(--muted-bg)] hover:text-[var(--foreground)]"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  )
}
