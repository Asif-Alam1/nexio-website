import type { Metadata, Viewport } from "next";
import { Outfit, Lora, DM_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  style: ["italic"],
  weight: ["400"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["400"],
});

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nexio Labs",
    url: "https://nexiolabs.co",
    logo: "https://nexiolabs.co/images/logo/nexio-monogram-blue-512.png",
    description:
      "Tech agency in Lebanon building websites, mobile apps, desktop apps, e-commerce, AI chatbots, and automations.",
    foundingDate: "2026",
    address: {
      "@type": "PostalAddress",
      addressCountry: "LB",
      addressLocality: "Lebanon",
    },
    sameAs: [
      "https://linkedin.com/company/nexio-labs",
      "https://instagram.com/nexio.labs",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@nexiolabs.co",
      telephone: "+96176423052",
      contactType: "customer service",
      availableLanguage: ["English", "Arabic"],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nexio Labs",
    url: "https://nexiolabs.co",
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Nexio Labs",
    url: "https://nexiolabs.co",
    telephone: "+96176423052",
    email: "hello@nexiolabs.co",
    address: {
      "@type": "PostalAddress",
      addressCountry: "LB",
      addressLocality: "Lebanon",
    },
    priceRange: "$$",
    image: "https://nexiolabs.co/images/logo/nexio-monogram-blue-512.png",
  },
];

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F7FD" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1120" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Nexio Labs — Your Digital Partner in Lebanon",
    template: "%s | Nexio Labs",
  },
  description:
    "We build websites, mobile and desktop apps, e-commerce platforms, AI chatbots, and automations for Lebanese businesses. Connect. Build. Grow.",
  keywords: [
    "web development Lebanon",
    "mobile app development Lebanon",
    "e-commerce Lebanon",
    "AI chatbot Lebanon",
    "digital agency Lebanon",
    "Nexio Labs",
    "website design Beirut",
    "tech agency MENA",
  ],
  authors: [{ name: "Nexio Labs", url: "https://nexiolabs.co" }],
  creator: "Nexio Labs",
  publisher: "Nexio Labs",
  metadataBase: new URL("https://nexiolabs.co"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nexio Labs — Your Digital Partner in Lebanon",
    description:
      "We build websites, mobile and desktop apps, e-commerce platforms, AI chatbots, and automations for Lebanese businesses.",
    url: "https://nexiolabs.co",
    siteName: "Nexio Labs",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nexio Labs — Connect your vision to the digital world",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexio Labs — Your Digital Partner in Lebanon",
    description:
      "We build websites, mobile and desktop apps, e-commerce platforms, AI chatbots, and automations for Lebanese businesses.",
    images: ["/images/og-image.png"],
  },
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
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${lora.variable} ${dmMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-blue focus:text-white focus:px-4 focus:py-2 focus:rounded-button focus:outline-none"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
