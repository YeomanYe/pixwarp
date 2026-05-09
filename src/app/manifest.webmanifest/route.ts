import type { MetadataRoute } from "next"

export function GET() {
  const manifest: MetadataRoute.Manifest = {
    name: "PixWarp",
    short_name: "PixWarp",
    description: "Browser-local media tools for creators.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#f97316",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  }

  return Response.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json",
    },
  })
}
