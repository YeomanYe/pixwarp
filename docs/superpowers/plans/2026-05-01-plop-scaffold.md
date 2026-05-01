# Plop Scaffold for Tools + Formats Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `pnpm new:tool` and `pnpm new:format` scaffolding commands that generate a new tool/format directory + auto-patch the corresponding `registry.ts`.

**Architecture:** Single Plop generator config (`plop.config.mjs` at repo root) with two generators ("tool" and "format"). Each generator prompts for the minimum required manifest fields, renders Handlebars templates into `src/tools/<slug>/` or `src/formats/<slug>/`, and uses Plop's `modify` action to inject an `import` line + array entry into the registry. No test framework in repo → smoke test by running each generator against a throwaway slug, verifying typecheck still passes, then deleting the throwaway.

**Tech Stack:** plop ^4 (CLI + node API), Handlebars (bundled), TypeScript (project), pnpm.

---

## File Structure

- `plop.config.mjs` — Plop entry, registers both generators (root level, picked up automatically by `plop` CLI)
- `scripts/templates/tool/manifest.ts.hbs` — tool manifest template
- `scripts/templates/tool/ui.tsx.hbs` — tool UI component template (dynamic-friendly)
- `scripts/templates/format/manifest.ts.hbs` — format manifest template
- `scripts/templates/format/ui.tsx.hbs` — format optional UI component template
- `scripts/README.md` — explains scaffolding intent + retire signal
- `package.json` — add plop devDep + `new:tool`, `new:format` scripts

Total: 6 new files + 1 modified.

---

### Task 1: Install Plop + add npm scripts

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install plop as devDependency**

Run:
```bash
pnpm add -D plop
```

Expected: `plop` appears in `package.json` `devDependencies`.

- [ ] **Step 2: Add scripts**

Edit `package.json` `scripts` to include:
```json
"new:tool": "plop tool",
"new:format": "plop format"
```

- [ ] **Step 3: Verify**

Run: `pnpm plop --help`
Expected: plop CLI usage printed (no error).

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore(scaffold): add plop devDep and new:tool/new:format scripts"
```

---

### Task 2: Tool generator templates

**Files:**
- Create: `scripts/templates/tool/manifest.ts.hbs`
- Create: `scripts/templates/tool/ui.tsx.hbs`

- [ ] **Step 1: Write tool manifest template**

Create `scripts/templates/tool/manifest.ts.hbs`:
```hbs
import type { ToolManifest } from "../types"
import { {{pascalCase slug}}UI } from "./ui"

export const manifest: ToolManifest = {
  slug: "{{slug}}",
  category: "{{category}}",
  name: "{{name}}",
  description: "{{description}}",
  keywords: [
    "{{slug}}",
  ],
  icon: "{{icon}}",
  related: [],
  markets: ["global"],
  faq: [],
  lastUpdated: "{{today}}",
  Component: {{pascalCase slug}}UI,
}
```

- [ ] **Step 2: Write tool UI template**

Create `scripts/templates/tool/ui.tsx.hbs`:
```hbs
"use client"

export function {{pascalCase slug}}UI() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">{{name}}</h2>
      <p className="mt-2 text-sm text-neutral-500">
        TODO: implement the {{name}} tool UI here.
      </p>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add scripts/templates/tool
git commit -m "chore(scaffold): add tool manifest + ui handlebars templates"
```

---

### Task 3: Format generator templates

**Files:**
- Create: `scripts/templates/format/manifest.ts.hbs`
- Create: `scripts/templates/format/ui.tsx.hbs`

- [ ] **Step 1: Write format manifest template**

Create `scripts/templates/format/manifest.ts.hbs`:
```hbs
import type { FormatManifest } from "../types"

