import { FormatSampleGallery, type FormatGuideSample } from "../shared/sample-gallery"

const SAMPLES: FormatGuideSample[] = [
  {
    title: "Utah Dunes",
    capability: "16:9",
    dimensions: "1920 x 1080",
    fileSize: 255_884,
    url: "/samples/webp/utah-dunes-1920x1080.webp",
    download: "utah-dunes-1920x1080.webp",
    source: "Bureau of Land Management · Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Utah_Dunes_Landscape_-_West_Desert_District.jpg",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "1920 / 1080",
    note: "A public-domain landscape photo cropped and converted to a common full-HD WebP.",
  },
  {
    title: "Rheinturm",
    capability: "1:1",
    dimensions: "1080 x 1080",
    fileSize: 103_114,
    url: "/samples/webp/rheinturm-1080x1080.webp",
    download: "rheinturm-1080x1080.webp",
    source: "Dietmar Rabich · Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:D%C3%BCsseldorf,_Rheinturm_--_2015_--_8127.jpg",
    license: "CC BY-SA 4.0",
    shape: "square",
    aspectRatio: "1080 / 1080",
    note: "A square city photo converted to WebP for profile and catalog-style previews.",
  },
  {
    title: "Ngozi Okonjo-Iweala",
    capability: "4:5",
    dimensions: "1080 x 1350",
    fileSize: 161_958,
    url: "/samples/webp/okonjo-iweala-1080x1350.webp",
    download: "okonjo-iweala-1080x1350.webp",
    source: "IMF · Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Okonjo-Iweala,_Ngozi_(2008_portrait).jpg",
    license: "Public domain",
    shape: "portrait",
    aspectRatio: "1080 / 1350",
    note: "A portrait photo converted to the common 4:5 feed ratio.",
  },
  {
    title: "Artemis Moonscape",
    capability: "9:16",
    dimensions: "1080 x 1920",
    fileSize: 90_270,
    url: "/samples/webp/artemis-moonscape-1080x1920.webp",
    download: "artemis-moonscape-1080x1920.webp",
    source: "NASA · Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Artemis_Moonscape_Vertical_v2_Type_(905749615641).jpg",
    license: "Public domain",
    shape: "portrait",
    aspectRatio: "1080 / 1920",
    note: "A vertical poster image converted to WebP for phone-first previews.",
  },
  {
    title: "Chlosyne Butterfly",
    capability: "alpha",
    dimensions: "740 x 436",
    fileSize: 49_164,
    url: "/samples/webp/chlosyne-butterfly-740x436-alpha.webp",
    download: "chlosyne-butterfly-740x436-alpha.webp",
    source: "Nature Study Publishing Company · Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Chlosyne_nycteis-transparent.png",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "740 / 436",
    checkerboard: true,
    note: "A detailed transparent PNG converted to WebP with alpha preserved.",
  },
  {
    title: "PIA02501 Animation",
    capability: "animated",
    dimensions: "321 x 320",
    fileSize: 124_954,
    url: "/samples/webp/pia02501-321x320-animated.webp",
    download: "pia02501-321x320-animated.webp",
    source: "NASA/JPL/University of Arizona · Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:PIA02501_(animated).gif",
    license: "Public domain",
    shape: "square",
    aspectRatio: "321 / 320",
    note: "A public-domain animated GIF converted to animated WebP.",
  },
]

export function WebpSamplesWidget() {
  return (
    <FormatSampleGallery
      intro="Six freshly sourced online assets converted to WebP: common 16:9, 1:1, 4:5, and 9:16 sizes, plus alpha and animated samples."
      samples={SAMPLES}
    />
  )
}
