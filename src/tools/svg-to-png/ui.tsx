"use client"

import { createImageFormatConverter } from "../shared/ImageFormatConverter"

export const SvgToPngUI = createImageFormatConverter({
  toolSlug: "svg-to-png",
  intro:
    "Render SVG icons, logos, and diagrams into PNG files for apps, slides, CMS uploads, and social images.",
  dropTitle: "Drop SVG files here",
  dropDescription: "or click to browse — multiple SVG files supported, rendered locally",
  accept: ".svg,image/svg+xml",
  inputLabel: "SVG source",
  outputLabel: "PNG output",
  outputMime: "image/png",
  outputExt: "png",
  filterFile: (file) => file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg"),
  noFileError: "No .svg file found.",
})
