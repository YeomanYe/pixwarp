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

export default function plopConfig(plop) {
  // Safely escape user input as a JS/TS string literal (handles &, ", \, newlines, etc.).
  // Use {{json field}} in templates instead of "{{field}}" to prevent Handlebars
  // HTML-escaping and to keep TS strings well-formed for any input.
  plop.setHelper("json", (v) => JSON.stringify(v ?? ""))

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

  plop.setGenerator("format", {
    description: "Scaffold a new file format under src/formats/<slug>",
    prompts: [
      { type: "input", name: "slug", message: "Slug (lowercase, used in URL):" },
      { type: "input", name: "name", message: "Display name (e.g. HEIC):" },
      {
        type: "input",
        name: "fullName",
        message: "Full name (e.g. High Efficiency Image Container):",
      },
      { type: "list", name: "category", message: "Category:", choices: FORMAT_CATEGORIES },
      {
        type: "input",
        name: "year",
        message: "Year first released:",
        default: String(new Date().getFullYear()),
      },
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
