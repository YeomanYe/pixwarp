import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F97316",
        color: "#FFFFFF",
        fontSize: 96,
        fontWeight: 700,
        letterSpacing: "-5px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      PW
    </div>,
    { ...size },
  )
}
