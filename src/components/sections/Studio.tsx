"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMAGES } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", title: "COMPOSE", desc: "Melody is the soul. I start with raw instrumentation — piano, synth, or organic sampling — to find the emotional core." },
  { num: "02", title: "PRODUCE", desc: "Rhythm is the heartbeat. Layering drums, bass, and textures to build a sonic environment that breathes." },
  { num: "03", title: "MIX", desc: "Clarity is the key. Surgical EQ, dynamic compression, and spatial processing to ensure every element sits in its perfect place." },
];

export default function Studio() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !stepsRef.current) return;

    const stepElements = stepsRef.current.querySelectorAll(".process-step");

    stepElements.forEach((step, i) => {
      const num = step.querySelector(".step-num");
      const title = step.querySelector(".step-title");
      const desc = step.querySelector(".step-desc");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(num, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
        .fromTo(title, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .fromTo(desc, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4");
    });

    // Connecting line animation
    if (lineRef.current) {
      gsap.fromTo(lineRef.current, { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: {
          trigger: stepsRef.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        },
      });
    }
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative w-full py-32 md:py-48 overflow-hidden bg-black">
      {/* Parallax background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-15 grayscale"
          style={{ backgroundImage: `url(${IMAGES.studioWide})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <h2 className="text-6xl md:text-8xl text-stroke text-center mb-32 opacity-60 uppercase" style={{ fontFamily: "var(--font-heading)" }}>
          WHERE MAGIC HAPPENS
        </h2>

        <div ref={stepsRef} className="relative">
          {/* Connecting line */}
          <div
            ref={lineRef}
            className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/30 via-white/10 to-transparent origin-top z-0"
            style={{ transform: "scaleY(0)" }}
          />

          <div className="flex flex-col gap-32 md:gap-48">
            {steps.map((step) => (
              <div key={step.num} className="process-step relative flex gap-8 md:gap-16 items-start">
                {/* Number */}
                <div className="step-num shrink-0 relative z-10">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 bg-black flex items-center justify-center">
                    <span className="font-mono text-xs text-white">{step.num}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 max-w-2xl">
                  <h3 className="step-title text-5xl md:text-7xl text-white mb-6 uppercase" style={{ fontFamily: "var(--font-display)" }}>{step.title}</h3>
                  <p className="step-desc font-sans text-base md:text-lg text-white/40 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
