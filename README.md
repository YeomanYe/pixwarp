# PixWarp

> Browser-local media tools for creators. No upload, no signup, no watermark.

## What is it

PixWarp is a tool site focused on **media processing that runs entirely in your browser**.
No file ever leaves your device — everything is done with WebAssembly, Canvas, and Web APIs.

Unique selling points:

- 🔒 **100% local** — no upload, no server, no telemetry
- 🪶 **No signup** — open the URL, drop your file, get the result
- 🌐 **Multi-format** — convert, compress, transform across formats
- 📱 **Mobile-friendly** — built mobile-first, works on phones
- 🇨🇳🇺🇸 **Bilingual** — English + 中文 (i18n coming next iteration)

## Tech stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn-style design tokens
- pnpm + ESLint + Prettier + Husky + commitlint
- Deployed on Vercel

## Local development

Requires Node 20+ and pnpm 9+.

```bash
pnpm install
pnpm dev
# open http://localhost:3000
```

### Useful scripts

```bash
pnpm dev            # start dev server
pnpm build          # production build
pnpm start          # run production build
pnpm lint           # ESLint check
pnpm lint:fix       # auto-fix lint
pnpm format         # Prettier format src
pnpm format:check   # Prettier check (no write)
pnpm typecheck      # tsc --noEmit
```

## Project structure

```
src/
├── app/                     Next.js App Router
│   ├── layout.tsx           Root layout (Nav + Footer)
│   ├── page.tsx             Home (tools index)
│   ├── tools/[slug]/        Dynamic tool route
│   ├── format/[slug]/       Dynamic format guide route
│   ├── sitemap.ts           Auto-generated sitemap
│   └── robots.ts            robots.txt
├── components/              Shared UI
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── Logo.tsx             Placeholder PW monogram
│   └── tool-shell/
│       └── ToolShell.tsx    Wrapper for every tool page
├── tools/                   Tool registry — each tool self-contained
│   ├── types.ts             ToolManifest interface
│   ├── registry.ts          Aggregates all tool manifests
│   └── heic-to-jpg/
│       ├── manifest.ts      Metadata, SEO, FAQ
│       └── ui.tsx           React component
└── lib/                     Shared helpers (empty for now)
```

## Add a new tool

1. Create `src/tools/<slug>/manifest.ts` exporting a `ToolManifest`
2. Create `src/tools/<slug>/ui.tsx` exporting a React component
3. Register it in `src/tools/registry.ts` (import + add to `tools` array)

That's it — the dynamic route `/tools/<slug>` and SEO meta are auto-generated.

See `src/tools/heic-to-jpg/` for a working example.

## Deployment

Push to `main` → Vercel auto-deploys.

Set this env in Vercel:

```
NEXT_PUBLIC_SITE_URL=https://pixwarp.app
```

## License

MIT

## Author

Tony Ye — [@YeomanYe](https://github.com/YeomanYe)
