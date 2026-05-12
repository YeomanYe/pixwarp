"use client"

import { createImageFormatConverter } from "../shared/ImageFormatConverter"

export const WebpToJpgUI = createImageFormatConverter({
  toolSlug: "webp-to-jpg",
  intro:
    "Convert WebP images into widely compatible JPG files for uploads, email, CMS forms, and older image editors. Transparent areas become white.",
  dropTitle: "Drop WebP images here",
  dropDescription: "or click to browse - multiple WebP files supported, processed locally",
  accept: ".webp,image/webp",
  inputLabel: "WebP source",
  outputLabel: "JPG output",
  outputMime: "image/jpeg",
  outputExt: "jpg",
  defaultQuality: 0.86,
  fillBackground: "#ffffff",
  filterFile: (file) => file.type === "image/webp" || file.name.toLowerCase().endsWith(".webp"),
  noFileError: "No .webp file found.",
})
