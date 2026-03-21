"use client";

import Link from "next/link";
import FloatingMetadata from "@/components/ui/FloatingMetadata";
import { SOCIAL_LINKS, CONTACT_EMAIL, WHATSAPP_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="w-full pt-40 pb-16 px-6 md:px-12 flex flex-col gap-32 border-t border-white/5 relative bg-surface backdrop-blur-xl">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-24">
        {/* Giant watermark with metadata */}
        <div className="relative">
          <div className="text-[8rem] md:text-[12rem] font-headline italic text-white/5 select-none pointer-events-none leading-none tracking-tighter">
            NEXIO
          </div>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 flex flex-col gap-2 pl-4">
            <FloatingMetadata>CURATED_DIGITAL_EXPERIENCES</FloatingMetadata>
            <FloatingMetadata>EST_2024_V_FINAL</FloatingMetadata>
          </div>
        </div>

        {/* 3-column link grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-16 lg:gap-24">
          {/* Social */}
          <div className="flex flex-col gap-8">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-outline">
              Social_Map
            </span>
            <div className="flex flex-col gap-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label text-[11px] uppercase tracking-widest text-on-surface/40 hover:text-secondary transition-all"
              >
                Instagram
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label text-[11px] uppercase tracking-widest text-on-surface/40 hover:text-secondary transition-all"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-8">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-outline">
              Contact_CH
            </span>
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-label text-[11px] uppercase tracking-widest text-on-surface/40 hover:text-secondary transition-all"
              >
                Email
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label text-[11px] uppercase tracking-widest text-on-surface/40 hover:text-secondary transition-all"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-8">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-outline">
              Legal_Meta
            </span>
            <div className="flex flex-col gap-4">
              <Link
                href="/privacy"
                className="font-label text-[11px] uppercase tracking-widest text-on-surface/40 hover:text-secondary transition-all"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="font-label text-[11px] uppercase tracking-widest text-on-surface/40 hover:text-secondary transition-all"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="font-label text-[9px] text-on-surface/30 uppercase tracking-[0.3em]">
          &copy;{new Date().getFullYear()} NEXIO LABS. ALL RIGHTS RESERVED.
        </p>
        <div className="flex items-center gap-6 glass-panel px-6 py-3">
          <div className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <div
              className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
          <span className="font-label text-[9px] text-on-surface/60 uppercase tracking-widest">
            Global Network Status: Operational
          </span>
        </div>
      </div>
    </footer>
  );
}
