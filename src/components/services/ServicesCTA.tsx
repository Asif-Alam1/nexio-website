"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/animations";

export default function ServicesCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
        defaults: { ease: EASE.smooth },
      });

      tl.from(headlineRef.current, {
        opacity: 0,
        y: 60,
        duration: 0.8,
      }).from(
        buttonRef.current,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
        },
        "-=0.3"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-64 px-8 overflow-hidden"
    >
      {/* Decorative diagonal lines */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[150%] h-px bg-primary/20 rotate-12 absolute" />
        <div className="w-[150%] h-px bg-primary/20 -rotate-12 absolute" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-headline italic leading-none tracking-[-0.06em] text-center mb-24"
          style={{
            fontSize: "clamp(3rem, 10vw, 10rem)",
          }}
        >
          INITIATE <br />
          <span className="text-primary">PROJECT.</span>
        </h2>

        {/* Circular CTA button */}
        <Link
          ref={buttonRef}
          href="/contact"
          className="group relative"
        >
          <div className="w-64 h-64 border border-white/10 rounded-full flex items-center justify-center group-hover:border-primary/50 transition-all duration-700 bg-surface/40 backdrop-blur-xl">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center transition-all group-hover:scale-[5] group-hover:opacity-0 duration-500" />
            <span className="absolute font-label uppercase tracking-[0.5em] text-[10px] text-white">
              Contact
            </span>
          </div>
          {/* Blueprint circle */}
          <div className="absolute inset-0 border border-primary/5 rounded-full scale-[1.3] animate-pulse" />
        </Link>
      </div>
    </section>
  );
}
