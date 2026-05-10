# Format Guides Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add AVIF, SVG, TIFF, and ICO format guides using externally sourced local samples with preview and download cards.

**Architecture:** Reuse one shared sample gallery component for all new guide pages. Each format gets a manifest, a small UI wrapper, local sample files under `public/samples/<format>/`, and an attribution manifest.

**Tech Stack:** Next.js static format manifests, React server components, local static assets, TypeScript, Tailwind classes.

---

### Task 1: Shared Sample Gallery

**Files:**

- Create: `src/formats/shared/sample-gallery.tsx`

- [ ] Add a `FormatSampleGallery` component that accepts sample metadata, renders preview cards, displays dimensions/file size/license/source, and links to the real downloadable file.

### Task 2: Add Format Manifests

**Files:**

- Create: `src/formats/avif/manifest.ts`
- Create: `src/formats/avif/ui.tsx`
- Create: `src/formats/svg/manifest.ts`
- Create: `src/formats/svg/ui.tsx`
- Create: `src/formats/tiff/manifest.ts`
- Create: `src/formats/tiff/ui.tsx`
- Create: `src/formats/ico/manifest.ts`
- Create: `src/formats/ico/ui.tsx`
- Modify: `src/formats/registry.ts`

- [ ] Register AVIF, SVG, TIFF, and ICO in the format registry.
- [ ] Keep `comparison: []` so these pages focus on file capabilities and real samples.
- [ ] Link existing related tools where available.

### Task 3: Add Local Samples

**Files:**

- Create: `public/samples/avif/*`
- Create: `public/samples/svg/*`
- Create: `public/samples/tiff/*`
- Create: `public/samples/ico/*`

- [ ] Store real externally sourced files locally.
- [ ] Include `attribution.json` for every new format sample directory.
- [ ] Preserve downloaded file dimensions and avoid manual cropping/resizing.

### Task 4: Verify

- [ ] Run `pnpm typecheck`.
- [ ] Run `pnpm lint`.
- [ ] Run `pnpm build`.
- [ ] Start local dev server and screenshot the new format pages on desktop.
- [ ] Send screenshots through `cc-connect`.
