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
    title: "SampleFile 100",
    capability: "Small TIFF",
    dimensions: "100 x 100",
    fileSize: 80_278,
    url: "/samples/tiff/tiff-100x100-sample.tiff",
    download: "tiff-100x100-sample.tiff",
    previewUrl: "/samples/tiff/samplefile-tiff-preview.png",
    source: "SampleFile.com",
    sourceUrl: "https://www.samplefile.com/samples/image/tiff/",
    license: "Free sample file",
    shape: "square",
    note: "A small TIFF sample for upload and parser testing.",
    previewNote:
      "The preview is the source site's TIFF sample graphic; download gets the real TIFF.",
  },
  {
    title: "SampleFile 500 x 300",
    capability: "Medium TIFF",
    dimensions: "500 x 300",
    fileSize: 1_200_294,
    url: "/samples/tiff/tiff-500x300-sample.tiff",
    download: "tiff-500x300-sample.tiff",
    previewUrl: "/samples/tiff/samplefile-tiff-preview.png",
    source: "SampleFile.com",
    sourceUrl: "https://www.samplefile.com/samples/image/tiff/",
    license: "Free sample file",
    shape: "wide",
    note: "A medium landscape TIFF sample from an external sample-file library.",
    previewNote:
      "The preview is the source site's TIFF sample graphic; download gets the real TIFF.",
  },
  {
    title: "SampleFile 1000 x 600",
    capability: "Large TIFF",
    dimensions: "1000 x 600",
    fileSize: 4_800_318,
    url: "/samples/tiff/tiff-1000x600-sample.tiff",
    download: "tiff-1000x600-sample.tiff",
    previewUrl: "/samples/tiff/samplefile-tiff-preview.png",
    source: "SampleFile.com",
    sourceUrl: "https://www.samplefile.com/samples/image/tiff/",
    license: "Free sample file",
    shape: "wide",
    note: "A larger TIFF sample showing why this format is common in archival and print workflows.",
    previewNote:
      "The preview is the source site's TIFF sample graphic; download gets the real TIFF.",
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
