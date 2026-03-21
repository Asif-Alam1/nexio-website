"use client";

import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, DURATION } from "@/lib/animations";
import KineticText from "@/components/ui/KineticText";
import BlueprintGrid from "@/components/ui/BlueprintGrid";

export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: EASE.smooth } });

      tl.from(labelRef.current, {
        opacity: 0,
        x: -20,
        duration: DURATION.entrance,
        delay: 0.2,
      })
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 30,
            duration: DURATION.entrance,
          },
          "-=0.3"
        )
        .from(
          shapeRef.current,
          {
            opacity: 0,
            scale: 0.8,
            duration: DURATION.slow,
          },
          "-=0.5"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-8 md:px-24 overflow-hidden pt-24"
    >
      <BlueprintGrid />

      <div className="z-10 relative w-full">
        {/* Label */}
        <div
          ref={labelRef}
          className="inline-flex items-center gap-4 mb-8"
        >
          <div className="h-px w-12 bg-primary" />
          <p className="font-label text-primary uppercase tracking-[0.5em] text-[10px]">
            Capabilities 2026
          </p>
        </div>

        {/* Headline */}
        <div className="relative">
          <h1
            className="font-headline italic text-white leading-[0.75] tracking-[-0.06em]"
            style={{
              fontSize: "clamp(4rem, 18vw, 16rem)",
              mixBlendMode: "difference",
            }}
          >
            <KineticText as="span" delay={0.1}>
              OUR
            </KineticText>
            <br />
            <KineticText as="span" delay={0.25}>
              CRAFT
            </KineticText>
          </h1>

          {/* Floating abstract shape */}
          <div
            ref={shapeRef}
            className={cn(
              "absolute -right-12 top-0 w-[40vw] h-[40vw]",
              "pointer-events-none hidden lg:block opacity-80"
            )}
            style={{ animation: "subtle-float 10s ease-in-out infinite" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&q=80"
              alt="Abstract 3D shape"
              fill
              className="object-cover opacity-80"
              style={{ filter: "blur(40px)" }}
            />
          </div>
        </div>

        {/* Subtitle row */}
        <div className="grid grid-cols-12 mt-12">
          <div
            ref={subtitleRef}
            className="col-start-1 md:col-start-7 col-span-12 md:col-span-5"
          >
            <p className="font-body text-xl md:text-2xl text-on-surface-variant leading-relaxed font-light mb-12">
              A synthesis of engineering precision and high-art aesthetic. We
              define the bleeding edge of the digital dimension.
            </p>
            <div className="flex items-center gap-8">
              <span className="font-label text-[10px] tracking-widest uppercase text-on-surface/40 italic">
                Scroll to Explore
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
