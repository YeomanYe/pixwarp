import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Proxy PostHog through our origin so ad-blockers and CN networks don't drop events.
      // PostHog ingests assets + decide + events under different paths; mirror them all.
      { source: "/ingest/static/:path*", destination: "https://us-assets.i.posthog.com/static/:path*" },
      { source: "/ingest/:path*", destination: "https://us.i.posthog.com/:path*" },
    ]
  },
  // PostHog calls /decide which uses these headers
  skipTrailingSlashRedirect: true,
}

export default nextConfig
