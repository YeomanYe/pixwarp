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
    previewUrl: "/samples/tiff/tiff-100x100-sample-preview.jpg",
    source: "SampleFile.com",
    sourceUrl: "https://www.samplefile.com/samples/image/tiff/",
    license: "Free sample file",
    shape: "square",
    note: "A small TIFF sample for upload and parser testing.",
    previewNote: "Preview rendered from the downloaded TIFF; download gets the real TIFF.",
  },
  {
    title: "Archival Scan",
    capability: "Scanned document",
    dimensions: "1200 x 1600",
    fileSize: 67_286,
    url: "/samples/tiff/tiff-archival-scan-sample.tiff",
    download: "tiff-archival-scan-sample.tiff",
    previewUrl: "/samples/tiff/tiff-archival-scan-sample-preview.jpg",
    source: "SampleFile.com",
    sourceUrl: "https://www.samplefile.com/samples/image/tiff/",
    license: "Free sample file",
    shape: "portrait",
    note: "A black-and-white archival scan TIFF using PackBits compression.",
    previewNote: "Preview rendered from the downloaded TIFF; download gets the real TIFF.",
  },
  {
    title: "Fax Noise",
    capability: "Noisy scan",
    dimensions: "1200 x 1600",
    fileSize: 553_116,
    url: "/samples/tiff/tiff-fax-noise-sample.tiff",
    download: "tiff-fax-noise-sample.tiff",
    previewUrl: "/samples/tiff/tiff-fax-noise-sample-preview.jpg",
    source: "SampleFile.com",
    sourceUrl: "https://www.samplefile.com/samples/image/tiff/",
    license: "Free sample file",
    shape: "portrait",
    note: "A noisy monochrome TIFF sample that represents fax and document-processing workflows.",
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
