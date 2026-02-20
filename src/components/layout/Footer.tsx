"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-white/5 bg-black z-40 relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <Link href="/" className="font-display text-lg tracking-[0.15em] text-white/30 hover:text-white transition-colors">
          EazyOnDeBeatz
        </Link>

        <span className="text-[11px] text-white/20 font-sans tracking-wider">
          &copy; {new Date().getFullYear()} EazyOnDeBeatz. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
