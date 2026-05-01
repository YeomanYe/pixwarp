# Scaffolds

Plop generators that bootstrap consistent boilerplate for tools and file-format pages.

## Usage

```bash
pnpm new:tool      # → src/tools/<slug>/
pnpm new:format    # → src/formats/<slug>/
```

Both commands prompt for the required manifest fields and auto-patch the corresponding `registry.ts`.

You can also bypass prompts by passing positional args in prompt order:

```bash
pnpm new:tool my-slug "My Tool" "One-line description" image wrench
pnpm new:format flac FLAC "Free Lossless Audio Codec" audio 2001 "Lossless audio compression" false
```

## Retire signal

These generators exist to enforce consistency while the codebase has < ~20 tools / formats and the manifest schemas are still settling.

**When you find yourself rewriting ≥ 80% of a generated file on the first commit, the template no longer matches reality** — delete the generator and the templates rather than letting them rot.

## Editing templates

- Templates live in `scripts/templates/<generator>/` as Handlebars (`.hbs`) files.
- The generator config is `plopfile.mjs` at the repo root.
- When you change a manifest type in `src/tools/types.ts` or `src/formats/types.ts`, update the matching template in the same commit.

## Known fragility

The `modify` actions in `plopfile.mjs` anchor regex to the **last current** registry import (`mp4ToGifManifest` for tools, `webmManifest` for formats). If those entries are removed, the generator fails loudly on the next run — fix the anchor at that point.
