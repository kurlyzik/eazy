"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { IMAGES } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

const credits = [
  {
    name: "Celo",
    image: IMAGES.artists.celo,
    tracks: ["Insanity", "Sabrina", "Remedy", "On My Way", "Adrenaline"],
    role: "Producer",
    spotify: "https://open.spotify.com/artist/57jnGVKiJf3uOsUuw7UB5c",
  },
  {
    name: "Otega",
    image: IMAGES.artists.otega,
    tracks: ["Don Julio", "Paradise", "2Fa", "Concentrate"],
    role: "Producer",
    spotify: "https://open.spotify.com/artist/1yneaf3cnlnX0XWGiPibcS",
  },
  {
    name: "Mohbad",
    image: IMAGES.artists.mohbad,
    tracks: ["Concentrate"],
    role: "Producer",
    spotify: "https://open.spotify.com/artist/0a8YNI8VHVPYKIPvCiJDxa",
  },
  {
    name: "DANNYELLO",
    image: IMAGES.artists.dannyello,
    tracks: ["Kala", "911", "Loving You"],
    role: "Producer",
    spotify: "https://open.spotify.com/artist/7EK6PyRULjVtxj3leZEbqm",
  },
  {
    name: "Sharlly",
    image: IMAGES.artists.sharlly,
    tracks: ["Voleur", "Jara", "Helpless", "How"],
    role: "Producer",
    spotify: "https://open.spotify.com/artist/7rABiO2ENPTcWfvQoKL6tu",
  },
  {
    name: "Blaqmix",
    image: IMAGES.artists.blaqmix,
    tracks: ["I Obey"],
    role: "Co-Producer",
    spotify: "#",
  },
  {
    name: "Layonn",
    image: IMAGES.artists.layonn,
    tracks: ["I Obey"],
    role: "Co-Producer",
    spotify: "https://open.spotify.com/artist/5eWxLyihfVvBEprV5V83GP",
  },
];

const artistNames = credits.map((c) => c.name);

export default function Credits() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !galleryRef.current) return;

    const gallery = galleryRef.current;
    const cards = gsap.utils.toArray<HTMLElement>(".credit-card");
    const totalWidth = gallery.scrollWidth;
    const viewWidth = window.innerWidth;

    // Horizontal scroll
    gsap.to(gallery, {
      x: -(totalWidth - viewWidth),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + (totalWidth - viewWidth),
        invalidateOnRefresh: true,
      },
    });

    // Title entrance
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

    // Staggered card entrance
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7,
          ease: "power2.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section ref={sectionRef} id="credits" className="relative w-full min-h-screen bg-black flex flex-col justify-center overflow-hidden">
      {/* Background marquee */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full overflow-hidden select-none pointer-events-none z-0 opacity-[0.03]">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...artistNames, ...artistNames, ...artistNames].map((artist, i) => (
            <span key={i} className="font-display text-[14vw] leading-none text-transparent mx-6" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>
              {artist}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center">
        <div className="px-6 md:px-12 mb-16">
          <h2 ref={titleRef} className="text-5xl md:text-7xl text-white uppercase" style={{ fontFamily: "var(--font-heading)" }}>Selected Credits</h2>
          <p className="font-sans text-sm text-white/25 mt-4 tracking-wider uppercase">Scroll to explore</p>
        </div>

        <div ref={galleryRef} className="flex gap-8 pl-6 md:pl-12 w-max">
          {credits.map((credit, i) => (
            <a
              key={credit.name}
              href={credit.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="credit-card group relative w-[340px] md:w-[420px] h-[520px] md:h-[580px] bg-[#0a0a0a] overflow-hidden flex-shrink-0 block rounded-2xl border border-white/[0.08] hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.06)]"
            >
              {/* Card number */}
              <div className="absolute top-5 left-6 z-20 font-mono text-[11px] tracking-wider text-white/15 group-hover:text-white/30 transition-colors duration-500">
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Artist image */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <Image
                  src={credit.image}
                  alt={credit.name}
                  fill
                  sizes="(max-width: 768px) 340px, 420px"
                  className="object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
                {/* Hover glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                {/* Artist name */}
                <h3 className="text-4xl md:text-5xl text-white mb-2 transition-all duration-500 group-hover:translate-y-[-4px] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]" style={{ fontFamily: "var(--font-accent)" }}>
                  {credit.name}
                </h3>

                {/* Role badge */}
                <span className="inline-flex w-fit px-3 py-1 rounded-full border border-white/10 group-hover:border-white/20 font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 group-hover:text-white/60 mb-6 transition-all duration-500">
                  {credit.role}
                </span>

                {/* Track list */}
                <div className="border-t border-white/[0.08] group-hover:border-white/15 pt-4 flex flex-col gap-1.5 transition-colors duration-500">
                  {credit.tracks.map((track, j) => (
                    <div key={track} className="flex items-center gap-3 transition-all duration-300" style={{ transitionDelay: `${j * 30}ms` }}>
                      <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-white/50 shrink-0 transition-colors duration-300" />
                      <span className="font-sans text-sm text-white/40 group-hover:text-white/70 transition-colors duration-300">
                        {track}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Track count + Spotify link */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-wider text-white/15 group-hover:text-white/30 transition-colors duration-300">
                    {credit.tracks.length} {credit.tracks.length === 1 ? "TRACK" : "TRACKS"}
                  </span>
                  <span className="font-mono text-[10px] tracking-wider text-white/0 group-hover:text-white/40 transition-all duration-500 group-hover:translate-x-1">
                    VIEW ON SPOTIFY &rarr;
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
