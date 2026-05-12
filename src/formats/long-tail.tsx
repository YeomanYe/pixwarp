import type { FormatManifest, FormatSource } from "./types"
import { FormatSampleGallery } from "./shared/sample-gallery"
import type { FormatGuideSample } from "./shared/sample-gallery"

const updated = "2026-05-11"

const mdnImages: FormatSource = {
  title: "MDN image file type and format guide",
  url: "https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types",
  note: "browser image support, MIME types, and practical web guidance",
}

const locBmp: FormatSource = {
  title: "Library of Congress - BMP",
  url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000189.shtml",
  note: "BMP-specific archival description and sustainability notes",
}

const locPsd: FormatSource = {
  title: "Library of Congress - Adobe Photoshop family",
  url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000523.shtml",
  note: "PSD/PSB format family description",
}

const locDng: FormatSource = {
  title: "Library of Congress - DNG 1.6",
  url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000628.shtml",
  note: "DNG-specific archival description",
}

const locRaw: FormatSource = {
  title: "Library of Congress - Camera Raw formats",
  url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000241.shtml",
  note: "camera raw family description",
}

const locMkv: FormatSource = {
  title: "Library of Congress - Matroska multimedia container",
  url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000342.shtml",
  note: "Matroska/MKV archival format description",
}

const locMov: FormatSource = {
  title: "Library of Congress - QuickTime file format",
  url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000052.shtml",
  note: "MOV/QuickTime archival format description",
}

const locMpeg4: FormatSource = {
  title: "Library of Congress - MPEG-4 file format",
  url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000155.shtml",
  note: "MP4/M4A-related file format description",
}

const locAvi: FormatSource = {
  title: "Library of Congress - AVI",
  url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000059.shtml",
  note: "AVI-specific archival description",
}

const locAiff: FormatSource = {
  title: "Library of Congress - AIFF",
  url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000005.shtml",
  note: "AIFF-specific archival description",
}

const locXps: FormatSource = {
  title: "Library of Congress - XPS",
  url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000514.shtml",
  note: "Microsoft XPS archival format description",
}

const locEps: FormatSource = {
  title: "Library of Congress - EPS",
  url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000246.shtml",
  note: "EPS-specific archival description",
}

const locTar: FormatSource = {
  title: "Library of Congress - TAR",
  url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000531.shtml",
  note: "tar archive format family description",
}

const loc7z: FormatSource = {
  title: "Library of Congress - 7z",
  url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000539.shtml",
  note: "7z-specific archival description",
}

const bmpSamples: FormatGuideSample[] = [
  {
    title: "Earthrise converted to BMP",
    capability: "1:1",
    dimensions: "1080 x 1080",
    fileSize: 3_499_254,
    url: "/samples/bmp/earthrise-1080x1080.bmp",
    download: "earthrise-1080x1080.bmp",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:NASA-Apollo8-Dec24-Earthrise.jpg",
    license: "Public domain",
    shape: "square",
    aspectRatio: "1080 / 1080",
    note: "A square NASA photo sample using a common social preview size.",
  },
  {
    title: "Great Wave converted to BMP",
    capability: "16:9",
    dimensions: "1920 x 1080",
    fileSize: 6_220_854,
    url: "/samples/bmp/great-wave-1920x1080.bmp",
    download: "great-wave-1920x1080.bmp",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:The_Great_Wave_off_Kanagawa.jpg",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "1920 / 1080",
    note: "A wide public-domain artwork cropped to the standard full-HD canvas.",
  },
  {
    title: "Mona Lisa converted to BMP",
    capability: "4:5",
    dimensions: "1080 x 1350",
    fileSize: 4_374_054,
    url: "/samples/bmp/mona-lisa-1080x1350.bmp",
    download: "mona-lisa-1080x1350.bmp",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Mona_Lisa.jpg",
    license: "Public domain",
    shape: "portrait",
    aspectRatio: "1080 / 1350",
    note: "A portrait artwork sample using the common 4:5 feed ratio.",
  },
  {
    title: "Rembrandt portrait converted to BMP",
    capability: "9:16",
    dimensions: "1080 x 1920",
    fileSize: 6_220_854,
    url: "/samples/bmp/rembrandt-1080x1920.bmp",
    download: "rembrandt-1080x1920.bmp",
    source: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Rembrandt_-_Portrait_of_a_man_in_a_tall_hat_(c._1663).jpg",
    license: "Public domain",
    shape: "portrait",
    aspectRatio: "1080 / 1920",
    note: "A vertical artwork sample prepared for phone-first preview workflows.",
  },
]

function BmpResourceGallery() {
  return (
    <FormatSampleGallery
      intro="Four freshly sourced public-domain images converted to common BMP sizes: 16:9, 1:1, 4:5, and 9:16. The files are stored locally so previews and downloads are stable."
      samples={bmpSamples}
    />
  )
}

const psdSamples: FormatGuideSample[] = [
  {
    title: "Chardin still life PSD",
    capability: "16:9",
    dimensions: "1440 x 810",
    fileSize: 3_525_992,
    url: "/samples/psd/chardin-still-life-1440x810.psd",
    download: "chardin-still-life-1440x810.psd",
    previewUrl: "/samples/psd/chardin-still-life-1440x810-preview.jpg",
    source: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Jean-Baptiste_Sim%C3%A9on_Chardin_(2.11.1699_-_6.12.1779)_-_Still_life_with_a_copper_kettle,_bottle,_bowl_with_eggs_and_two_leek_plants_-_1669_-_Gem%C3%A4ldegalerie.jpg",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "1440 / 810",
    note: "A fresh public-domain still life converted to PSD with a browser-safe JPEG preview.",
  },
  {
    title: "Duncanson still life PSD",
    capability: "1:1",
    dimensions: "1080 x 1080",
    fileSize: 2_688_880,
    url: "/samples/psd/duncanson-still-life-1080x1080.psd",
    download: "duncanson-still-life-1080x1080.psd",
    previewUrl: "/samples/psd/duncanson-still-life-1080x1080-preview.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Still_Life_LACMA_M.78.98.jpg",
    license: "Public domain",
    shape: "square",
    aspectRatio: "1080 / 1080",
    note: "A square PSD sample prepared for profile, catalog, and artwork previews.",
  },
  {
    title: "Renoir flowers PSD",
    capability: "4:5",
    dimensions: "1080 x 1350",
    fileSize: 4_398_414,
    url: "/samples/psd/renoir-flowers-1080x1350.psd",
    download: "renoir-flowers-1080x1350.psd",
    previewUrl: "/samples/psd/renoir-flowers-1080x1350-preview.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:GUGG_Still_Life_Flowers.jpg",
    license: "Public domain",
    shape: "portrait",
    aspectRatio: "1080 / 1350",
    note: "A portrait PSD sample prepared for the common 4:5 feed ratio.",
  },
  {
    title: "Chicago poster PSD",
    capability: "9:16",
    dimensions: "1080 x 1920",
    fileSize: 5_948_978,
    url: "/samples/psd/chicago-poster-1080x1920.psd",
    download: "chicago-poster-1080x1920.psd",
    previewUrl: "/samples/psd/chicago-poster-1080x1920-preview.jpg",
    source: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Chicago_world%27s_fair,_a_century_of_progress,_expo_poster,_1933,_2.jpg",
    license: "Public domain",
    shape: "portrait",
    aspectRatio: "1080 / 1920",
    note: "A poster-style PSD sample prepared for phone-first previews.",
  },
]

function PsdResourceGallery() {
  return (
    <FormatSampleGallery
      intro="Four freshly sourced public-domain images converted to PSD in common preview sizes. Browsers cannot render PSD directly, so each card shows a JPEG preview while the download link points to the real .psd file."
      samples={psdSamples}
    />
  )
}

const dngSamples: FormatGuideSample[] = [
  {
    title: "Canon 5D Mark III DNG",
    capability: "full-frame",
    dimensions: "5760 x 3840",
    fileSize: 6_193_902,
    url: "/samples/dng/canon-5d3-lossy-5g4a9394.dng",
    download: "canon-5d3-lossy-5g4a9394.dng",
    previewUrl: "/samples/dng/canon-5d3-lossy-5g4a9394-preview.jpg",
    source: "raw.pixls.us",
    sourceUrl:
      "https://raw.pixls.us/data/Adobe%20DNG%20Converter/Canon%20EOS%205D%20Mark%20III/5G4A9394-compressed-lossy.DNG",
    license: "CC0",
    shape: "wide",
    aspectRatio: "5760 / 3840",
    note: "A full-frame DNG sample with a locally rendered JPEG preview.",
  },
  {
    title: "Leica M9 DNG",
    capability: "rangefinder",
    dimensions: "5212 x 3468",
    fileSize: 18_324_480,
    url: "/samples/dng/leica-m9-l1049390.dng",
    download: "leica-m9-l1049390.dng",
    previewUrl: "/samples/dng/leica-m9-l1049390-preview.jpg",
    source: "raw.pixls.us",
    sourceUrl: "https://raw.pixls.us/data/Leica/M9/L1049390.DNG",
    license: "CC0",
    shape: "wide",
    aspectRatio: "5212 / 3468",
    note: "A Leica DNG sample that shows indoor raw exposure and highlight handling.",
  },
  {
    title: "iPhone XS DNG",
    capability: "mobile raw",
    dimensions: "4032 x 3024",
    fileSize: 10_290_665,
    url: "/samples/dng/iphone-xs-img-1105.dng",
    download: "iphone-xs-img-1105.dng",
    previewUrl: "/samples/dng/iphone-xs-img-1105-preview.jpg",
    source: "raw.pixls.us",
    sourceUrl: "https://raw.pixls.us/data/Apple/iPhone%20XS/IMG_1105.dng",
    license: "CC0",
    shape: "wide",
    aspectRatio: "4032 / 3024",
    note: "A modern phone DNG sample with a detailed architecture preview.",
  },
  {
    title: "iPhone 7 Plus DNG",
    capability: "mobile raw",
    dimensions: "4032 x 3024",
    fileSize: 10_550_105,
    url: "/samples/dng/iphone-7-plus-img-0739.dng",
    download: "iphone-7-plus-img-0739.dng",
    previewUrl: "/samples/dng/iphone-7-plus-img-0739-preview.jpg",
    source: "raw.pixls.us",
    sourceUrl: "https://raw.pixls.us/data/Apple/iPhone%207%20Plus/IMG_0739.DNG",
    license: "CC0",
    shape: "wide",
    aspectRatio: "4032 / 3024",
    note: "An older phone DNG sample useful for comparing mobile raw workflows.",
  },
]

function DngResourceGallery() {
  return (
    <FormatSampleGallery
      intro="Four freshly sourced CC0 DNG files from raw.pixls.us. The downloads are real camera raw files kept at their original sensor dimensions; each card uses a locally rendered JPEG preview because browsers do not display DNG directly."
      samples={dngSamples}
    />
  )
}

const rawSamples: FormatGuideSample[] = [
  {
    title: "Canon PowerShot G10 CR2",
    capability: "Canon CR2",
    dimensions: "4416 x 3312",
    fileSize: 20_092_969,
    url: "/samples/raw/canon-powershot-g10-4416x3312.cr2",
    download: "canon-powershot-g10-4416x3312.cr2",
    previewUrl: "/samples/raw/canon-powershot-g10-preview-1440x1080.jpg",
    source: "raw.pixls.us",
    sourceUrl: "https://raw.pixls.us/data/Canon/PowerShot%20G10/RAW_CANON_G10.CR2",
    license: "CC0",
    shape: "wide",
    aspectRatio: "4416 / 3312",
    note: "A Canon CR2 raw file with a snow-covered forest preview.",
  },
  {
    title: "Nikon D90 NEF",
    capability: "Nikon NEF",
    dimensions: "4288 x 2848",
    fileSize: 11_653_767,
    url: "/samples/raw/nikon-d90-4288x2848.nef",
    download: "nikon-d90-4288x2848.nef",
    previewUrl: "/samples/raw/nikon-d90-preview-1440x956.jpg",
    source: "raw.pixls.us",
    sourceUrl: "https://raw.pixls.us/data/Nikon/D90/00001.NEF",
    license: "CC0",
    shape: "wide",
    aspectRatio: "4288 / 2848",
    note: "A Nikon NEF sample showing a bright outdoor landscape.",
  },
  {
    title: "Sony RX100 III ARW",
    capability: "Sony ARW",
    dimensions: "5472 x 3648",
    fileSize: 20_958_208,
    url: "/samples/raw/sony-rx100m3-5472x3648.arw",
    download: "sony-rx100m3-5472x3648.arw",
    previewUrl: "/samples/raw/sony-rx100m3-preview-1440x960.jpg",
    source: "raw.pixls.us",
    sourceUrl: "https://raw.pixls.us/data/Sony/DSC-RX100M3/DSC00734.ARW",
    license: "CC0",
    shape: "wide",
    aspectRatio: "5472 / 3648",
    note: "A Sony ARW file with a detailed playground and sky preview.",
  },
  {
    title: "Fujifilm X-E2 RAF",
    capability: "Fujifilm RAF",
    dimensions: "4896 x 3264",
    fileSize: 33_800_704,
    url: "/samples/raw/fujifilm-xe2-4896x3264.raf",
    download: "fujifilm-xe2-4896x3264.raf",
    previewUrl: "/samples/raw/fujifilm-xe2-preview-1440x960.jpg",
    source: "raw.pixls.us",
    sourceUrl: "https://raw.pixls.us/data/Fujifilm/X-E2/DSCF9050.RAF",
    license: "CC0",
    shape: "wide",
    aspectRatio: "4896 / 3264",
    note: "A Fujifilm RAF sample with a frozen lakeside landscape.",
  },
]

function RawResourceGallery() {
  return (
    <FormatSampleGallery
      intro="Four freshly sourced CC0 camera raw files from raw.pixls.us, covering common proprietary RAW families. Browsers cannot render these files directly, so each card shows a locally rendered JPEG preview while the download link points to the real RAW file."
      samples={rawSamples}
    />
  )
}

