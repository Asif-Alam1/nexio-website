import type { Metadata } from "next";
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nexio Labs",
  url: "https://nexiolabs.co",
  logo: "https://nexiolabs.co/images/logo/nexio-monogram-blue-512.png",
  description:
    "Tech agency in Lebanon building websites, e-commerce, AI chatbots, and automations.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "LB",
  },
  sameAs: [
    "https://linkedin.com/company/nexio.labs",
    "https://instagram.com/nexio.labs",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@nexiolabs.co",
    contactType: "customer service",
  },
};

export const metadata: Metadata = {
  title: "Nexio Labs — Your Digital Partner in Lebanon",
  description:
    "We build websites, e-commerce platforms, AI chatbots, and automations for Lebanese businesses. Connect. Build. Grow.",
  metadataBase: new URL("https://nexiolabs.co"),
  openGraph: {
    title: "Nexio Labs — Your Digital Partner in Lebanon",
    description:
      "We build websites, e-commerce platforms, AI chatbots, and automations for Lebanese businesses.",
    url: "https://nexiolabs.co",
    siteName: "Nexio Labs",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
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
