import { FormatSampleGallery, type FormatGuideSample } from "../shared/sample-gallery"

const SAMPLES: FormatGuideSample[] = [
  {
    title: "Coffee Icon",
    capability: "Multi-size icon",
    dimensions: "128, 64, 48, 32, 16",
    fileSize: 56_753,
    url: "/samples/ico/coffee-128x128.ico",
    download: "coffee-128x128.ico",
    source: "ConvertICO sample files",
    sourceUrl: "https://convertico.com/samples/ico/",
    license: "Free sample file",
    shape: "icon",
    note: "An ICO container with several embedded icon sizes.",
  },
  {
    title: "Colors Icon",
    capability: "64 px icon",
    dimensions: "64, 32, 16",
    fileSize: 7_072,
    url: "/samples/ico/colors-64x64.ico",
    download: "colors-64x64.ico",
    source: "ConvertICO sample files",
    sourceUrl: "https://convertico.com/samples/ico/",
    license: "Free sample file",
    shape: "icon",
    note: "A smaller favicon-style ICO sample.",
  },
  {
    title: "Funky Cluck",
    capability: "48 px icon",
    dimensions: "48, 40, 32, 24, 20, 16",
    fileSize: 26_054,
    url: "/samples/ico/funky-cluck-48x48.ico",
    download: "funky-cluck-48x48.ico",
    source: "ConvertICO sample files",
    sourceUrl: "https://convertico.com/samples/ico/",
    license: "Free sample file",
    shape: "icon",
    note: "A classic Windows icon container with several small bitmap entries.",
  },
  {
    title: "ICO Sample",
    capability: "256 px icon",
    dimensions: "256, 128, 64, 48, 32, 24, 16",
    fileSize: 118_682,
    url: "/samples/ico/ico-sample.ico",
    download: "ico-sample.ico",
    source: "ConvertICO sample files",
    sourceUrl: "https://convertico.com/samples/ico/",
    license: "Free sample file",
    shape: "icon",
    note: "A larger ICO container that includes a 256 px PNG-compressed entry.",
  },
]

export function IcoSamplesWidget() {
  return (
    <FormatSampleGallery
      intro="Four real ICO files downloaded from an external sample library. ICO is a container format: one .ico file often stores multiple sizes so browsers and operating systems can pick the best icon."
      samples={SAMPLES}
    />
  )
}
