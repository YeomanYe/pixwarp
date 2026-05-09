import type { ToolManifest } from "../types"
import { HeicToJpgUI } from "./ui"

export const manifest: ToolManifest = {
  slug: "heic-to-jpg",
  category: "image",
  name: "HEIC to JPG Converter",
  description:
    "Drop a HEIC, get JPG and PNG instantly — with a side-by-side preview and tunable quality. No signup, no waiting.",
  longDescription: `iPhone takes photos in HEIC format by default — great for storage, terrible for compatibility.
This converter runs entirely in your browser using WebAssembly. Your photos never leave your device.

Drop one or more .heic files, pick the output format and quality, hit convert, download the result.
That's it.`,
  howToUse: [
    "Drop one or more .heic or .heif files into the upload area.",
    "Review the JPG and PNG previews generated in your browser.",
    "Adjust JPG quality if you want a smaller file or cleaner output.",
    "Download the converted image that fits your target app or workflow.",
  ],
  outputDetails: [
    "Creates JPG for broad compatibility and PNG for lossless sharing.",
    "Shows real source and output file sizes after conversion.",
    "JPG quality can be tuned per image without uploading the source file.",
  ],
  keywords: [
    "heic to jpg",
    "heic to jpeg online",
    "heic converter",
    "iPhone HEIC to JPG",
    "convert heic free",
    "heic to jpg no upload",
    "苹果照片 转 JPG",
    "HEIC 转 JPG 在线",
  ],
  icon: "image",
  related: ["webp-to-png", "webp-to-jpg", "image-compressor"],
  markets: ["global", "cn"],
  faq: [
    {
      q: "Does my photo get uploaded to your server?",
      a: "No. Conversion happens entirely in your browser. The file never leaves your device. We don't have a server that processes photos.",
    },
    {
      q: "What's the file size limit?",
      a: "There's no hard limit, but very large files (>100MB) may be slow on older devices. The browser will use available memory.",
    },
    {
      q: "Why is HEIC the default on iPhone?",
      a: "HEIC (High Efficiency Image Container) gives roughly half the file size of JPG at similar quality. Apple adopted it in iOS 11 (2017). The trade-off is that many older apps and Windows/Linux tools don't read HEIC natively.",
    },
    {
      q: "Will the EXIF data (date, location, camera info) be preserved?",
      a: "Currently, basic EXIF (date/time) is preserved. Full geotag preservation depends on the source file. If you need every metadata field, double-check the output in a tool like ExifTool.",
    },
    {
      q: "Can I convert multiple files at once?",
      a: "Yes — drop multiple .heic files into the upload area. Each is converted independently and downloaded as a zipped batch.",
    },
  ],
  lastUpdated: "2026-04-28",
  Component: HeicToJpgUI,
}
