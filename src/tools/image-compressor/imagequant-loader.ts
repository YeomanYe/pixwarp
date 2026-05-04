"use client"

// `imagequant`'s default entry (`imagequant.js`) does a top-level
// `import * as wasm from "./imagequant_bg.wasm"`, which Webpack 5 rejects without
// an experimental flag and which silently deadlocks Turbopack during `next build`.
//
// To sidestep that, we import the wasm-bindgen JS shim directly (it has no
// static imports) and instantiate the WASM module ourselves from a static asset
// served out of `public/wasm/`. Keep `public/wasm/imagequant_bg.wasm` in sync
// with the version pinned in package.json.

import * as bg from "imagequant/imagequant_bg.js"

export type ImagequantModule = typeof bg

let initPromise: Promise<ImagequantModule> | null = null

export function loadImagequant(): Promise<ImagequantModule> {
  if (!initPromise) {
    initPromise = (async () => {
      const response = await fetch("/wasm/imagequant_bg.wasm")
      if (!response.ok) {
        throw new Error(`Failed to load imagequant wasm: ${response.status}`)
      }
      const wasmModule = await WebAssembly.instantiateStreaming(response, {
        "./imagequant_bg.js": bg as unknown as WebAssembly.ModuleImports,
      })
      ;(bg as unknown as { __wbg_set_wasm: (m: WebAssembly.Exports) => void }).__wbg_set_wasm(
        wasmModule.instance.exports,
      )
      return bg
    })()
  }
  return initPromise
}
