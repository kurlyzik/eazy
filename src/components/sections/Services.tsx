"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: 1, title: "Custom Beat Production", desc: "Tailored instrumentation built from scratch to fit your unique vocal style and artistic vision. No type beats, only signatures.", tags: ["Hip-Hop", "R&B", "Afro-Fusion", "Pop"] },
  { id: 2, title: "Film & TV Scoring", desc: "Cinematic soundscapes that drive narrative. From tension-building underscores to triumphant themes, I translate emotion into audio.", tags: ["Orchestral", "Hybrid", "Ambient", "Thriller"] },
  { id: 3, title: "Mixing & Mastering", desc: "Industry-standard polish. I balance frequencies, enhance dynamics, and ensure your track translates perfectly across all playback systems.", tags: ["Dolby Atmos", "Stereo", "Stem Mixing"] },
  { id: 4, title: "Sound Design", desc: "Creating bespoke textures, foley, and synth patches for games, apps, and immersive installations.", tags: ["Synthesis", "Foley", "UX Audio"] },
  { id: 5, title: "Artist Development", desc: "More than just production. I help shape your sonic identity, refine your songwriting, and build a cohesive project rollout.", tags: ["Consulting", "Branding", "Strategy"] },
];

export default function Services() {
  const [openService, setOpenService] = useState<number | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
      });
    }

    if (listRef.current) {
      const items = listRef.current.querySelectorAll(".service-item");
      gsap.fromTo(items, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: listRef.current, start: "top 75%" },
      });
    }
  }, []);

  return (
    <section id="services" className="relative py-32 md:py-48 bg-black overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10 w-full">
        <h2 ref={titleRef} className="font-display text-7xl md:text-9xl text-white mb-24 leading-none">
          LET&apos;S WORK
        </h2>

        <div ref={listRef} className="flex flex-col">
          {services.map((service, index) => (
            <div key={service.id} className="service-item border-b border-white/5 last:border-b-0">
              <button
                onClick={() => setOpenService(openService === service.id ? null : service.id)}
                className="w-full py-8 flex items-center gap-6 group text-left"
              >
                <span className="font-mono text-sm text-white/50 w-8 shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className={`font-display text-3xl md:text-5xl flex-1 transition-all duration-500 ${
                  openService === service.id
                    ? "text-white"
                    : "text-white group-hover:text-white/80 group-hover:translate-x-2"
                }`} style={{ transition: "transform 0.5s ease, color 0.5s ease" }}>
                  {service.title}
                </span>

                <span className={`p-2 rounded-full border transition-all duration-300 shrink-0 ${
                  openService === service.id
                    ? "bg-white border-white rotate-45"
                    : "border-white/10 group-hover:border-white/30"
                }`}>
                  <Plus size={20} className={openService === service.id ? "text-black" : "text-white/60"} />
                </span>
              </button>

              <AnimatePresence>
                {openService === service.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pl-14 md:pl-14 md:w-3/4">
                      <p className="font-sans text-lg text-white/50 leading-relaxed mb-6">{service.desc}</p>
                      <div className="flex gap-2 flex-wrap">
                        {service.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 rounded-full bg-transparent text-sm text-white/60 border border-white/20 font-sans">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
