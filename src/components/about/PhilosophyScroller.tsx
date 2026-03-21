"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/animations";

const values = [
  {
    number: "01",
    title: "Intentional Craft",
    description:
      "Every line of code is a brushstroke on a wider canvas. We don't ship fast — we ship with purpose.",
    borderColor: "border-primary/20",
    hoverColor: "group-hover:text-secondary",
  },
  {
    number: "02",
    title: "Technical Precision",
    description:
      "We build digital foundations as resilient as they are beautiful. Performance is not optional — it's the baseline.",
    borderColor: "border-secondary/20",
    hoverColor: "group-hover:text-primary",
  },
  {
    number: "03",
    title: "Future-Proof Engineering",
    description:
      "We design for the decade, not the quarter. Timeless typography meets cutting-edge technology.",
    borderColor: "border-primary/20",
    hoverColor: "group-hover:text-secondary",
  },
];

export default function PhilosophyScroller() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const totalScrollWidth = track.scrollWidth - track.clientWidth;

      // Pin section and translate track horizontally as user scrolls vertically
      gsap.to(track, {
        x: -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalScrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Staggered card entrance
      const cards = track.querySelectorAll(".philosophy-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          x: 100,
          duration: 0.8,
          ease: EASE.smooth,
          scrollTrigger: {
            trigger: card,
            containerAnimation: gsap.getById?.("philosophyScroll") || undefined,
            start: "left 80%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Header - fixed at top of pinned section */}
      <div className="px-6 md:px-10 pt-40 pb-20">
        <span className="font-label text-xs tracking-[0.4em] uppercase text-outline mb-4 block">
          Our Philosophy
        </span>
        <h3 className="font-headline text-4xl italic text-on-surface">
          Core Mandates
        </h3>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex gap-10 md:gap-20 px-6 md:px-10 pb-40 will-change-transform"
      >
        {values.map((value) => (
          <div
            key={value.number}
            className="philosophy-card flex-none w-[80vw] md:w-[40vw] group"
          >
            <div className={`border-l ${value.borderColor} pl-10`}>
              <span
                className={`font-headline text-6xl md:text-8xl block mb-8 transition-colors duration-500 ${value.hoverColor}`}
                style={{
                  WebkitTextStroke: "1px rgba(226, 232, 240, 0.3)",
                  color: "transparent",
                }}
              >
                {value.number}
              </span>
              <h4 className="font-headline text-4xl mb-6 italic">
                {value.title}
              </h4>
              <p className="font-body text-on-surface-variant text-lg max-w-sm">
                {value.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
