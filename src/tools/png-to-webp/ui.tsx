"use client"

import { createImageFormatConverter } from "../shared/ImageFormatConverter"

export const PngToWebpUI = createImageFormatConverter({
  toolSlug: "png-to-webp",
  intro:
    "Convert PNG screenshots and artwork into WebP for smaller web images while keeping transparency when supported.",
  dropTitle: "Drop PNG images here",
  dropDescription: "or click to browse — multiple PNG files supported, processed locally",
  accept: ".png,image/png",
  inputLabel: "PNG source",
  outputLabel: "WebP output",
  outputMime: "image/webp",
  outputExt: "webp",
  defaultQuality: 0.82,
  filterFile: (file) => file.type === "image/png" || file.name.toLowerCase().endsWith(".png"),
  noFileError: "No .png file found.",
})
