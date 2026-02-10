import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Great_Vibes, Monoton, Bebas_Neue, Concert_One, Audiowide, Righteous } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import GrainOverlay from "@/components/layout/GrainOverlay";
import CustomCursor from "@/components/layout/CustomCursor";
import Preloader from "@/components/layout/Preloader";
import ScrollProgress from "@/components/layout/ScrollProgress";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

const monoton = Monoton({
  variable: "--font-monoton",
  subsets: ["latin"],
  weight: "400",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const concertOne = Concert_One({
  variable: "--font-concert-one",
  subsets: ["latin"],
  weight: "400",
});

const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: "400",
});

const righteous = Righteous({
  variable: "--font-righteous",
  subsets: ["latin"],
  weight: "400",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://eazyondabeatz.com";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "EazyOnDaBeatz | Afrobeats Producer",
    template: "%s | EazyOnDaBeatz",
  },
  description:
    "Afrobeats producer from Lagos. Crisp percussion, melodic textures, and records built on bounce, clarity, and replay value. Credits include Celo's Insanity.",

  keywords: [
    "EazyOnDaBeatz",
    "Afrobeats producer",
    "Lagos producer",
    "beat maker",
    "music producer",
    "Afrobeats beats",
    "Nigerian producer",
    "crisp percussion",
    "melodic textures",
    "Celo Insanity",
    "custom beats",
    "press play",
  ],

  authors: [{ name: "EazyOnDaBeatz" }],
  creator: "EazyOnDaBeatz",
  publisher: "EazyOnDaBeatz",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "EazyOnDaBeatz",
    title: "EazyOnDaBeatz | Afrobeats Producer",
    description:
      "Afrobeats producer from Lagos. Crisp percussion, melodic textures, and records built on bounce, clarity, and replay value.",
    images: [
      {
        url: "/media/hero-poster.jpg",
        width: 1200,
        height: 630,
        alt: "EazyOnDaBeatz — Afrobeats Producer",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "EazyOnDaBeatz | Afrobeats Producer",
    description:
      "Afrobeats producer from Lagos. Bounce, clarity, replay value. Press Play.",
    images: ["/media/hero-poster.jpg"],
    creator: "@eazyondebeatz_",
  },

  alternates: {
    canonical: siteUrl,
  },

  category: "music",

  other: {
    "music:musician": siteUrl,
  },
};

// JSON-LD Structured Data
function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "EazyOnDaBeatz",
        description: "Afrobeats producer from Lagos. Bounce, clarity, replay value.",
        publisher: { "@id": `${siteUrl}/#person` },
        inLanguage: "en-US",
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "EazyOnDaBeatz",
        url: siteUrl,
        image: `${siteUrl}/media/hero-poster.jpg`,
        jobTitle: "Afrobeats Producer",
        description:
          "Afrobeats producer from Lagos whose work is built on bounce, clarity, and replay value. Blending crisp percussion with melodic textures to create records that move.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lagos",
          addressCountry: "NG",
        },
        sameAs: [
          "https://instagram.com/eazyondebeatz_",
          "https://open.spotify.com/user/31nlkyhcf7mf3qrrqfnr254jypay",
        ],
        knowsAbout: [
          "Afrobeats Production",
          "Beat Making",
          "Music Production",
          "Additional Production",
          "Percussion Design",
          "Melodic Textures",
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: "EazyOnDaBeatz | Afrobeats Producer",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#person` },
        description:
          "Official portfolio of EazyOnDaBeatz — Afrobeats producer from Lagos.",
        inLanguage: "en-US",
      },
      {
        "@type": "MusicGroup",
        "@id": `${siteUrl}/#musicgroup`,
        name: "EazyOnDaBeatz",
        url: siteUrl,
        image: `${siteUrl}/media/hero-poster.jpg`,
        genre: ["Afrobeats", "Afropop", "Afro-Fusion"],
        description:
          "Afrobeats producer blending crisp percussion with melodic textures. Credits include Celo's Insanity.",
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#services`,
        provider: { "@id": `${siteUrl}/#person` },
        name: "Music Production Services",
        description: "Professional Afrobeats production services including custom beats, additional production, and creative partnerships.",
        serviceType: [
          "Beat Production",
          "Additional Production",
          "Mixing & Mastering",
          "Creative Partnerships",
        ],
        areaServed: {
          "@type": "Place",
          name: "Worldwide",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${greatVibes.variable} ${monoton.variable} ${bebasNeue.variable} ${concertOne.variable} ${audiowide.variable} ${righteous.variable} antialiased bg-black text-white overflow-x-hidden`}
      >
        <SmoothScroll>
          <GrainOverlay />
          <CustomCursor />
          <Preloader />
          <ScrollProgress />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
