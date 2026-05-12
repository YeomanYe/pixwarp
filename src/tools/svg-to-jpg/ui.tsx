"use client"

import { createImageFormatConverter } from "../shared/ImageFormatConverter"

export const SvgToJpgUI = createImageFormatConverter({
  toolSlug: "svg-to-jpg",
  intro:
    "Render SVG icons, logos, and diagrams into JPG files for upload forms, emails, slides, and preview images.",
  dropTitle: "Drop SVG files here",
  dropDescription: "or click to browse - multiple SVG files supported, rendered locally",
  accept: ".svg,image/svg+xml",
  inputLabel: "SVG source",
  outputLabel: "JPG output",
  outputMime: "image/jpeg",
  outputExt: "jpg",
  defaultQuality: 0.9,
  fillBackground: "#ffffff",
  filterFile: (file) => file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg"),
  noFileError: "No .svg file found.",
})
