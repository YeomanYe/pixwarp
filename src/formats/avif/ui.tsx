import { FormatSampleGallery, type FormatGuideSample } from "../shared/sample-gallery"

const SAMPLES: FormatGuideSample[] = [
  {
    title: "Hato",
    capability: "High-res photo",
    dimensions: "3082 x 2048",
    fileSize: 259_104,
    url: "/samples/avif/hato-3082x2048.avif",
    download: "hato-3082x2048.avif",
    source: "link-u avif-sample-images",
    sourceUrl: "https://github.com/link-u/avif-sample-images",
    license: "CC BY-SA 4.0",
    shape: "wide",
    note: "A large AVIF photograph encoded from the upstream sample suite.",
  },
  {
    title: "Fox",
    capability: "Landscape",
    dimensions: "1204 x 800",
    fileSize: 80_743,
    url: "/samples/avif/fox-1204x800.avif",
    download: "fox-1204x800.avif",
    source: "link-u avif-sample-images",
    sourceUrl: "https://github.com/link-u/avif-sample-images",
    license: "CC BY-SA 4.0",
    shape: "wide",
    note: "A common web image size used by the AVIF conformance sample set.",
  },
  {
    title: "Kimono",
    capability: "Portrait",
    dimensions: "722 x 1024",
    fileSize: 85_445,
    url: "/samples/avif/kimono-722x1024.avif",
    download: "kimono-722x1024.avif",
    source: "link-u avif-sample-images",
    sourceUrl: "https://github.com/link-u/avif-sample-images",
    license: "CC BY-SA 4.0",
    shape: "portrait",
    note: "A portrait AVIF sample used for orientation and transform tests.",
  },
  {
    title: "Plum Blossom",
    capability: "Alpha channel",
    dimensions: "2048 x 2048",
    fileSize: 35_946,
    url: "/samples/avif/plum-blossom-2048x2048-alpha.avif",
    download: "plum-blossom-2048x2048-alpha.avif",
    source: "link-u avif-sample-images",
    sourceUrl: "https://github.com/link-u/avif-sample-images",
    license: "CC BY-SA 4.0",
    shape: "square",
    note: "A square AVIF asset with an alpha channel.",
    checkerboard: true,
  },
]

export function AvifSamplesWidget() {
  return (
    <FormatSampleGallery
      intro="Four real AVIF files from an upstream sample suite, stored locally at their original sample dimensions. The browser renders each file directly when AVIF is supported."
      samples={SAMPLES}
      attributionPath="public/samples/avif/attribution.json"
    />
  )
}
