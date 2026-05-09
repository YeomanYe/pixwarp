import type { ToolManifest } from "../types"
import { ImageResizeUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "image-resize",
  category: "image",
  name: "Image Resize & Crop",
  nameZh: "图片尺寸调整与裁剪",
  description:
    "Resize and center-crop images locally for avatars, covers, thumbnails, and uploads.",
  descriptionZh: "在浏览器内调整图片尺寸并居中裁剪，适合头像、封面、缩略图和上传限制。",
  longDescription:
    "Resize images without uploading them. Choose exact dimensions, keep aspect ratio, or crop to fill a target frame.",
  howToUse: [
    "Drop one or more images.",
    "Set target width and height.",
    "Choose fit mode: contain or crop.",
    "Download resized JPG or PNG output.",
  ],
  outputDetails: [
    "Supports browser-decodable image formats.",
    "Crop mode fills the target frame from the center.",
    "Contain mode keeps the full image inside the target size.",
  ],
  keywords: ["image resize", "resize image online", "crop image", "图片尺寸调整", "图片裁剪"],
  related: ["image-compressor", "remove-exif"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "Can I resize multiple images?",
      a: "Yes. Drop multiple images and each is processed locally.",
    },
    {
      q: "Does crop mode distort images?",
      a: "No. It scales proportionally, then crops the overflow from the center.",
    },
  ],
  lastUpdated: "2026-05-09",
  Component: ImageResizeUI,
}
