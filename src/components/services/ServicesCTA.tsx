"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/animations";

export default function ServicesCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

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

      // Circle CTA scales up on scroll
      if (circleRef.current) {
        gsap.from(circleRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 1,
          ease: EASE.smooth,
          scrollTrigger: {
            trigger: circleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-64 px-6 md:px-8 overflow-hidden"
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
          className="font-headline italic leading-none tracking-[-0.06em] text-center mb-12 md:mb-24"
          style={{
            fontSize: "clamp(3rem, 10vw, 10rem)",
          }}
        >
          INITIATE <br />
          <span className="text-primary">PROJECT.</span>
        </h2>

        {/* Circular CTA button */}
        <div ref={circleRef}>
        <Link
          ref={buttonRef}
          href="/contact"
          className="group relative"
        >
          <div className="w-48 h-48 md:w-64 md:h-64 border border-white/10 rounded-full flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-700 bg-surface/40 backdrop-blur-xl">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-[1.2]" />
            <span className="absolute font-label uppercase tracking-[0.5em] text-[11px] text-white group-hover:text-primary transition-colors duration-500">
              Contact
            </span>
          </div>
          {/* Blueprint circle */}
          <div className="absolute inset-0 border border-primary/5 rounded-full scale-[1.3] opacity-40" />
        </Link>
        </div>
      </div>
    </section>
  );
}
