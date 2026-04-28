<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

Key things to watch for in Next.js 16 vs older docs:

- Use `proxy.js` (not `middleware.js`) for request rewriting / locale routing.
- `params` is **async** — `await params` in pages and route handlers.
- Tailwind CSS is v4 (CSS-first config via `@theme inline {}` in `globals.css`, no `tailwind.config.ts`).

<!-- END:nextjs-agent-rules -->

# PixWarp · Project Conventions

Browser-local media tools site. Each tool self-contained under `src/tools/<slug>/`, registered in `src/tools/registry.ts`.

## Architecture

- **Tool registry pattern**: each tool exports a `ToolManifest` from `manifest.ts` plus a React component from `ui.tsx`.
- **Dynamic route** `app/tools/[slug]/page.tsx` renders any registered tool through `<ToolShell>`.
- **No SSR for tool UI** — tools that touch browser APIs (Worker, FileReader, WebAssembly) use `dynamic(() => ..., { ssr: false })`.
- **Local processing only** — never POST user files to a server. The whole brand is "no upload".

## Adding a new tool

1. Create `src/tools/<slug>/manifest.ts` (see `heic-to-jpg/manifest.ts` as reference).
2. Create `src/tools/<slug>/ui.tsx` exporting a React component (often `dynamic` ssr:false).
3. Register in `src/tools/registry.ts`.
4. SEO metadata, sitemap entry, related tools cross-link are auto-generated.

## Style conventions

- Tailwind v4 + custom CSS variables in `globals.css` for theme tokens.
- Brand accent: `#F97316` (orange). Use `var(--accent)` not literal hex.
- Don't add a per-tool design — keep the shared shell + 80% consistency. See `docs/design.md`.

## Forbidden

- ❌ Uploading user files to a server (breaks the brand promise).
- ❌ Adding `if (PREVIEW_MODE)` style env branches inside real components.
- ❌ Pre-installing dependencies users can opt into via dynamic import (keeps bundle slim).
- ❌ Per-tool independent design systems (maintenance hell — see design doc).

## Commit conventions

Conventional commits enforced by commitlint:

- `feat(tools): add <slug> tool`
- `fix(tools/<slug>): ...`
- `chore: ...`
- `docs: ...`

Husky + lint-staged auto-format and lint pre-commit.
