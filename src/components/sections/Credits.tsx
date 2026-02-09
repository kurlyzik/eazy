"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";
import { IMAGES } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

const artists = [
  "Drake", "Burna Boy", "Travis Scott", "Wizkid", "Metro Boomin",
  "Tems", "21 Savage", "Rema", "Asake", "Future",
];

const credits = [
  { id: 1, artist: "Drake", title: "Midnight Heat", year: "2024", streams: "1.2B", image: IMAGES.credits.album01 },
  { id: 2, artist: "Burna Boy", title: "African Giant II", year: "2023", streams: "850M", image: IMAGES.credits.album02 },
  { id: 3, artist: "Travis Scott", title: "Utopia (Deluxe)", year: "2023", streams: "2.1B", image: IMAGES.credits.album03 },
  { id: 4, artist: "Tems", title: "Free Mind Remix", year: "2022", streams: "400M", image: IMAGES.credits.album04 },
  { id: 5, artist: "Wizkid", title: "Lagos Vibes", year: "2024", streams: "600M", image: IMAGES.credits.album05 },
  { id: 6, artist: "Metro Boomin", title: "Heroes & Villains", year: "2022", streams: "3.5B", image: IMAGES.credits.album06 },
];

export default function Credits() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !galleryRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".credit-card");

    gsap.to(cards, {
      xPercent: -100 * (cards.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (cards.length - 1),
        end: () => "+=" + (galleryRef.current?.offsetWidth || 0),
      },
    });

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        }
      );
    }

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section ref={sectionRef} id="credits" className="relative w-full min-h-screen bg-black flex flex-col justify-center overflow-hidden">
      {/* Background marquee */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full overflow-hidden select-none pointer-events-none z-0 opacity-[0.03]">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...artists, ...artists, ...artists].map((artist, i) => (
            <span key={i} className="font-display text-[14vw] leading-none text-transparent mx-6" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>
              {artist}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center">
        <div className="px-6 md:px-12 mb-16">
          <h2 ref={titleRef} className="font-display text-5xl md:text-7xl text-white">Selected Credits</h2>
          <p className="font-sans text-sm text-white/25 mt-4 tracking-wider uppercase">Scroll to explore</p>
        </div>

        <div ref={galleryRef} className="flex gap-8 pl-6 md:pl-12 w-max">
          {credits.map((credit) => (
            <div key={credit.id} className="credit-card group relative w-[380px] md:w-[480px] h-[560px] bg-[#0a0a0a] overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-105 group-hover:grayscale" style={{ backgroundImage: `url(${credit.image})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500">
                <button className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg shadow-white/20">
                  <Play fill="black" size={24} className="ml-1" />
                </button>
              </div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="font-display text-4xl text-white mb-1">{credit.title}</h3>
                <p className="font-sans text-lg text-white/60 mb-6">{credit.artist}</p>
                <div className="flex justify-between items-center text-xs uppercase tracking-[0.15em] text-white/25 border-t border-white/5 pt-4 font-sans">
                  <span>{credit.year}</span>
                  <span>{credit.streams} Streams</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
