import type { ToolManifest } from "../types"
import { QrCodeUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "qr-code",
  category: "utility",
  name: "QR Code Generator & Reader",
  description:
    "Generate QR codes from text or URLs, and decode QR codes from images — runs entirely in your browser.",
  longDescription: `Generate QR codes from any text or URL, and read QR codes back from any image (screenshot, photo, paste).

Everything runs in your browser. The text you encode and the images you decode never leave your device.`,
  keywords: [
    "qr code generator",
    "qr code reader",
    "qr code scanner online",
    "qr code maker free",
    "decode qr code from image",
    "qr code no upload",
    "qr code 在线生成",
    "qr 码 解码",
  ],
  icon: "qr-code",
  related: [],
  markets: ["global"],
  faq: [
    {
      q: "Does my data get uploaded?",
      a: "No. Both encoding and decoding happen entirely in your browser. The text you encode and the images you scan never leave your device.",
    },
    {
      q: "What can I encode in a QR code?",
      a: "Any UTF-8 text, including URLs, plain text, Wi-Fi credentials (SSID + password), email links (mailto:), phone numbers (tel:), and so on. Most apps treat URLs specially.",
    },
    {
      q: "What image formats can I decode?",
      a: "PNG, JPG, WebP, GIF, BMP — basically anything your browser can render. Decoding works on screenshots, scans, and phone-camera photos.",
    },
    {
      q: "Why doesn't decoding always work?",
      a: "QR decoding needs reasonable contrast, focus, and resolution. Very small QR codes, heavy compression artifacts, or perspective distortion can fail. Try a sharper or higher-resolution image.",
    },
  ],
  lastUpdated: "2026-05-01",
  Component: QrCodeUI,
}
