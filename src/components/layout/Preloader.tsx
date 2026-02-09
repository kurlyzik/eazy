"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  const animate = useCallback(() => {
    if (!containerRef.current || !lineRef.current || !lettersRef.current || !waveformRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        document.body.style.overflow = "auto";
      },
    });

    const letters = lettersRef.current.querySelectorAll(".preloader-letter");
    const bars = waveformRef.current.querySelectorAll(".preloader-bar");

    // Phase 1: Flatline draws across center
    tl.fromTo(
      lineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.6, ease: "power2.inOut" }
    );

    // Phase 2: Line starts pulsing — waveform bars emerge
    tl.to(bars, {
      scaleY: 1,
      opacity: 1,
      duration: 0.4,
      stagger: { each: 0.01, from: "center" },
      ease: "power2.out",
    }, "+=0.1");

    // Phase 2b: Bars animate randomly (simulating audio feed)
    tl.to(bars, {
      scaleY: "random(0.2, 1)",
      duration: 0.15,
      stagger: { each: 0.02, repeat: 6, yoyo: true },
      ease: "power1.inOut",
    }, "-=0.2");

    // Phase 3: Letters appear one by one
    tl.fromTo(
      letters,
      { y: 40, opacity: 0, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      },
      "-=0.8"
    );

    // Phase 3b: Ripple effect on each letter appearance
    if (rippleRef.current) {
      tl.fromTo(
        rippleRef.current,
        { scale: 0.5, opacity: 0.6 },
        { scale: 2.5, opacity: 0, duration: 1, ease: "power2.out" },
        "-=0.6"
      );
    }

    // Phase 4: Hold for a beat
    tl.to({}, { duration: 0.3 });

    // Phase 5: Everything fades + radial clip reveal
    tl.to(waveformRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: "power2.in",
    });

    tl.to(letters, {
      y: -30,
      opacity: 0,
      duration: 0.3,
      stagger: 0.03,
      ease: "power2.in",
    }, "-=0.3");

    tl.to(lineRef.current, {
      scaleY: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    }, "-=0.2");

    tl.to(containerRef.current, {
      clipPath: "circle(0% at 50% 50%)",
      duration: 0.8,
      ease: "power3.inOut",
    }, "-=0.1");

  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    // Small delay to ensure DOM is painted
    const raf = requestAnimationFrame(() => {
      animate();
    });
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      style={{ clipPath: "circle(150% at 50% 50%)" }}
    >
      {/* Subtle grain */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] animate-grain" />
      </div>

      {/* Ambient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/[0.02] blur-[120px] rounded-full animate-breathe" />

      {/* Bass ripple effect */}
      <div
        ref={rippleRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-white/15 opacity-0"
      />

      <div className="relative flex flex-col items-center">
        {/* Waveform visualizer */}
        <div
          ref={waveformRef}
          className="flex items-center justify-center gap-[2px] h-16 mb-10"
        >
          {Array.from({ length: 48 }).map((_, i) => {
            const centerDistance = Math.abs(i - 24) / 24;
            return (
              <div
                key={i}
                className="preloader-bar w-[2px] h-full origin-bottom rounded-full bg-white"
                style={{
                  transform: "scaleY(0.05)",
                  opacity: 0,
                  filter: `brightness(${1.2 - centerDistance * 0.5})`,
                }}
              />
            );
          })}
        </div>

        {/* Horizontal flatline */}
        <div
          ref={lineRef}
          className="w-[280px] h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent origin-center mb-10"
          style={{ transform: "scaleX(0)", opacity: 0 }}
        />

        {/* EazyOnDaBeatz letters */}
        <div ref={lettersRef} className="flex items-center gap-1">
          {"EazyOnDaBeatz".split("").map((letter, i) => (
            <span
              key={i}
              className="preloader-letter font-display text-[clamp(2.5rem,8vw,6rem)] leading-none tracking-wide text-white"
              style={{ opacity: 0 }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Subtle tagline */}
        <div className="mt-6 overflow-hidden">
          <p
            className="text-[10px] font-sans tracking-[0.4em] uppercase text-white/20"
            style={{ animation: "fade-in 0.5s ease 2s forwards", opacity: 0 }}
          >
            World Building Producer
          </p>
        </div>
      </div>
    </div>
  );
}
