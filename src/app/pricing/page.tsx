import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "PixWarp pricing. All current tools are free. Pro tier (coming soon) unlocks priority processing, batch operations, and an API.",
}

const tiers = [
  {
    name: "Free",
    price: "$0",
    cadence: "always",
    badge: undefined,
    desc: "All current tools, no signup, no watermark.",
    features: [
      "All public tools",
      "Browser-local processing",
      "No upload, no signup",
      "Standard file size limits",
    ],
    cta: "Use it now",
    href: "/",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$9",
    cadence: "per year",
    badge: "Coming soon",
    desc: "For people who use these tools every week.",
    features: [
      "4K / large file support",
      "Batch processing",
      "Custom themes & watermarks",
      "Priority support",
      "Early access to new tools",
    ],
    cta: "Notify me",
    href: "#",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "contact",
    badge: "On request",
    desc: "Self-host, audit logs, SSO, SLA.",
    features: [
      "Self-hosted distribution",
      "API access with SLA",
      "Audit log + SSO",
      "Priority engineering",
    ],
    cta: "Contact us",
    href: "mailto:hi@pixwarp.app",
    highlight: false,
  },
]

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Free today, growing tomorrow
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-[var(--muted)]">
          All current tools are free, forever. Pro and Enterprise help fund continued development.
        </p>
      </header>
      <ul className="grid gap-5 lg:grid-cols-3">
        {tiers.map((tier) => (
          <li
            key={tier.name}
            className={`relative flex flex-col rounded-lg border bg-[var(--card)] p-6 ${
              tier.highlight ? "border-[var(--accent)] shadow-lg" : ""
            }`}
          >
            {tier.badge && (
              <span className="absolute top-4 right-4 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-2 py-0.5 font-mono text-[10px] tracking-widest text-[var(--accent)] uppercase">
                {tier.badge}
              </span>
            )}
            <div className="font-mono text-xs tracking-widest text-[var(--muted)] uppercase">
              {tier.name}
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold">{tier.price}</span>
              <span className="font-mono text-sm text-[var(--muted)]">/ {tier.cadence}</span>
            </div>
            <p className="mt-3 text-sm text-[var(--muted)]">{tier.desc}</p>
            <ul className="mt-5 space-y-2 text-sm text-[var(--muted)]">
              {tier.features.map((f) => (
                <li key={f} className="relative pl-5">
                  <span className="absolute left-0 font-mono text-[var(--accent)]">{"//"}</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={tier.href}
              aria-disabled={Boolean(tier.badge)}
              className="mt-auto inline-block rounded-md border-t pt-4 font-mono text-xs tracking-widest text-[var(--accent)] uppercase aria-disabled:text-[var(--muted)]"
            >
              {tier.cta} →
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
