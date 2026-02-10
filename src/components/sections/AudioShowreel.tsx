"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SkipForward, SkipBack } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tracks = [
  { title: "Insanity", artist: "Celo", spotifyId: "0R1Z20amcclgAd4WRztJR8", tags: ["Afrobeats"] },
  { title: "Concentrate", artist: "Otega, Mohbad & more", spotifyId: "1RAOxgshkTwhVDR72KVKWq", tags: ["Afrobeats"] },
  { title: "Don Julio", artist: "Otega", spotifyId: "0pSvdqdPJsQERhVWKjcfhi", tags: ["Afrobeats"] },
  { title: "Adrenaline", artist: "Celo", spotifyId: "278AalYy22hO0zxeQAzZ73", tags: ["Afrobeats"] },
  { title: "Kala", artist: "DANNYELLO", spotifyId: "74f1LBBQk6azvntyj8lfxU", tags: ["Afrobeats"] },
  { title: "Paradise", artist: "Otega", spotifyId: "2uU5peCJCMlpGMelNXocHp", tags: ["Afrobeats"] },
  { title: "Voleur", artist: "Sharlly", spotifyId: "1ilAMWafu4oB59uBS4ahJI", tags: ["Afrobeats"] },
  { title: "I Obey", artist: "Blaqmix & Layonn", spotifyId: "4DeCa6qurP5ZFQAQrVVi1a", tags: ["Afrobeats"] },
];

export default function AudioShowreel() {
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
        <h2 ref={titleRef} className="text-6xl md:text-8xl text-white mb-20 uppercase" style={{ fontFamily: "var(--font-heading)" }}>HEAR THE CRAFT</h2>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Track list */}
          <div className="flex-1 flex flex-col">
            {tracks.map((track, i) => (
              <div key={track.spotifyId}>
                <div
                  onClick={() => setCurrentTrack(i)}
                  className={`group relative py-5 md:py-6 flex items-center gap-6 md:gap-10 cursor-pointer border-b border-white/5 transition-all duration-500 ${
                    currentTrack === i ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
                  }`}
                >
                  <span className="font-mono text-sm text-white/20 w-8 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1 min-w-0">
                    <h3 className={`text-2xl md:text-4xl transition-all duration-500 ${
                      currentTrack === i ? "text-white" : "text-white group-hover:text-white/80"
                    }`} style={{ fontFamily: "var(--font-accent)" }}>
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

                  {currentTrack === i && (
                    <motion.div
                      layoutId="active-track"
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-white"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                </div>

                {/* Mobile inline Spotify embed — shows under the selected track */}
                {currentTrack === i && (
                  <div className="lg:hidden py-4 border-b border-white/5">
                    <div className="rounded-xl overflow-hidden bg-white/[0.03] border border-white/5">
                      <iframe
                        key={track.spotifyId}
                        src={`https://open.spotify.com/embed/track/${track.spotifyId}?utm_source=generator&theme=0`}
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Controls */}
            <div className="mt-8 flex items-center gap-8">
              <button className="text-white/30 hover:text-white transition-colors" onClick={() => setCurrentTrack((p) => (p - 1 + tracks.length) % tracks.length)}>
                <SkipBack size={20} />
              </button>
              <button className="text-white/30 hover:text-white transition-colors" onClick={() => setCurrentTrack((p) => (p + 1) % tracks.length)}>
                <SkipForward size={20} />
              </button>
              <div className="flex-1 h-[1px] bg-white/5 mx-4" />
              <span className="font-mono text-xs text-white/20">{String(currentTrack + 1).padStart(2, "0")} / {String(tracks.length).padStart(2, "0")}</span>
            </div>

            {/* Mobile playlist link */}
            <a
              href="https://open.spotify.com/playlist/4YtRugtGyk6sjP1zMpTwjH"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden mt-6 flex items-center justify-center gap-3 py-4 border border-white/10 rounded-full text-white/40 hover:text-white hover:border-white/25 transition-all duration-500 group"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              <span className="text-[10px] tracking-[0.3em] uppercase font-sans">
                Full Playlist on Spotify
              </span>
            </a>
          </div>

          {/* Spotify embed player — desktop sidebar only */}
          <div className="hidden lg:block w-[380px] shrink-0">
            <div className="sticky top-32">
              <span className="block font-mono text-[9px] tracking-[0.4em] uppercase text-white/20 mb-4">
                Now Playing
              </span>
              <div className="rounded-xl overflow-hidden bg-white/[0.03] border border-white/5">
                <iframe
                  key={tracks[currentTrack].spotifyId}
                  src={`https://open.spotify.com/embed/track/${tracks[currentTrack].spotifyId}?utm_source=generator&theme=0`}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-xl"
                />
              </div>

              {/* Full playlist link */}
              <a
                href="https://open.spotify.com/playlist/4YtRugtGyk6sjP1zMpTwjH"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-3 py-4 border border-white/10 rounded-full text-white/40 hover:text-white hover:border-white/25 transition-all duration-500 group"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                <span className="text-[10px] tracking-[0.3em] uppercase font-sans">
                  Full Playlist on Spotify
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
