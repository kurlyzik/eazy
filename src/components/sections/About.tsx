"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { IMAGES } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Releases", value: 50, suffix: "+", decimals: 0 },
  { label: "Credits", value: 30, suffix: "+", decimals: 0 },
  { label: "Collaborations", value: 20, suffix: "+", decimals: 0 },
  { label: "Years Active", value: 5, suffix: "+", decimals: 0 },
];

function Counter({ to, suffix, decimals }: { to: number; suffix: string; decimals: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = { value: 0 };
      gsap.to(controls, {
        value: to,
        duration: 2.5,
        ease: "power2.out",
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = controls.value.toFixed(decimals) + suffix;
          }
        },
      });
    }
  }, [inView, to, suffix, decimals]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  useEffect(() => {
    if (!headlineRef.current || !textRef.current) return;

    // Headline — word-by-word reveal
    const words = headlineRef.current.querySelectorAll(".about-word");
    gsap.fromTo(
      words,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        stagger: 0.06,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 80%",
        },
      }
    );

    // Bio text — paragraph stagger
    const paragraphs = textRef.current.querySelectorAll("p");
    gsap.fromTo(
      paragraphs,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
        },
      }
    );

    // Horizontal line draw
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 90%",
          },
        }
      );
    }

    // Image reveal
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-32 md:py-48 bg-black overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left: Image */}
          <div className="w-full lg:w-[55%] relative">
            <div
              ref={imageRef}
              className="relative aspect-[3/4] w-full overflow-hidden bg-[#0a0a0a]"
              style={{ clipPath: "inset(100% 0 0 0)" }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ y: imageY }}
              >
                <div
                  className="w-full h-[110%] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-[1.5s]"
                  style={{
                    backgroundImage: `url(${IMAGES.portrait})`,
                  }}
                />
              </motion.div>

              {/* Gold duotone overlay on hover */}
              <div className="absolute inset-0 bg-white/10 mix-blend-color opacity-0 hover:opacity-100 transition-opacity duration-[1.5s] pointer-events-none" />
            </div>
          </div>

          {/* Right: Text & Stats */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center">
            <h2
              ref={headlineRef}
              className="text-5xl md:text-7xl lg:text-8xl text-white mb-12 leading-[0.9] overflow-hidden uppercase"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {"THE SOUND BEHIND THE SOUND".split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-3">
                  <span className="about-word inline-block">{word}</span>
                </span>
              ))}
            </h2>

            <div
              ref={textRef}
              className="space-y-6 text-white/50 font-sans text-base md:text-lg leading-relaxed max-w-xl"
            >
              <p>
                EazyOnDaBeatz is an Afrobeats producer from Lagos whose work is
                built on bounce, clarity, and replay value. Blending crisp
                percussion with melodic textures, he creates records that feel
                current while still carrying a signature groove.
              </p>
              <p>
                With credits including Celo&apos;s &ldquo;Insanity,&rdquo; EazyOnDaBeatz
                continues to expand his sound through consistent releases and
                creative partnerships.
              </p>
              <p>
                Whether producing from scratch or adding additional production to
                elevate a record, the goal stays the same: make music that
                moves — then hit &ldquo;press play&rdquo; again.
              </p>
            </div>

            {/* Stats — stacked rows */}
            <div className="mt-16 pt-12 border-t border-white/5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="text-5xl md:text-6xl text-white" style={{ fontFamily: "var(--font-alt)" }}>
                      <Counter to={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/70 mt-2 font-sans">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Full-width divider */}
        <div
          ref={lineRef}
          className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mt-32 origin-left"
        />
      </div>
    </section>
  );
}
