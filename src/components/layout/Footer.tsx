"use client";

import Link from "next/link";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { SOCIAL_LINKS, CONTACT_EMAIL, WHATSAPP_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="w-full pt-20 md:pt-40 pb-16 px-6 md:px-12 flex flex-col gap-16 md:gap-32 border-t border-white/5 relative bg-surface backdrop-blur-xl">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-24">
        {/* Giant watermark with metadata */}
        <ScrollReveal direction="up" delay={0}>
          <div className="relative">
            <div className="text-[4rem] md:text-[8rem] lg:text-[12rem] font-headline italic text-white/5 select-none pointer-events-none leading-none tracking-tighter parallax-slow">
              NEXIO
            </div>
          </div>
        </ScrollReveal>

        {/* 3-column link grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 lg:gap-24">
          {/* Social */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col gap-8">
              <span className="font-label text-[11px] uppercase tracking-[0.3em] text-outline">
                Social
              </span>
              <div className="flex flex-col gap-4">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-label text-[11px] uppercase tracking-widest text-on-surface/40 hover:text-primary transition-all duration-300 hover-underline"
                >
                  Instagram
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-label text-[11px] uppercase tracking-widest text-on-surface/40 hover:text-primary transition-all duration-300 hover-underline"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col gap-8">
              <span className="font-label text-[11px] uppercase tracking-[0.3em] text-outline">
                Contact
              </span>
              <div className="flex flex-col gap-4">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-label text-[11px] uppercase tracking-widest text-on-surface/40 hover:text-primary transition-all duration-300 hover-underline"
                >
                  Email
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-label text-[11px] uppercase tracking-widest text-on-surface/40 hover:text-primary transition-all duration-300 hover-underline"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Legal */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-col gap-8">
              <span className="font-label text-[11px] uppercase tracking-[0.3em] text-outline">
                Legal
              </span>
              <div className="flex flex-col gap-4">
                <Link
                  href="/privacy"
                  className="font-label text-[11px] uppercase tracking-widest text-on-surface/40 hover:text-primary transition-all duration-300 hover-underline"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="font-label text-[11px] uppercase tracking-widest text-on-surface/40 hover:text-primary transition-all duration-300 hover-underline"
                >
                  Terms
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom bar */}
      <ScrollReveal delay={0.4}>
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="font-label text-[11px] text-on-surface/30 uppercase tracking-[0.3em]">
          &copy;{new Date().getFullYear()} NEXIO LABS. ALL RIGHTS RESERVED.
        </p>
        </div>
      </ScrollReveal>
    </footer>
  );
}
