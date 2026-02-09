import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
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
    default: "EazyOnDaBeatz | Music Producer & Sound Designer",
    template: "%s | EazyOnDaBeatz",
  },
  description:
    "Grammy-nominated music producer and sound designer based in Los Angeles. Custom beat production, mixing & mastering, film scoring, and artist development. I don't make beats — I build worlds.",

  keywords: [
    "EazyOnDaBeatz",
    "music producer",
    "beat maker",
    "sound designer",
    "mixing and mastering",
    "film scoring",
    "Los Angeles producer",
    "hip hop producer",
    "R&B producer",
    "afrobeats producer",
    "custom beats",
    "artist development",
    "Grammy nominated producer",
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
    title: "EazyOnDaBeatz | Music Producer & Sound Designer",
    description:
      "Grammy-nominated music producer and sound designer. Custom beat production, mixing & mastering, film scoring, and artist development.",
    images: [
      {
        url: "/media/hero-poster.jpg",
        width: 1200,
        height: 630,
        alt: "EazyOnDaBeatz — Music Producer & Sound Designer",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "EazyOnDaBeatz | Music Producer & Sound Designer",
    description:
      "Grammy-nominated music producer and sound designer. I don't make beats — I build worlds.",
    images: ["/media/hero-poster.jpg"],
    creator: "@eazyondabeatz",
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
        description: "Grammy-nominated music producer and sound designer based in Los Angeles.",
        publisher: { "@id": `${siteUrl}/#person` },
        inLanguage: "en-US",
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "EazyOnDaBeatz",
        url: siteUrl,
        image: `${siteUrl}/media/hero-poster.jpg`,
        jobTitle: "Music Producer & Sound Designer",
        description:
          "Grammy-nominated music producer and sound designer specializing in custom beat production, mixing & mastering, film scoring, and artist development.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Los Angeles",
          addressRegion: "CA",
          addressCountry: "US",
        },
        sameAs: [
          "https://instagram.com/eazyondabeatz",
          "https://twitter.com/eazyondabeatz",
          "https://youtube.com/@eazyondabeatz",
        ],
        knowsAbout: [
          "Music Production",
          "Beat Making",
          "Mixing & Mastering",
          "Film Scoring",
          "Sound Design",
          "Artist Development",
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: "EazyOnDaBeatz | Music Producer & Sound Designer",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#person` },
        description:
          "Official portfolio of EazyOnDaBeatz — Grammy-nominated music producer and sound designer based in Los Angeles.",
        inLanguage: "en-US",
      },
      {
        "@type": "MusicGroup",
        "@id": `${siteUrl}/#musicgroup`,
        name: "EazyOnDaBeatz",
        url: siteUrl,
        image: `${siteUrl}/media/hero-poster.jpg`,
        genre: ["Hip-Hop", "R&B", "Afrobeats", "Pop", "Film Score"],
        description:
          "Grammy-nominated music producer specializing in custom beat production, film scoring, and sonic world-building.",
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#services`,
        provider: { "@id": `${siteUrl}/#person` },
        name: "Music Production Services",
        description: "Professional music production services including custom beats, mixing, mastering, film scoring, and artist development.",
        serviceType: [
          "Custom Beat Production",
          "Mixing & Mastering",
          "Film & TV Scoring",
          "Sound Design",
          "Artist Development",
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
        className={`${spaceGrotesk.variable} antialiased bg-black text-white overflow-x-hidden`}
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
