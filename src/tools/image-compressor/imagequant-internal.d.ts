// Ambient declarations for the wasm-bindgen subpath we load directly
// (see imagequant-loader.ts). The package only ships types for its main
// entry, but the bg shim re-exports the same public classes.
declare module "imagequant/imagequant_bg.js" {
  export * from "imagequant"
  export const __wbg_set_wasm: (exports: WebAssembly.Exports) => void
}
