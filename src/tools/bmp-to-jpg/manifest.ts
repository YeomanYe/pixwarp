import type { ToolManifest } from "../types"
import { BmpToJpgUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "bmp-to-jpg",
  category: "image",
  name: "BMP to JPG Converter",
  nameZh: "BMP 转 JPG",
  description: "Convert BMP and DIB bitmap images to JPG locally in your browser.",
  descriptionZh: "在浏览器内把 BMP / DIB 位图转换为 JPG。",
  longDescription:
    "BMP files from legacy Windows software, old screenshots, and bitmap archives can be very large. PixWarp decodes BMP locally in your browser and exports smaller JPG files without uploading your image.",
  longDescriptionZh:
    "来自旧版 Windows 软件、老截图和位图归档的 BMP 文件通常很大。PixWarp 会在浏览器本地解码 BMP，并导出更小的 JPG 文件，不需要上传图片。",
  howToUse: [
    "Drop one or more .bmp or .dib images into the upload area.",
    "Choose the JPG quality level.",
    "Preview the JPG output and file size.",
    "Download the converted JPG files.",
  ],
  howToUseZh: [
    "拖入一个或多个 .bmp / .dib 图片。",
    "选择 JPG 输出质量。",
    "预览 JPG 输出和文件大小。",
    "下载转换后的 JPG 文件。",
  ],
  outputDetails: [
    "Outputs standard image/jpeg files.",
    "Transparent pixels, if present, are flattened onto a white background.",
    "JPG is lossy and usually much smaller than uncompressed BMP.",
  ],
  outputDetailsZh: [
    "输出标准 image/jpeg 文件。",
    "如果存在透明像素，会铺到白色背景上。",
    "JPG 是有损格式，通常比未压缩 BMP 小很多。",
  ],
  keywords: ["bmp to jpg", "bmp to jpeg", "convert bmp to jpg", "BMP 转 JPG", "DIB 转 JPG"],
  icon: "image",
  related: ["bmp-to-png", "image-compressor", "png-to-jpg"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "Does PixWarp upload my BMP file?",
      a: "No. BMP decoding and JPG export happen locally inside your browser.",
    },
    {
      q: "Why convert BMP to JPG?",
      a: "JPG is easier to upload, email, and share, and it is usually much smaller than BMP for photos or screenshots.",
    },
    {
      q: "What happens to transparency?",
      a: "JPG does not support transparency, so transparent pixels are flattened onto white.",
    },
  ],
  faqZh: [
    {
      q: "会上传我的 BMP 文件吗？",
      a: "不会。BMP 解码和 JPG 导出都在浏览器本地完成。",
    },
    {
      q: "为什么要把 BMP 转成 JPG？",
      a: "JPG 更容易上传、发送和分享；对于照片或截图，文件通常比 BMP 小很多。",
    },
    {
      q: "透明区域会怎样？",
      a: "JPG 不支持透明度，所以透明像素会铺到白色背景上。",
    },
  ],
  lastUpdated: "2026-05-12",
  Component: BmpToJpgUI,
}
