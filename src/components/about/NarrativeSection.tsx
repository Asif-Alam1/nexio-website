"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { EASE, DURATION } from "@/lib/animations";

export default function NarrativeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Image reveal with clip-path
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Stat block slides up
      if (statRef.current) {
        gsap.from(statRef.current, {
          y: 60,
          opacity: 0,
          duration: DURATION.entrance,
          ease: EASE.smooth,
          scrollTrigger: {
            trigger: statRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="narrative"
      ref={sectionRef}
      className="py-32 bg-surface-low"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
          {/* Left column: text */}
          <div className="md:col-span-7">
            <h2 className="font-headline text-5xl md:text-7xl leading-tight mb-16 italic font-medium">
              Nexio Labs was born out of a{" "}
              <span className="text-primary">rebellion</span> against the
              templated web.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <p className="font-body text-lg leading-relaxed text-on-surface-variant">
                We believe the browser is a canvas, not a container. Our journey
                began in Beirut, fueled by the desire to merge technical
                precision with the soul of editorial design.
              </p>
              <p className="font-body text-lg leading-relaxed text-on-surface-variant">
                Today, we partner with visionaries worldwide to build digital
                artifacts that don&apos;t just function&mdash;they resonate.
                Every line of code is a brushstroke.
              </p>
            </div>
          </div>

          {/* Right column: image + stat */}
          <div className="md:col-span-5 relative mt-20 md:mt-0">
            <div
              ref={imageRef}
              className="aspect-[3/4] bg-surface-high overflow-hidden shadow-[0_40px_60px_rgba(0,0,0,0.4)]"
              style={{ clipPath: "inset(100% 0 0 0)" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&q=80"
                alt="Nexio Labs narrative"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Overlapping stat block */}
            <div
              ref={statRef}
              className="absolute -bottom-10 -left-10 bg-primary p-12 hidden lg:block"
            >
              <span className="font-headline text-surface text-6xl italic font-black">
                10
              </span>
              <span className="block font-label text-surface text-xs tracking-widest mt-2 uppercase">
                Projects. Zero Compromises.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
