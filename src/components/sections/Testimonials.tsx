"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote: "The bounce on every track is infectious. EazyOnDaBeatz knows exactly how to make a record move.",
    author: "Celo",
    title: "Artist",
  },
  {
    id: 2,
    quote: "His percussion is crisp, his melodies are layered, and every beat feels like it was built to replay on loop.",
    author: "Studio Partner",
    title: "Producer",
  },
  {
    id: 3,
    quote: "When Eazy sends a beat, you already hear the finished record. He doesn't just produce — he elevates.",
    author: "Collaborator",
    title: "Artist",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Reset progress animation on change
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.transition = "none";
      progressRef.current.style.transform = "scaleX(0)";
      requestAnimationFrame(() => {
        if (progressRef.current) {
          progressRef.current.style.transition = "transform 6s linear";
          progressRef.current.style.transform = "scaleX(1)";
        }
      });
    }
  }, [current]);

  return (
    <section className="relative py-32 md:py-48 bg-[#050505] overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[120px] animate-breathe" />
      </div>

      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10 text-center">
        <h2 className="font-sans text-[10px] uppercase tracking-[0.5em] text-white/25 mb-20">
          What They Say
        </h2>

        <div className="relative min-h-[300px] md:min-h-[350px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <p className="italic text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-12" style={{ fontFamily: "var(--font-cursive)" }}>
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>

              <div className="flex flex-col items-center">
                <h4 className="text-lg tracking-[0.2em] text-white uppercase" style={{ fontFamily: "var(--font-alt)" }}>
                  {testimonials[current].author}
                </h4>
                <span className="font-sans text-xs text-white/30 uppercase tracking-wider mt-1">
                  {testimonials[current].title}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress indicators */}
        <div className="flex gap-4 justify-center mt-16">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className="relative w-16 h-[2px] bg-white/10 overflow-hidden rounded-full"
            >
              {current === index && (
                <div
                  ref={index === current ? progressRef : undefined}
                  className="absolute inset-0 bg-white origin-left"
                  style={{ transform: "scaleX(0)" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
