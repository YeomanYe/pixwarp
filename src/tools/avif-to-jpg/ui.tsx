"use client"

import { createImageFormatConverter } from "../shared/ImageFormatConverter"

export const AvifToJpgUI = createImageFormatConverter({
  toolSlug: "avif-to-jpg",
  intro:
    "Convert modern AVIF images into widely compatible JPG files for uploads, email, CMS forms, and older image editors.",
  dropTitle: "Drop AVIF images here",
  dropDescription: "or click to browse — multiple AVIF files supported, processed locally",
  accept: ".avif,image/avif",
  inputLabel: "AVIF source",
  outputLabel: "JPG output",
  outputMime: "image/jpeg",
  outputExt: "jpg",
  defaultQuality: 0.9,
  fillBackground: "#ffffff",
  filterFile: (file) => file.type === "image/avif" || file.name.toLowerCase().endsWith(".avif"),
  noFileError: "No .avif file found.",
})
