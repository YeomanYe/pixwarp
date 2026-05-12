import type { ToolManifest } from "../types"
import { TiffToPngUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "tiff-to-png",
  category: "image",
  name: "TIFF to PNG Converter",
  nameZh: "TIFF 转 PNG",
  description: "Convert TIFF and TIF images to PNG locally in your browser.",
  descriptionZh: "在浏览器内把 TIFF / TIF 图片转换为 PNG。",
  longDescription:
    "TIFF is common in scanning, archives, photography, and print workflows, but most browsers and upload forms do not accept it directly. PixWarp decodes TIFF locally with a browser-side decoder and exports the first image page as a lossless PNG.",
  longDescriptionZh:
    "TIFF 常见于扫描、归档、摄影和印刷流程，但多数浏览器和上传表单并不直接接受。PixWarp 会在浏览器本地解码 TIFF，并把第一个图像页面导出为无损 PNG。",
  howToUse: [
    "Drop one or more .tif or .tiff files.",
    "PixWarp decodes the first image page locally.",
    "Preview the PNG output and file size.",
    "Download the converted PNG files.",
  ],
  howToUseZh: [
    "拖入一个或多个 .tif / .tiff 文件。",
    "PixWarp 会在浏览器本地解码第一个图像页面。",
    "预览 PNG 输出和文件大小。",
    "下载转换后的 PNG 文件。",
  ],
  outputDetails: [
    "Outputs standard image/png files.",
    "PNG keeps pixels lossless and can preserve transparency when decoded from TIFF alpha.",
    "For multi-page TIFF files, this tool exports the first decodable image page.",
  ],
  outputDetailsZh: [
    "输出标准 image/png 文件。",
    "PNG 会无损保留像素；如果 TIFF alpha 可解码，也能保留透明度。",
    "多页 TIFF 会导出第一个可解码图像页面。",
  ],
  keywords: ["tiff to png", "tif to png", "convert tiff to png", "TIFF 转 PNG", "TIF 转 PNG"],
  icon: "image",
  related: ["tiff-to-jpg", "png-to-jpg", "image-compressor"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "Does this upload my TIFF file?",
      a: "No. TIFF decoding and PNG export run locally in your browser.",
    },
    {
      q: "Can it convert multi-page TIFF files?",
      a: "It exports the first decodable image page. A future version can add page selection.",
    },
    {
      q: "Why convert TIFF to PNG instead of JPG?",
      a: "PNG is lossless and better for scans, artwork, UI assets, and images where you want to avoid JPG compression artifacts.",
    },
  ],
  faqZh: [
    {
      q: "会上传我的 TIFF 文件吗？",
      a: "不会。TIFF 解码和 PNG 导出都在浏览器本地完成。",
    },
    {
      q: "能转换多页 TIFF 吗？",
      a: "当前会导出第一个可解码图像页面，后续可以再加页面选择。",
    },
    {
      q: "为什么要把 TIFF 转成 PNG，而不是 JPG？",
      a: "PNG 是无损格式，更适合扫描件、图稿、UI 素材，以及不希望出现 JPG 压缩痕迹的图片。",
    },
  ],
  lastUpdated: "2026-05-12",
  Component: TiffToPngUI,
}
