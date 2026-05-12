"use client"

import encode, { init } from "@jsquash/jpeg/encode"

let initPromise: Promise<unknown> | null = null

function ensureInit(): Promise<unknown> {
  if (!initPromise) {
    initPromise = init({
      locateFile: (fileName: string) =>
        fileName.endsWith(".wasm") ? "/wasm/mozjpeg_enc.wasm" : fileName,
    })
  }
  return initPromise
}

export async function encodeJpeg(imageData: ImageData, quality: number): Promise<ArrayBuffer> {
  await ensureInit()
  return encode(imageData, {
    quality,
    progressive: true,
    optimize_coding: true,
    auto_subsample: true,
  })
}
