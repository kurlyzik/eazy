"use client";

import Link from "next/link";
import { Instagram, Twitter, Youtube, Music2 } from "lucide-react";

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Music2, href: "#", label: "Music" },
];

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-white/5 bg-black z-40 relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <Link href="/" className="font-display text-lg tracking-[0.15em] text-white/30 hover:text-white transition-colors">
          KXNZO
        </Link>

        <div className="flex gap-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-all duration-300"
              aria-label={social.label}
            >
              <social.icon size={16} />
            </a>
          ))}
        </div>

        <span className="text-[11px] text-white/20 font-sans tracking-wider">
          &copy; {new Date().getFullYear()} KXNZO. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
