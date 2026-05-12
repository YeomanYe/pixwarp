import { FormatSampleGallery, type FormatGuideSample } from "../shared/sample-gallery"

const SAMPLES: FormatGuideSample[] = [
  {
    title: "Public Domain Symbol",
    capability: "Icon",
    dimensions: "256 x 256",
    fileSize: 1_222,
    url: "/samples/svg/public-domain-symbol-256.svg",
    download: "public-domain-symbol-256.svg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Public-domain-symbol.svg",
    license: "Public domain",
    shape: "icon",
    note: "A tiny vector icon that stays sharp at any display scale.",
  },
  {
    title: "Public Domain Map Logo",
    capability: "Logo",
    dimensions: "500 x 500",
    fileSize: 3_351,
    url: "/samples/svg/public-domain-map-logo-500.svg",
    download: "public-domain-map-logo-500.svg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Public_Domain_Map_logo.svg",
    license: "Public domain",
    shape: "square",
    note: "A medium-size vector logo that remains sharp at any rendered size.",
  },
  {
    title: "No Rights Reserved Mark",
    capability: "Wide badge",
    dimensions: "749 x 259",
    fileSize: 9_796,
    url: "/samples/svg/pd-no-rights-749x259.svg",
    download: "pd-no-rights-749x259.svg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:PD_no_rights_reserved_new.svg",
    license: "Public domain",
    shape: "wide",
    note: "A wider vector badge sample with text and simple geometry.",
  },
]

export function SvgSamplesWidget() {
  return (
    <FormatSampleGallery
      intro="Three externally sourced SVG files stored locally: a small icon, a square logo, and a wide badge. SVG renders natively in the browser and can also be downloaded as the original vector file."
      samples={SAMPLES}
    />
  )
}
