import type { ToolManifest } from "../types"
import { RemoveExifUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "remove-exif",
  category: "image",
  name: "Remove EXIF Metadata",
  nameZh: "移除图片 EXIF 信息",
  description: "Strip camera, location, and hidden metadata by re-encoding images locally.",
  descriptionZh: "通过浏览器本地重新编码图片，移除相机、位置和隐藏元数据。",
  longDescription:
    "Remove metadata from images before sharing. PixWarp redraws the image into a clean canvas and exports a new file without the original metadata blocks.",
  howToUse: [
    "Drop images.",
    "PixWarp re-encodes clean copies locally.",
    "Download the stripped images.",
  ],
  outputDetails: [
    "Outputs JPG or PNG.",
    "Pixel content is preserved, metadata blocks are removed.",
    "GPS location metadata is not copied.",
  ],
  keywords: ["remove exif", "strip metadata", "remove gps from photo", "删除 EXIF", "照片隐私"],
  related: ["image-resize", "image-compressor"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "How does metadata removal work?",
      a: "The image is decoded and redrawn into Canvas, then exported as a new file without original metadata.",
    },
  ],
  lastUpdated: "2026-05-09",
  Component: RemoveExifUI,
}
