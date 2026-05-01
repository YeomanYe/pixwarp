import { ImageResponse } from "next/og"
import { formats, getFormatBySlug, formatCategoryLabels } from "@/formats/registry"

export const alt = "PixWarp file format guide"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export async function generateStaticParams() {
  return formats.map((fmt) => ({ slug: fmt.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const fmt = getFormatBySlug(slug)
  const cat = fmt ? formatCategoryLabels[fmt.category] : null

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

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
        }}
      >
        {cat && fmt && (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
              {`${cat.label} format`}
            </div>
            <div
              style={{
                fontSize: 22,
                color: muted,
                fontFamily: "ui-monospace, monospace",
              }}
            >
              {`since ${fmt.year}`}
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 120,
              fontWeight: 800,
              color: accent,
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "-4px",
              lineHeight: 1,
            }}
          >
            {fmt ? `.${fmt.extensions[0]}` : ".???"}
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: fg,
              letterSpacing: "-1.5px",
            }}
          >
            {fmt ? fmt.fullName : "File format guide"}
          </div>
          {fmt && (
            <div
              style={{
                fontSize: 26,
                color: muted,
                lineHeight: 1.3,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {fmt.tagline}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, color: fg }}>PixWarp</div>
          <div style={{ fontSize: 22, color: muted, fontFamily: "ui-monospace, monospace" }}>
            pixwarp.app/format
          </div>
        </div>
      </div>
    </div>,
    { ...size },
  )
}
