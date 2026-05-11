import type { FormatManifest, FormatSource } from "./types"
import { createReferencePreview } from "./shared/reference-preview"
import type { ReferencePreviewItem, ReferencePreviewKind } from "./shared/reference-preview"

const updated = "2026-05-11"

const mdnImages: FormatSource = {
  title: "MDN image file type and format guide",
  url: "https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types",
  note: "browser image support, MIME types, and practical web guidance",
}

const locFormats: FormatSource = {
  title: "Library of Congress file format descriptions",
  url: "https://www.loc.gov/preservation/digital/formats/fdd/browse_list.shtml",
  note: "archival format descriptions and sustainability notes",
}

function preview(kind: ReferencePreviewKind, name: string, items: ReferencePreviewItem[]) {
  return createReferencePreview({
    intro: `${name} samples should be judged in the sizes people actually receive, upload, or export. These reference cards show the common shapes and settings to check before choosing a conversion target.`,
    items: items.map((item) => ({ ...item, kind: item.kind ?? kind })),
    sourceNote:
      "Reference dimensions are platform-style targets. Compatibility and format facts are verified from the linked online sources below.",
  })
}

const visualSizes: ReferencePreviewItem[] = [
  {
    label: "16:9",
    size: "1920 x 1080",
    useCase: "wide preview",
    note: "Use for wallpapers, video frames, and desktop previews.",
  },
  {
    label: "1:1",
    size: "1080 x 1080",
    useCase: "square crop",
    note: "Use for profile images, album art, and social posts.",
  },
  {
    label: "4:5",
    size: "1080 x 1350",
    useCase: "feed portrait",
    note: "A common portrait export for social feeds.",
  },
  {
    label: "9:16",
    size: "1080 x 1920",
    useCase: "story frame",
    note: "Use for phone-first previews and vertical posts.",
  },
]

const videoSizes: ReferencePreviewItem[] = [
  {
    label: "16:9",
    size: "1920 x 1080",
    useCase: "landscape video",
    note: "The baseline export for web players and presentations.",
  },
  {
    label: "9:16",
    size: "1080 x 1920",
    useCase: "vertical video",
    note: "Used by stories, reels, shorts, and phone captures.",
  },
  {
    label: "1:1",
    size: "1080 x 1080",
    useCase: "square post",
    note: "Useful where feeds crop landscape video too aggressively.",
  },
  {
    label: "4:5",
    size: "1080 x 1350",
    useCase: "portrait feed",
    note: "A feed-friendly alternative to full vertical video.",
  },
]

const audioSettings: ReferencePreviewItem[] = [
  {
    label: "voice",
    size: "48 kHz mono",
    useCase: "spoken audio",
    note: "Checks speech clarity and low-bitrate behavior.",
  },
  {
    label: "music",
    size: "44.1 kHz stereo",
    useCase: "music sample",
    note: "Checks stereo image, transients, and codec artifacts.",
  },
  {
    label: "portable",
    size: "96-128 kbps",
    useCase: "small export",
    note: "A practical range for sharing or streaming constrained files.",
  },
  {
    label: "archive",
    size: "lossless",
    useCase: "source copy",
    note: "Use when quality preservation matters more than size.",
  },
]

const documentSizes: ReferencePreviewItem[] = [
  {
    label: "A4",
    size: "210 x 297 mm",
    useCase: "international page",
    note: "The default document shape for many countries.",
  },
  {
    label: "Letter",
    size: "8.5 x 11 in",
    useCase: "US page",
    note: "Important for North American documents.",
  },
  {
    label: "multi-page",
    size: "12 pages",
    useCase: "report",
    note: "Checks navigation, thumbnails, and file size scaling.",
  },
  {
    label: "scan",
    size: "300 dpi",
    useCase: "image-heavy file",
    note: "Useful when the format often stores scanned pages.",
  },
]

const archiveSamples: ReferencePreviewItem[] = [
  {
    label: "folder",
    size: "10 files",
    useCase: "project backup",
    note: "Checks nested paths, filenames, and extraction behavior.",
  },
  {
    label: "media",
    size: "500 MB",
    useCase: "large bundle",
    note: "Shows why compression method and split archives matter.",
  },
  {
    label: "text",
    size: "many small files",
    useCase: "source archive",
    note: "Metadata and permissions are often more important than compression.",
  },
  {
    label: "portable",
    size: "single file",
    useCase: "email attachment",
    note: "Checks whether recipients can open it without extra tools.",
  },
]

const dataSamples: ReferencePreviewItem[] = [
  {
    label: "rows",
    size: "1k rows",
    useCase: "spreadsheet export",
    note: "Checks headers, delimiters, quoting, and encoding.",
  },
  {
    label: "events",
    size: "10k lines",
    useCase: "log stream",
    note: "Checks append-friendly parsing and per-line recovery.",
  },
  {
    label: "unicode",
    size: "UTF-8",
    useCase: "international data",
    note: "Avoids broken names, commas, and non-Latin text.",
  },
  {
    label: "large",
    size: "100 MB+",
    useCase: "batch import",
    note: "Checks streaming, memory use, and preview limits.",
  },
]

