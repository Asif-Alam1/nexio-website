"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, DURATION } from "@/lib/animations";
import KineticText from "@/components/ui/KineticText";

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: EASE.smooth } });

      tl.from(labelRef.current, {
        opacity: 0,
        y: -20,
        duration: DURATION.entrance,
        delay: 0.3,
      }).from(
        descRef.current,
        {
          opacity: 0,
          y: 30,
          duration: DURATION.entrance,
        },
        "-=0.3"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-8 md:px-10"
    >
      {/* Abstract gradient background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[80vw] h-[80vh] bg-gradient-to-br from-secondary/10 via-transparent to-primary/10 mix-blend-overlay opacity-40" />
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center max-w-[1200px]">
        <span
          ref={labelRef}
          className="font-label text-secondary tracking-[0.5em] uppercase text-xs mb-8 block"
        >
          Est. 2024 &mdash; Beirut, Lebanon
        </span>

        <h1
          className="font-headline italic font-black tracking-tighter text-on-surface leading-[0.85]"
          style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}
        >
          <KineticText as="span" delay={0.1}>
            THE
          </KineticText>
          <br />
          <KineticText as="span" delay={0.25}>
            COLLECTIVE
          </KineticText>
        </h1>

        <div
          ref={descRef}
          className="mt-12 flex flex-col md:flex-row items-center justify-between gap-10"
        >
          <p className="font-body text-lg text-on-surface-variant max-w-md text-left leading-relaxed">
            We are a distributed lab of curators, engineers, and dreamers
            redefining the digital frontier through intentional craftsmanship.
          </p>

          <a
            href="#narrative"
            className="flex items-center gap-4 group cursor-pointer"
          >
            <span className="font-label text-xs uppercase tracking-widest text-secondary">
              Discover our essence
            </span>
            <div className="w-12 h-12 flex items-center justify-center border border-outline/30 rounded-full group-hover:bg-secondary group-hover:text-surface transition-all duration-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
