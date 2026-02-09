"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tracks = [
  { title: "Midnight Seoul", artist: "EazyOnDaBeatz x DEAN", bpm: "140", key: "Cm", tags: ["R&B", "Trap"] },
  { title: "Lagos Nights", artist: "EazyOnDaBeatz x Wizkid", bpm: "100", key: "G#m", tags: ["Afrobeats"] },
  { title: "Neon Rain", artist: "EazyOnDaBeatz", bpm: "128", key: "Am", tags: ["Synthwave"] },
  { title: "Deep Space", artist: "EazyOnDaBeatz x Travis", bpm: "150", key: "Fm", tags: ["Hip-Hop"] },
  { title: "Golden Hour", artist: "EazyOnDaBeatz", bpm: "95", key: "E", tags: ["Soul"] },
];

export default function AudioShowreel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    gsap.fromTo(titleRef.current, { opacity: 0, y: 60 }, {
      opacity: 1, y: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
    });
  }, []);

  return (
    <section id="music" className="relative py-32 md:py-48 bg-[#050505] overflow-hidden min-h-screen flex items-center">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 w-full">
        <h2 ref={titleRef} className="font-display text-6xl md:text-8xl text-white mb-20">HEAR THE CRAFT</h2>

        <div className="flex flex-col">
          {tracks.map((track, i) => (
            <div
              key={i}
              onClick={() => { setCurrentTrack(i); setIsPlaying(true); }}
              className={`group relative py-6 md:py-8 flex items-center gap-6 md:gap-10 cursor-pointer border-b border-white/5 transition-all duration-500 ${
                currentTrack === i ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
              }`}
            >
              <span className="font-mono text-sm text-white/20 w-8 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex-1 min-w-0">
                <h3 className={`font-display text-3xl md:text-5xl transition-all duration-500 ${
                  currentTrack === i ? "text-white" : "text-white group-hover:text-white/80"
                }`}>
                  {track.title}
                </h3>
                <p className="font-sans text-sm text-white/30 mt-1">{track.artist}</p>
              </div>

              {currentTrack === i && (
                <div className="hidden md:flex items-center gap-[2px] h-8 mx-4">
                  {Array.from({ length: 24 }).map((_, j) => (
                    <div
                      key={j}
                      className="waveform-bar w-[2px] h-full bg-white/60 rounded-full"
                      style={{
                        ["--duration" as string]: `${0.6 + Math.random() * 0.8}s`,
                        ["--delay" as string]: `${j * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="hidden md:flex gap-2 shrink-0">
                {track.tags.map((tag) => (
                  <span key={tag} className={`px-3 py-1 text-[10px] uppercase tracking-wider font-sans border rounded-full transition-colors duration-300 ${
                    currentTrack === i ? "border-white/30 text-white/70" : "border-white/5 text-white/25"
                  }`}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="hidden lg:flex gap-6 text-xs font-mono text-white/20 shrink-0">
                <span>{track.bpm} BPM</span>
                <span>{track.key}</span>
              </div>

              {currentTrack === i && (
                <motion.div
                  layoutId="active-track"
                  className="absolute left-0 top-0 bottom-0 w-[2px] bg-white"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 flex items-center gap-8">
          <button className="text-white/30 hover:text-white transition-colors" onClick={() => setCurrentTrack((p) => (p - 1 + tracks.length) % tracks.length)}>
            <SkipBack size={20} />
          </button>
          <button onClick={() => setIsPlaying(!isPlaying)} className="w-14 h-14 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-white/15">
            {isPlaying ? <Pause fill="black" stroke="black" size={20} /> : <Play fill="black" stroke="black" size={20} className="ml-0.5" />}
          </button>
          <button className="text-white/30 hover:text-white transition-colors" onClick={() => setCurrentTrack((p) => (p + 1) % tracks.length)}>
            <SkipForward size={20} />
          </button>
          <div className="flex-1 h-[1px] bg-white/5 mx-4" />
          <span className="font-mono text-xs text-white/20">{String(currentTrack + 1).padStart(2, "0")} / {String(tracks.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}
