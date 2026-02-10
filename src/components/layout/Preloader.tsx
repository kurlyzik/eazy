"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [started, setStarted] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const enterRef = useRef<HTMLButtonElement>(null);

  // Wait for all critical assets before showing the press play screen
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const waitForAssets = async () => {
      const promises: Promise<unknown>[] = [];

      // 1. Wait for all fonts to load
      if (document.fonts?.ready) {
        promises.push(document.fonts.ready);
      }

      // 2. Preload the hero video poster so it's cached
      promises.push(
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = "/media/hero-poster.jpg";
        })
      );

      // 3. Preload the audio file
      promises.push(
        new Promise<void>((resolve) => {
          const audio = new Audio();
          audio.oncanplaythrough = () => resolve();
          audio.onerror = () => resolve();
          audio.src = "/media/audio/pressplay.mp3";
        })
      );

      // 4. Wait for the DOM to be fully loaded
      if (document.readyState !== "complete") {
        promises.push(
          new Promise<void>((resolve) => {
            window.addEventListener("load", () => resolve(), { once: true });
          })
        );
      }

      // Race against a timeout so we don't hang forever
      await Promise.race([
        Promise.all(promises),
        new Promise((resolve) => setTimeout(resolve, 5000)),
      ]);

      setAssetsReady(true);
    };

    waitForAssets();
  }, []);

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

  const handleEnter = useCallback(() => {
    setStarted(true);

    // Play audio immediately on user gesture — must not be delayed by GSAP
    // or browsers (especially Safari/iOS) will block it as non-user-initiated
    const audio = new Audio("/media/audio/pressplay.mp3");
    audio.volume = 0.5;
    audio.play().catch(() => {});

    // Fade out the enter button, then start the main animation
    if (enterRef.current) {
      gsap.to(enterRef.current, {
        opacity: 0, scale: 0.9, duration: 0.3, ease: "power2.in",
        onComplete: () => animate(),
      });
    } else {
      animate();
    }
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

      {/* Loading state — shown while assets are loading */}
      {!assetsReady && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6">
          {/* Pulsing dot */}
          <div className="w-2 h-2 rounded-full bg-white/30 animate-pulse" />
        </div>
      )}

      {/* Click to enter — only shown after all assets are ready */}
      {assetsReady && !started && (
        <button
          ref={enterRef}
          onClick={handleEnter}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer group animate-[fade-in_0.6s_ease_forwards]"
        >
          {/* Outer container for the animated button */}
          <div className="relative flex items-center justify-center w-48 h-48 mb-8">
            {/* Pulsing rings */}
            <div className="absolute inset-0 rounded-full border border-white/[0.06] animate-[ping_3s_ease-in-out_infinite]" />
            <div className="absolute inset-4 rounded-full border border-white/[0.08] animate-[ping_3s_ease-in-out_0.5s_infinite]" />

            {/* Rotating ring with dashes */}
            <div
              className="absolute inset-2 rounded-full border border-dashed border-white/10 animate-[spin_12s_linear_infinite]"
            />

            {/* Counter-rotating thin ring */}
            <div
              className="absolute inset-6 rounded-full border border-white/[0.06] animate-[spin_8s_linear_infinite_reverse]"
            />

            {/* EQ bars orbiting around the button */}
            <div className="absolute inset-0 animate-[spin_6s_linear_infinite]">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-0 -translate-x-1/2 origin-[50%_96px]"
                  style={{ transform: `translateX(-50%) rotate(${i * 30}deg)` }}
                >
                  <div
                    className="w-[2px] rounded-full bg-white/20"
                    style={{
                      height: `${8 + Math.sin(i * 1.2) * 6}px`,
                      animation: `preloader-eq ${0.6 + (i % 3) * 0.3}s ease-in-out ${i * 0.1}s infinite alternate`,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Breathing glow behind the play button */}
            <div className="absolute w-20 h-20 rounded-full bg-white/[0.04] blur-xl animate-[pulse_2s_ease-in-out_infinite]" />

            {/* Main play circle */}
            <div className="relative w-20 h-20 rounded-full border border-white/20 group-hover:border-white/50 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] backdrop-blur-sm bg-white/[0.02]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white" className="ml-1 transition-transform duration-300 group-hover:scale-110">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Mini waveform under the button */}
          <div className="flex items-end gap-[3px] h-5 mb-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="w-[2px] rounded-full bg-white/20"
                style={{
                  animation: `preloader-eq ${0.4 + (i % 4) * 0.2}s ease-in-out ${i * 0.08}s infinite alternate`,
                  height: "100%",
                  transformOrigin: "bottom",
                }}
              />
            ))}
          </div>

          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/25 group-hover:text-white/60 transition-colors duration-500">
            Press Play
          </span>
        </button>
      )}

      <div className="relative flex flex-col items-center" style={{ visibility: started ? "visible" : "hidden" }}>
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
        <div ref={lettersRef} className="flex items-center gap-0 px-4">
          {"EazyOnDaBeatz".split("").map((letter, i) => (
            <span
              key={i}
              className="preloader-letter text-[clamp(1.4rem,5vw,4rem)] leading-none tracking-normal text-white"
              style={{ fontFamily: "var(--font-decorative)", opacity: 0 }}
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
