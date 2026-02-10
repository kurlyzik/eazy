"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMAGES } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  { id: 1, src: IMAGES.gallery.img01, title: "Midnight Session", category: "Studio" },
  { id: 2, src: IMAGES.gallery.img02, title: "Backstage", category: "Lifestyle" },
  { id: 3, src: IMAGES.gallery.img03, title: "Red Carpet", category: "Events" },
  { id: 4, src: IMAGES.gallery.img04, title: "Analog Collection", category: "Studio" },
  { id: 5, src: IMAGES.gallery.img05, title: "Main Stage", category: "Events" },
  { id: 6, src: IMAGES.gallery.img06, title: "Press Feature", category: "Press" },
  { id: 7, src: IMAGES.gallery.img07, title: "In the Mix", category: "Travel" },
  { id: 8, src: IMAGES.gallery.img08, title: "Producer of the Year", category: "Studio" },
];

// Asymmetric layout — alternating tall/wide cards
const layoutClasses = [
  "md:col-span-2 md:row-span-2",  // 1 — large hero
  "md:col-span-1 md:row-span-1",  // 2 — small
  "md:col-span-1 md:row-span-2",  // 3 — tall
  "md:col-span-1 md:row-span-1",  // 4 — small
  "md:col-span-1 md:row-span-1",  // 5 — small
  "md:col-span-2 md:row-span-1",  // 6 — wide
  "md:col-span-1 md:row-span-1",  // 7 — small
  "md:col-span-1 md:row-span-2",  // 8 — tall
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // Scroll-driven parallax on each image
  useEffect(() => {
    if (!gridRef.current) return;

    const items = gridRef.current.querySelectorAll(".gallery-card");
    const images = gridRef.current.querySelectorAll(".gallery-img");

    // Staggered reveal with slight rotation
    items.forEach((item, i) => {
      gsap.fromTo(item,
        {
          y: 80 + (i % 3) * 20,
          opacity: 0,
          rotateX: 4,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Inner parallax — image moves within card on scroll
    images.forEach((img) => {
      gsap.fromTo(img,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );
    });

    // Title reveal
    if (titleRef.current) {
      const line = titleRef.current.querySelector(".title-line");
      const text = titleRef.current.querySelector(".title-text");
      const sub = titleRef.current.querySelector(".title-sub");

      if (line) {
        gsap.fromTo(line, { scaleX: 0 }, {
          scaleX: 1, duration: 1.2, ease: "power3.inOut",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        });
      }
      if (text) {
        gsap.fromTo(text, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        });
      }
      if (sub) {
        gsap.fromTo(sub, { y: 20, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        });
      }
    }
  }, []);

  // Lightbox nav
  const handleNav = useCallback((dir: 1 | -1, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage === null) return;
    const idx = photos.findIndex((p) => p.id === selectedImage);
    const next = (idx + dir + photos.length) % photos.length;
    setSelectedImage(photos[next].id);
  }, [selectedImage]);

  // Keyboard nav for lightbox
  useEffect(() => {
    if (selectedImage === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowRight") {
        const idx = photos.findIndex((p) => p.id === selectedImage);
        setSelectedImage(photos[(idx + 1) % photos.length].id);
      }
      if (e.key === "ArrowLeft") {
        const idx = photos.findIndex((p) => p.id === selectedImage);
        setSelectedImage(photos[(idx - 1 + photos.length) % photos.length].id);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedImage]);

  return (
    <section ref={sectionRef} id="gallery" className="relative py-32 md:py-48 bg-black">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <div ref={titleRef} className="mb-20 md:mb-28">
          <div className="title-line h-[1px] bg-gradient-to-r from-white/30 to-transparent origin-left mb-8 w-full max-w-[200px]" style={{ transform: "scaleX(0)" }} />
          <h2 className="title-text text-6xl md:text-8xl lg:text-9xl text-white leading-[0.85] tracking-tight uppercase" style={{ fontFamily: "var(--font-decorative)", opacity: 0 }}>
            IN THE<br />
            <span className="text-white/30">ROOM</span>
          </h2>
          <p className="title-sub font-sans text-sm text-white/25 tracking-[0.2em] uppercase mt-6" style={{ opacity: 0 }}>
            Behind the scenes &mdash; {photos.length} moments captured
          </p>
        </div>

        {/* Asymmetric masonry grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[280px] md:auto-rows-[240px]"
          style={{ perspective: "1200px" }}
        >
          {photos.map((photo, i) => (
            <div
              key={photo.id}
              className={`gallery-card group relative overflow-hidden cursor-pointer ${layoutClasses[i]}`}
              onClick={() => setSelectedImage(photo.id)}
              style={{ opacity: 0, transformStyle: "preserve-3d" }}
            >
              {/* Image with inner parallax */}
              <div className="absolute inset-[-20%] overflow-hidden">
                <div
                  className="gallery-img absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-[1.03]"
                  style={{
                    backgroundImage: `url(${photo.src})`,
                    filter: "grayscale(30%) brightness(0.85)",
                    transition: "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1), filter 0.7s ease",
                  }}
                />
              </div>

              {/* Gradient overlay — always present, intensifies on hover */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.8) 100%)",
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500" />

              {/* Border frame — draws in on hover */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Top */}
                <span className="absolute top-0 left-0 h-[1px] bg-white/40 transition-all duration-700 ease-out w-0 group-hover:w-full" />
                {/* Right */}
                <span className="absolute top-0 right-0 w-[1px] bg-white/40 transition-all duration-700 ease-out delay-100 h-0 group-hover:h-full" />
                {/* Bottom */}
                <span className="absolute bottom-0 right-0 h-[1px] bg-white/40 transition-all duration-700 ease-out delay-200 w-0 group-hover:w-full origin-right" style={{ direction: "rtl" }} />
                {/* Left */}
                <span className="absolute bottom-0 left-0 w-[1px] bg-white/40 transition-all duration-700 ease-out delay-300 h-0 group-hover:h-full origin-bottom" />
              </div>

              {/* Index number — top left */}
              <div className="absolute top-4 left-4 z-10">
                <span className="font-mono text-[10px] text-white/30 group-hover:text-white/60 transition-colors duration-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Category tag — top right */}
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/50 border border-white/20 px-2 py-1 rounded-full">
                  {photo.category}
                </span>
              </div>

              {/* Title + arrow — bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex items-end justify-between">
                <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <span className="block font-display text-base md:text-lg text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {photo.title}
                  </span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-200">
                  <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                    <ArrowUpRight size={14} className="text-white group-hover:text-black transition-colors duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-16"
          >
            {/* Close */}
            <button className="absolute top-8 right-8 text-white/30 hover:text-white z-20 transition-colors group">
              <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-white/40 flex items-center justify-center transition-all duration-300">
                <X size={18} />
              </div>
            </button>

            {/* Nav arrows */}
            <button
              onClick={(e) => handleNav(-1, e)}
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/20 hover:text-white z-20 transition-all group hidden md:block"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 group-hover:border-white/30 flex items-center justify-center transition-all duration-300">
                <ChevronLeft size={22} />
              </div>
            </button>
            <button
              onClick={(e) => handleNav(1, e)}
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/20 hover:text-white z-20 transition-all group hidden md:block"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 group-hover:border-white/30 flex items-center justify-center transition-all duration-300">
                <ChevronRight size={22} />
              </div>
            </button>

            {/* Image counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
              <span className="font-mono text-sm text-white/40">
                {String((photos.findIndex(p => p.id === selectedImage) ?? 0) + 1).padStart(2, "0")}
              </span>
              <span className="w-8 h-[1px] bg-white/20" />
              <span className="font-mono text-sm text-white/20">
                {String(photos.length).padStart(2, "0")}
              </span>
            </div>

            {photos.map((photo) =>
              photo.id === selectedImage ? (
                <motion.div
                  key={photo.id}
                  initial={{ scale: 0.92, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.92, opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  className="relative w-full h-full max-w-5xl max-h-[80vh] flex flex-col items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="max-w-full max-h-[70vh] object-contain rounded-sm"
                    loading="lazy"
                  />
                  <div className="mt-6 flex items-center gap-4">
                    <span className="font-display text-lg text-white/70">{photo.title}</span>
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-white/30 border border-white/10 px-2 py-0.5 rounded-full">
                      {photo.category}
                    </span>
                  </div>
                </motion.div>
              ) : null
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
