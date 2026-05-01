import { ImageResponse } from "next/og"
import { tools, getToolBySlug, categoryLabels } from "@/tools/registry"

export const alt = "PixWarp tool"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  const cat = tool ? categoryLabels[tool.category] : null

  const accent = "#F97316"
  const accentFg = "#FFFFFF"
  const bg = "#FAFAFA"
  const fg = "#0A0A0A"
  const muted = "#71717A"

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: bg,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Left accent bar with logo */}
      <div
        style={{
          width: 140,
          background: accent,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 60,
        }}
      >
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 18,
            background: accentFg,
            color: accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 44,
            fontWeight: 800,
            letterSpacing: "-2px",
          }}
        >
          PW
        </div>
      </div>

      {/* Right content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
        }}
      >
        {/* Top: category chip */}
        {cat && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                background: cat.accent,
                color: "#FFFFFF",
                padding: "8px 16px",
                borderRadius: 999,
                fontSize: 22,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              {cat.label}
            </div>
          </div>
        )}

        {/* Middle: tool name + description */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: fg,
              letterSpacing: "-3px",
              lineHeight: 1.05,
            }}
          >
            {tool ? tool.name : "PixWarp"}
          </div>
          {tool && (
            <div
              style={{
                fontSize: 32,
                color: muted,
                lineHeight: 1.3,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {tool.description}
            </div>
          )}
        </div>

        {/* Bottom: brand line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, color: fg }}>PixWarp</div>
          <div style={{ fontSize: 22, color: muted, fontFamily: "ui-monospace, monospace" }}>
            pixwarp.app
          </div>
        </div>
      </div>
    </div>,
    { ...size },
  )
}