const vectorSizes: ReferencePreviewItem[] = [
  {
    label: "logo",
    size: "512 x 512",
    useCase: "brand mark",
    note: "Checks curves, fills, and transparent backgrounds.",
  },
  {
    label: "poster",
    size: "A4",
    useCase: "print layout",
    note: "Checks text, embedded images, and color handling.",
  },
  {
    label: "icon",
    size: "64 x 64",
    useCase: "small vector",
    note: "Checks whether strokes survive downscaling.",
  },
  {
    label: "wide",
    size: "16:9",
    useCase: "presentation art",
    note: "Useful for slides, web banners, and exports to PNG.",
  },
]

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
    sources: [mdnImages, locFormats],
    lastUpdated: updated,
    Component: preview("image", "BMP", visualSizes),
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
      locFormats,
    ],
    lastUpdated: updated,
    Component: preview("image", "PSD", visualSizes),
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
      locFormats,
    ],
    lastUpdated: updated,
    Component: preview("image", "DNG", visualSizes),
  }),
  make({
    slug: "raw",
    category: "image",
    name: "RAW",
    fullName: "Camera Raw Image",
    year: 1997,
    extensions: ["raw", "cr2", "nef", "arw", "raf", "orf", "rw2"],
    mimeTypes: ["image/x-canon-cr2", "image/x-nikon-nef", "image/x-sony-arw"],
    standard: "Vendor-specific camera raw formats",
    tagline:
      "A family of camera sensor formats used before a photo is rendered into JPG, TIFF, or WebP.",
    description:
      "RAW is not one single standard. It is a family of camera vendor formats that store minimally processed sensor data.\n\nUse RAW when you need maximum editing latitude. Export a normal image format when you need compatibility, previews, or upload support.",
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
      locFormats,
      {
        title: "Adobe Camera Raw supported cameras",
        url: "https://helpx.adobe.com/camera-raw/kb/camera-raw-plug-supported-cameras.html",
        note: "shows vendor-specific raw support by camera model",
      },
    ],
    lastUpdated: updated,
    Component: preview("image", "RAW", visualSizes),
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
      locFormats,
    ],
    lastUpdated: updated,
    Component: preview("video", "MKV", videoSizes),
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
        url: "https://developer.apple.com/library/archive/documentation/QuickTime/QTFF/QTFFPreface/qtffPreface.html",
        note: "QuickTime container reference",
      },
      locFormats,
    ],
    lastUpdated: updated,
    Component: preview("video", "MOV", videoSizes),
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
      locFormats,
    ],
    lastUpdated: updated,
    Component: preview("video", "M4V", videoSizes),
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
      locFormats,
    ],
    lastUpdated: updated,
    Component: preview("video", "AVI", videoSizes),
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
      locFormats,
    ],
    lastUpdated: updated,
    Component: preview("audio", "FLAC", audioSettings),
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
    Component: preview("audio", "OGG", audioSettings),
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
    Component: preview("audio", "Opus", audioSettings),
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
      locFormats,
    ],
    lastUpdated: updated,
    Component: preview("audio", "M4A", audioSettings),
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
    sources: [
      locFormats,
      {
        title: "Apple AIFF overview in legacy docs",
        url: "https://developer.apple.com/library/archive/documentation/QuickTime/RM/MusicAndAudio/Sound/Audio_File_Format_Specification.pdf",
        note: "Apple audio file format specification PDF",
      },
    ],
    lastUpdated: updated,
    Component: preview("audio", "AIFF", audioSettings),
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
      locFormats,
    ],
    lastUpdated: updated,
    Component: preview("ebook", "EPUB", documentSizes),
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
      locFormats,
    ],
    lastUpdated: updated,
    Component: preview("ebook", "MOBI", documentSizes),
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
      locFormats,
    ],
    lastUpdated: updated,
    Component: preview(
      "archive",
      "CBZ",
      documentSizes.map((item) => ({ ...item, kind: "document" })),
    ),
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
      locFormats,
    ],
    lastUpdated: updated,
    Component: preview("document", "XPS", documentSizes),
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
      locFormats,
    ],
    lastUpdated: updated,
    Component: preview("vector", "EPS", vectorSizes),
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
        title: "Adobe Illustrator file formats",
        url: "https://helpx.adobe.com/illustrator/using/file-formats.html",
        note: "Illustrator import/export format guidance",
      },
      locFormats,
    ],
    lastUpdated: updated,
    Component: preview("vector", "AI", vectorSizes),
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
      locFormats,
    ],
    lastUpdated: updated,
    Component: preview("archive", "TAR", archiveSamples),
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
      locFormats,
    ],
    lastUpdated: updated,
    Component: preview("archive", "7Z", archiveSamples),
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
    Component: preview("data", "CSV", dataSamples),
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
    Component: preview("data", "JSONL", dataSamples),
  }),
]
