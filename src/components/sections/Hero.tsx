"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const topBlockRef = useRef<HTMLDivElement>(null);
  const bottomBlockRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const sideLeftRef = useRef<HTMLDivElement>(null);
  const sideRightRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 700], [1, 0]);

  // Mouse parallax on text blocks
  const handleMouse = useCallback((e: MouseEvent) => {
    if (!entered) return;
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;

    if (topBlockRef.current) {
      gsap.to(topBlockRef.current, {
        x: nx * -15,
        y: ny * -8,
        duration: 1,
        ease: "power2.out",
        overwrite: true,
      });
    }
    if (bottomBlockRef.current) {
      gsap.to(bottomBlockRef.current, {
        x: nx * 15,
        y: ny * 8,
        duration: 1,
        ease: "power2.out",
        overwrite: true,
      });
    }
    if (circleRef.current) {
      gsap.to(circleRef.current, {
        rotation: nx * 25,
        duration: 1.5,
        ease: "power2.out",
        overwrite: true,
      });
    }
  }, [entered]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [handleMouse]);

  // Entrance animation
  useEffect(() => {
    const tl = gsap.timeline({
      delay: 3.2,
      onComplete: () => setEntered(true),
    });

    // Video fades in with scale
    if (videoRef.current) {
      gsap.set(videoRef.current, { scale: 1.15, opacity: 0 });
      tl.to(videoRef.current, { scale: 1.05, opacity: 1, duration: 2, ease: "power2.out" }, 0);
    }

    // Overlay lightens slightly
    if (overlayRef.current) {
      tl.fromTo(overlayRef.current, { opacity: 1 }, { opacity: 0.65, duration: 2, ease: "power2.out" }, 0);
    }

    // Divider line draws
    if (dividerRef.current) {
      tl.fromTo(dividerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.inOut" }, 0.3);
    }

    // Circle spins in
    if (circleRef.current) {
      tl.fromTo(
        circleRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        0.5
      );
    }

    // Top text — drops in from above
    if (topBlockRef.current) {
      tl.fromTo(
        topBlockRef.current,
        { y: -80, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" },
        0.6
      );
    }

    // Bottom text — rises from below
    if (bottomBlockRef.current) {
      tl.fromTo(
        bottomBlockRef.current,
        { y: 80, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" },
        0.7
      );
    }

    // Side details
    if (sideLeftRef.current) {
      tl.fromTo(sideLeftRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8 }, "-=0.4");
    }
    if (sideRightRef.current) {
      tl.fromTo(sideRightRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.8 }, "-=0.8");
    }

    // Subtitle & CTA
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.3");
    }
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");
    }

    // Scroll-driven animations (use fromTo so reverse restores post-entrance state)
    gsap.fromTo(videoRef.current,
      { scale: 1.05, opacity: 1 },
      { scale: 1.2, ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: true } }
    );

    gsap.fromTo(overlayRef.current,
      { opacity: 0.65 },
      { opacity: 0.9, ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top top", end: "50% top", scrub: true } }
    );

    gsap.fromTo(topBlockRef.current,
      { y: 0, opacity: 1 },
      { y: -250, opacity: 0, ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top top", end: "50% top", scrub: 0.5 } }
    );
    gsap.fromTo(bottomBlockRef.current,
      { y: 0, opacity: 1 },
      { y: 250, opacity: 0, ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top top", end: "50% top", scrub: 0.5 } }
    );
    gsap.fromTo(dividerRef.current,
      { scaleX: 1, opacity: 1 },
      { scaleX: 3, opacity: 0, ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top top", end: "40% top", scrub: 0.5 } }
    );
    gsap.fromTo(circleRef.current,
      { scale: 1, opacity: 1, rotation: 0 },
      { scale: 6, opacity: 0, rotation: 360, ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top top", end: "50% top", scrub: 0.5 } }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[140vh] w-full overflow-hidden bg-black"
    >
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/media/hero.mp4"
        poster="/media/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{ opacity: 0, transform: "scale(1.15)", filter: "grayscale(100%)" }}
      />

      {/* Dark overlay — controls video visibility */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[1] bg-black"
        style={{ opacity: 1 }}
      />

      {/* Vignette for depth */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Main content — centered */}
      <motion.div
        className="relative z-10 h-screen flex flex-col items-center justify-center"
        style={{ opacity }}
      >
        {/* Top text: "I DON'T MAKE BEATS" — outlined stroke */}
        <div
          ref={topBlockRef}
          className="text-center mb-0"
          style={{ opacity: 0 }}
        >
          <h1
            className="leading-[0.85] tracking-tight uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 9vw, 8.5rem)",
              WebkitTextStroke: "1.5px rgba(255,255,255,0.6)",
              color: "transparent",
            }}
          >
            PRESS PLAY
          </h1>
        </div>

        {/* Central divider with rotating circle */}
        <div className="relative w-full flex items-center justify-center my-6 md:my-8">
          <div
            ref={dividerRef}
            className="absolute left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent origin-center"
            style={{ transform: "scaleX(0)" }}
          />

          <div
            ref={circleRef}
            className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center z-10"
            style={{ opacity: 0 }}
          >
            <div className="absolute inset-0 rounded-full border border-white/20" />
            <div className="absolute inset-2 md:inset-3 rounded-full border border-dashed border-white/10 animate-spin-slow" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white/30" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white/30" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-white/30" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-white/30" />
          </div>
        </div>

        {/* Bottom text: "FEEL THE BOUNCE." — solid white, larger */}
        <div
          ref={bottomBlockRef}
          className="text-center mt-0"
          style={{ opacity: 0 }}
        >
          <h2
            className="leading-[0.85] tracking-tight text-white uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 10vw, 9.5rem)",
              textShadow: "0 4px 40px rgba(0,0,0,0.5), 0 0 120px rgba(255,255,255,0.06)",
            }}
          >
            FEEL THE BOUNCE.
          </h2>
        </div>

        {/* Side details */}
        <div
          ref={sideLeftRef}
          className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3"
          style={{ opacity: 0 }}
        >
          <span className="font-mono text-[9px] tracking-[0.3em] text-white/20 uppercase">
            Est. 2015
          </span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/15 to-transparent" />
          <span className="font-mono text-[9px] tracking-[0.3em] text-white/20 uppercase" style={{ writingMode: "vertical-lr" }}>
            Press Play
          </span>
        </div>

        <div
          ref={sideRightRef}
          className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-end gap-3"
          style={{ opacity: 0 }}
        >
          <span className="font-mono text-[9px] tracking-[0.3em] text-white/20 uppercase">
            Lagos
          </span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/15 to-transparent" />
          <span className="font-mono text-[9px] tracking-wider text-white/20">
            6.52&deg;N
          </span>
          <span className="font-mono text-[9px] tracking-wider text-white/20">
            3.38&deg;E
          </span>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="mt-12 md:mt-16 text-center" style={{ opacity: 0 }}>
          <p className="font-sans text-[11px] md:text-xs tracking-[0.35em] uppercase text-white/30 font-light">
            Afrobeats producer
            <span className="inline-block w-6 h-[1px] bg-white/15 mx-4 align-middle" />
            Lagos, Nigeria
            <span className="inline-block w-6 h-[1px] bg-white/15 mx-4 align-middle" />
            Bounce &middot; Clarity &middot; Replay
          </p>
        </div>

        {/* Scroll to explore */}
        <div ref={ctaRef} className="mt-12 flex flex-col items-center gap-3" style={{ opacity: 0 }}>
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/20">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" as const }}
          >
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="text-white/20">
              <path d="M8 4V20M8 20L2 14M8 20L14 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.5, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
          className="w-[1px] h-10 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </section>
  );
}