const mkvSamples: FormatGuideSample[] = [
  {
    title: "Rain Clip remuxed to MKV",
    capability: "720p clip",
    dimensions: "1280 x 720",
    fileSize: 9_840_864,
    url: "/samples/mkv/rain-clip-1280x720.mkv",
    download: "rain-clip-1280x720.mkv",
    previewUrl: "/samples/mkv/rain-clip-1280x720-poster.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Rain_clip.theora.ogv",
    license: "CC0",
    shape: "wide",
    aspectRatio: "1280 / 720",
    note: "A short rain scene remuxed into a real Matroska container.",
  },
  {
    title: "Sintel Extract remuxed to MKV",
    capability: "360p clip",
    dimensions: "640 x 360",
    fileSize: 1_432_188,
    url: "/samples/mkv/sintel-extract-640x360.mkv",
    download: "sintel-extract-640x360.mkv",
    previewUrl: "/samples/mkv/sintel-extract-640x360-poster.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sintel_extract_new.ogv",
    license: "CC BY 3.0",
    shape: "wide",
    aspectRatio: "640 / 360",
    note: "A 20-second animated film extract remuxed into MKV.",
  },
  {
    title: "Big Buck Bunny MCU remuxed to MKV",
    capability: "480p clip",
    dimensions: "854 x 480",
    fileSize: 614_303,
    url: "/samples/mkv/big-buck-bunny-mcu-854x480.mkv",
    download: "big-buck-bunny-mcu-854x480.mkv",
    previewUrl: "/samples/mkv/big-buck-bunny-mcu-854x480-poster.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Big_buck_bunny_mcu.ogv",
    license: "CC BY 3.0",
    shape: "wide",
    aspectRatio: "854 / 480",
    note: "A compact Blender open movie clip remuxed into MKV.",
  },
  {
    title: "Cymatics demo remuxed to MKV",
    capability: "1080p clip",
    dimensions: "1920 x 1080",
    fileSize: 2_871_870,
    url: "/samples/mkv/cymatics-1920x1080.mkv",
    download: "cymatics-1920x1080.mkv",
    previewUrl: "/samples/mkv/cymatics-1920x1080-poster.jpg",
    source: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Cymatics-FromThe-Film_Inner_Worlds_Outer_Worlds_1.ogv",
    license: "CC BY-SA 3.0",
    shape: "wide",
    aspectRatio: "1920 / 1080",
    note: "A 1080p cymatics experiment clip remuxed into MKV.",
  },
]

function MkvResourceGallery() {
  return (
    <FormatSampleGallery
      intro="Four freshly sourced public video clips remuxed into real .mkv files. Each card uses a poster frame because browsers often do not play Matroska directly; the download link points to the actual MKV container."
      samples={mkvSamples}
    />
  )
}

const movSamples: FormatGuideSample[] = [
  {
    title: "NASA We Are Going MOV",
    capability: "16:9",
    dimensions: "1280 x 720",
    fileSize: 738_894,
    url: "/samples/mov/nasa-we-are-going-1280x720.mov",
    download: "nasa-we-are-going-1280x720.mov",
    previewUrl: "/samples/mov/nasa-we-are-going-1280x720-poster.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:NASA_WeAreGoing_(661354393755).webm",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "1280 / 720",
    note: "A 720p NASA archival clip transcoded into MOV.",
  },
  {
    title: "Train Window MOV",
    capability: "travel clip",
    dimensions: "1280 x 720",
    fileSize: 1_694_963,
    url: "/samples/mov/train-window-1280x720.mov",
    download: "train-window-1280x720.mov",
    previewUrl: "/samples/mov/train-window-1280x720-poster.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Train-window.webm",
    license: "CC BY-SA 4.0",
    shape: "wide",
    aspectRatio: "1280 / 720",
    note: "A moving train-window view transcoded into MOV.",
  },
  {
    title: "Park Buses MOV",
    capability: "360p",
    dimensions: "640 x 360",
    fileSize: 510_251,
    url: "/samples/mov/samplelib-park-640x360.mov",
    download: "samplelib-park-640x360.mov",
    previewUrl: "/samples/mov/samplelib-park-640x360-poster.jpg",
    source: "SampleLib",
    sourceUrl: "https://download.samplelib.com/sample-mp4.html",
    license: "No license restrictions",
    shape: "wide",
    aspectRatio: "640 / 360",
    note: "A small park-and-traffic sample transcoded into MOV.",
  },
  {
    title: "Exoplanets Vertical MOV",
    capability: "9:16",
    dimensions: "720 x 1280",
    fileSize: 224_940,
    url: "/samples/mov/exoplanets-vertical-720x1280.mov",
    download: "exoplanets-vertical-720x1280.mov",
    previewUrl: "/samples/mov/exoplanets-vertical-720x1280-poster.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Exoplanets_Vertical_Video_(SVS14797).webm",
    license: "Public domain",
    shape: "portrait",
    aspectRatio: "720 / 1280",
    note: "A NASA vertical science video transcoded into a QuickTime MOV sample.",
  },
]

function MovResourceGallery() {
  return (
    <FormatSampleGallery
      intro="Four freshly sourced video clips converted into real QuickTime .mov files in common preview sizes. Each card shows an extracted poster frame so the page stays useful even when a browser does not preview MOV inline."
      samples={movSamples}
    />
  )
}

const m4vSamples: FormatGuideSample[] = [
  {
    title: "Ocean Bird M4V",
    capability: "cinematic",
    dimensions: "960 x 400",
    fileSize: 17_520_926,
    url: "/samples/m4v/ocean-960x400.m4v",
    download: "ocean-960x400.m4v",
    previewUrl: "/samples/m4v/ocean-960x400-poster.jpg",
    source: "FileSamples",
    sourceUrl: "https://filesamples.com/formats/m4v",
    license: "Sample media for testing",
    shape: "wide",
    aspectRatio: "960 / 400",
    note: "A wide ocean sample stored as a real Apple iTunes Video file.",
  },
  {
    title: "Coast Aerial M4V",
    capability: "720p",
    dimensions: "1280 x 720",
    fileSize: 17_436_142,
    url: "/samples/m4v/coast-1280x720.m4v",
    download: "coast-1280x720.m4v",
    previewUrl: "/samples/m4v/coast-1280x720-poster.jpg",
    source: "FileSamples",
    sourceUrl: "https://filesamples.com/formats/m4v",
    license: "Sample media for testing",
    shape: "wide",
    aspectRatio: "1280 / 720",
    note: "A 720p M4V sample with an aerial coast preview.",
  },
  {
    title: "Beach Clip M4V",
    capability: "360p",
    dimensions: "640 x 360",
    fileSize: 574_847,
    url: "/samples/m4v/beach-640x360.m4v",
    download: "beach-640x360.m4v",
    previewUrl: "/samples/m4v/beach-640x360-poster.jpg",
    source: "FileSamples",
    sourceUrl: "https://filesamples.com/formats/m4v",
    license: "Sample media for testing",
    shape: "wide",
    aspectRatio: "640 / 360",
    note: "A small M4V beach sample for upload and parser checks.",
  },
  {
    title: "Roundhay Garden Scene M4V",
    capability: "historical",
    dimensions: "980 x 720",
    fileSize: 602_722,
    url: "/samples/m4v/roundhay-garden-980x720.m4v",
    download: "roundhay-garden-980x720.m4v",
    previewUrl: "/samples/m4v/roundhay-garden-980x720-poster.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Roundhay_Garden_Scene_(1888)_10fps.webm",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "980 / 720",
    note: "A public-domain historical clip transcoded into an M4V test file.",
  },
]

function M4vResourceGallery() {
  return (
    <FormatSampleGallery
      intro="Four freshly sourced real .m4v files with extracted poster frames. The set covers compact upload samples, wide Apple-style media files, and a public-domain clip transcoded into M4V for parser testing."
      samples={m4vSamples}
    />
  )
}

const aviSamples: FormatGuideSample[] = [
  {
    title: "Aurora Shimmer AVI",
    capability: "1080p",
    dimensions: "1920 x 1080",
    fileSize: 3_633_758,
    url: "/samples/avi/aurora-shimmer-1920x1080.avi",
    download: "aurora-shimmer-1920x1080.avi",
    previewUrl: "/samples/avi/aurora-shimmer-1920x1080-poster.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Shimmer.webm",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "1920 / 1080",
    note: "A public-domain aurora time-lapse transcoded into AVI with MPEG-4 video and MP3 audio.",
  },
  {
    title: "Peony Time-Lapse AVI",
    capability: "botanical",
    dimensions: "1280 x 720",
    fileSize: 1_355_994,
    url: "/samples/avi/peony-timelapse-1280x720.avi",
    download: "peony-timelapse-1280x720.avi",
    previewUrl: "/samples/avi/peony-timelapse-1280x720-poster.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Time_lapse_of_Peony_flower_blooming.webm",
    license: "CC BY 3.0",
    shape: "wide",
    aspectRatio: "1280 / 720",
    note: "A flower time-lapse converted to a compact AVI sample for legacy container testing.",
  },
  {
    title: "Grass Tray AVI",
    capability: "time-lapse",
    dimensions: "1280 x 720",
    fileSize: 3_703_368,
    url: "/samples/avi/grass-timelapse-1280x720.avi",
    download: "grass-timelapse-1280x720.avi",
    previewUrl: "/samples/avi/grass-timelapse-1280x720-poster.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Watching_Grass_Grow.webm",
    license: "CC BY-SA 3.0",
    shape: "wide",
    aspectRatio: "1280 / 720",
    note: "A real time-lapse clip converted into AVI to show older desktop media workflows.",
  },
  {
    title: "Coast Drone AVI",
    capability: "legacy sample",
    dimensions: "640 x 360",
    fileSize: 10_135_326,
    url: "/samples/avi/samplecat-seawater-640x360.avi",
    download: "samplecat-seawater-640x360.avi",
    previewUrl: "/samples/avi/samplecat-seawater-640x360-poster.jpg",
    source: "Sample.Cat",
    sourceUrl: "https://sample.cat/en/avi",
    license: "Sample media for testing",
    shape: "wide",
    aspectRatio: "640 / 360",
    note: "A directly downloaded XviD AVI sample with a coastal aerial scene.",
  },
]

function AviResourceGallery() {
  return (
    <FormatSampleGallery
      intro="Four real .avi files with extracted poster frames. The set avoids blank, solid-color, and gradient previews while covering direct legacy AVI samples and freshly sourced public media converted into AVI."
      samples={aviSamples}
    />
  )
}

const flacSamples: FormatGuideSample[] = [
  {
    title: "Guitar FLAC",
    capability: "music",
    dimensions: "20 s / 44.1 kHz",
    fileSize: 2_097_029,
    url: "/samples/flac/entre-dos-aguas-guitar-20s.flac",
    download: "entre-dos-aguas-guitar-20s.flac",
    previewUrl: "/samples/flac/entre-dos-aguas-guitar-20s-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Entre-dos-aguas-laucke-version-sample.flac",
    license: "CC BY-SA 4.0",
    shape: "wide",
    aspectRatio: "16 / 9",
    note: "A real lossless guitar sample trimmed to 20 seconds with a spectrogram cover.",
  },
  {
    title: "Field Recording FLAC",
    capability: "48 kHz",
    dimensions: "20 s / 48 kHz",
    fileSize: 1_840_045,
    url: "/samples/flac/pica-field-recording-20s.flac",
    download: "pica-field-recording-20s.flac",
    previewUrl: "/samples/flac/pica-field-recording-20s-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Pica_pica-2015-6-12-part15.flac",
    license: "CC BY-SA 4.0",
    shape: "wide",
    aspectRatio: "16 / 9",
    note: "A high-sample-rate field recording clipped to a manageable FLAC preview.",
  },
  {
    title: "Underwater Sound FLAC",
    capability: "stereo",
    dimensions: "20 s / 44.1 kHz",
    fileSize: 1_097_840,
    url: "/samples/flac/bio-duck-field-20s.flac",
    download: "bio-duck-field-20s.flac",
    previewUrl: "/samples/flac/bio-duck-field-20s-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Bio-duck.flac",
    license: "CC BY-SA 4.0",
    shape: "wide",
    aspectRatio: "16 / 9",
    note: "A compact FLAC field sample with a dense frequency-domain cover image.",
  },
  {
    title: "Orchestra FLAC",
    capability: "archive",
    dimensions: "30 s / 44.1 kHz",
    fileSize: 722_634,
    url: "/samples/flac/danse-macabre-orchestra-30s.flac",
    download: "danse-macabre-orchestra-30s.flac",
    previewUrl: "/samples/flac/danse-macabre-orchestra-30s-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Saint-Sa%C3%ABns_-_Danse_macabre_(Fourestier,_1953).flac",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "16 / 9",
    note: "A public-domain orchestral recording trimmed into a small lossless sample.",
  },
]

function FlacResourceGallery() {
  return (
    <FormatSampleGallery
      intro="Four real .flac files prepared from online source recordings. Each audio sample includes a nonblank spectrogram cover so the format page can be inspected visually before downloading."
      samples={flacSamples}
    />
  )
}

const oggSamples: FormatGuideSample[] = [
  {
    title: "Fur Elise OGG",
    capability: "Vorbis stereo",
    dimensions: "30 s / 44.1 kHz",
    fileSize: 315_958,
    url: "/samples/ogg/fur-elise-piano-30s.ogg",
    download: "fur-elise-piano-30s.ogg",
    previewUrl: "/samples/ogg/fur-elise-piano-30s-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:FurElise.ogg",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "16 / 9",
    note: "A piano recording trimmed into a compact Ogg Vorbis stereo sample.",
  },
  {
    title: "Edison Cylinder OGG",
    capability: "historic mono",
    dimensions: "30 s / 44.1 kHz",
    fileSize: 245_693,
    url: "/samples/ogg/edison-cylinder-30s.ogg",
    download: "edison-cylinder-30s.ogg",
    previewUrl: "/samples/ogg/edison-cylinder-30s-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Edison_cylinder_Lost_Chord.ogg",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "16 / 9",
    note: "A historical cylinder transfer prepared as a mono Ogg Vorbis sample.",
  },
  {
    title: "Ode to Joy OGG",
    capability: "classical",
    dimensions: "30 s / 44.1 kHz",
    fileSize: 203_093,
    url: "/samples/ogg/ode-to-joy-30s.ogg",
    download: "ode-to-joy-30s.ogg",
    previewUrl: "/samples/ogg/ode-to-joy-30s-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ode_to_Joy.ogg",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "16 / 9",
    note: "A small Ogg Vorbis music sample from a public-domain MIDI source.",
  },
  {
    title: "Speech Example OGG",
    capability: "voice",
    dimensions: "3.7 s / 44.1 kHz",
    fileSize: 153_301,
    url: "/samples/ogg/example-speech-3s.ogg",
    download: "example-speech-3s.ogg",
    previewUrl: "/samples/ogg/example-speech-3s-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Example_sound_file_in_Ogg_Vorbis_format.ogg",
    license: "CC0",
    shape: "wide",
    aspectRatio: "16 / 9",
    note: "A short spoken Ogg Vorbis file kept at its original length for parser checks.",
  },
]

function OggResourceGallery() {
  return (
    <FormatSampleGallery
      intro="Four real .ogg files using Vorbis audio, each paired with a spectrogram cover generated from the actual sample. The set covers music, historical audio, and short speech."
      samples={oggSamples}
    />
  )
}

