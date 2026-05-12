import { FormatSampleGallery, type FormatGuideSample } from "../shared/sample-gallery"

const SAMPLES: FormatGuideSample[] = [
  {
    title: "AB Aurigae Disk",
    capability: "1:1",
    dimensions: "1080 x 1080",
    fileSize: 3_502_966,
    url: "/samples/tiff/ab-aurigae-disk-1080x1080.tiff",
    download: "ab-aurigae-disk-1080x1080.tiff",
    previewUrl: "/samples/tiff/ab-aurigae-disk-1080x1080-preview.jpg",
    source: "NASA/ESA · Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:AB_Aurigae_disk_(Hubble_view)_(opo9921b).tiff",
    license: "Public domain",
    shape: "square",
    aspectRatio: "1080 / 1080",
    note: "A scientific TIFF sample resized to a common square preview size.",
    previewNote: "Chrome does not render TIFF directly, so this card uses a JPEG preview.",
  },
  {
    title: "Sudan Grass Photograph",
    capability: "4:3",
    dimensions: "1440 x 1080",
    fileSize: 1_560_080,
    url: "/samples/tiff/sudan-grass-nara-1440x1080.tiff",
    download: "sudan-grass-nara-1440x1080.tiff",
    previewUrl: "/samples/tiff/sudan-grass-nara-1440x1080-preview.jpg",
    source: "NARA · Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Photograph_of_Sudan_Grass_-_NARA_-_2128702.tiff",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "1440 / 1080",
    note: "A monochrome archive TIFF cropped and resized to a common 4:3 canvas.",
    previewNote: "Preview rendered from the downloaded TIFF; download gets the real TIFF.",
  },
  {
    title: "Prince Murad Baksh",
    capability: "4:5",
    dimensions: "1080 x 1350",
    fileSize: 4_380_694,
    url: "/samples/tiff/prince-murad-portrait-1080x1350.tiff",
    download: "prince-murad-portrait-1080x1350.tiff",
    previewUrl: "/samples/tiff/prince-murad-portrait-1080x1350-preview.jpg",
    source: "Cleveland Museum of Art · Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Anonymous_-_Portrait_of_Prince_Murad_Baksh_-_1917.1066_-_Cleveland_Museum_of_Art_(cropped).tiff",
    license: "Public domain",
    shape: "portrait",
    aspectRatio: "1080 / 1350",
    note: "A color museum digitization TIFF prepared for the common 4:5 portrait ratio.",
    previewNote: "Preview rendered from the downloaded TIFF; download gets the real TIFF.",
  },
  {
    title: "NASA Eclipse Event",
    capability: "16:9",
    dimensions: "1280 x 720",
    fileSize: 1_472_762,
    url: "/samples/tiff/nasa-stennis-eclipse-1280x720.tiff",
    download: "nasa-stennis-eclipse-1280x720.tiff",
    previewUrl: "/samples/tiff/nasa-stennis-eclipse-1280x720-preview.jpg",
    source: "NASA Stennis · Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:NASA_Stennis_Participates_in_NASA_Eclipse_Events_(SSC-20240408-s00634).tiff",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "1280 / 720",
    note: "A modern RGB TIFF cropped and resized to a common HD preview size.",
    previewNote: "Preview rendered from the downloaded TIFF; download gets the real TIFF.",
  },
]

export function TiffSamplesWidget() {
  return (
    <FormatSampleGallery
      intro="Four externally sourced TIFF files converted to common preview sizes: 1:1, 4:3, 4:5, and 16:9. Most browsers do not decode TIFF natively, so each card shows a JPEG preview while the download link points to the real .tiff file."
      samples={SAMPLES}
    />
  )
}
