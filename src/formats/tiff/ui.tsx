import { FormatSampleGallery, type FormatGuideSample } from "../shared/sample-gallery"

const SAMPLES: FormatGuideSample[] = [
  {
    title: "AB Aurigae Disk",
    capability: "Scientific image",
    dimensions: "536 x 536",
    fileSize: 877_872,
    url: "/samples/tiff/ab-aurigae-disk-536x536.tiff",
    download: "ab-aurigae-disk-536x536.tiff",
    previewUrl: "/samples/tiff/ab-aurigae-disk-preview.jpg",
    source: "NASA/ESA · Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:AB_Aurigae_disk_(Hubble_view)_(opo9921b).tiff",
    license: "Public domain",
    shape: "square",
    note: "A real TIFF scientific image from Wikimedia Commons.",
    previewNote:
      "Chrome does not render TIFF directly, so this card uses the Commons preview image.",
  },
  {
    title: "Sudan Grass Photograph",
    capability: "Archival scan",
    dimensions: "1142 x 876",
    fileSize: 1_004_984,
    url: "/samples/tiff/sudan-grass-nara-1142x876.tiff",
    download: "sudan-grass-nara-1142x876.tiff",
    previewUrl: "/samples/tiff/sudan-grass-nara-1142x876-preview.jpg",
    source: "NARA · Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Photograph_of_Sudan_Grass_-_NARA_-_2128702.tiff",
    license: "Public domain",
    shape: "wide",
    note: "A monochrome archive TIFF from the U.S. National Archives collection.",
    previewNote: "Preview rendered from the downloaded TIFF; download gets the real TIFF.",
  },
  {
    title: "Prince Murad Baksh",
    capability: "Museum artwork",
    dimensions: "1278 x 1568",
    fileSize: 6_036_998,
    url: "/samples/tiff/prince-murad-portrait-1278x1568.tiff",
    download: "prince-murad-portrait-1278x1568.tiff",
    previewUrl: "/samples/tiff/prince-murad-portrait-1278x1568-preview.jpg",
    source: "Cleveland Museum of Art · Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Anonymous_-_Portrait_of_Prince_Murad_Baksh_-_1917.1066_-_Cleveland_Museum_of_Art_(cropped).tiff",
    license: "Public domain",
    shape: "portrait",
    note: "A color museum digitization TIFF with embedded image metadata.",
    previewNote: "Preview rendered from the downloaded TIFF; download gets the real TIFF.",
  },
  {
    title: "NASA Eclipse Event",
    capability: "LZW photo",
    dimensions: "960 x 720",
    fileSize: 1_126_468,
    url: "/samples/tiff/nasa-stennis-eclipse-960x720.tiff",
    download: "nasa-stennis-eclipse-960x720.tiff",
    previewUrl: "/samples/tiff/nasa-stennis-eclipse-960x720-preview.jpg",
    source: "NASA Stennis · Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:NASA_Stennis_Participates_in_NASA_Eclipse_Events_(SSC-20240408-s00634).tiff",
    license: "Public domain",
    shape: "wide",
    note: "A modern RGB TIFF using LZW compression and Photoshop metadata.",
    previewNote: "Preview rendered from the downloaded TIFF; download gets the real TIFF.",
  },
]

export function TiffSamplesWidget() {
  return (
    <FormatSampleGallery
      intro="Four externally sourced TIFF files stored locally. Most browsers do not decode TIFF natively, so each card shows a preview image while the download link points to the real .tiff file."
      samples={SAMPLES}
      attributionPath="public/samples/tiff/attribution.json"
    />
  )
}
