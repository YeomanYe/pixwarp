import type { ToolManifest } from "../types"
import { SvgToJpgUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "svg-to-jpg",
  category: "svg",
  name: "SVG to JPG Converter",
  nameZh: "SVG 转 JPG",
  description: "Render SVG files to JPG locally in your browser.",
  descriptionZh: "在浏览器内把 SVG 渲染并导出为 JPG。",
  longDescription:
    "SVG is ideal for scalable icons, logos, and diagrams, but some upload forms and editors only accept raster JPG images. PixWarp renders SVG with the browser image engine and exports a white-background JPG without uploading the source vector.",
  longDescriptionZh:
    "SVG 很适合可缩放图标、Logo 和图表，但一些上传表单和编辑器只接受 JPG 位图。PixWarp 会用浏览器图像引擎本地渲染 SVG，并导出白底 JPG，不需要上传源文件。",
  howToUse: [
    "Drop one or more SVG files.",
    "Choose the JPG quality level.",
    "PixWarp renders each SVG locally in the browser.",
    "Download the generated JPG files.",
  ],
  howToUseZh: [
    "拖入一个或多个 SVG 文件。",
    "选择 JPG 输出质量。",
    "PixWarp 会在浏览器本地渲染每个 SVG。",
    "下载生成的 JPG 文件。",
  ],
  outputDetails: [
    "Outputs standard image/jpeg files.",
    "Transparent SVG backgrounds are flattened onto white because JPG has no alpha channel.",
    "External fonts or remote images inside an SVG may not render if the browser blocks them.",
  ],
  outputDetailsZh: [
    "输出标准 image/jpeg 文件。",
    "JPG 不支持透明度，所以透明 SVG 背景会铺到白色背景上。",
    "如果浏览器拦截 SVG 内的外部字体或远程图片，它们可能不会渲染。",
  ],
  keywords: ["svg to jpg", "svg to jpeg", "convert svg to jpg", "SVG 转 JPG", "SVG 转图片"],
  icon: "image",
  related: ["svg-to-png", "svg-optimizer", "image-compressor"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "Are SVG files uploaded?",
      a: "No. SVG rendering and JPG export happen in your browser.",
    },
    {
      q: "What happens to transparency?",
      a: "JPG does not support alpha, so PixWarp renders the SVG on a white background.",
    },
    {
      q: "Why does my font look different?",
      a: "The browser can only render fonts available in the current page or embedded in the SVG.",
    },
  ],
  faqZh: [
    {
      q: "会上传我的 SVG 文件吗？",
      a: "不会。SVG 渲染和 JPG 导出都在浏览器本地完成。",
    },
    {
      q: "透明背景会怎样？",
      a: "JPG 不支持 alpha，PixWarp 会把 SVG 渲染到白色背景上。",
    },
    {
      q: "为什么字体看起来不一样？",
      a: "浏览器只能渲染当前页面可用或 SVG 内嵌的字体。",
    },
  ],
  lastUpdated: "2026-05-12",
  Component: SvgToJpgUI,
}
