# Format Guide Authoring

This document defines how to add or revise a `src/formats/<slug>/` guide.
Format pages are not simple glossary entries. They should answer a real user question, show real
samples, and make the next action obvious.

## Audience

Write for users who just received an unfamiliar file and need to know:

- what the file is;
- whether they can open it;
- whether they should convert it;
- which common size, ratio, page, duration, or quality setting is appropriate.

Prioritize uncommon, confusing, or conversion-heavy formats. Common formats such as JPG, PNG, and
PDF are useful mainly as comparison targets or tool pages unless they answer a specific long-tail
question.

## Required Research

Do not write a format guide from memory alone.

Before creating or revising a guide:

1. Look up current sources on the web.
2. Prefer primary or authoritative references: standards bodies, browser docs, OS vendor docs,
   application vendor docs, codec/container specs, and official support pages.
3. Cross-check support claims against at least two sources when browser, OS, or app compatibility
   matters.
4. Use source material to verify release year, MIME types, extensions, compatibility, and practical
   limitations.
5. Do not invent compression ratios, quality claims, or support statements. If a claim is based on a
   local sample, say so in the UI copy.

Sample assets must also come from traceable online sources or from a documented generation process.
Use public-domain, CC0, permissively licensed, or self-generated assets. Keep the source URL or
generation note in a nearby README or code comment when the asset is not self-explanatory.

Do not reuse existing project samples for a new format guide. Each format must get its own freshly
researched online source assets, even if another format already has similar images, videos, audio,
documents, or archive fixtures. It is acceptable to convert a newly sourced asset into the target
format, but the source asset must be found specifically for that format and documented in that
format's attribution file.

## Page Structure

Each guide should include:

1. A `manifest.ts` with accurate metadata, SEO keywords, comparisons, support, FAQ, related tools,
   related formats, and `lastUpdated`.
2. A custom `ui.tsx` component when samples, previews, compatibility demos, size comparisons, or
   interactive explanations make the format easier to understand.
3. Links to relevant tools. A user who lands on `HEIC` should quickly find `HEIC to JPG`; a user who
   lands on `ICO` should quickly find favicon generation.
4. Plain-language comparison against formats the user already knows.

Avoid pages that are only text plus a table. If the format has a visual or audible result, the page
needs a preview.

## Sample And Preview Requirements

Every format guide should include visible proof whenever possible:

- Image formats: show rendered previews and downloadable original samples.
- Video formats: show a playable preview with a real poster/cover image plus file size, duration,
  codec/container notes, and dimensions. Do not ship a bare black player rectangle.
- Audio formats: show an audio player or waveform-style preview plus a cover image/card, bitrate,
  duration, sample rate, channel count, and size. Do not ship bare audio controls without a cover.
- Document formats: show page thumbnails, page size, page count, and a downloadable sample.
- Data/archive formats: show a structured preview such as a file tree, first rows, schema, or
  extracted metadata.
- Font formats: show live text rendering at several sizes and weights if supported.
- 3D formats: show a lightweight rendered preview or fallback thumbnails.

Sample previews must be visually meaningful. Do not use blank, nearly blank, pure solid-color, or
pure gradient assets as format samples. Transparent images must show a clear subject against the
checkerboard; animated samples must have a visible first frame and a visible motion state in normal
page screenshots. If a technically valid file looks empty in the page, reject it and source a better
asset.

If a browser cannot render the original format directly, show a fallback preview in a browser-safe
format and clearly label the downloadable original.

## Common Size Coverage

Support the sizes or shapes users most often need to judge. Choose the relevant set for the format:

### Image And Visual Formats

Cover the common display ratios:

- `16:9` landscape, such as `1440 x 810` or `1920 x 1080`
- `1:1` square, such as `1080 x 1080`
- `4:5` portrait feed, such as `1080 x 1350`
- `3:4` portrait, such as `720 x 960`
- `2:3` vertical poster or pin, such as `1000 x 1500`
- `9:16` story or phone, such as `1080 x 1920`

For icon formats, include common icon sizes:

- `16 x 16`
- `32 x 32`
- `48 x 48`
- `64 x 64`
- `128 x 128`
- `256 x 256`
- `512 x 512` when the format or platform supports it

### Video Formats

Cover practical platform sizes:

- `16:9` at `1920 x 1080` or `1280 x 720`
- `9:16` at `1080 x 1920`
- `1:1` at `1080 x 1080`
- `4:5` at `1080 x 1350`

Each video sample must include a cover image:

- use a real `poster` frame for playable `<video>` samples;
- use a traceable online still, public-domain frame, or generated cover when the original format
  cannot play directly in the browser;
- keep the cover visually representative of the sample, not a generic gradient or empty placeholder;
- document the cover source or generation note beside the sample attribution.

Include duration, codec/container notes, and a real file size for each sample.

### Audio Formats

Cover common listening/export settings:

- short voice sample;
- music sample;
- at least two bitrates or quality settings when the format is lossy;
- duration, bitrate, sample rate, channel count, and file size.

Each audio sample must include a cover image or cover card:

- prefer real album-art-style, podcast-art-style, waveform-poster, or source-specific artwork;
- if generated, make it clearly tied to the sample type, such as voice, music, field recording, or
  lossless archive;
- keep the cover visible next to the player on desktop and above the player on mobile;
- document the cover source or generation note beside the sample attribution.

### Document Formats

Cover common page shapes:

- A4 portrait;
- US Letter portrait;
- one multi-page sample;
- one image-heavy or scan-like sample when the format is often used that way.

## Implementation Checklist

When adding `src/formats/<slug>/`:

1. Create `manifest.ts` and `ui.tsx`.
2. Register the manifest in `src/formats/registry.ts`.
3. Put samples under `public/samples/<slug>/`.
4. Make the preview responsive on mobile and desktop.
5. Keep generated previews small enough for fast loading.
6. Use lazy or fallback rendering for heavy media.
7. Run `pnpm typecheck`, `pnpm lint`, and `pnpm build`.
8. Open the format page locally and visually confirm that previews render.

## Quality Bar

A format guide is ready when:

- the user can understand the format without knowing codec or standards jargon;
- compatibility claims are sourced and current;
- common sizes or settings are represented;
- at least one real preview is visible;
- related tools are one click away;
- the page works on mobile without horizontal overflow;
- sample files are legal to ship and small enough for production.
