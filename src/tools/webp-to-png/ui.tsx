"use client"

import { createImageFormatConverter } from "../shared/ImageFormatConverter"

export const WebpToPngUI = createImageFormatConverter({
  toolSlug: "webp-to-png",
  intro:
    "Convert WebP files into PNG for design tools, CMS uploads, and older apps. Everything runs with browser decoding and Canvas export.",
  dropTitle: "Drop WebP images here",
  dropDescription: "or click to browse - multiple WebP files supported, processed locally",
  accept: ".webp,image/webp",
  inputLabel: "WebP source",
  outputLabel: "PNG output",
  outputMime: "image/png",
  outputExt: "png",
  filterFile: (file) => file.type === "image/webp" || file.name.toLowerCase().endsWith(".webp"),
  noFileError: "No .webp file found.",
})
