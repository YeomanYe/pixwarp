"use client"

import { createImageFormatConverter } from "../shared/ImageFormatConverter"

export const IcoToPngUI = createImageFormatConverter({
  toolSlug: "ico-to-png",
  intro:
    "Convert ICO favicon and Windows icon files into PNG images for previews, design tools, and website assets.",
  dropTitle: "Drop ICO files here",
  dropDescription: "or click to browse - multiple ICO files supported, processed locally",
  accept: ".ico,image/x-icon,image/vnd.microsoft.icon",
  inputLabel: "ICO source",
  outputLabel: "PNG output",
  outputMime: "image/png",
  outputExt: "png",
  filterFile: (file) =>
    file.type === "image/x-icon" ||
    file.type === "image/vnd.microsoft.icon" ||
    file.name.toLowerCase().endsWith(".ico"),
  noFileError: "No .ico file found.",
})
