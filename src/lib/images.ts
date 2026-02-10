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

  // ─── ARTIST PORTRAITS ────────────────────────────────────────
  artists: {
    celo: "https://i.scdn.co/image/ab6761610000e5eb70b6546a99e68042fb9353f0",
    otega: "https://i.scdn.co/image/ab6761610000e5ebf64e8ce5f67b296ebf98ce1f",
    mohbad: "https://i.scdn.co/image/ab6761610000e5eb5229542d1c2abba84abbf545",
    dannyello: "https://i.scdn.co/image/ab6761610000e5ebb4c9da97d90992198ddba60c",
    sharlly: "https://i.scdn.co/image/ab6761610000e5eb76e6537819d696bcf2793b0b",
    blaqmix: "https://i.audiomack.com/djblaqmix/11b67461ce.webp?width=400",
    layonn: "https://i.scdn.co/image/ab6761610000e5eb6310ce7b58b5b931c869bcc1",
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
