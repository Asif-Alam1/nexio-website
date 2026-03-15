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
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