const opusSamples: FormatGuideSample[] = [
  {
    title: "Rain Thunder Opus",
    capability: "48 kbps",
    dimensions: "18.9 s / 48 kHz",
    fileSize: 99_668,
    url: "/samples/opus/rain-thunder-19s.opus",
    download: "rain-thunder-19s.opus",
    previewUrl: "/samples/opus/rain-thunder-19s-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Rain_and_thunder.ogg",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "16 / 9",
    note: "A weather field recording converted into a compact Ogg Opus audio file.",
  },
  {
    title: "Thunder Claps Opus",
    capability: "48 kbps",
    dimensions: "24 s / 48 kHz",
    fileSize: 124_005,
    url: "/samples/opus/thunder-claps-24s.opus",
    download: "thunder-claps-24s.opus",
    previewUrl: "/samples/opus/thunder-claps-24s-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Thunder_Claps.ogg",
    license: "CC BY-SA 4.0",
    shape: "wide",
    aspectRatio: "16 / 9",
    note: "A stereo thunder recording converted into Opus for transient-heavy audio tests.",
  },
  {
    title: "Tbilisi Pronunciation Opus",
    capability: "native opus",
    dimensions: "1.9 s / 48 kHz",
    fileSize: 8_624,
    url: "/samples/opus/tbilisi-pronunciation.opus",
    download: "tbilisi-pronunciation.opus",
    previewUrl: "/samples/opus/tbilisi-pronunciation-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Pronunciation_audio-Tbilisi-KA.opus",
    license: "CC BY-SA 4.0",
    shape: "wide",
    aspectRatio: "16 / 9",
    note: "A native .opus pronunciation file kept in its original Opus container.",
  },
  {
    title: "Wilhelm Scream Opus",
    capability: "short voice",
    dimensions: "1.6 s / 48 kHz",
    fileSize: 9_768,
    url: "/samples/opus/wilhelm-scream-1s.opus",
    download: "wilhelm-scream-1s.opus",
    previewUrl: "/samples/opus/wilhelm-scream-1s-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Wilhelm_Scream.ogg",
    license: "CC0",
    shape: "wide",
    aspectRatio: "16 / 9",
    note: "A very short voice sample converted into Opus for tiny upload checks.",
  },
]

function OpusResourceGallery() {
  return (
    <FormatSampleGallery
      intro="Four real .opus files, including one native Opus upload and three newly encoded Opus samples from fresh online audio sources. Each card uses a spectrogram generated from the exact file."
      samples={opusSamples}
    />
  )
}

const m4aSamples: FormatGuideSample[] = [
  {
    title: "Apollo Voice M4A",
    capability: "AAC mono",
    dimensions: "24.1 s / 11 kHz",
    fileSize: 165_110,
    url: "/samples/m4a/armstrong-small-step-24s.m4a",
    download: "armstrong-small-step-24s.m4a",
    previewUrl: "/samples/m4a/armstrong-small-step-24s-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Armstrong_Small_Step.ogg",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "16 / 9",
    note: "A public-domain Apollo 11 voice recording encoded as AAC inside an M4A container.",
  },
  {
    title: "Bach Air M4A",
    capability: "AAC stereo",
    dimensions: "30 s / 44.1 kHz",
    fileSize: 486_875,
    url: "/samples/m4a/bach-air-30s.m4a",
    download: "bach-air-30s.m4a",
    previewUrl: "/samples/m4a/bach-air-30s-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Air_(Bach).ogg",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "16 / 9",
    note: "A historical Bach recording encoded into a browser-friendly AAC M4A sample.",
  },
  {
    title: "Blackbird Song M4A",
    capability: "field audio",
    dimensions: "24.8 s / 44.1 kHz",
    fileSize: 409_088,
    url: "/samples/m4a/blackbird-song-25s.m4a",
    download: "blackbird-song-25s.m4a",
    previewUrl: "/samples/m4a/blackbird-song-25s-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Turdus_merula_2.ogg",
    license: "CC BY-SA 3.0",
    shape: "wide",
    aspectRatio: "16 / 9",
    note: "A bird-song field recording converted to AAC-in-M4A for compact media previews.",
  },
  {
    title: "Ragtime Nightingale M4A",
    capability: "archive",
    dimensions: "30 s / 48 kHz",
    fileSize: 501_903,
    url: "/samples/m4a/ragtime-nightingale-30s.m4a",
    download: "ragtime-nightingale-30s.m4a",
    previewUrl: "/samples/m4a/ragtime-nightingale-30s-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ragtime-nightingale.ogg",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "16 / 9",
    note: "A public-domain ragtime recording encoded as an M4A sample for Apple-style workflows.",
  },
]

function M4aResourceGallery() {
  return (
    <FormatSampleGallery
      intro="Four real .m4a files encoded as AAC inside the MPEG-4 audio container. Each sample comes from a fresh online source and includes a spectrogram cover generated from the exact file."
      samples={m4aSamples}
    />
  )
}

const aiffSamples: FormatGuideSample[] = [
  {
    title: "Bell Intercept AIFF",
    capability: "PCM stereo",
    dimensions: "10 s / 44.1 kHz",
    fileSize: 1_764_054,
    url: "/samples/aiff/bell-intercept-10s.aiff",
    download: "bell-intercept-10s.aiff",
    previewUrl: "/samples/aiff/bell-intercept-10s-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Old-bell-system-intercept-recording.ogg",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "16 / 9",
    note: "A telephone intercept recording converted to uncompressed 16-bit PCM AIFF.",
  },
  {
    title: "Steam Locomotive AIFF",
    capability: "field audio",
    dimensions: "20 s / 44.1 kHz",
    fileSize: 3_528_054,
    url: "/samples/aiff/steam-locomotive-20s.aiff",
    download: "steam-locomotive-20s.aiff",
    previewUrl: "/samples/aiff/steam-locomotive-20s-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:WWS_Steamlocomotive.ogg",
    license: "CC BY 4.0",
    shape: "wide",
    aspectRatio: "16 / 9",
    note: "A field recording converted into AIFF to show the large PCM file footprint.",
  },
  {
    title: "School Bell AIFF",
    capability: "mono PCM",
    dimensions: "20 s / 44.1 kHz",
    fileSize: 1_764_054,
    url: "/samples/aiff/school-bell-20s.aiff",
    download: "school-bell-20s.aiff",
    previewUrl: "/samples/aiff/school-bell-20s-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Old_school_bell_1.ogg",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "16 / 9",
    note: "A mono bell recording converted to an uncompressed AIFF sample.",
  },
  {
    title: "Organ Duo AIFF",
    capability: "music source",
    dimensions: "24 s / 44.1 kHz",
    fileSize: 4_233_654,
    url: "/samples/aiff/organ-duo-24s.aiff",
    download: "organ-duo-24s.aiff",
    previewUrl: "/samples/aiff/organ-duo-24s-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Duo_cors_de_chasse_Dandrieu.ogg",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "16 / 9",
    note: "A pipe-organ excerpt converted to AIFF for pro-audio interchange examples.",
  },
]

function AiffResourceGallery() {
  return (
    <FormatSampleGallery
      intro="Four real .aiff files encoded as uncompressed 16-bit PCM. Each sample comes from a fresh online source and includes a spectrogram cover generated from the exact AIFF file."
      samples={aiffSamples}
    />
  )
}

const epubSamples: FormatGuideSample[] = [
  {
    title: "Alice's Adventures EPUB",
    capability: "illustrated",
    dimensions: "EPUB3 / 350 x 500 cover",
    fileSize: 1_475_204,
    url: "/samples/epub/alice-adventures.epub",
    download: "alice-adventures.epub",
    previewUrl: "/samples/epub/alice-adventures-cover.jpg",
    source: "Project Gutenberg",
    sourceUrl: "https://www.gutenberg.org/ebooks/28885",
    license: "Project Gutenberg License",
    shape: "portrait",
    aspectRatio: "350 / 500",
    note: "An illustrated EPUB3 file with its embedded cover extracted for preview.",
  },
  {
    title: "Frankenstein EPUB",
    capability: "novel",
    dimensions: "EPUB3 / 1824 x 2726 cover",
    fileSize: 474_453,
    url: "/samples/epub/frankenstein.epub",
    download: "frankenstein.epub",
    previewUrl: "/samples/epub/frankenstein-cover.jpg",
    source: "Project Gutenberg",
    sourceUrl: "https://www.gutenberg.org/ebooks/84",
    license: "Project Gutenberg License",
    shape: "portrait",
    aspectRatio: "1824 / 2726",
    note: "A compact reflowable EPUB3 novel with a high-resolution cover image inside the package.",
  },
  {
    title: "Moby-Dick EPUB",
    capability: "classic",
    dimensions: "EPUB3 / 780 x 1227 cover",
    fileSize: 812_577,
    url: "/samples/epub/moby-dick.epub",
    download: "moby-dick.epub",
    previewUrl: "/samples/epub/moby-dick-cover.jpg",
    source: "Project Gutenberg",
    sourceUrl: "https://www.gutenberg.org/ebooks/2701",
    license: "Project Gutenberg License",
    shape: "portrait",
    aspectRatio: "780 / 1227",
    note: "A long text-heavy EPUB3 file useful for navigation, metadata, and reflow testing.",
  },
  {
    title: "Romeo and Juliet EPUB",
    capability: "drama",
    dimensions: "EPUB3 / 1498 x 2250 cover",
    fileSize: 341_045,
    url: "/samples/epub/romeo-juliet.epub",
    download: "romeo-juliet.epub",
    previewUrl: "/samples/epub/romeo-juliet-cover.jpg",
    source: "Project Gutenberg",
    sourceUrl: "https://www.gutenberg.org/ebooks/1513",
    license: "Project Gutenberg License",
    shape: "portrait",
    aspectRatio: "1498 / 2250",
    note: "A smaller EPUB3 play sample with an embedded portrait cover.",
  },
]

function EpubResourceGallery() {
  return (
    <FormatSampleGallery
      intro="Four real EPUB3 files downloaded from Project Gutenberg. Each card previews the embedded cover extracted from the same .epub package, so the visual and downloadable file stay tied together."
      samples={epubSamples}
    />
  )
}

const mobiSamples: FormatGuideSample[] = [
  {
    title: "Dracula MOBI",
    capability: "legacy Kindle",
    dimensions: "MOBI / 197 x 300 cover",
    fileSize: 774_549,
    url: "/samples/mobi/dracula.mobi",
    download: "dracula.mobi",
    previewUrl: "/samples/mobi/dracula-cover.jpg",
    source: "Project Gutenberg",
    sourceUrl: "https://www.gutenberg.org/ebooks/345",
    license: "Project Gutenberg License",
    shape: "portrait",
    aspectRatio: "197 / 300",
    note: "A real Mobipocket file from the Kindle images download, paired with its Gutenberg cover.",
  },
  {
    title: "Sherlock Holmes MOBI",
    capability: "illustrated",
    dimensions: "MOBI / 199 x 299 cover",
    fileSize: 529_315,
    url: "/samples/mobi/sherlock-holmes.mobi",
    download: "sherlock-holmes.mobi",
    previewUrl: "/samples/mobi/sherlock-holmes-cover.jpg",
    source: "Project Gutenberg",
    sourceUrl: "https://www.gutenberg.org/ebooks/1661",
    license: "Project Gutenberg License",
    shape: "portrait",
    aspectRatio: "199 / 299",
    note: "A compact MOBI sample for older Kindle-era reading and converter checks.",
  },
  {
    title: "War of the Worlds MOBI",
    capability: "classic",
    dimensions: "MOBI / 200 x 254 cover",
    fileSize: 362_248,
    url: "/samples/mobi/war-of-the-worlds.mobi",
    download: "war-of-the-worlds.mobi",
    previewUrl: "/samples/mobi/war-of-the-worlds-cover.jpg",
    source: "Project Gutenberg",
    sourceUrl: "https://www.gutenberg.org/ebooks/36",
    license: "Project Gutenberg License",
    shape: "portrait",
    aspectRatio: "200 / 254",
    note: "A small Mobipocket ebook with cover art suitable for legacy-reader tests.",
  },
  {
    title: "A Tale of Two Cities MOBI",
    capability: "large sample",
    dimensions: "MOBI / 199 x 300 cover",
    fileSize: 8_324_413,
    url: "/samples/mobi/tale-two-cities.mobi",
    download: "tale-two-cities.mobi",
    previewUrl: "/samples/mobi/tale-two-cities-cover.jpg",
    source: "Project Gutenberg",
    sourceUrl: "https://www.gutenberg.org/ebooks/98",
    license: "Project Gutenberg License",
    shape: "portrait",
    aspectRatio: "199 / 300",
    note: "A larger MOBI sample useful for archive handling and file-size checks.",
  },
]

function MobiResourceGallery() {
  return (
    <FormatSampleGallery
      intro="Four real Mobipocket files from Project Gutenberg Kindle downloads. Browsers cannot preview MOBI directly, so each card uses the matching Gutenberg cover as a visible fallback."
      samples={mobiSamples}
    />
  )
}

const cbzSamples: FormatGuideSample[] = [
  {
    title: "Dingbat Family CBZ",
    capability: "wide strip",
    dimensions: "1 page / 4654 x 1390",
    fileSize: 1_980_131,
    url: "/samples/cbz/dingbat-family-strip.cbz",
    download: "dingbat-family-strip.cbz",
    previewUrl: "/samples/cbz/dingbat-family-strip-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:The_Dingbat_Family_by_George_Herriman_14_December_1915.jpg",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "4654 / 1390",
    note: "A wide newspaper strip stored in a ZIP archive with CBZ extension.",
  },
  {
    title: "Baron Bean CBZ",
    capability: "strip sample",
    dimensions: "1 page / 1080 x 266",
    fileSize: 70_894,
    url: "/samples/cbz/baron-bean-strip.cbz",
    download: "baron-bean-strip.cbz",
    previewUrl: "/samples/cbz/baron-bean-strip-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Baron_Bean_comic_strip_(1917).jpg",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "1080 / 266",
    note: "A compact black-and-white comic strip packaged as a valid CBZ archive.",
  },
  {
    title: "Little Nemo CBZ",
    capability: "Sunday page",
    dimensions: "1 page / 1760 x 2332",
    fileSize: 723_326,
    url: "/samples/cbz/little-nemo-sunday-page.cbz",
    download: "little-nemo-sunday-page.cbz",
    previewUrl: "/samples/cbz/little-nemo-sunday-page-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Little_Nemo_1906-09-23.jpg",
    license: "Public domain",
    shape: "portrait",
    aspectRatio: "1760 / 2332",
    note: "A real CBZ archive containing one ordered comic page image.",
  },
  {
    title: "Snookums CBZ",
    capability: "comic page",
    dimensions: "1 page / 1171 x 1499",
    fileSize: 1_615_300,
    url: "/samples/cbz/snookums-sunday-page.cbz",
    download: "snookums-sunday-page.cbz",
    previewUrl: "/samples/cbz/snookums-sunday-page-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Snookums_by_George_McManus.jpg",
    license: "Public domain",
    shape: "portrait",
    aspectRatio: "1171 / 1499",
    note: "A public-domain comic page packaged as a CBZ sample.",
  },
]

