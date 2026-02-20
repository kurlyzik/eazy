"use client";

import { Instagram } from "lucide-react";

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.7a8.18 8.18 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.13z" />
    </svg>
  );
}

function SpotifyIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/eazyondebeatz?igsh=MXJzaTFleXVuNDBjcA%3D%3D&utm_source=qr", label: "Instagram" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@eazyondebeatz_?_r=1&_t=ZS-93yeOr4UeJU", label: "TikTok" },
  { icon: SpotifyIcon, href: "https://open.spotify.com/user/31nlkyhcf7mf3qrrqfnr254jypay", label: "Spotify" },
];

export default function SocialBar() {
  return (
    <>
      {/* Desktop — fixed left side, vertical */}
      <div className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-5">
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-white/15" />
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/25 hover:text-white hover:border-white/40 hover:scale-110 transition-all duration-300"
            aria-label={social.label}
          >
            <social.icon size={14} />
          </a>
        ))}
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/15 to-transparent" />
      </div>

      {/* Mobile — fixed bottom bar, horizontal */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex lg:hidden items-center justify-center gap-6 py-3 bg-black/80 backdrop-blur-md border-t border-white/5">
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 active:text-white active:border-white/40 transition-all duration-200"
            aria-label={social.label}
          >
            <social.icon size={16} />
          </a>
        ))}
      </div>
    </>
  );
}
