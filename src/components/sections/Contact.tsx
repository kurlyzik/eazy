"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (headlineRef.current) {
      gsap.fromTo(headlineRef.current,
        { clipPath: "inset(100% 0 0 0)", y: 80 },
        {
          clipPath: "inset(0% 0 0 0)", y: 0, duration: 1.2, ease: "power4.out",
          scrollTrigger: { trigger: headlineRef.current, start: "top 85%" },
        }
      );
    }

    if (formRef.current) {
      const inputs = formRef.current.querySelectorAll(".form-field");
      gsap.fromTo(inputs, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: formRef.current, start: "top 80%" },
      });
    }
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@kxnzo.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative min-h-screen bg-black py-32 md:py-48 flex flex-col justify-between overflow-hidden">
      {/* Subtle ambient gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 grid md:grid-cols-2 gap-24">
        {/* Left: Headline & Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 ref={headlineRef} className="font-display text-6xl md:text-7xl lg:text-8xl text-white leading-[0.85] mb-12">
              LET&apos;S BUILD SOMETHING{" "}
              <span className="text-white">LEGENDARY.</span>
            </h2>

            <div className="flex items-center gap-4 group cursor-pointer w-max" onClick={copyEmail}>
              <span className="font-mono text-lg md:text-xl text-white/60 group-hover:text-white transition-colors">
                hello@kxnzo.com
              </span>
              <button className="p-2 rounded-full bg-white/5 hover:bg-white transition-colors">
                {copied ? <Check size={14} className="text-white" /> : <Copy size={14} className="text-white/60" />}
              </button>
              {copied && <span className="text-sm text-white font-sans">Copied!</span>}
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <form ref={formRef} className="flex flex-col gap-10 mt-12 md:mt-0" onSubmit={(e) => e.preventDefault()}>
          <div className="form-field">
            <input
              type="text"
              placeholder="NAME"
              className="w-full bg-transparent border-b border-white/10 py-4 text-lg font-display tracking-widest text-white placeholder:text-white/15 focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <div className="form-field">
            <input
              type="email"
              placeholder="EMAIL"
              className="w-full bg-transparent border-b border-white/10 py-4 text-lg font-display tracking-widest text-white placeholder:text-white/15 focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <div className="form-field">
            <select className="w-full bg-transparent border-b border-white/10 py-4 text-lg font-display tracking-widest text-white/40 focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer">
              <option value="" disabled selected>PROJECT TYPE</option>
              <option value="beat" className="bg-black text-white">Beat Production</option>
              <option value="mix" className="bg-black text-white">Mixing & Mastering</option>
              <option value="score" className="bg-black text-white">Film/TV Score</option>
              <option value="other" className="bg-black text-white">Other</option>
            </select>
          </div>

          <div className="form-field">
            <textarea
              placeholder="MESSAGE"
              rows={3}
              className="w-full bg-transparent border-b border-white/10 py-4 text-lg font-display tracking-widest text-white placeholder:text-white/15 focus:outline-none focus:border-white transition-colors resize-none"
            />
          </div>

          <button type="submit" className="form-field group relative w-full overflow-hidden bg-transparent border border-white/10 py-6 text-center transition-all hover:border-white/50">
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            <span className="relative font-display text-xl tracking-[0.2em] text-white group-hover:text-black transition-colors duration-500 flex items-center justify-center gap-4">
              SEND MESSAGE <ArrowUpRight size={20} />
            </span>
          </button>
        </form>
      </div>
    </section>
  );
}
