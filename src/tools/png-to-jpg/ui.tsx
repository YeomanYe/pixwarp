"use client"

import { createImageFormatConverter } from "../shared/ImageFormatConverter"

export const PngToJpgUI = createImageFormatConverter({
  toolSlug: "png-to-jpg",
  intro:
    "Convert PNG screenshots, exports, and transparent artwork into smaller JPG files without uploading them.",
  dropTitle: "Drop PNG images here",
  dropDescription: "or click to browse — multiple PNG files supported, processed locally",
  accept: ".png,image/png",
  inputLabel: "PNG source",
  outputLabel: "JPG output",
  outputMime: "image/jpeg",
  outputExt: "jpg",
  defaultQuality: 0.9,
  fillBackground: "#ffffff",
  filterFile: (file) => file.type === "image/png" || file.name.toLowerCase().endsWith(".png"),
  noFileError: "No .png file found.",
})
