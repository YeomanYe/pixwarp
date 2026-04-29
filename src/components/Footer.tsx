import Link from "next/link"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-16 border-t bg-[var(--muted-bg)]/40 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-semibold">PixWarp</div>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Browser-local media tools. No upload, no signup, no nonsense.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide text-[var(--muted)] uppercase">
              Tools
            </div>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <Link href="/" className="hover:text-[var(--accent)]">
                  All tools
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide text-[var(--muted)] uppercase">
              Company
            </div>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-[var(--accent)]">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[var(--accent)]">
                  Terms
                </Link>
              </li>
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
          <span>Made with care, no upload.</span>
        </div>
      </div>
    </footer>
  )
}
