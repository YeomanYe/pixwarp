import type { ToolManifest } from "../types"
import { BmpToPngUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "bmp-to-png",
  category: "image",
  name: "BMP to PNG Converter",
  nameZh: "BMP 转 PNG",
  description: "Convert BMP and DIB bitmap images to PNG locally in your browser.",
  descriptionZh: "在浏览器内把 BMP / DIB 位图转换为 PNG。",
  longDescription:
    "BMP is still found in legacy Windows software, archival assets, old screenshots, and bitmap artwork, but the files are often large and inconvenient for modern web workflows. PixWarp decodes BMP in your browser and exports a standard PNG without uploading your image.",
  longDescriptionZh:
    "BMP 仍然会出现在旧版 Windows 软件、归档素材、老截图和位图资产里，但文件通常很大，也不适合现代网页流程。PixWarp 会在浏览器本地解码 BMP，并导出标准 PNG，不需要上传图片。",
  howToUse: [
    "Drop one or more .bmp or .dib images into the upload area.",
    "PixWarp decodes each bitmap locally.",
    "Preview the PNG output and file size.",
    "Download the converted PNG files.",
  ],
  howToUseZh: [
    "拖入一个或多个 .bmp / .dib 图片。",
    "PixWarp 会在浏览器本地解码每张位图。",
    "预览 PNG 输出和文件大小。",
    "下载转换后的 PNG 文件。",
  ],
  outputDetails: [
    "Outputs standard image/png files.",
    "PNG keeps bitmap pixels lossless while being easier to use in modern tools.",
    "Very large BMP files may take longer because they can store uncompressed pixels.",
  ],
  outputDetailsZh: [
    "输出标准 image/png 文件。",
    "PNG 会无损保留位图像素，并更适合现代工具使用。",
    "很大的 BMP 可能处理较慢，因为它们可能存储未压缩像素。",
  ],
  keywords: ["bmp to png", "convert bmp to png", "dib to png", "BMP 转 PNG", "DIB 转 PNG"],
  icon: "image",
  related: ["png-to-jpg", "image-compressor", "webp-to-png"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "Does PixWarp upload my BMP file?",
      a: "No. BMP decoding and PNG export happen locally inside your browser.",
    },
    {
      q: "Why convert BMP to PNG?",
      a: "PNG is lossless like many BMP files, but it is usually easier to preview, upload, and use on websites.",
    },
    {
      q: "Does this support DIB files?",
      a: "Yes. You can drop .dib files when your browser can decode the bitmap data.",
    },
  ],
  faqZh: [
    {
      q: "会上传我的 BMP 文件吗？",
      a: "不会。BMP 解码和 PNG 导出都在浏览器本地完成。",
    },
    {
      q: "为什么要把 BMP 转成 PNG？",
      a: "PNG 同样适合无损保存像素，但更容易预览、上传，也更适合网站使用。",
    },
    {
      q: "支持 DIB 文件吗？",
      a: "支持。只要浏览器能解码对应位图数据，就可以拖入 .dib 文件处理。",
    },
  ],
  lastUpdated: "2026-05-12",
  Component: BmpToPngUI,
}
