"use client"

import { createImageFormatConverter } from "../shared/ImageFormatConverter"

export const BmpToJpgUI = createImageFormatConverter({
  toolSlug: "bmp-to-jpg",
  intro:
    "Convert BMP and DIB bitmap images into smaller JPG files for uploads, email, websites, and everyday sharing.",
  dropTitle: "Drop BMP images here",
  dropDescription: "or click to browse - multiple BMP files supported, processed locally",
  accept: ".bmp,.dib,image/bmp",
  inputLabel: "BMP source",
  outputLabel: "JPG output",
  outputMime: "image/jpeg",
  outputExt: "jpg",
  defaultQuality: 0.9,
  fillBackground: "#ffffff",
  filterFile: (file) => file.type === "image/bmp" || /\.(bmp|dib)$/i.test(file.name.toLowerCase()),
  noFileError: "No .bmp or .dib file found.",
})
