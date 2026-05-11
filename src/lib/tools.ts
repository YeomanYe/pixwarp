import type { ToolManifest } from "@/tools/types"

export type Locale = "en" | "zh"

const defaultComparisonEn = [
  { feature: "File privacy", pixwarp: "Runs in your browser", others: "Often uploads to a server" },
  { feature: "Account required", pixwarp: "No signup", others: "May require login or email" },
  { feature: "Watermark", pixwarp: "No watermark", others: "Often adds branding on free plans" },
]

const defaultComparisonZh = [
  { feature: "文件隐私", pixwarp: "尽量在浏览器本地处理", others: "通常需要上传到服务器" },
  { feature: "账号要求", pixwarp: "无需注册", others: "可能要求登录或邮箱" },
  { feature: "水印", pixwarp: "不加水印", others: "免费版常带品牌水印" },
]

const zhFallbacks: Record<string, { name: string; description: string }> = {
  "heic-to-jpg": {
    name: "HEIC 转 JPG",
    description: "在浏览器内把 iPhone HEIC 照片转换为 JPG 和 PNG。",
  },
  "screenshot-mockup": {
    name: "截图美化器",
    description: "为截图添加设备框、背景和阴影，生成更适合发布的图片。",
  },
  "tweet-mockup": {
    name: "Tweet 图片生成器",
    description: "把 Tweet/X 内容做成适合分享的图片。",
  },
  "social-cover": {
    name: "社交媒体封面生成器",
    description: "为小红书、B 站、YouTube 和社媒平台生成封面图。",
  },
  "mp4-to-gif": {
    name: "MP4 转 GIF",
    description: "使用 FFmpeg.wasm 在浏览器内把短视频转换成 GIF。",
  },
  "pdf-compress": {
    name: "PDF 压缩",
    description: "在浏览器内把 PDF 页面重新渲染压缩，减少文件大小。",
  },
  "pdf-split": {
    name: "PDF 拆分",
    description: "按页码范围把 PDF 拆分成多个文件。",
  },
  "pdf-merge": {
    name: "PDF 合并",
    description: "把多个 PDF 按顺序合并为一个文件。",
  },
  "image-compressor": {
    name: "图片压缩",
    description: "在浏览器内压缩 JPG、PNG 和 WebP 图片。",
  },
  "qr-code": {
    name: "二维码生成与识别",
    description: "生成二维码，也可以从图片中识别二维码内容。",
  },
  "webp-to-png": {
    name: "WebP 转 PNG",
    description: "在浏览器内把 WebP 图片转换为 PNG。",
  },
  "png-to-jpg": {
    name: "PNG 转 JPG",
    description: "在浏览器内把 PNG 图片转换为更小的 JPG 文件。",
  },
  "jpg-to-png": {
    name: "JPG 转 PNG",
    description: "在浏览器内把 JPG/JPEG 图片转换为 PNG。",
  },
  "jpg-to-webp": {
    name: "JPG 转 WebP",
    description: "在浏览器内把 JPG 图片转换为适合网页使用的 WebP。",
  },
  "png-to-webp": {
    name: "PNG 转 WebP",
    description: "在浏览器内把 PNG 截图和素材转换为 WebP。",
  },
  "svg-to-png": {
    name: "SVG 转 PNG",
    description: "在浏览器内把 SVG 图标、Logo 和插图渲染为 PNG。",
  },
  "favicon-generator": {
    name: "Favicon 生成器",
    description: "从一张图片本地生成 favicon.ico 和常用 PNG 图标尺寸。",
  },
}

export function getLocalizedTool(tool: ToolManifest, locale: Locale) {
  const zh = locale === "zh"
  const zhFallback = zhFallbacks[tool.slug]
  return {
    name: zh ? (tool.nameZh ?? zhFallback?.name ?? tool.name) : tool.name,
    description: zh
      ? (tool.descriptionZh ?? zhFallback?.description ?? tool.description)
      : tool.description,
    longDescription: zh ? (tool.longDescriptionZh ?? tool.longDescription) : tool.longDescription,
    howToUse: zh ? (tool.howToUseZh ?? tool.howToUse) : tool.howToUse,
    outputDetails: zh ? (tool.outputDetailsZh ?? tool.outputDetails) : tool.outputDetails,
    faq: zh ? (tool.faqZh ?? tool.faq) : tool.faq,
    comparison:
      (zh ? (tool.comparisonZh ?? tool.comparison) : tool.comparison) ??
      (zh ? defaultComparisonZh : defaultComparisonEn),
  }
}
