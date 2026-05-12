"use client"

import { createImageFormatConverter } from "../shared/ImageFormatConverter"

export const SvgToWebpUI = createImageFormatConverter({
  toolSlug: "svg-to-webp",
  intro:
    "Render SVG icons, logos, and diagrams into compact WebP files for websites, blogs, CMS uploads, and preview images.",
  dropTitle: "Drop SVG files here",
  dropDescription: "or click to browse - multiple SVG files supported, rendered locally",
  accept: ".svg,image/svg+xml",
  inputLabel: "SVG source",
  outputLabel: "WebP output",
  outputMime: "image/webp",
  outputExt: "webp",
  defaultQuality: 0.86,
  filterFile: (file) => file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg"),
  noFileError: "No .svg file found.",
})
