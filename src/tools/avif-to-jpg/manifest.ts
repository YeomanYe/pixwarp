import type { ToolManifest } from "../types"
import { AvifToJpgUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "avif-to-jpg",
  category: "image",
  name: "AVIF to JPG Converter",
  nameZh: "AVIF 转 JPG",
  description: "Convert AVIF images to JPG locally with adjustable quality.",
  descriptionZh: "在浏览器内把 AVIF 图片转换为 JPG，并可调节输出质量。",
  longDescription:
    "AVIF is efficient for modern websites, but JPG is still easier to upload, email, and open in older image tools. PixWarp decodes AVIF in your browser and exports standard JPG files without sending the source image to a server.",
  longDescriptionZh:
    "AVIF 适合现代网站压缩图片，但 JPG 更容易上传、发送和在旧软件里打开。PixWarp 会在浏览器本地解码 AVIF，并导出标准 JPG 文件，不需要上传原图。",
  howToUse: [
    "Drop one or more AVIF images into the upload area.",
    "Choose the JPG quality level.",
    "PixWarp decodes each AVIF image and exports JPG locally.",
    "Download the converted JPG files.",
  ],
  howToUseZh: [
    "拖入一个或多个 AVIF 图片。",
    "选择 JPG 输出质量。",
    "PixWarp 会在浏览器内解码 AVIF 并本地导出 JPG。",
    "下载转换后的 JPG 文件。",
  ],
  outputDetails: [
    "Outputs standard image/jpeg files.",
    "Transparent AVIF pixels are flattened onto a white background.",
    "Conversion depends on the browser's AVIF decoding support.",
  ],
  outputDetailsZh: [
    "输出标准 image/jpeg 文件。",
    "AVIF 透明区域会铺到白色背景上。",
    "转换能力取决于当前浏览器是否支持 AVIF 解码。",
  ],
  keywords: ["avif to jpg", "avif to jpeg", "convert avif", "AVIF 转 JPG", "AVIF 转 JPEG"],
  icon: "image",
  related: ["jpg-to-webp", "png-to-jpg", "image-compressor"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "Does PixWarp upload my AVIF image?",
      a: "No. AVIF decoding and JPG export run in your browser with local Canvas APIs.",
    },
    {
      q: "What happens to transparency?",
      a: "JPG does not support alpha transparency, so transparent pixels are flattened onto white.",
    },
    {
      q: "Why would I convert AVIF to JPG?",
      a: "JPG is accepted by more older apps, CMS upload forms, email clients, and social platforms.",
    },
  ],
  faqZh: [
    {
      q: "PixWarp 会上传我的 AVIF 图片吗？",
      a: "不会。AVIF 解码和 JPG 导出都在浏览器本地完成。",
    },
    {
      q: "透明背景会怎样处理？",
      a: "JPG 不支持透明度，所以透明区域会被铺成白色背景。",
    },
    {
      q: "为什么要把 AVIF 转成 JPG？",
      a: "JPG 在旧软件、CMS 上传表单、邮件客户端和社交平台里兼容性更好。",
    },
  ],
  lastUpdated: "2026-05-12",
  Component: AvifToJpgUI,
}
