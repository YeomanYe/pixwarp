import { FormatSampleGallery, type FormatGuideSample } from "../shared/sample-gallery"

const SAMPLES: FormatGuideSample[] = [
  {
    title: "Hato",
    capability: "16:9",
    dimensions: "1920 x 1080",
    fileSize: 253_020,
    url: "/samples/avif/hato-1920x1080.avif",
    download: "hato-1920x1080.avif",
    source: "link-u avif-sample-images",
    sourceUrl: "https://github.com/link-u/avif-sample-images",
    license: "CC BY-SA 4.0",
    shape: "wide",
    aspectRatio: "1920 / 1080",
    note: "A wide AVIF photograph cropped and resized to a full-HD canvas.",
  },
  {
    title: "Fox",
    capability: "4:5",
    dimensions: "1080 x 1350",
    fileSize: 122_795,
    url: "/samples/avif/fox-1080x1350.avif",
    download: "fox-1080x1350.avif",
    source: "link-u avif-sample-images",
    sourceUrl: "https://github.com/link-u/avif-sample-images",
    license: "CC BY-SA 4.0",
    shape: "portrait",
    aspectRatio: "1080 / 1350",
    note: "A photographic AVIF sample prepared for the common 4:5 feed ratio.",
  },
  {
    title: "Kimono",
    capability: "9:16",
    dimensions: "1080 x 1920",
    fileSize: 233_483,
    url: "/samples/avif/kimono-1080x1920.avif",
    download: "kimono-1080x1920.avif",
    source: "link-u avif-sample-images",
    sourceUrl: "https://github.com/link-u/avif-sample-images",
    license: "CC BY-SA 4.0",
    shape: "portrait",
    aspectRatio: "1080 / 1920",
    note: "A vertical AVIF sample prepared for phone-first previews.",
  },
  {
    title: "Plum Blossom",
    capability: "1:1 + alpha",
    dimensions: "1080 x 1080",
    fileSize: 20_323,
    url: "/samples/avif/plum-blossom-1080x1080-alpha.avif",
    download: "plum-blossom-1080x1080-alpha.avif",
    source: "link-u avif-sample-images",
    sourceUrl: "https://github.com/link-u/avif-sample-images",
    license: "CC BY-SA 4.0",
    shape: "square",
    aspectRatio: "1080 / 1080",
    note: "A square AVIF asset with an alpha channel, resized to a common preview size.",
    checkerboard: true,
  },
]

export function AvifSamplesWidget() {
  return (
    <FormatSampleGallery
      intro="Four real AVIF files from an upstream sample suite, converted to common preview sizes: 16:9, 4:5, 9:16, and 1:1 with alpha. The browser renders each file directly when AVIF is supported."
      samples={SAMPLES}
    />
  )
}
