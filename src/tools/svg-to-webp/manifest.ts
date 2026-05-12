import type { ToolManifest } from "../types"
import { SvgToWebpUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "svg-to-webp",
  category: "svg",
  name: "SVG to WebP Converter",
  nameZh: "SVG 转 WebP",
  description: "Render SVG files to WebP locally in your browser.",
  descriptionZh: "在浏览器内把 SVG 渲染并导出为 WebP。",
  longDescription:
    "SVG is great for scalable vector artwork, but WebP is often easier to use for fast-loading website images and CMS uploads. PixWarp renders SVG files in your browser and exports compact WebP images without uploading the source vector.",
  longDescriptionZh:
    "SVG 适合可缩放矢量图，但 WebP 更适合快速加载的网站图片和 CMS 上传。PixWarp 会在浏览器本地渲染 SVG，并导出体积更小的 WebP 图片，不需要上传源文件。",
  howToUse: [
    "Drop one or more SVG files.",
    "Choose the WebP quality level.",
    "PixWarp renders each SVG locally in the browser.",
    "Download the generated WebP files.",
  ],
  howToUseZh: [
    "拖入一个或多个 SVG 文件。",
    "选择 WebP 输出质量。",
    "PixWarp 会在浏览器本地渲染每个 SVG。",
    "下载生成的 WebP 文件。",
  ],
  outputDetails: [
    "Outputs standard image/webp files.",
    "Transparent SVG backgrounds can remain transparent in WebP output.",
    "External fonts or remote images inside an SVG may not render if the browser blocks them.",
  ],
  outputDetailsZh: [
    "输出标准 image/webp 文件。",
    "透明 SVG 背景可以在 WebP 输出中保留透明度。",
    "如果浏览器拦截 SVG 内的外部字体或远程图片，它们可能不会渲染。",
  ],
  keywords: ["svg to webp", "convert svg to webp", "svg webp converter", "SVG 转 WebP"],
  icon: "image",
  related: ["svg-to-png", "svg-to-jpg", "image-compressor"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "Are SVG files uploaded?",
      a: "No. SVG rendering and WebP export happen in your browser.",
    },
    {
      q: "Does WebP keep transparency?",
      a: "Yes when the browser renders alpha from the SVG correctly.",
    },
    {
      q: "Why convert SVG to WebP?",
      a: "WebP can be easier to use in CMS uploads and image pipelines that expect raster web images.",
    },
  ],
  faqZh: [
    {
      q: "会上传我的 SVG 文件吗？",
      a: "不会。SVG 渲染和 WebP 导出都在浏览器本地完成。",
    },
    {
      q: "WebP 会保留透明度吗？",
      a: "只要浏览器能正确渲染 SVG alpha，WebP 输出可以保留透明度。",
    },
    {
      q: "为什么要把 SVG 转成 WebP？",
      a: "一些 CMS 上传和图片处理流程更偏向接受 WebP 这类网页位图。",
    },
  ],
  lastUpdated: "2026-05-12",
  Component: SvgToWebpUI,
}