function CbzResourceGallery() {
  return (
    <FormatSampleGallery
      intro="Four real .cbz archives built from public-domain comic page images. Each file is a ZIP archive with ordered page names, and each preview is the first image from the same archive."
      samples={cbzSamples}
    />
  )
}

const xpsSamples: FormatGuideSample[] = [
  {
    title: "London Map XPS",
    capability: "landscape",
    dimensions: "XPS / 7000 x 3813 source",
    fileSize: 8_215_289,
    url: "/samples/xps/london-map.xps",
    download: "london-map.xps",
    previewUrl: "/samples/xps/london-map-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:1806_Mogg_Pocket_or_Case_Map_of_London,_England_-_Geographicus_-_London-mogg-1806.jpg",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "7000 / 3813",
    note: "A one-page XPS package built from a detailed public-domain map sheet.",
  },
  {
    title: "Declaration XPS",
    capability: "document page",
    dimensions: "XPS / 3923 x 4656 source",
    fileSize: 1_937_338,
    url: "/samples/xps/declaration.xps",
    download: "declaration.xps",
    previewUrl: "/samples/xps/declaration-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:United_States_Declaration_of_Independence.jpg",
    license: "Public domain",
    shape: "portrait",
    aspectRatio: "3923 / 4656",
    note: "A portrait XPS sample made from a real archival document image.",
  },
  {
    title: "Mars Rover XPS",
    capability: "photo page",
    dimensions: "XPS / 630 x 725 source",
    fileSize: 439_505,
    url: "/samples/xps/mars-selfie.xps",
    download: "mars-selfie.xps",
    previewUrl: "/samples/xps/mars-selfie-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Martian_Anniversary_Selfie.jpg",
    license: "Public domain / NASA",
    shape: "portrait",
    aspectRatio: "630 / 725",
    note: "A compact photo-based XPS sample from a NASA Mars rover image.",
  },
  {
    title: "Wright Flyer XPS",
    capability: "historic photo",
    dimensions: "XPS / 1421 x 1080 source",
    fileSize: 529_773,
    url: "/samples/xps/wright-flyer.xps",
    download: "wright-flyer.xps",
    previewUrl: "/samples/xps/wright-flyer-cover.jpg",
    source: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:1904-10-04_Huffman-Prairie_WrightFlyerIII.jpg",
    license: "Public domain",
    shape: "wide",
    aspectRatio: "1421 / 1080",
    note: "A landscape XPS sample made from a public-domain aviation photograph.",
  },
]

function XpsResourceGallery() {
  return (
    <FormatSampleGallery
      intro="Four real .xps packages built from separate public-domain source images. Browsers usually cannot render XPS directly, so each card uses a cover derived from the same source page."
      samples={xpsSamples}
    />
  )
}

const epsSamples: FormatGuideSample[] = [
  {
    title: "Download Files EPS",
    capability: "concept art",
    dimensions: "EPS / 600 x 600 cover",
    fileSize: 815_954,
    url: "/samples/eps/download-files-concept.eps",
    download: "download-files-concept.eps",
    previewUrl: "/samples/eps/download-files-concept-cover.jpg",
    source: "Public Domain Vectors",
    sourceUrl: "https://publicdomainvectors.org/en/free-clipart/Download-files-concept/92540.html",
    license: "Public domain / CC0",
    shape: "square",
    aspectRatio: "600 / 600",
    note: "A real EPS illustration for checking square concept artwork and embedded preview handling.",
  },
  {
    title: "Hand Holding Book EPS",
    capability: "editorial",
    dimensions: "EPS / 600 x 600 cover",
    fileSize: 1_092_358,
    url: "/samples/eps/hand-holding-book.eps",
    download: "hand-holding-book.eps",
    previewUrl: "/samples/eps/hand-holding-book-cover.jpg",
    source: "Public Domain Vectors",
    sourceUrl: "https://publicdomainvectors.org/en/free-clipart/Hand-holding-a-big-book/92548.html",
    license: "Public domain / CC0",
    shape: "square",
    aspectRatio: "600 / 600",
    note: "A detailed EPS illustration with flat shapes, text-line details, and a square preview.",
  },
  {
    title: "Credit Card Payment EPS",
    capability: "commerce",
    dimensions: "EPS / 500 x 500 cover",
    fileSize: 1_039_191,
    url: "/samples/eps/credit-card-payment.eps",
    download: "credit-card-payment.eps",
    previewUrl: "/samples/eps/credit-card-payment-cover.jpg",
    source: "Public Domain Vectors",
    sourceUrl:
      "https://publicdomainvectors.org/en/free-clipart/Credit-card-payment-concept/92324.html",
    license: "Public domain / CC0",
    shape: "square",
    aspectRatio: "500 / 500",
    note: "A payment-terminal EPS sample useful for modern illustration and prepress import checks.",
  },
  {
    title: "Halftone Shape EPS",
    capability: "print texture",
    dimensions: "EPS / 500 x 500 cover",
    fileSize: 2_815_166,
    url: "/samples/eps/halftone-shape.eps",
    download: "halftone-shape.eps",
    previewUrl: "/samples/eps/halftone-shape-cover.jpg",
    source: "Public Domain Vectors",
    sourceUrl: "https://publicdomainvectors.org/en/free-clipart/Halftone-vector-shape/1361.html",
    license: "Public domain / CC0",
    shape: "square",
    aspectRatio: "500 / 500",
    note: "A larger EPS with dense halftone geometry for checking vector complexity and print-style detail.",
  },
]

function EpsResourceGallery() {
  return (
    <FormatSampleGallery
      intro="Four real public-domain EPS files from separate vector downloads. Each preview uses the source-provided raster cover because browsers do not render EPS directly."
      samples={epsSamples}
    />
  )
}

const aiSamples: FormatGuideSample[] = [
  {
    title: "Internet Search AI",
    capability: "web concept",
    dimensions: "AI / 660 x 660 cover",
    fileSize: 118_401,
    url: "/samples/ai/concept-search.ai",
    download: "concept-search.ai",
    previewUrl: "/samples/ai/concept-search-cover.jpg",
    source: "Public Domain Vectors",
    sourceUrl:
      "https://publicdomainvectors.org/en/free-clipart/Concept-of-Internet-search/92512.html",
    license: "Public domain / CC0",
    shape: "square",
    aspectRatio: "660 / 660",
    note: "A PDF-compatible Illustrator file with a web-search illustration and a square source cover.",
  },
  {
    title: "Time Management AI",
    capability: "dashboard concept",
    dimensions: "AI / 600 x 600 cover",
    fileSize: 104_714,
    url: "/samples/ai/time-management.ai",
    download: "time-management.ai",
    previewUrl: "/samples/ai/time-management-cover.jpg",
    source: "Public Domain Vectors",
    sourceUrl: "https://publicdomainvectors.org/en/free-clipart/Time-managment/92495.html",
    license: "Public domain / CC0",
    shape: "square",
    aspectRatio: "600 / 600",
    note: "A compact Illustrator sample for checking PDF-compatible AI import and preview metadata.",
  },
  {
    title: "Cleaning Rag AI",
    capability: "full-bleed color",
    dimensions: "AI / 660 x 660 cover",
    fileSize: 266_437,
    url: "/samples/ai/cleaning-rag.ai",
    download: "cleaning-rag.ai",
    previewUrl: "/samples/ai/cleaning-rag-cover.jpg",
    source: "Public Domain Vectors",
    sourceUrl:
      "https://publicdomainvectors.org/en/free-clipart/Hand-with-a-cleaning-rag/92524.html",
    license: "Public domain / CC0",
    shape: "square",
    aspectRatio: "660 / 660",
    note: "A brighter Illustrator file with large flat shapes and a denser color field.",
  },
  {
    title: "Automatic Hand AI",
    capability: "object scene",
    dimensions: "AI / 500 x 500 cover",
    fileSize: 105_709,
    url: "/samples/ai/automatic-hand.ai",
    download: "automatic-hand.ai",
    previewUrl: "/samples/ai/automatic-hand-cover.jpg",
    source: "Public Domain Vectors",
    sourceUrl: "https://publicdomainvectors.org/en/free-clipart/Automatic-hand/92380.html",
    license: "Public domain / CC0",
    shape: "square",
    aspectRatio: "500 / 500",
    note: "A PDF-compatible AI sample with isolated machinery artwork and simple object layers.",
  },
]

function AiResourceGallery() {
  return (
    <FormatSampleGallery
      intro="Four real public-domain Adobe Illustrator files from fresh vector downloads. Browser previews use the source-provided covers because .ai files are not web-renderable."
      samples={aiSamples}
    />
  )
}

const tarSamples: FormatGuideSample[] = [
  {
    title: "GNU hello Source TAR.GZ",
    capability: "source release",
    dimensions: "538 entries / tar.gz",
    fileSize: 1_168_515,
    url: "/samples/tar/hello-2.12.2.tar.gz",
    download: "hello-2.12.2.tar.gz",
    previewUrl: "/samples/tar/hello-2.12.2-cover.png",
    source: "GNU FTP",
    sourceUrl: "https://ftp.gnu.org/gnu/hello/",
    license: "GPL-3.0-or-later",
    shape: "square",
    aspectRatio: "1200 / 1200",
    note: "A full GNU source release archive with build files, translations, and documentation.",
  },
  {
    title: "Lua 5.4.8 TAR.GZ",
    capability: "language source",
    dimensions: "78 entries / tar.gz",
    fileSize: 374_332,
    url: "/samples/tar/lua-5.4.8.tar.gz",
    download: "lua-5.4.8.tar.gz",
    previewUrl: "/samples/tar/lua-5.4.8-cover.png",
    source: "Lua.org",
    sourceUrl: "https://www.lua.org/ftp/",
    license: "MIT",
    shape: "square",
    aspectRatio: "1200 / 1200",
    note: "A compact language source archive with C sources, headers, manuals, and docs.",
  },
  {
    title: "is-number NPM TGZ",
    capability: "tiny package",
    dimensions: "4 entries / tgz",
    fileSize: 3_730,
    url: "/samples/tar/is-number-7.0.0.tgz",
    download: "is-number-7.0.0.tgz",
    previewUrl: "/samples/tar/is-number-7.0.0-cover.png",
    source: "npm Registry",
    sourceUrl: "https://www.npmjs.com/package/is-number/v/7.0.0",
    license: "MIT",
    shape: "square",
    aspectRatio: "1200 / 1200",
    note: "A very small npm tarball useful for checking package-root paths and metadata.",
  },
  {
    title: "picocolors NPM TGZ",
    capability: "typed package",
    dimensions: "7 entries / tgz",
    fileSize: 2_625,
    url: "/samples/tar/picocolors-1.1.1.tgz",
    download: "picocolors-1.1.1.tgz",
    previewUrl: "/samples/tar/picocolors-1.1.1-cover.png",
    source: "npm Registry",
    sourceUrl: "https://www.npmjs.com/package/picocolors/v/1.1.1",
    license: "ISC",
    shape: "square",
    aspectRatio: "1200 / 1200",
    note: "A small JavaScript package archive with browser, Node, and TypeScript definition files.",
  },
]

function TarResourceGallery() {
  return (
    <FormatSampleGallery
      intro="Four real compressed tar archives from package registries and official source releases. Each preview is generated from the actual archive file list, so the cover reflects the downloaded tarball contents."
      samples={tarSamples}
    />
  )
}

const sevenZSamples: FormatGuideSample[] = [
  {
    title: "7-Zip 26.01 Source",
    capability: "source archive",
    dimensions: "1292 entries / 7z",
    fileSize: 1_530_276,
    url: "/samples/7z/7z2601-src.7z",
    download: "7z2601-src.7z",
    previewUrl: "/samples/7z/7z2601-src-cover.png",
    source: "7-Zip GitHub Releases",
    sourceUrl: "https://github.com/ip7z/7zip/releases/tag/26.01",
    license: "LGPL / BSD / public domain components",
    shape: "square",
    aspectRatio: "1200 / 1200",
    note: "A large official 7-Zip source archive with C, C++, assembly, resources, and build files.",
  },
  {
    title: "LZMA SDK 26.01",
    capability: "SDK archive",
    dimensions: "715 entries / 7z",
    fileSize: 1_782_428,
    url: "/samples/7z/lzma2601-sdk.7z",
    download: "lzma2601-sdk.7z",
    previewUrl: "/samples/7z/lzma2601-sdk-cover.png",
    source: "7-Zip GitHub Releases",
    sourceUrl: "https://github.com/ip7z/7zip/releases/tag/26.01",
    license: "Public domain / 7-Zip SDK terms",
    shape: "square",
    aspectRatio: "1200 / 1200",
    note: "An official LZMA SDK archive with compression sources, headers, examples, and docs.",
  },
  {
    title: "7-Zip 26.01 Extra",
    capability: "binary package",
    dimensions: "23 entries / 7z",
    fileSize: 1_759_805,
    url: "/samples/7z/7z2601-extra.7z",
    download: "7z2601-extra.7z",
    previewUrl: "/samples/7z/7z2601-extra-cover.png",
    source: "7-Zip GitHub Releases",
    sourceUrl: "https://github.com/ip7z/7zip/releases/tag/26.01",
    license: "LGPL / 7-Zip license",
    shape: "square",
    aspectRatio: "1200 / 1200",
    note: "A current official extra package with DLLs, command-line binaries, help, and FAR files.",
  },
  {
    title: "7-Zip 23.01 Extra",
    capability: "older package",
    dimensions: "18 entries / 7z",
    fileSize: 1_027_828,
    url: "/samples/7z/7z2301-extra.7z",
    download: "7z2301-extra.7z",
    previewUrl: "/samples/7z/7z2301-extra-cover.png",
    source: "7-Zip.org",
    sourceUrl: "https://www.7-zip.org/a/7z2301-extra.7z",
    license: "LGPL / 7-Zip license",
    shape: "square",
    aspectRatio: "1200 / 1200",
    note: "An older official extra package for comparing archive contents across 7-Zip releases.",
  },
]

function SevenZResourceGallery() {
  return (
    <FormatSampleGallery
      intro="Four real .7z archives from official 7-Zip release downloads. Each preview is generated from the actual archive listing, so it shows real entries and file-type counts instead of a generic archive icon."
      samples={sevenZSamples}
    />
  )
}

