"use client"

import { createImageFormatConverter } from "../shared/ImageFormatConverter"

export const JpgToPngUI = createImageFormatConverter({
  toolSlug: "jpg-to-png",
  intro:
    "Convert JPG photos and exports into PNG when you need a lossless, widely compatible image file.",
  dropTitle: "Drop JPG images here",
  dropDescription: "or click to browse — multiple JPG files supported, processed locally",
  accept: ".jpg,.jpeg,image/jpeg",
  inputLabel: "JPG source",
  outputLabel: "PNG output",
  outputMime: "image/png",
  outputExt: "png",
  filterFile: (file) => file.type === "image/jpeg" || /\.(jpe?g)$/i.test(file.name.toLowerCase()),
  noFileError: "No .jpg or .jpeg file found.",
})
