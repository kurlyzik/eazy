/**
 * Centralized Image Configuration
 * ================================
 * All image paths in one place for easy swapping.
 * Images are served from /public/media/images/
 */

// ─── HERO & PORTRAIT ────────────────────────────────────────
export const IMAGES = {
  // Main portrait — studio chair shot, dark moody
  portrait: "/media/images/portrait/main.jpg",

  // Studio candid — at the keys, producing
  studioCandid: "/media/images/studio/candid.jpg",

  // Studio environment — Dolby Atmos mixing setup
  studioWide: "/media/images/studio/wide.jpg",

  // ─── CREDITS / ALBUM ARTWORK ────────────────────────────────
  credits: {
    album01: "/media/images/credits/album01.jpg",
    album02: "/media/images/credits/album02.jpg",
    album03: "/media/images/credits/album03.jpg",
    album04: "/media/images/credits/album04.jpg",
    album05: "/media/images/credits/album05.jpg",
    album06: "/media/images/credits/album06.jpg",
  },

  // ─── GALLERY ─────────────────────────────────────────────────
  gallery: {
    img01: "/media/images/gallery/img01.jpg",
    img02: "/media/images/gallery/img02.jpg",
    img03: "/media/images/gallery/img03.jpg",
    img04: "/media/images/gallery/img04.jpg",
    img05: "/media/images/gallery/img05.jpg",
    img06: "/media/images/gallery/img06.jpg",
    img07: "/media/images/gallery/img07.jpg",
    img08: "/media/images/gallery/img08.jpg",
  },
} as const;
