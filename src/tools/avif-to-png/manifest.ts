import type { ToolManifest } from "../types"
import { AvifToPngUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "avif-to-png",
  category: "image",
  name: "AVIF to PNG Converter",
  nameZh: "AVIF 转 PNG",
  description: "Convert AVIF images to PNG locally while preserving transparency.",
  descriptionZh: "在浏览器内把 AVIF 图片转换为 PNG，并尽量保留透明度。",
  longDescription:
    "AVIF is compact for modern web delivery, but PNG is easier to use in design tools, older upload forms, and workflows that need lossless pixels or transparency. PixWarp decodes AVIF in your browser and exports PNG without uploading your image.",
  longDescriptionZh:
    "AVIF 适合现代网页压缩图片，但 PNG 更适合设计工具、旧上传表单，以及需要无损像素或透明度的工作流。PixWarp 会在浏览器本地解码 AVIF 并导出 PNG，不需要上传图片。",
  howToUse: [
    "Drop one or more AVIF images into the upload area.",
    "PixWarp decodes each AVIF image locally.",
    "Preview the PNG output and file size.",
    "Download the converted PNG files.",
  ],
  howToUseZh: [
    "拖入一个或多个 AVIF 图片。",
    "PixWarp 会在浏览器本地解码每张 AVIF。",
    "预览 PNG 输出和文件大小。",
    "下载转换后的 PNG 文件。",
  ],
  outputDetails: [
    "Outputs standard image/png files.",
    "Transparency is preserved when the browser decodes AVIF alpha correctly.",
    "PNG files can be larger than AVIF because PNG is lossless.",
  ],
  outputDetailsZh: [
    "输出标准 image/png 文件。",
    "如果浏览器能正确解码 AVIF alpha，透明度会保留。",
    "PNG 是无损格式，文件通常会比 AVIF 更大。",
  ],
  keywords: ["avif to png", "convert avif to png", "avif png converter", "AVIF 转 PNG"],
  icon: "image",
  related: ["avif-to-jpg", "webp-to-png", "image-compressor"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "Does this preserve transparent AVIF images?",
      a: "Yes when the browser can decode the AVIF alpha channel. PixWarp exports the result as PNG with alpha.",
    },
    {
      q: "Why is the PNG larger than the AVIF?",
      a: "AVIF uses modern lossy or lossless compression. PNG is lossless and compatibility-focused, so it is often larger.",
    },
    {
      q: "Are my files uploaded?",
      a: "No. The AVIF decode and PNG export happen inside your browser.",
    },
  ],
  faqZh: [
    {
      q: "透明 AVIF 图片会保留透明度吗？",
      a: "只要浏览器能正确解码 AVIF alpha 通道，PixWarp 导出的 PNG 会保留透明度。",
    },
    {
      q: "为什么 PNG 比 AVIF 大？",
      a: "AVIF 使用现代压缩算法，PNG 偏向无损和兼容性，所以通常更大。",
    },
    {
      q: "文件会上传吗？",
      a: "不会。AVIF 解码和 PNG 导出都在浏览器本地完成。",
    },
  ],
  lastUpdated: "2026-05-12",
  Component: AvifToPngUI,
}