const csvSamples: FormatGuideSample[] = [
  {
    title: "World Population CSV",
    capability: "large table",
    dimensions: "17195 rows / 4 columns",
    fileSize: 552_112,
    url: "/samples/csv/population.csv",
    download: "population.csv",
    previewUrl: "/samples/csv/population-cover.png",
    source: "DataHub",
    sourceUrl: "https://github.com/datasets/population",
    license: "PDDL",
    shape: "square",
    aspectRatio: "1200 / 1200",
    note: "A country-year population table with many rows and a compact four-column schema.",
  },
  {
    title: "Taxi Trips CSV",
    capability: "wide table",
    dimensions: "6433 rows / 14 columns",
    fileSize: 869_349,
    url: "/samples/csv/taxis.csv",
    download: "taxis.csv",
    previewUrl: "/samples/csv/taxis-cover.png",
    source: "seaborn-data",
    sourceUrl: "https://github.com/mwaskom/seaborn-data/blob/master/taxis.csv",
    license: "BSD-3-Clause",
    shape: "square",
    aspectRatio: "1200 / 1200",
    note: "A wider CSV with timestamps, numeric amounts, payment labels, and location fields.",
  },
  {
    title: "Seattle Weather CSV",
    capability: "time series",
    dimensions: "1461 rows / 6 columns",
    fileSize: 48_219,
    url: "/samples/csv/seattle-weather.csv",
    download: "seattle-weather.csv",
    previewUrl: "/samples/csv/seattle-weather-cover.png",
    source: "vega-datasets",
    sourceUrl: "https://github.com/vega/vega-datasets/blob/main/data/seattle-weather.csv",
    license: "BSD-3-Clause",
    shape: "square",
    aspectRatio: "1200 / 1200",
    note: "A weather time-series CSV with dates, numeric measurements, and categorical labels.",
  },
  {
    title: "Stock Prices CSV",
    capability: "compact series",
    dimensions: "559 rows / 3 columns",
    fileSize: 12_245,
    url: "/samples/csv/stocks.csv",
    download: "stocks.csv",
    previewUrl: "/samples/csv/stocks-cover.png",
    source: "vega-datasets",
    sourceUrl: "https://github.com/vega/vega-datasets/blob/main/data/stocks.csv",
    license: "BSD-3-Clause",
    shape: "square",
    aspectRatio: "1200 / 1200",
    note: "A small long-form CSV with a symbol column, date strings, and numeric prices.",
  },
]

function CsvResourceGallery() {
  return (
    <FormatSampleGallery
      intro="Four real CSV datasets from public repositories. Each preview is generated from the actual header and first rows, so it shows the shape of the downloaded table rather than a generic spreadsheet icon."
      samples={csvSamples}
    />
  )
}

const jsonlSamples: FormatGuideSample[] = [
  {
    title: "GSM8K Messages JSONL",
    capability: "nested records",
    dimensions: "1000 lines / 2 keys",
    fileSize: 2_523_181,
    url: "/samples/jsonl/gsm8k-sample.jsonl",
    download: "gsm8k-sample.jsonl",
    previewUrl: "/samples/jsonl/gsm8k-sample-cover.png",
    source: "Eval Protocol",
    sourceUrl:
      "https://github.com/eval-protocol/python-sdk/blob/main/development/gsm8k_sample.jsonl",
    license: "MIT",
    shape: "square",
    aspectRatio: "1200 / 1200",
    note: "A real JSONL sample where each record stores nested chat messages and a ground-truth answer.",
  },
  {
    title: "Spec-Bench Questions JSONL",
    capability: "benchmark",
    dimensions: "480 lines / 3 keys",
    fileSize: 698_768,
    url: "/samples/jsonl/spec-bench-questions.jsonl",
    download: "spec-bench-questions.jsonl",
    previewUrl: "/samples/jsonl/spec-bench-questions-cover.png",
    source: "Spec-Bench",
    sourceUrl: "https://github.com/hemingkx/Spec-Bench/blob/main/data/spec_bench/question.jsonl",
    license: "Apache-2.0",
    shape: "square",
    aspectRatio: "1200 / 1200",
    note: "A benchmark question stream with category labels and multi-turn prompt arrays.",
  },
  {
    title: "Text Generation Pairs JSONL",
    capability: "input/output",
    dimensions: "142 lines / 2 keys",
    fileSize: 15_894,
    url: "/samples/jsonl/model-forge-text.jsonl",
    download: "model-forge-text.jsonl",
    previewUrl: "/samples/jsonl/model-forge-text-cover.png",
    source: "ModelForge",
    sourceUrl:
      "https://github.com/RETR0-OS/ModelForge/blob/main/ModelForge/test_datasets/low_text_generation.jsonl",
    license: "BSD-3-Clause",
    shape: "square",
    aspectRatio: "1200 / 1200",
    note: "A compact JSONL file with one input and one output string per line.",
  },
  {
    title: "Summary Pairs JSONL",
    capability: "summaries",
    dimensions: "100 lines / 2 keys",
    fileSize: 40_739,
    url: "/samples/jsonl/model-forge-summary.jsonl",
    download: "model-forge-summary.jsonl",
    previewUrl: "/samples/jsonl/model-forge-summary-cover.png",
    source: "ModelForge",
    sourceUrl:
      "https://github.com/RETR0-OS/ModelForge/blob/main/ModelForge/test_datasets/low_summarization_train_set.jsonl",
    license: "BSD-3-Clause",
    shape: "square",
    aspectRatio: "1200 / 1200",
    note: "A summarization dataset where each line contains an article and its summary.",
  },
]

function JsonlResourceGallery() {
  return (
    <FormatSampleGallery
      intro="Four real JSONL files from public repositories. Each preview is generated from valid one-line JSON records, showing top-level keys and the first records instead of a generic code icon."
      samples={jsonlSamples}
    />
  )
}

const make = (manifest: FormatManifest): FormatManifest => manifest

