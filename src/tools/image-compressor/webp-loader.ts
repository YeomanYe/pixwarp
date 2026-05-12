"use client"

import encode, { init } from "@jsquash/webp/encode"

let initPromise: Promise<unknown> | null = null

function ensureInit(): Promise<unknown> {
  if (!initPromise) {
    initPromise = init({
      locateFile: (fileName: string) => {
        if (fileName === "webp_enc_simd.wasm") return "/wasm/webp_enc_simd.wasm"
        if (fileName === "webp_enc.wasm") return "/wasm/webp_enc.wasm"
        return fileName
      },
    })
  }
  return initPromise
}

export async function encodeWebp(
  imageData: ImageData,
  quality: number,
  isLossless: boolean,
): Promise<ArrayBuffer> {
  await ensureInit()
  return encode(imageData, {
    quality,
    lossless: isLossless ? 1 : 0,
    method: 4,
    alpha_quality: 100,
    exact: isLossless ? 1 : 0,
  })
}
