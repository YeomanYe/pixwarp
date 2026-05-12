"use client"

import { createImageFormatConverter } from "../shared/ImageFormatConverter"

export const AvifToPngUI = createImageFormatConverter({
  toolSlug: "avif-to-png",
  intro:
    "Convert AVIF images into PNG files for design tools, transparent assets, and compatibility-focused workflows.",
  dropTitle: "Drop AVIF images here",
  dropDescription: "or click to browse — multiple AVIF files supported, processed locally",
  accept: ".avif,image/avif",
  inputLabel: "AVIF source",
  outputLabel: "PNG output",
  outputMime: "image/png",
  outputExt: "png",
  filterFile: (file) => file.type === "image/avif" || file.name.toLowerCase().endsWith(".avif"),
  noFileError: "No .avif file found.",
})
