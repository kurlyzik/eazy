"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Credits", href: "#credits" },
  { name: "Music", href: "#music" },
  { name: "Gallery", href: "#gallery" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3 }
    );

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (lenis) {
      const target = document.querySelector(href);
      if (target) lenis.scrollTo(href);
    }
    setIsMobileMenuOpen(false);
  };

  // Animate mobile menu links
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled ? "py-3" : "py-5 md:py-8"
        }`}
      >
        {/* Blurred backdrop — only when scrolled */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)",
            backdropFilter: isScrolled ? "blur(12px)" : "none",
            WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
          }}
        />

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo — stacked monogram on desktop */}
          <Link href="/" className="relative z-50 group" data-cursor="hover">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="text-xl md:text-2xl tracking-[0.2em] text-white block leading-none" style={{ fontFamily: "var(--font-alt)" }}>
                  EazyOnDeBeatz
                </span>
                <span
                  className="block h-[1px] mt-1 origin-left transition-transform duration-500 group-hover:scale-x-100 scale-x-50"
                  style={{ background: "linear-gradient(90deg, white 50%, transparent)" }}
                />
              </div>
              <span className="hidden md:block text-[8px] tracking-[0.3em] uppercase text-white/20 font-sans leading-tight border-l border-white/10 pl-3">
                Press<br />Play
              </span>
            </div>
          </Link>

          {/* Desktop nav — numbered, spaced, with active indicator */}
          <nav className="hidden md:flex items-center">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollToSection(e, link.href)}
                  className="relative group px-5 py-2"
                  data-cursor="hover"
                >
                  {/* Index number */}
                  <span className={`absolute -top-1 left-5 text-[8px] font-mono transition-all duration-500 ${
                    isActive ? "text-white/60" : "text-white/0 group-hover:text-white/30"
                  }`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Link text */}
                  <span className={`text-[11px] uppercase tracking-[0.15em] font-sans transition-all duration-500 ${
                    isActive ? "text-white" : "text-white/40 group-hover:text-white/80"
                  }`}>
                    {link.name}
                  </span>

                  {/* Active dot */}
                  <span className={`absolute -bottom-0 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-white transition-all duration-500 ${
                    isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`} />
                </a>
              );
            })}

            {/* Separator + time */}
            <div className="ml-6 pl-6 border-l border-white/10 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" />
              <span className="text-[9px] font-mono text-white/20 tracking-wider">
                LG
              </span>
            </div>
          </nav>

          {/* Mobile menu toggle — artistic hamburger */}
          <button
            className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-[6px]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-cursor="hover"
          >
            <span
              className={`block h-[1px] bg-white transition-all duration-500 origin-center ${
                isMobileMenuOpen ? "w-6 rotate-45 translate-y-[3.5px]" : "w-6"
              }`}
            />
            <span
              className={`block h-[1px] bg-white transition-all duration-500 origin-center ${
                isMobileMenuOpen ? "w-6 -rotate-45 -translate-y-[3.5px]" : "w-4 self-end"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu — full-screen cinematic reveal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ clipPath: "circle(0% at calc(100% - 36px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 36px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 36px) 36px)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-black md:hidden"
          >
            {/* Subtle grid texture */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

            <div className="relative h-full flex flex-col justify-center px-8">
              {/* Section label */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[9px] font-mono tracking-[0.4em] uppercase text-white/20 mb-12"
              >
                Navigation
              </motion.span>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollToSection(e, link.href)}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.3 + index * 0.08,
                      duration: 0.6,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    className="group flex items-baseline gap-4 py-3"
                  >
                    <span className="text-[10px] font-mono text-white/20 w-6 shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-4xl sm:text-5xl text-white/90 group-hover:text-white transition-colors duration-300 leading-none uppercase" style={{ fontFamily: "var(--font-display)" }}>
                      {link.name}
                    </span>
                    <span className="flex-1 h-[1px] bg-white/5 self-center hidden sm:block" />
                  </motion.a>
                ))}
              </nav>

              {/* Bottom info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-12 left-8 right-8 flex justify-between items-end"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono tracking-[0.3em] text-white/15 uppercase">
                    Lagos, Nigeria
                  </span>
                  <span className="text-[9px] font-mono tracking-wider text-white/15">
                    6.52&deg;N / 3.38&deg;E
                  </span>
                </div>
                <span className="text-[9px] font-mono text-white/15">
                  &copy; {new Date().getFullYear()}
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
