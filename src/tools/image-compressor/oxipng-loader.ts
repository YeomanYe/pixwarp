"use client"

// `@jsquash/oxipng`'s default entry pulls in `optimise.js`, which dynamically
// imports the **multi-thread** codec (`codec/pkg-parallel/squoosh_oxipng.js`).
// That parallel codec contains a `new Worker(new URL('./workerHelpers.worker.js',
// import.meta.url))` (wasm-bindgen-rayon snippet) which silently deadlocks
// Turbopack 16.2.4 during `next build` while it tries to materialise the
// worker chunk subgraph.
//
// We never use multi-threading anyway — `optimise.js` only takes the MT path
// when `isWorker && hardwareConcurrency > 1 && wasm threads supported`, and
// our compressor runs on the main thread. So we bypass `optimise.js` entirely
// and import only the **single-thread** codec, then keep the wasm binary as
// a static asset under `public/wasm/` (same trick used for `imagequant`).
//
// Keep `public/wasm/squoosh_oxipng_bg.wasm` in sync with the version pinned
// in package.json:
//   cp -f node_modules/@jsquash/oxipng/codec/pkg/squoosh_oxipng_bg.wasm \
//         public/wasm/squoosh_oxipng_bg.wasm

import init, {
  optimise as oxipngOptimise,
  optimise_raw as oxipngOptimiseRaw,
} from "@jsquash/oxipng/codec/pkg/squoosh_oxipng.js"

export interface OxipngOptions {
  level?: number
  interlace?: boolean
  optimiseAlpha?: boolean
}

const defaults: Required<OxipngOptions> = {
  level: 2,
  interlace: false,
  optimiseAlpha: false,
}

let initPromise: Promise<unknown> | null = null

function ensureInit(): Promise<unknown> {
  if (!initPromise) {
    initPromise = init("/wasm/squoosh_oxipng_bg.wasm")
  }
  return initPromise
}

export async function optimise(
  data: ArrayBuffer | Uint8Array,
  options: OxipngOptions = {},
): Promise<ArrayBuffer> {
  const opts = { ...defaults, ...options }
  await ensureInit()
  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data)
  const out = oxipngOptimise(bytes, opts.level, opts.interlace, opts.optimiseAlpha)
  return out.buffer as ArrayBuffer
}

export async function optimiseImageData(
  imageData: ImageData,
  options: OxipngOptions = {},
): Promise<ArrayBuffer> {
  const opts = { ...defaults, ...options }
  await ensureInit()
  const out = oxipngOptimiseRaw(
    imageData.data,
    imageData.width,
    imageData.height,
    opts.level,
    opts.interlace,
    opts.optimiseAlpha,
  )
  return out.buffer as ArrayBuffer
}