export const manifest: FormatManifest = {
  slug: "{{slug}}",
  category: "{{category}}",
  name: "{{name}}",
  fullName: "{{fullName}}",
  year: {{year}},
  extensions: ["{{slug}}"],
  mimeTypes: [],
  standard: "",
  tagline: "{{tagline}}",
  description: "",
  pros: [],
  cons: [],
  comparison: [],
  support: {
    os: [],
    browsers: [],
    apps: [],
  },
  keywords: ["{{slug}}"],
  relatedTools: [],
  relatedFormats: [],
  faq: [],
  lastUpdated: "{{today}}",
}
```

- [ ] **Step 2: Write format UI placeholder template**

Create `scripts/templates/format/ui.tsx.hbs` (kept minimal — most formats won't need a custom widget; user deletes the file + the `Component` import if not needed):
```hbs
export function {{pascalCase slug}}Widget() {
  return (
    <div className="rounded border border-neutral-200 p-6">
      <p className="text-sm text-neutral-500">
        Optional interactive demo for {{name}} goes here. Delete this file if not needed.
      </p>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add scripts/templates/format
git commit -m "chore(scaffold): add format manifest + ui handlebars templates"
```

---

### Task 4: Plop generator config

**Files:**
- Create: `plop.config.mjs`

- [ ] **Step 1: Write the plop config**

Create `plop.config.mjs` at repo root:
```js
/**
 * Plop config for PixWarp scaffolds.
 *
 *   pnpm new:tool     → creates src/tools/<slug>/{manifest,ui} + patches registry
 *   pnpm new:format   → creates src/formats/<slug>/{manifest,ui} + patches registry
 *
 * Retire signal: when ≥ 80% of generated files need to be rewritten on first
 * commit, the template no longer matches reality — kill the generator.
 */

const today = new Date().toISOString().slice(0, 10)

const TOOL_CATEGORIES = [
  "video",
  "image",
  "screenshot",
  "svg",
  "creator",
  "audio",
  "pdf",
  "qr",
  "utility",
]

const FORMAT_CATEGORIES = ["image", "video", "audio", "document", "data", "archive", "font", "3d"]

export default function (plop) {
  // ---------- TOOL ----------
  plop.setGenerator("tool", {
    description: "Scaffold a new tool under src/tools/<slug>",
    prompts: [
      { type: "input", name: "slug", message: "Slug (kebab-case, used in URL):" },
      { type: "input", name: "name", message: "Display name:" },
      { type: "input", name: "description", message: "One-line SEO description:" },
      { type: "list", name: "category", message: "Category:", choices: TOOL_CATEGORIES },
      { type: "input", name: "icon", message: "Lucide icon name:", default: "wrench" },
    ],
    actions: [
      {
        type: "add",
        path: "src/tools/{{slug}}/manifest.ts",
        templateFile: "scripts/templates/tool/manifest.ts.hbs",
        data: { today },
      },
      {
        type: "add",
        path: "src/tools/{{slug}}/ui.tsx",
        templateFile: "scripts/templates/tool/ui.tsx.hbs",
      },
      {
        type: "modify",
        path: "src/tools/registry.ts",
        pattern: /(import { manifest as mp4ToGifManifest } from "\.\/mp4-to-gif\/manifest"\n)/,
        template:
          '$1import { manifest as {{camelCase slug}}Manifest } from "./{{slug}}/manifest"\n',
      },
      {
        type: "modify",
        path: "src/tools/registry.ts",
        pattern: /(  mp4ToGifManifest,\n)/,
        template: "$1  {{camelCase slug}}Manifest,\n",
      },
    ],
  })

  // ---------- FORMAT ----------
  plop.setGenerator("format", {
    description: "Scaffold a new file format under src/formats/<slug>",
    prompts: [
      { type: "input", name: "slug", message: "Slug (lowercase, used in URL):" },
      { type: "input", name: "name", message: "Display name (e.g. HEIC):" },
      { type: "input", name: "fullName", message: "Full name (e.g. High Efficiency Image Container):" },
      { type: "list", name: "category", message: "Category:", choices: FORMAT_CATEGORIES },
      { type: "input", name: "year", message: "Year first released:", default: String(new Date().getFullYear()) },
      { type: "input", name: "tagline", message: "One-line tagline:" },
      { type: "confirm", name: "withWidget", message: "Include optional UI widget?", default: false },
    ],
    actions: (data) => {
      const acts = [
        {
          type: "add",
          path: "src/formats/{{slug}}/manifest.ts",
          templateFile: "scripts/templates/format/manifest.ts.hbs",
          data: { today },
        },
        {
          type: "modify",
          path: "src/formats/registry.ts",
          pattern: /(import { manifest as webmManifest } from "\.\/webm\/manifest"\n)/,
          template:
            '$1import { manifest as {{camelCase slug}}Manifest } from "./{{slug}}/manifest"\n',
        },
        {
          type: "modify",
          path: "src/formats/registry.ts",
          pattern: /(\[heicManifest, webmManifest)(\])/,
          template: "$1, {{camelCase slug}}Manifest$2",
        },
      ]
      if (data.withWidget) {
        acts.push({
          type: "add",
          path: "src/formats/{{slug}}/ui.tsx",
          templateFile: "scripts/templates/format/ui.tsx.hbs",
        })
      }
      return acts
    },
  })
}
```

- [ ] **Step 2: Verify both generators load**

Run: `pnpm plop --help`
Expected: lists "tool" and "format" generators (no parse errors).

- [ ] **Step 3: Commit**

```bash
git add plop.config.mjs
git commit -m "chore(scaffold): add plop generators for tool and format"
```

---

### Task 5: Smoke test — generate + typecheck + clean up

This validates the whole pipeline end-to-end. Replaces TDD because there is no test framework (tracked as tech debt in the report).

- [ ] **Step 1: Generate a throwaway tool**

Run (non-interactively):
```bash
pnpm new:tool -- --slug=__smoke_tool --name="Smoke Tool" --description="smoke" --category=utility --icon=wrench
```

Expected: 2 files created under `src/tools/__smoke_tool/`, 2 lines added to `src/tools/registry.ts`.

- [ ] **Step 2: Generate a throwaway format**

Run:
```bash
pnpm new:format -- --slug=__smoke_format --name="Smoke" --fullName="Smoke Format" --category=data --year=2026 --tagline="smoke" --withWidget=false
```

Expected: 1 manifest file under `src/formats/__smoke_format/`, 2 lines added to `src/formats/registry.ts`.

- [ ] **Step 3: Typecheck passes**

Run: `pnpm typecheck`
Expected: exit 0, no errors.

- [ ] **Step 4: Build passes**

Run: `pnpm build`
Expected: exit 0, no errors.

- [ ] **Step 5: Clean up smoke artifacts**

```bash
rm -rf src/tools/__smoke_tool src/formats/__smoke_format
```
Then manually revert the two `registry.ts` edits (or `git checkout -- src/tools/registry.ts src/formats/registry.ts`).

- [ ] **Step 6: Verify clean tree**

Run: `git status --short`
Expected: only the legitimate scaffold files staged from earlier tasks; no `__smoke_*` artifacts remain.

- [ ] **Step 7: No commit needed for this task** (smoke artifacts removed).

---

### Task 6: Document scaffold + retire signal

**Files:**
- Create: `scripts/README.md`

- [ ] **Step 1: Write the README**

Create `scripts/README.md`:
```md
# Scaffolds

Plop generators that bootstrap consistent boilerplate for tools and file-format pages.

## Usage

```bash
pnpm new:tool      # → src/tools/<slug>/
pnpm new:format    # → src/formats/<slug>/
```

Both commands prompt for required manifest fields and auto-patch the corresponding `registry.ts`.

## Retire signal

These generators exist to enforce consistency while the codebase has < 20 tools / formats and the manifest schemas are still settling. **When you find yourself rewriting ≥ 80% of a generated file on the first commit, the template no longer matches reality** — delete the generator and the templates rather than letting them rot.

## Editing templates

Templates live in `scripts/templates/<generator>/`. They are Handlebars files (`.hbs`).
The generator config is `plop.config.mjs` at the repo root.

When you change a manifest type in `src/tools/types.ts` or `src/formats/types.ts`, update the matching template the same commit.
```

- [ ] **Step 2: Commit**

```bash
git add scripts/README.md
git commit -m "docs(scaffold): document plop generators and retire signal"
```

---

## Self-Review

**Spec coverage:**
- [x] `pnpm new:tool` command — Task 1 (script) + Task 4 (generator)
- [x] `pnpm new:format` command — Task 1 (script) + Task 4 (generator)
- [x] Templates produce manifest + ui matching existing shape — Tasks 2, 3
- [x] Auto-patch registry — Task 4 modify actions
- [x] Retire signal documented — Task 6
- [x] Smoke verification — Task 5

**Placeholder scan:** None. All code blocks are concrete.

**Type consistency:** Templates import `ToolManifest` from `../types` and use the `pascalCase slug` helper for the React component name (e.g. `HeicToJpgUI`), matching the existing `heic-to-jpg/manifest.ts` pattern. Format manifest fields exactly mirror `src/formats/types.ts`.

**Known fragility:** Task 4 registry modify uses a regex that anchors to the **last current** import (`mp4ToGifManifest` for tools, `webmManifest` for formats). If those tools/formats are ever removed, the regex stops matching → generator fails loudly with a clear message (Plop reports unmatched modify). Acceptable: failure mode is fix-it-when-you-see-it, not silent.
