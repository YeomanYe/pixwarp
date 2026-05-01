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

Use the scaffold:

```bash
pnpm new:tool <slug> "<Display Name>" "<one-line description>" <category> <icon>
```

Then:

1. Flesh out `src/tools/<slug>/manifest.ts` with `longDescription`, real `keywords`, `faq`, `related`.
2. Implement the UI in `src/tools/<slug>/ui.tsx`. Use `dynamic(() => Promise.resolve(Inner), { ssr: false })` if it touches browser-only APIs.
3. Add the slug to `ToolSlug` in `src/lib/analytics.ts` so events typecheck.
4. Use `track("tool_open" | "file_dropped" | "convert_success", ...)` and `trackError(slug, err)` from `@/lib/analytics`. They fan out to **both** Vercel Web Analytics and PostHog automatically — never call PostHog or Vercel directly.

SEO metadata, sitemap entry, registry registration, and related-tools cross-link are auto-generated.

## Analytics convention

- Single source: `@/lib/analytics`. `track()` fan-outs to Vercel + PostHog.
- PostHog is proxied through `/ingest` (see `next.config.ts`) to bypass ad-blockers and CN networks.
- No PostHog key in env → tool keeps working, only Vercel events are sent (no errors thrown).
- Add new events by extending `EventMap` in `src/lib/analytics.ts` — keep names snake_case for cross-platform consistency.

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
