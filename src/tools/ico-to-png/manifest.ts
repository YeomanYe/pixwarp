import type { ToolManifest } from "../types"
import { IcoToPngUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "ico-to-png",
  category: "image",
  name: "ICO to PNG Converter",
  nameZh: "ICO 转 PNG",
  description: "Convert ICO favicon and Windows icon files to PNG locally in your browser.",
  descriptionZh: "在浏览器内把 ICO favicon 和 Windows 图标转换为 PNG。",
  longDescription:
    "ICO files are useful for favicons and Windows icons, but PNG is easier to preview, edit, upload, and reuse in modern design workflows. PixWarp decodes ICO files in your browser and exports PNG without sending the icon to a server.",
  longDescriptionZh:
    "ICO 常用于 favicon 和 Windows 图标，但 PNG 更容易预览、编辑、上传，也更适合现代设计流程复用。PixWarp 会在浏览器本地解码 ICO 并导出 PNG，不需要上传图标。",
  howToUse: [
    "Drop one or more .ico files into the upload area.",
    "PixWarp decodes each icon locally.",
    "Preview the PNG output and file size.",
    "Download the converted PNG files.",
  ],
  howToUseZh: [
    "拖入一个或多个 .ico 文件。",
    "PixWarp 会在浏览器本地解码每个图标。",
    "预览 PNG 输出和文件大小。",
    "下载转换后的 PNG 文件。",
  ],
  outputDetails: [
    "Outputs standard image/png files.",
    "ICO files can contain multiple embedded sizes; the browser decodes the renderable icon image.",
    "Transparent icon pixels are preserved when the browser exposes alpha correctly.",
  ],
  outputDetailsZh: [
    "输出标准 image/png 文件。",
    "ICO 文件可能包含多个内嵌尺寸；浏览器会解码可渲染的图标图像。",
    "如果浏览器正确暴露 alpha，透明图标像素会保留。",
  ],
  keywords: ["ico to png", "favicon to png", "convert ico to png", "ICO 转 PNG"],
  icon: "image",
  related: ["favicon-generator", "svg-to-png", "bmp-to-png"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "Does PixWarp upload my ICO file?",
      a: "No. ICO decoding and PNG export happen locally inside your browser.",
    },
    {
      q: "Why convert ICO to PNG?",
      a: "PNG is easier to preview, edit, upload, and use in design tools than ICO.",
    },
    {
      q: "Can ICO contain multiple sizes?",
      a: "Yes. ICO can bundle several icon sizes. This browser-based converter exports the image the browser decodes for rendering.",
    },
  ],
  faqZh: [
    {
      q: "会上传我的 ICO 文件吗？",
      a: "不会。ICO 解码和 PNG 导出都在浏览器本地完成。",
    },
    {
      q: "为什么要把 ICO 转成 PNG？",
      a: "PNG 比 ICO 更容易预览、编辑、上传，也更适合设计工具使用。",
    },
    {
      q: "ICO 可以包含多个尺寸吗？",
      a: "可以。ICO 能打包多个图标尺寸。这个浏览器本地转换器会导出浏览器解码用于渲染的图像。",
    },
  ],
  lastUpdated: "2026-05-12",
  Component: IcoToPngUI,
}
