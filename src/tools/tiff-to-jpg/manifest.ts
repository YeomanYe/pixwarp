import type { ToolManifest } from "../types"
import { TiffToJpgUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "tiff-to-jpg",
  category: "image",
  name: "TIFF to JPG Converter",
  nameZh: "TIFF 转 JPG",
  description: "Convert TIFF and TIF images to JPG locally in your browser.",
  descriptionZh: "在浏览器内把 TIFF / TIF 图片转换为 JPG。",
  longDescription:
    "TIFF is common in scanning, archives, photography, and print workflows, but most browsers and upload forms do not accept it. PixWarp decodes TIFF locally with a browser-side decoder and exports the first image page as a standard JPG.",
  longDescriptionZh:
    "TIFF 常见于扫描、归档、摄影和印刷流程，但多数浏览器和上传表单并不直接接受。PixWarp 会在浏览器本地解码 TIFF，并把第一个图像页面导出为标准 JPG。",
  howToUse: [
    "Drop one or more .tif or .tiff files.",
    "Choose the JPG quality level.",
    "PixWarp decodes the first image page locally.",
    "Download the converted JPG files.",
  ],
  howToUseZh: [
    "拖入一个或多个 .tif / .tiff 文件。",
    "选择 JPG 输出质量。",
    "PixWarp 会在浏览器本地解码第一个图像页面。",
    "下载转换后的 JPG 文件。",
  ],
  outputDetails: [
    "Outputs standard image/jpeg files.",
    "Transparent pixels, if present, are flattened onto a white background.",
    "For multi-page TIFF files, this tool exports the first decodable image page.",
  ],
  outputDetailsZh: [
    "输出标准 image/jpeg 文件。",
    "如果存在透明像素，会铺到白色背景上。",
    "多页 TIFF 会导出第一个可解码图像页面。",
  ],
  keywords: ["tiff to jpg", "tif to jpg", "convert tiff to jpg", "TIFF 转 JPG", "TIF 转 JPG"],
  icon: "image",
  related: ["png-to-jpg", "image-compressor", "pdf-to-images"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "Does this upload my TIFF file?",
      a: "No. TIFF decoding and JPG export run locally in your browser.",
    },
    {
      q: "Can it convert multi-page TIFF files?",
      a: "It exports the first decodable image page. A future version can add page selection.",
    },
    {
      q: "Why convert TIFF to JPG?",
      a: "JPG is much easier to upload, email, preview, and use on websites than TIFF.",
    },
  ],
  faqZh: [
    {
      q: "会上传我的 TIFF 文件吗？",
      a: "不会。TIFF 解码和 JPG 导出都在浏览器本地完成。",
    },
    {
      q: "能转换多页 TIFF 吗？",
      a: "当前会导出第一个可解码图像页面，后续可以再加页面选择。",
    },
    {
      q: "为什么要把 TIFF 转成 JPG？",
      a: "JPG 更容易上传、发送、预览，也更适合网站使用。",
    },
  ],
  lastUpdated: "2026-05-12",
  Component: TiffToJpgUI,
}
