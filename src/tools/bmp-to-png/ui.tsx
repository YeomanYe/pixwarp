"use client"

import { createImageFormatConverter } from "../shared/ImageFormatConverter"

export const BmpToPngUI = createImageFormatConverter({
  toolSlug: "bmp-to-png",
  intro:
    "Convert BMP and DIB bitmap images into PNG files for websites, design tools, and modern sharing workflows.",
  dropTitle: "Drop BMP images here",
  dropDescription: "or click to browse - multiple BMP files supported, processed locally",
  accept: ".bmp,.dib,image/bmp",
  inputLabel: "BMP source",
  outputLabel: "PNG output",
  outputMime: "image/png",
  outputExt: "png",
  filterFile: (file) => file.type === "image/bmp" || /\.(bmp|dib)$/i.test(file.name.toLowerCase()),
  noFileError: "No .bmp or .dib file found.",
})
