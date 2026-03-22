"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, DURATION } from "@/lib/animations";
import KineticText from "@/components/ui/KineticText";
import { useMagneticChars } from "@/hooks/useMagneticChars";

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useMagneticChars(headlineRef, { strength: 12, radius: 200 });

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 md:px-10"
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
          ref={headlineRef}
          className="font-headline italic font-black tracking-tighter text-on-surface leading-[0.95]"
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

        
        </div>
      </div>
    </section>
  );
}
