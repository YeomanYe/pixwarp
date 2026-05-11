"use client"

import { createImageFormatConverter } from "../shared/ImageFormatConverter"

export const JpgToWebpUI = createImageFormatConverter({
  toolSlug: "jpg-to-webp",
  intro:
    "Convert JPG photos into compact WebP files for faster websites, blogs, and product pages.",
  dropTitle: "Drop JPG images here",
  dropDescription: "or click to browse — multiple JPG files supported, processed locally",
  accept: ".jpg,.jpeg,image/jpeg",
  inputLabel: "JPG source",
  outputLabel: "WebP output",
  outputMime: "image/webp",
  outputExt: "webp",
  defaultQuality: 0.82,
  filterFile: (file) => file.type === "image/jpeg" || /\.(jpe?g)$/i.test(file.name.toLowerCase()),
  noFileError: "No .jpg or .jpeg file found.",
})