export const longTailFormats: FormatManifest[] = [
  make({
    slug: "bmp",
    category: "image",
    name: "BMP",
    fullName: "Bitmap Image File",
    year: 1987,
    extensions: ["bmp", "dib"],
    mimeTypes: ["image/bmp"],
    standard: "Microsoft Windows bitmap / DIB",
    tagline:
      "An old Windows raster format that is easy to decode but usually much larger than PNG or JPG.",
    description:
      "BMP stores bitmap pixels in a simple Windows-oriented container. It is useful for legacy software, but it is rarely a good delivery format because many BMP files are uncompressed and can be very large.\n\nUse BMP when a legacy app demands it. Convert it to PNG for lossless sharing or JPG/WebP when the image is photographic.",
    pros: [
      "Simple structure",
      "Widely understood by desktop image tools",
      "Can store lossless pixel data",
    ],
    cons: ["Often very large", "Poor fit for the web", "Limited modern workflow advantages"],
    comparison: [
      {
        vs: "PNG",
        sizeRatio: "PNG is usually smaller",
        quality: "Both can be lossless",
        note: "PNG is better for sharing and web use.",
      },
      {
        vs: "JPG",
        sizeRatio: "JPG is much smaller for photos",
        quality: "JPG is lossy",
        note: "Use JPG for photos that do not need lossless pixels.",
      },
    ],
    support: {
      os: ["Windows native", "macOS Preview", "Linux image viewers"],
      browsers: [
        "Chrome / Edge support BMP images",
        "Firefox support varies by platform",
        "Safari support varies",
      ],
      apps: ["Photoshop", "GIMP", "IrfanView", "Paint"],
    },
    keywords: ["bmp file format", "bitmap image", "bmp vs png", "open bmp file"],
    relatedTools: ["image-compressor", "jpg-to-png"],
    relatedFormats: ["png", "tiff", "webp"],
    faq: [
      {
        q: "Should I upload BMP to a website?",
        a: "Usually no. Convert BMP to PNG for graphics or JPG/WebP for photos first.",
      },
      {
        q: "Why is my BMP so large?",
        a: "Many BMP files store raw or lightly compressed pixels, so file size grows directly with width, height, and color depth.",
      },
    ],
    sources: [mdnImages, locBmp],
    lastUpdated: updated,
    Component: BmpResourceGallery,
  }),
  make({
    slug: "psd",
    category: "image",
    name: "PSD",
    fullName: "Adobe Photoshop Document",
    year: 1990,
    extensions: ["psd", "psb"],
    mimeTypes: ["image/vnd.adobe.photoshop", "application/octet-stream"],
    standard: "Adobe Photoshop native document format",
    tagline:
      "Photoshop's layered working file format for editable designs, masks, text, and effects.",
    description:
      "PSD is a working format, not a final web image. It preserves layers, masks, adjustment layers, text, channels, and other Photoshop editing data.\n\nUse PSD when you need to continue editing. Export to PNG, JPG, WebP, SVG, or PDF when you need to publish or share a flattened result.",
    pros: [
      "Preserves editable Photoshop layers",
      "Supports masks, text, channels, and effects",
      "Common in design handoff",
    ],
    cons: [
      "Large files",
      "Limited support outside design apps",
      "Not browser-renderable as an image",
    ],
    comparison: [
      {
        vs: "PNG",
        sizeRatio: "PNG is smaller after flattening",
        quality: "PNG is final output",
        note: "PNG cannot preserve editable Photoshop layers.",
      },
      {
        vs: "TIFF",
        sizeRatio: "Varies",
        quality: "Both can preserve high quality",
        note: "TIFF is better for archival or print interchange.",
      },
    ],
    support: {
      os: ["Requires an app to open fully", "Preview support is limited"],
      browsers: ["Browsers do not render PSD directly"],
      apps: ["Adobe Photoshop", "Affinity Photo", "Photopea", "GIMP with limitations"],
    },
    keywords: ["psd file", "photoshop document", "psd vs png", "open psd online"],
    relatedTools: ["image-compressor"],
    relatedFormats: ["tiff", "png", "webp"],
    faq: [
      {
        q: "Can browsers display PSD?",
        a: "No. Export a flattened image such as PNG, JPG, or WebP for browsers.",
      },
      {
        q: "Is PSD good for final delivery?",
        a: "Only when the receiver needs editability. For publishing, export a smaller final format.",
      },
    ],
    sources: [
      {
        title: "Adobe Photoshop file formats",
        url: "https://helpx.adobe.com/photoshop/using/file-formats.html",
        note: "Photoshop format capabilities and usage",
      },
      locPsd,
    ],
    lastUpdated: updated,
    Component: PsdResourceGallery,
  }),
  make({
    slug: "dng",
    category: "image",
    name: "DNG",
    fullName: "Digital Negative",
    year: 2004,
    extensions: ["dng"],
    mimeTypes: ["image/x-adobe-dng"],
    standard: "Adobe Digital Negative specification",
    tagline: "Adobe's open raw photo container designed for long-term camera raw storage.",
    description:
      "DNG is a camera raw container. It keeps sensor-oriented image data and metadata so photographers can edit exposure, white balance, color, and detail later.\n\nUse DNG for archival raw workflows. Export JPG, PNG, AVIF, or WebP when you need a viewable or uploadable image.",
    pros: [
      "Designed for raw photo preservation",
      "Carries rich camera metadata",
      "Supported by many photo editors",
    ],
    cons: [
      "Large files",
      "Not directly accepted by most websites",
      "Needs raw-processing software",
    ],
    comparison: [
      {
        vs: "JPG",
        sizeRatio: "DNG is much larger",
        quality: "DNG preserves raw editing latitude",
        note: "JPG is final output; DNG is a working negative.",
      },
      {
        vs: "TIFF",
        sizeRatio: "Varies",
        quality: "TIFF is rendered pixels",
        note: "TIFF is better for interchange after raw development.",
      },
    ],
    support: {
      os: [
        "macOS Preview support varies",
        "Windows needs codecs or photo apps",
        "Linux via raw tools",
      ],
      browsers: ["Browsers do not render DNG directly"],
      apps: ["Adobe Lightroom", "Photoshop / Camera Raw", "darktable", "RawTherapee"],
    },
    keywords: ["dng file", "digital negative", "raw photo format", "dng vs jpg"],
    relatedTools: ["image-compressor"],
    relatedFormats: ["tiff", "jpg", "heic"],
    faq: [
      {
        q: "Is DNG the same as RAW?",
        a: "DNG is a raw container. Camera vendors also have proprietary raw formats such as CR2, NEF, ARW, and RAF.",
      },
      {
        q: "Can I upload DNG to social media?",
        a: "Usually no. Export a JPG or WebP after editing.",
      },
    ],
    sources: [
      {
        title: "Adobe Digital Negative specification",
        url: "https://helpx.adobe.com/camera-raw/digital-negative.html",
        note: "DNG purpose and specification downloads",
      },
      locDng,
    ],
    lastUpdated: updated,
    Component: DngResourceGallery,
  }),
  make({
    slug: "raw",
    category: "image",
    name: "RAW",
    fullName: "Camera RAW formats",
    year: 1997,
    extensions: ["raw", "cr2", "nef", "arw", "raf", "orf", "rw2"],
    mimeTypes: ["image/x-canon-cr2", "image/x-nikon-nef", "image/x-sony-arw"],
    standard: "Format family: vendor-specific camera raw files",
    tagline:
      "A family of vendor-specific camera sensor files used before a photo is rendered into JPG, TIFF, or WebP.",
    description:
      "RAW is not one single file format. It is a category of camera vendor formats, such as Canon CR2, Nikon NEF, Sony ARW, Fujifilm RAF, Olympus ORF, and Panasonic RW2.\n\nUse RAW when you need maximum editing latitude. Export a normal image format when you need compatibility, previews, or upload support.",
    pros: [
      "Maximum photo editing flexibility",
      "Preserves camera metadata",
      "Best source for serious photo editing",
    ],
    cons: ["Vendor-specific variants", "Large files", "Poor browser and website support"],
    comparison: [
      {
        vs: "DNG",
        sizeRatio: "Varies",
        quality: "Both are raw workflows",
        note: "DNG is a more standardized container; proprietary RAW keeps vendor-specific behavior.",
      },
      {
        vs: "JPG",
        sizeRatio: "RAW is much larger",
        quality: "RAW has more editing latitude",
        note: "JPG is ready to share but much less flexible.",
      },
    ],
    support: {
      os: ["macOS and Windows support depends on camera codec", "Linux via raw libraries"],
      browsers: ["Browsers do not render raw camera files directly"],
      apps: ["Lightroom", "Capture One", "darktable", "RawTherapee", "Photoshop Camera Raw"],
    },
    keywords: ["raw photo format", "camera raw file", "raw vs jpg", "open raw file"],
    relatedTools: ["image-compressor"],
    relatedFormats: ["dng", "tiff", "jpg"],
    faq: [
      {
        q: "Why are RAW files not consistent?",
        a: "Camera makers define their own raw containers and metadata, so support depends on the camera model and app.",
      },
      {
        q: "Should I convert RAW to JPG?",
        a: "Convert only after editing or when you need to share the image. Keep the RAW if you may edit again.",
      },
    ],
    sources: [
      locRaw,
      {
        title: "Adobe Camera Raw supported cameras",
        url: "https://helpx.adobe.com/camera-raw/kb/camera-raw-plug-supported-cameras.html",
        note: "shows vendor-specific raw support by camera model",
      },
    ],
    lastUpdated: updated,
    Component: RawResourceGallery,
  }),
  make({
    slug: "mkv",
    category: "video",
    name: "MKV",
    fullName: "Matroska Video",
    year: 2002,
    extensions: ["mkv"],
    mimeTypes: ["video/x-matroska"],
    standard: "Matroska multimedia container",
    tagline:
      "A flexible open video container often used for high-quality movies, subtitles, and multiple audio tracks.",
    description:
      "MKV is a container, not a codec. It can hold video, audio, subtitles, chapters, attachments, and metadata in one file.\n\nUse MKV when you need a rich local media container. Convert to MP4 or WebM when you need broad browser or platform upload support.",
    pros: [
      "Supports many codecs and subtitle tracks",
      "Good for local libraries and archival video",
      "Open container design",
    ],
    cons: [
      "Not accepted by many web upload forms",
      "Browser playback is limited",
      "Compatibility depends on the codecs inside",
    ],
    comparison: [
      {
        vs: "MP4",
        sizeRatio: "Similar with same codec",
        quality: "Container does not set quality",
        note: "MP4 wins on device and browser compatibility.",
      },
      {
        vs: "WebM",
        sizeRatio: "Similar with same bitrate",
        quality: "Depends on codec",
        note: "WebM is more web-focused; MKV is more flexible.",
      },
    ],
    support: {
      os: ["Windows with Movies & TV or codecs", "macOS via VLC/IINA", "Linux media players"],
      browsers: [
        "Limited direct browser support",
        "Chrome may play some codec combinations",
        "Safari support is poor",
      ],
      apps: ["VLC", "IINA", "mpv", "Plex", "HandBrake"],
    },
    keywords: ["mkv file", "matroska video", "mkv vs mp4", "open mkv"],
    relatedTools: ["video-compress", "mp4-to-gif"],
    relatedFormats: ["webm", "mov", "avi"],
    faq: [
      {
        q: "Why will one MKV play and another fail?",
        a: "MKV is only the container. Playback also depends on the video and audio codecs stored inside it.",
      },
      { q: "Is MKV good for websites?", a: "Usually no. Convert to MP4 or WebM for web delivery." },
    ],
    sources: [
      {
        title: "Matroska official documentation",
        url: "https://www.matroska.org/technical/notes.html",
        note: "Matroska container design and technical notes",
      },
      locMkv,
    ],
    lastUpdated: updated,
    Component: MkvResourceGallery,
  }),
  make({
    slug: "mov",
    category: "video",
    name: "MOV",
    fullName: "QuickTime Movie",
    year: 1991,
    extensions: ["mov", "qt"],
    mimeTypes: ["video/quicktime"],
    standard: "Apple QuickTime File Format",
    tagline:
      "Apple's QuickTime movie container, common in camera exports, editing apps, and macOS workflows.",
    description:
      "MOV is a QuickTime container. Like MP4 and MKV, its actual compatibility depends on the codecs stored inside.\n\nUse MOV for editing handoff and Apple-centric workflows. Export MP4 or WebM for easier web playback and uploads.",
    pros: [
      "Strong support in Apple and editing workflows",
      "Can store high-quality mezzanine video",
      "Useful for camera and NLE exports",
    ],
    cons: [
      "Large files are common",
      "Upload support varies",
      "Codec compatibility can be confusing",
    ],
    comparison: [
      {
        vs: "MP4",
        sizeRatio: "Similar with same codec",
        quality: "Container does not set quality",
        note: "MP4 is the safer final-delivery choice.",
      },
      {
        vs: "M4V",
        sizeRatio: "Similar",
        quality: "Similar container family",
        note: "M4V is more Apple media-library oriented.",
      },
    ],
    support: {
      os: ["macOS native", "Windows with compatible codecs", "Linux via VLC/mpv"],
      browsers: [
        "Safari handles common MOV/QuickTime combinations",
        "Chrome/Firefox support depends on codecs",
      ],
      apps: ["QuickTime Player", "Final Cut Pro", "Premiere Pro", "DaVinci Resolve", "VLC"],
    },
    keywords: ["mov file", "quicktime movie", "mov vs mp4", "open mov"],
    relatedTools: ["video-compress", "mp4-to-gif"],
    relatedFormats: ["m4v", "mkv", "webm"],
    faq: [
      {
        q: "Is MOV better than MP4?",
        a: "Not inherently. MOV is common for editing and Apple workflows; MP4 is usually better for sharing.",
      },
      {
        q: "Why is my MOV so large?",
        a: "Editing exports may use high bitrates or mezzanine codecs intended to preserve quality.",
      },
    ],
    sources: [
      {
        title: "Apple QuickTime File Format",
        url: "https://developer.apple.com/documentation/quicktime-file-format",
        note: "QuickTime container reference",
      },
      locMov,
    ],
    lastUpdated: updated,
    Component: MovResourceGallery,
  }),
  make({
    slug: "m4v",
    category: "video",
    name: "M4V",
    fullName: "MPEG-4 Video",
    year: 2001,
    extensions: ["m4v"],
    mimeTypes: ["video/x-m4v", "video/mp4"],
    standard: "MPEG-4 Part 14 derivative used by Apple",
    tagline:
      "An MP4-like video container commonly associated with Apple media libraries and video downloads.",
    description:
      "M4V is closely related to MP4 and is often used by Apple software for video files. Many M4V files can be renamed or remuxed for MP4 workflows, but DRM or codec choices can still limit playback.\n\nUse M4V when working inside Apple media ecosystems. Use MP4 for general sharing.",
    pros: [
      "Good Apple ecosystem support",
      "Can use common MP4-style codecs",
      "Works well for local media libraries",
    ],
    cons: [
      "Less universally recognized than MP4",
      "Some files may include DRM",
      "Browser behavior depends on codecs",
    ],
    comparison: [
      {
        vs: "MP4",
        sizeRatio: "Usually similar",
        quality: "Usually similar",
        note: "MP4 is the more universal extension.",
      },
      {
        vs: "MOV",
        sizeRatio: "Usually smaller for delivery",
        quality: "Depends on export settings",
        note: "MOV is more common for editing sources.",
      },
    ],
    support: {
      os: ["macOS and iOS native", "Windows support depends on player", "Linux via VLC/mpv"],
      browsers: [
        "Often behaves like MP4 when codecs are supported",
        "DRM files will not play generically",
      ],
      apps: ["Apple TV", "QuickTime Player", "VLC", "HandBrake"],
    },
    keywords: ["m4v file", "m4v vs mp4", "open m4v", "apple video format"],
    relatedTools: ["video-compress", "mp4-to-gif"],
    relatedFormats: ["mov", "webm", "mkv"],
    faq: [
      {
        q: "Can I rename M4V to MP4?",
        a: "Sometimes, but remuxing is safer. DRM-protected files still will not become normal MP4 files.",
      },
      { q: "Should I upload M4V?", a: "If an upload form rejects it, export or remux to MP4." },
    ],
    sources: [
      {
        title: "IANA media type video/mp4",
        url: "https://www.iana.org/assignments/media-types/video/mp4",
        note: "registered MP4 media type used by MP4-like containers",
      },
      locMpeg4,
    ],
    lastUpdated: updated,
    Component: M4vResourceGallery,
  }),
  make({
    slug: "avi",
    category: "video",
    name: "AVI",
    fullName: "Audio Video Interleave",
    year: 1992,
    extensions: ["avi"],
    mimeTypes: ["video/x-msvideo"],
    standard: "Microsoft RIFF AVI",
    tagline:
      "An older Windows video container that still appears in legacy cameras, screen recorders, and archives.",
    description:
      "AVI is a Microsoft container from the early Windows multimedia era. It can hold many codec combinations, which is why old AVI files often need VLC or conversion.\n\nUse AVI for compatibility with legacy devices. Convert to MP4 or WebM for modern sharing.",
    pros: [
      "Recognized by many desktop tools",
      "Common in legacy archives",
      "Simple container model",
    ],
    cons: [
      "Poor fit for modern streaming",
      "Codec support is unpredictable",
      "Large files are common",
    ],
    comparison: [
      {
        vs: "MP4",
        sizeRatio: "MP4 is usually smaller",
        quality: "Depends on codec",
        note: "MP4 is better for modern playback and uploads.",
      },
      {
        vs: "MKV",
        sizeRatio: "Varies",
        quality: "Depends on codec",
        note: "MKV is more flexible for subtitles and modern metadata.",
      },
    ],
    support: {
      os: ["Windows native for supported codecs", "macOS via VLC/IINA", "Linux via VLC/mpv"],
      browsers: ["Browsers generally do not use AVI for web playback"],
      apps: ["VLC", "VirtualDub", "FFmpeg", "HandBrake"],
    },
    keywords: ["avi file", "audio video interleave", "avi vs mp4", "open avi"],
    relatedTools: ["video-compress", "mp4-to-gif"],
    relatedFormats: ["mkv", "mov", "webm"],
    faq: [
      {
        q: "Why does AVI need a codec?",
        a: "AVI can contain many older codecs. The player must support the codec inside, not just the .avi extension.",
      },
      {
        q: "Is AVI still useful?",
        a: "Mostly for legacy files. MP4 or WebM are better for new exports.",
      },
    ],
    sources: [
      {
        title: "Microsoft AVI RIFF file reference",
        url: "https://learn.microsoft.com/en-us/windows/win32/directshow/avi-riff-file-reference",
        note: "AVI container structure and RIFF basis",
      },
      locAvi,
    ],
    lastUpdated: updated,
    Component: AviResourceGallery,
  }),
  make({
    slug: "flac",
    category: "audio",
    name: "FLAC",
    fullName: "Free Lossless Audio Codec",
    year: 2001,
    extensions: ["flac"],
    mimeTypes: ["audio/flac", "audio/x-flac"],
    standard: "Xiph.Org FLAC format",
    tagline: "A lossless audio format for preserving music quality while still reducing file size.",
    description:
      "FLAC compresses audio without throwing away information. It is a good archive format for music, recordings, and source audio.\n\nUse FLAC when quality preservation matters. Convert to AAC, Opus, or MP3 when file size and device compatibility matter more.",
    pros: ["Lossless audio compression", "Open and widely supported", "Good metadata support"],
    cons: [
      "Larger than lossy formats",
      "Not ideal for tiny uploads",
      "Some older devices do not support it",
    ],
    comparison: [
      {
        vs: "MP3/AAC",
        sizeRatio: "FLAC is larger",
        quality: "FLAC is lossless",
        note: "Use lossy formats for smaller listening copies.",
      },
      {
        vs: "WAV",
        sizeRatio: "FLAC is smaller",
        quality: "Both can be lossless",
        note: "FLAC is usually better for storage.",
      },
    ],
    support: {
      os: ["Windows 10+", "macOS via Music/Finder support varies", "Linux native players"],
      browsers: ["Chrome / Edge / Firefox support FLAC", "Safari support varies by version"],
      apps: ["VLC", "foobar2000", "Audacity", "MusicBee", "Plex"],
    },
    keywords: ["flac file", "lossless audio", "flac vs mp3", "open flac"],
    relatedTools: ["audio-extract"],
    relatedFormats: ["ogg", "opus", "m4a"],
    faq: [
      {
        q: "Is FLAC better than MP3?",
        a: "For preservation, yes. For small listening copies, MP3/AAC/Opus are usually smaller.",
      },
      {
        q: "Can FLAC be converted without quality loss?",
        a: "Converting FLAC to another lossless format can preserve quality; converting to lossy formats will discard information.",
      },
    ],
    sources: [
      {
        title: "FLAC official format documentation",
        url: "https://xiph.org/flac/format.html",
        note: "official FLAC bitstream and metadata format",
      },
    ],
    lastUpdated: updated,
    Component: FlacResourceGallery,
  }),
  make({
    slug: "ogg",
    category: "audio",
    name: "OGG",
    fullName: "Ogg Container",
    year: 2000,
    extensions: ["ogg", "oga", "ogv"],
    mimeTypes: ["audio/ogg", "video/ogg", "application/ogg"],
    standard: "Xiph.Org Ogg container",
    tagline: "An open media container often used with Vorbis, Opus, Theora, and other Xiph codecs.",
    description:
      "Ogg is a container. Audio files with .ogg often contain Vorbis or Opus, but the extension alone does not fully describe the codec.\n\nUse Ogg for open media workflows. Use Opus inside Ogg for modern speech and music compression.",
    pros: [
      "Open container",
      "Good match for Vorbis and Opus",
      "Supported by many browsers and audio tools",
    ],
    cons: [
      "Less common in consumer apps than MP3/AAC",
      "Extension can hide the actual codec",
      "Apple ecosystem support has historically lagged",
    ],
    comparison: [
      {
        vs: "Opus",
        sizeRatio: "Container vs codec",
        quality: "Opus is usually better codec choice",
        note: "Ogg often carries Opus audio.",
      },
      {
        vs: "M4A",
        sizeRatio: "Varies",
        quality: "Depends on codec",
        note: "M4A is more common in Apple workflows.",
      },
    ],
    support: {
      os: ["Windows via modern apps", "macOS via compatible players", "Linux strong support"],
      browsers: ["Chrome", "Firefox", "Edge", "Safari support depends on codec and version"],
      apps: ["VLC", "Audacity", "Firefox", "FFmpeg"],
    },
    keywords: ["ogg file", "ogg vorbis", "ogg vs opus", "open ogg"],
    relatedTools: ["audio-extract"],
    relatedFormats: ["opus", "flac", "m4a"],
    faq: [
      {
        q: "Is OGG a codec?",
        a: "No. Ogg is a container. Vorbis or Opus are common codecs inside it.",
      },
      {
        q: "Should I use OGG for podcasts?",
        a: "Opus in Ogg can work well, but MP3/AAC may be more compatible with podcast platforms.",
      },
    ],
    sources: [
      {
        title: "Xiph.Org Ogg documentation",
        url: "https://xiph.org/ogg/doc/",
        note: "official Ogg framing and documentation",
      },
      {
        title: "MDN audio and video media types",
        url: "https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats",
        note: "web media container and codec support",
      },
    ],
    lastUpdated: updated,
    Component: OggResourceGallery,
  }),
  make({
    slug: "opus",
    category: "audio",
    name: "Opus",
    fullName: "Opus Audio Codec",
    year: 2012,
    extensions: ["opus"],
    mimeTypes: ["audio/opus", "audio/ogg"],
    standard: "IETF RFC 6716 and RFC 7845",
    tagline: "A modern low-latency audio codec for speech, music, calls, and streaming.",
    description:
      "Opus is a codec designed to handle both speech and music across a wide bitrate range. It is commonly stored in Ogg or WebM containers.\n\nUse Opus when you need excellent quality at low bitrates, especially for voice, real-time audio, or modern web playback.",
    pros: ["Excellent quality at low bitrates", "Good for both speech and music", "Low latency"],
    cons: [
      "Not as universally accepted as MP3/AAC",
      "Some platforms require Ogg or WebM containers",
      "Older devices may not support it",
    ],
    comparison: [
      {
        vs: "MP3",
        sizeRatio: "Opus is smaller at similar quality",
        quality: "Opus usually wins",
        note: "MP3 still wins for legacy compatibility.",
      },
      {
        vs: "AAC/M4A",
        sizeRatio: "Often smaller",
        quality: "Strong at speech and low bitrate",
        note: "AAC is safer in Apple-first workflows.",
      },
    ],
    support: {
      os: ["Modern desktop players", "Android support", "iOS support depends on container/app"],
      browsers: ["Chrome", "Firefox", "Edge", "Safari modern versions"],
      apps: ["Discord", "WebRTC apps", "VLC", "Audacity", "FFmpeg"],
    },
    keywords: ["opus audio", "opus codec", "opus vs mp3", "open opus"],
    relatedTools: ["audio-extract"],
    relatedFormats: ["ogg", "flac", "m4a"],
    faq: [
      {
        q: "Is Opus better than MP3?",
        a: "For quality per bit, usually yes. MP3 remains more compatible with very old software.",
      },
      {
        q: "Why is my Opus file in .ogg?",
        a: "Opus is often stored in the Ogg container, so .ogg and .opus workflows overlap.",
      },
    ],
    sources: [
      {
        title: "RFC 6716 - Definition of the Opus Audio Codec",
        url: "https://www.rfc-editor.org/rfc/rfc6716",
        note: "official IETF codec specification",
      },
      {
        title: "RFC 7845 - Ogg Encapsulation for Opus",
        url: "https://www.rfc-editor.org/rfc/rfc7845",
        note: "official Opus-in-Ogg mapping",
      },
    ],
    lastUpdated: updated,
    Component: OpusResourceGallery,
  }),
  make({
    slug: "m4a",
    category: "audio",
    name: "M4A",
    fullName: "MPEG-4 Audio",
    year: 2001,
    extensions: ["m4a"],
    mimeTypes: ["audio/mp4", "audio/x-m4a"],
    standard: "MPEG-4 Part 14 audio container",
    tagline: "An MP4 audio-only file commonly used for AAC or Apple Lossless audio.",
    description:
      "M4A is an audio-only MP4-style container. It commonly stores AAC for lossy audio or ALAC for lossless Apple workflows.\n\nUse M4A for Apple-friendly music, voice memos, and compact audio delivery. Check the codec before assuming quality or file size.",
    pros: ["Strong Apple ecosystem support", "Can store AAC or ALAC", "Good metadata support"],
    cons: [
      "Codec inside matters",
      "Not as universally legacy-safe as MP3",
      "Some apps confuse .m4a with protected files",
    ],
    comparison: [
      {
        vs: "MP3",
        sizeRatio: "M4A/AAC is often smaller",
        quality: "AAC often wins at same bitrate",
        note: "MP3 is older but widely accepted.",
      },
      {
        vs: "FLAC",
        sizeRatio: "M4A/AAC is smaller",
        quality: "FLAC is lossless",
        note: "ALAC-in-M4A can also be lossless.",
      },
    ],
    support: {
      os: ["macOS / iOS native", "Windows modern players", "Android support"],
      browsers: [
        "Safari",
        "Chrome / Edge with supported codecs",
        "Firefox support depends on platform codecs",
      ],
      apps: ["Apple Music", "QuickTime", "VLC", "Audacity", "FFmpeg"],
    },
    keywords: ["m4a file", "mpeg 4 audio", "m4a vs mp3", "open m4a"],
    relatedTools: ["audio-extract"],
    relatedFormats: ["flac", "opus", "ogg"],
    faq: [
      {
        q: "Is M4A lossless?",
        a: "It can be, if it contains ALAC. Many M4A files contain lossy AAC instead.",
      },
      {
        q: "Should I convert M4A to MP3?",
        a: "Only for compatibility. Recompressing lossy audio can reduce quality.",
      },
    ],
    sources: [
      {
        title: "IANA media type audio/mp4",
        url: "https://www.iana.org/assignments/media-types/audio/mp4",
        note: "registered MPEG-4 audio media type",
      },
      locMpeg4,
    ],
    lastUpdated: updated,
    Component: M4aResourceGallery,
  }),
  make({
    slug: "aiff",
    category: "audio",
    name: "AIFF",
    fullName: "Audio Interchange File Format",
    year: 1988,
    extensions: ["aiff", "aif", "aifc"],
    mimeTypes: ["audio/aiff", "audio/x-aiff"],
    standard: "Apple / Electronic Arts IFF-based audio format",
    tagline:
      "A high-quality uncompressed or compressed audio container common in older Mac and pro-audio workflows.",
    description:
      "AIFF is a classic audio interchange format associated with Apple and professional audio workflows. Plain AIFF is often uncompressed PCM, so files can be large.\n\nUse AIFF for editing or interchange when a tool asks for it. Use FLAC for lossless storage or AAC/Opus for smaller listening copies.",
    pros: ["High-quality PCM workflows", "Strong pro-audio history", "Simple editing source"],
    cons: [
      "Large files when uncompressed",
      "Less convenient than FLAC for storage",
      "Less common for web playback",
    ],
    comparison: [
      {
        vs: "WAV",
        sizeRatio: "Similar for PCM",
        quality: "Similar when uncompressed",
        note: "WAV is more common on Windows; AIFF is Mac-associated.",
      },
      {
        vs: "FLAC",
        sizeRatio: "FLAC is smaller",
        quality: "Both can preserve quality",
        note: "FLAC is better for storage and sharing.",
      },
    ],
    support: {
      os: ["macOS native", "Windows via media apps", "Linux via audio players"],
      browsers: ["Not a common web audio delivery format"],
      apps: ["Logic Pro", "Pro Tools", "Audacity", "VLC", "FFmpeg"],
    },
    keywords: ["aiff file", "audio interchange file format", "aiff vs wav", "open aiff"],
    relatedTools: ["audio-extract"],
    relatedFormats: ["flac", "m4a", "opus"],
    faq: [
      {
        q: "Is AIFF lossless?",
        a: "Standard AIFF with PCM audio is uncompressed and lossless. AIFF-C can use compression.",
      },
      {
        q: "Should I use AIFF for web audio?",
        a: "No. Use AAC, Opus, MP3, or another browser-friendly delivery format.",
      },
    ],
    sources: [locAiff],
    lastUpdated: updated,
    Component: AiffResourceGallery,
  }),
  make({
    slug: "epub",
    category: "document",
    name: "EPUB",
    fullName: "Electronic Publication",
    year: 2007,
    extensions: ["epub"],
    mimeTypes: ["application/epub+zip"],
    standard: "W3C EPUB",
    tagline: "The open ebook format used by many readers, stores, and publishing workflows.",
    description:
      "EPUB packages HTML, CSS, images, metadata, and navigation into a zip-based ebook. It is designed for reflowable reading, though fixed-layout EPUB also exists.\n\nUse EPUB for ebooks that should adapt to screen size. Use PDF when page fidelity matters more than reading comfort.",
    pros: [
      "Reflows across screen sizes",
      "Open publishing standard",
      "Good metadata and navigation support",
    ],
    cons: [
      "Layout can vary by reader",
      "DRM and store requirements differ",
      "Complex books need testing on real devices",
    ],
    comparison: [
      {
        vs: "PDF",
        sizeRatio: "Usually smaller",
        quality: "Reflowable rather than fixed",
        note: "EPUB is better for reading; PDF is better for exact pages.",
      },
      {
        vs: "MOBI",
        sizeRatio: "Varies",
        quality: "Modern EPUB is more open",
        note: "MOBI is older and Kindle-specific historically.",
      },
    ],
    support: {
      os: ["iOS Books", "Android readers", "desktop reader apps"],
      browsers: ["Browsers need an EPUB reader app or JavaScript reader"],
      apps: ["Apple Books", "Kobo", "Calibre", "Thorium Reader", "Google Play Books"],
    },
    keywords: ["epub file", "ebook format", "epub vs pdf", "open epub"],
    relatedTools: [],
    relatedFormats: ["mobi", "pdf", "xps"],
    faq: [
      {
        q: "Is EPUB better than PDF for books?",
        a: "For reading on phones and ereaders, usually yes. EPUB reflows text; PDF preserves fixed pages.",
      },
      {
        q: "Can browsers open EPUB directly?",
        a: "Not as a native media type in normal browsing. Use an EPUB reader or web app.",
      },
    ],
    sources: [
      {
        title: "W3C EPUB 3.3",
        url: "https://www.w3.org/TR/epub-33/",
        note: "current EPUB core specification",
      },
    ],
    lastUpdated: updated,
    Component: EpubResourceGallery,
  }),
  make({
    slug: "mobi",
    category: "document",
    name: "MOBI",
    fullName: "Mobipocket Ebook",
    year: 2000,
    extensions: ["mobi", "prc", "azw"],
    mimeTypes: ["application/x-mobipocket-ebook"],
    standard: "Mobipocket / Kindle legacy ebook format",
    tagline:
      "An older ebook format associated with Mobipocket and early Kindle publishing workflows.",
    description:
      "MOBI is an older ebook format that became tied to early Kindle workflows. Modern Kindle publishing has moved toward newer formats, but MOBI files still appear in archives and personal libraries.\n\nUse MOBI only when an older device or archive requires it. EPUB is usually the better open source format today.",
    pros: [
      "Works with some older Kindle-era libraries",
      "Small ebook files",
      "Common in legacy ebook collections",
    ],
    cons: [
      "Legacy format",
      "Weaker modern layout features than EPUB",
      "Limited non-Kindle relevance",
    ],
    comparison: [
      {
        vs: "EPUB",
        sizeRatio: "Similar",
        quality: "EPUB is more modern",
        note: "EPUB is the better authoring and interchange target.",
      },
      {
        vs: "PDF",
        sizeRatio: "Usually smaller",
        quality: "Reflowable text",
        note: "PDF preserves pages; MOBI preserves reading flow.",
      },
    ],
    support: {
      os: ["Reader app required"],
      browsers: ["Browsers do not open MOBI natively"],
      apps: ["Calibre", "older Kindle apps/devices", "ebook converters"],
    },
    keywords: ["mobi file", "mobipocket ebook", "mobi vs epub", "open mobi"],
    relatedTools: [],
    relatedFormats: ["epub", "pdf", "xps"],
    faq: [
      {
        q: "Should I publish a new ebook as MOBI?",
        a: "Usually no. EPUB is the better modern source format unless a specific workflow requires MOBI.",
      },
      {
        q: "Can I convert MOBI to EPUB?",
        a: "Often yes with ebook tools, but DRM-protected files cannot be freely converted.",
      },
    ],
    sources: [
      {
        title: "Library of Congress - Mobipocket",
        url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000472.shtml",
        note: "MOBI format description and history",
      },
    ],
    lastUpdated: updated,
    Component: MobiResourceGallery,
  }),
  make({
    slug: "cbz",
    category: "archive",
    name: "CBZ",
    fullName: "Comic Book Zip",
    year: 1990,
    extensions: ["cbz"],
    mimeTypes: ["application/vnd.comicbook+zip", "application/zip"],
    standard: "Zip archive with ordered comic images",
    tagline:
      "A comic-book archive that is essentially a ZIP file containing page images in reading order.",
    description:
      "CBZ is simple: it is a ZIP archive with image pages, usually named so readers can sort them in order. The format is popular for comics, manga, scanned books, and visual archives.\n\nUse CBZ when pages are already images. Use EPUB for reflowable text books and PDF when fixed print pages matter.",
    pros: [
      "Simple and easy to inspect",
      "Works well for image-based comics",
      "Many reader apps support it",
    ],
    cons: [
      "No rich layout model",
      "Large if page images are high resolution",
      "Metadata support depends on reader conventions",
    ],
    comparison: [
      {
        vs: "PDF",
        sizeRatio: "Varies",
        quality: "Image-page workflow",
        note: "PDF has stronger document semantics; CBZ is simpler for comics.",
      },
      {
        vs: "EPUB",
        sizeRatio: "Usually larger for text",
        quality: "Image pages",
        note: "EPUB is better for reflowable text.",
      },
    ],
    support: {
      os: ["Reader app required"],
      browsers: ["Browsers can open the ZIP only with app logic"],
      apps: ["YACReader", "Panels", "CDisplayEx", "Calibre", "MComix"],
    },
    keywords: ["cbz file", "comic book zip", "cbz vs pdf", "open cbz"],
    relatedTools: [],
    relatedFormats: ["epub", "pdf", "7z"],
    faq: [
      {
        q: "Can I rename CBZ to ZIP?",
        a: "Yes, CBZ is a ZIP archive by convention. A reader treats the contained images as pages.",
      },
      {
        q: "What image size should CBZ pages use?",
        a: "Use enough resolution for the target display, often around tablet or print-page sizes, while watching total file size.",
      },
    ],
    sources: [
      {
        title: "Library of Congress - Comic Book Archive",
        url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000527.shtml",
        note: "comic archive format family",
      },
    ],
    lastUpdated: updated,
    Component: CbzResourceGallery,
  }),
  make({
    slug: "xps",
    category: "document",
    name: "XPS",
    fullName: "XML Paper Specification",
    year: 2006,
    extensions: ["xps", "oxps"],
    mimeTypes: ["application/vnd.ms-xpsdocument", "application/oxps"],
    standard: "Microsoft XPS / OpenXPS",
    tagline:
      "Microsoft's fixed-layout document format, similar in purpose to PDF but much less common.",
    description:
      "XPS stores fixed pages, fonts, images, and vector graphics in an XML-based package. It was designed for print-like documents in Windows workflows.\n\nUse XPS only when a Windows workflow produces or requires it. Convert to PDF for broader sharing.",
    pros: [
      "Fixed-layout pages",
      "Windows print workflow integration",
      "Can preserve vectors and text",
    ],
    cons: [
      "Much less common than PDF",
      "Limited browser support",
      "Recipients often need conversion",
    ],
    comparison: [
      {
        vs: "PDF",
        sizeRatio: "Varies",
        quality: "Both fixed-layout",
        note: "PDF is far more widely supported.",
      },
      {
        vs: "EPUB",
        sizeRatio: "Usually larger",
        quality: "Fixed page",
        note: "EPUB is better for reading on small screens.",
      },
    ],
    support: {
      os: ["Windows support available", "macOS/Linux need third-party viewers"],
      browsers: ["Browsers do not commonly render XPS directly"],
      apps: ["Microsoft XPS Viewer", "MuPDF", "conversion tools"],
    },
    keywords: ["xps file", "xml paper specification", "xps vs pdf", "open xps"],
    relatedTools: [],
    relatedFormats: ["pdf", "epub", "mobi"],
    faq: [
      {
        q: "Should I send XPS instead of PDF?",
        a: "Usually no. PDF is much more likely to open correctly for recipients.",
      },
      {
        q: "What is OXPS?",
        a: "OXPS is the OpenXPS variant introduced after the original Microsoft XPS format.",
      },
    ],
    sources: [
      {
        title: "Microsoft XPS documents",
        url: "https://learn.microsoft.com/en-us/windows/win32/printdocs/documents",
        note: "Windows XPS document and print architecture docs",
      },
      locXps,
    ],
    lastUpdated: updated,
    Component: XpsResourceGallery,
  }),
  make({
    slug: "eps",
    category: "image",
    name: "EPS",
    fullName: "Encapsulated PostScript",
    year: 1987,
    extensions: ["eps", "epsf", "epsi"],
    mimeTypes: ["application/postscript", "image/x-eps"],
    standard: "Adobe Encapsulated PostScript",
    tagline:
      "A legacy print-oriented vector format used for logos, illustrations, and prepress artwork.",
    description:
      "EPS wraps PostScript artwork so it can be placed into page-layout and print workflows. It can contain vector art, text, and embedded raster images.\n\nUse EPS when a printer or legacy design workflow asks for it. Use SVG for web vectors and PDF for modern print exchange.",
    pros: [
      "Strong legacy print support",
      "Can preserve vector artwork",
      "Common in older logo libraries",
    ],
    cons: [
      "Poor browser support",
      "Security restrictions in modern apps",
      "Less convenient than SVG or PDF today",
    ],
    comparison: [
      {
        vs: "SVG",
        sizeRatio: "Varies",
        quality: "Both can be vector",
        note: "SVG is web-native; EPS is print/legacy.",
      },
      {
        vs: "PDF",
        sizeRatio: "Varies",
        quality: "PDF is modern print exchange",
        note: "PDF generally replaced EPS in many workflows.",
      },
    ],
    support: {
      os: ["Needs compatible app or converter"],
      browsers: ["Browsers do not render EPS directly"],
      apps: ["Adobe Illustrator", "Inkscape", "Affinity Designer", "Ghostscript"],
    },
    keywords: ["eps file", "encapsulated postscript", "eps vs svg", "open eps"],
    relatedTools: ["svg-to-png", "svg-optimizer"],
    relatedFormats: ["svg", "ai", "pdf"],
    faq: [
      { q: "Can I use EPS on a website?", a: "No. Convert to SVG or PNG first." },
      {
        q: "Why do printers still ask for EPS?",
        a: "Some legacy print workflows and logo archives are still built around EPS.",
      },
    ],
    sources: [
      {
        title: "Adobe PostScript language reference",
        url: "https://www.adobe.com/jp/print/postscript/pdfs/PLRM.pdf",
        note: "PostScript reference used by EPS workflows",
      },
      locEps,
    ],
    lastUpdated: updated,
    Component: EpsResourceGallery,
  }),
  make({
    slug: "ai",
    category: "image",
    name: "AI",
    fullName: "Adobe Illustrator Artwork",
    year: 1987,
    extensions: ["ai"],
    mimeTypes: ["application/postscript", "application/pdf", "application/illustrator"],
    standard: "Adobe Illustrator native artwork format",
    tagline:
      "Illustrator's editable vector artwork format for logos, icons, illustrations, and print layouts.",
    description:
      "AI files are working files for Adobe Illustrator. Modern AI files often include PDF-compatible data, but editability and compatibility depend on how the file was saved.\n\nUse AI for design source handoff. Export SVG, PDF, PNG, or EPS depending on where the artwork will be used.",
    pros: [
      "Preserves Illustrator editability",
      "Good for complex vector artwork",
      "Standard in many brand and print handoffs",
    ],
    cons: [
      "Best support requires Illustrator",
      "Browsers do not render AI directly",
      "Compatibility depends on save options",
    ],
    comparison: [
      {
        vs: "SVG",
        sizeRatio: "SVG often smaller for web icons",
        quality: "Both can be vector",
        note: "SVG is web delivery; AI is source editing.",
      },
      {
        vs: "EPS",
        sizeRatio: "Varies",
        quality: "AI is more editable in Illustrator",
        note: "EPS is better for legacy print interchange.",
      },
    ],
    support: {
      os: ["Requires a compatible design app"],
      browsers: ["Browsers do not render AI directly"],
      apps: ["Adobe Illustrator", "Affinity Designer", "Inkscape with limitations", "CorelDRAW"],
    },
    keywords: ["ai file", "adobe illustrator format", "ai vs svg", "open ai file"],
    relatedTools: ["svg-to-png", "svg-optimizer"],
    relatedFormats: ["svg", "eps", "pdf"],
    faq: [
      {
        q: "Can I preview AI without Illustrator?",
        a: "Sometimes, if the file was saved with PDF-compatible data. Otherwise use a converter or design app.",
      },
      {
        q: "Should logos be delivered as AI?",
        a: "AI is good as an editable source, but also export SVG, PDF, and PNG for actual use.",
      },
    ],
    sources: [
      {
        title: "Adobe Illustrator supported file formats",
        url: "https://helpx.adobe.com/sg/illustrator/kb/supported-file-formats-illustrator.html",
        note: "Illustrator import/export format guidance",
      },
    ],
    lastUpdated: updated,
    Component: AiResourceGallery,
  }),
  make({
    slug: "tar",
    category: "archive",
    name: "TAR",
    fullName: "Tape Archive",
    year: 1979,
    extensions: ["tar", "tar.gz", "tgz", "tar.bz2", "tar.xz"],
    mimeTypes: ["application/x-tar", "application/gzip", "application/x-gtar"],
    standard: "POSIX tar / pax archive family",
    tagline:
      "A Unix archive format for bundling files, often paired with gzip, bzip2, or xz compression.",
    description:
      "TAR bundles files and directories into one stream. Compression is usually added separately, which is why .tar.gz and .tar.xz are common.\n\nUse TAR for source releases, server backups, and Unix-friendly archives. Use ZIP when recipients are mostly non-technical desktop users.",
    pros: [
      "Preserves Unix paths and metadata",
      "Excellent for source and server archives",
      "Streams well",
    ],
    cons: [
      "Plain .tar is not compressed",
      "Less familiar to casual users than ZIP",
      "Windows users may need tools for some variants",
    ],
    comparison: [
      {
        vs: "ZIP",
        sizeRatio: "Depends on compression",
        quality: "Both archive files",
        note: "ZIP is simpler for casual cross-platform sharing.",
      },
      {
        vs: "7Z",
        sizeRatio: "7Z often compresses smaller",
        quality: "Both preserve files",
        note: "TAR is more Unix-native and stream-friendly.",
      },
    ],
    support: {
      os: ["Unix/Linux native", "macOS native", "Windows 10/11 supports many archive operations"],
      browsers: ["Browsers download archives; extraction needs app logic"],
      apps: ["tar", "bsdtar", "7-Zip", "The Unarchiver", "WinRAR"],
    },
    keywords: ["tar file", "tar gz", "tape archive", "tar vs zip"],
    relatedTools: [],
    relatedFormats: ["7z", "zip", "cbz"],
    faq: [
      {
        q: "Is TAR compressed?",
        a: "Plain .tar is only a bundle. Compression is added by gzip, bzip2, xz, or another compressor.",
      },
      {
        q: "Why use TAR for source code?",
        a: "It preserves Unix-style directory trees and streams well in build and server workflows.",
      },
    ],
    sources: [
      {
        title: "GNU tar manual",
        url: "https://www.gnu.org/software/tar/manual/tar.html",
        note: "tar archive behavior and common usage",
      },
      locTar,
    ],
    lastUpdated: updated,
    Component: TarResourceGallery,
  }),
  make({
    slug: "7z",
    category: "archive",
    name: "7Z",
    fullName: "7-Zip Archive",
    year: 1999,
    extensions: ["7z"],
    mimeTypes: ["application/x-7z-compressed"],
    standard: "7-Zip archive format",
    tagline:
      "A high-compression archive format commonly used for large bundles and software distribution.",
    description:
      "7Z is the native archive format of 7-Zip. It is known for strong compression, optional encryption, and solid archive mode.\n\nUse 7Z when compression ratio matters and recipients can install an extractor. Use ZIP for maximum casual compatibility.",
    pros: ["Strong compression", "Supports encryption", "Good for large bundles"],
    cons: [
      "Less universally built in than ZIP",
      "Solid archives can make partial recovery harder",
      "Some recipients need extra software",
    ],
    comparison: [
      {
        vs: "ZIP",
        sizeRatio: "7Z is often smaller",
        quality: "Both are archives",
        note: "ZIP is more universally recognized.",
      },
      {
        vs: "TAR.GZ",
        sizeRatio: "Varies",
        quality: "Both are common archives",
        note: "TAR.GZ is more Unix-native.",
      },
    ],
    support: {
      os: ["Windows via 7-Zip/WinRAR", "macOS via The Unarchiver/Keka", "Linux via p7zip/7zz"],
      browsers: ["Browsers download 7Z; extraction needs app logic"],
      apps: ["7-Zip", "WinRAR", "Keka", "The Unarchiver", "PeaZip"],
    },
    keywords: ["7z file", "7 zip archive", "7z vs zip", "open 7z"],
    relatedTools: [],
    relatedFormats: ["tar", "zip", "cbz"],
    faq: [
      {
        q: "Is 7Z better than ZIP?",
        a: "For compression ratio, often yes. For recipient compatibility, ZIP is safer.",
      },
      {
        q: "Can 7Z be encrypted?",
        a: "Yes, 7Z supports AES encryption when created with compatible tools.",
      },
    ],
    sources: [
      {
        title: "7-Zip 7z format",
        url: "https://www.7-zip.org/7z.html",
        note: "official 7z format features",
      },
      loc7z,
    ],
    lastUpdated: updated,
    Component: SevenZResourceGallery,
  }),
  make({
    slug: "csv",
    category: "data",
    name: "CSV",
    fullName: "Comma-Separated Values",
    year: 1972,
    extensions: ["csv"],
    mimeTypes: ["text/csv"],
    standard: "RFC 4180 and text/csv media type",
    tagline:
      "A simple table exchange format that looks easy until quoting, encoding, and delimiters matter.",
    description:
      "CSV stores table rows as text. The simplicity is why it is everywhere, but real files can vary in delimiter, quotes, line endings, encoding, and header conventions.\n\nUse CSV for spreadsheet-style data exchange. Use JSONL for event streams or nested records.",
    pros: ["Human-readable", "Works with spreadsheets and databases", "Easy to stream and inspect"],
    cons: ["No native types", "Quoting and delimiter rules vary", "Poor for nested data"],
    comparison: [
      {
        vs: "JSONL",
        sizeRatio: "CSV is often smaller for flat tables",
        quality: "CSV is tabular",
        note: "JSONL handles nested records and event streams better.",
      },
      {
        vs: "XLSX",
        sizeRatio: "CSV is usually smaller",
        quality: "No formatting or formulas",
        note: "CSV is data exchange, not a workbook.",
      },
    ],
    support: {
      os: ["Any text editor", "spreadsheet apps", "database tools"],
      browsers: ["Browsers download or parse CSV through app code"],
      apps: ["Excel", "Google Sheets", "Numbers", "PostgreSQL", "Python/R"],
    },
    keywords: ["csv file", "comma separated values", "csv vs jsonl", "open csv"],
    relatedTools: [],
    relatedFormats: ["jsonl"],
    faq: [
      {
        q: "Does CSV always use commas?",
        a: "Not always. Some locales and tools use semicolons or tabs, even when the file is described as CSV.",
      },
      {
        q: "Why did Excel break my CSV?",
        a: "Encoding, separators, dates, and automatic type conversion are common causes.",
      },
    ],
    sources: [
      {
        title: "RFC 4180 - Common Format and MIME Type for CSV Files",
        url: "https://www.rfc-editor.org/rfc/rfc4180",
        note: "CSV format and text/csv registration",
      },
      {
        title: "IANA media type text/csv",
        url: "https://www.iana.org/assignments/media-types/text/csv",
        note: "registered media type",
      },
    ],
    lastUpdated: updated,
    Component: CsvResourceGallery,
  }),
  make({
    slug: "jsonl",
    category: "data",
    name: "JSONL",
    fullName: "JSON Lines",
    year: 2013,
    extensions: ["jsonl", "ndjson"],
    mimeTypes: ["application/jsonl", "application/x-ndjson", "application/json-seq"],
    standard: "JSON Lines / newline-delimited JSON convention",
    tagline: "A newline-delimited JSON format for logs, events, datasets, and streaming records.",
    description:
      "JSONL stores one valid JSON value per line. That makes it easy to append, stream, split, and recover from a bad record without loading a whole JSON array.\n\nUse JSONL for logs, analytics events, ML datasets, and batch imports. Use CSV for simple flat tables.",
    pros: ["Streaming-friendly", "Supports nested records", "Easy to append and split by line"],
    cons: [
      "Larger than CSV for flat tables",
      "Not a single valid JSON array",
      "MIME type conventions vary",
    ],
    comparison: [
      {
        vs: "CSV",
        sizeRatio: "JSONL is usually larger",
        quality: "JSONL supports nested data",
        note: "CSV is better for flat spreadsheet data.",
      },
      {
        vs: "JSON",
        sizeRatio: "Similar data size",
        quality: "JSONL streams better",
        note: "A JSON array is easier for small API payloads.",
      },
    ],
    support: {
      os: ["Any text editor", "command-line tools", "data pipelines"],
      browsers: ["Browsers parse with app code", "not a native visual format"],
      apps: ["jq", "Python", "Node.js", "BigQuery loaders", "ML dataset tools"],
    },
    keywords: ["jsonl file", "json lines", "ndjson", "jsonl vs csv"],
    relatedTools: [],
    relatedFormats: ["csv"],
    faq: [
      {
        q: "Is JSONL valid JSON?",
        a: "Each line is valid JSON, but the whole file is not a single JSON array.",
      },
      {
        q: "When should I use JSONL?",
        a: "Use it when records are independent, append-only, streamed, or too large to load as one JSON document.",
      },
    ],
    sources: [
      {
        title: "JSON Lines format",
        url: "https://jsonlines.org/",
        note: "format convention and examples",
      },
      {
        title: "NDJSON specification",
        url: "https://github.com/ndjson/ndjson-spec",
        note: "newline-delimited JSON convention",
      },
    ],
    lastUpdated: updated,
    Component: JsonlResourceGallery,
  }),
]
