"use client";

import { useRef, useState, useCallback } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/animations";
import { CONTACT_EMAIL } from "@/lib/constants";
import FloatingMetadata from "@/components/ui/FloatingMetadata";
import BlueprintGrid from "@/components/ui/BlueprintGrid";
import TextScramble from "@/components/ui/TextScramble";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      if (!contentRef.current) return;

      gsap.set(contentRef.current, { y: 60, opacity: 0 });

      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.to(contentRef.current, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: EASE.smooth,
          });
        },
        once: true,
      });
    },
    { scope: sectionRef }
  );

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = CONTACT_EMAIL;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-40 md:py-80 px-8 md:px-12 text-center relative overflow-hidden"
    >
      <BlueprintGrid opacity={0.03} />

      <div ref={contentRef} className="relative z-10">
        {/* Status label */}
        <span className="font-label text-secondary uppercase tracking-[0.6em] text-[10px] mb-12 block opacity-60">
          Status: Available for Q3 2026 Projects
        </span>

        {/* Headline */}
        <h2
          className="font-headline italic leading-none mb-20"
          style={{ fontSize: "clamp(3rem, 10vw, 10rem)" }}
        >
          Let&apos;s build
          <br />
          the{" "}
          <span
            className="opacity-30"
            style={{
              WebkitTextStroke: "1px currentColor",
              WebkitTextFillColor: "transparent",
            }}
          >
            Unseen.
          </span>
        </h2>

        {/* Email link */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 group">
          <button
            onClick={handleCopyEmail}
            className="text-2xl sm:text-4xl md:text-7xl font-headline italic hover:text-primary transition-all duration-700 font-extralight hover:font-bold cursor-pointer break-all md:break-normal"
          >
            {copied ? (
              <TextScramble
                text="Copied to clipboard!"
                className="text-primary"
              />
            ) : (
              CONTACT_EMAIL
            )}
          </button>
          <button
            onClick={handleCopyEmail}
            className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full group-hover:bg-primary group-hover:border-primary transition-all duration-500 cursor-pointer"
            aria-label="Copy email"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="group-hover:text-[#3a0b00] transition-colors duration-500"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M1 13L13 1M13 1H5M13 1V9" />
            </svg>
          </button>
        </div>
      </div>

      {/* Background metadata */}
      <div className="absolute bottom-10 left-10 text-left pointer-events-none opacity-20">
        <FloatingMetadata className="block mb-2">
          BUILD_QUEUE_04: ACTIVE
        </FloatingMetadata>
        <FloatingMetadata className="block">
          SYSTEM_TICK: 1.024S
        </FloatingMetadata>
      </div>

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface-dim to-transparent opacity-40 pointer-events-none" />
    </section>
  );
}
