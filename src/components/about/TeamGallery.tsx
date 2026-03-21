"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { EASE, DURATION } from "@/lib/animations";
import FloatingMetadata from "@/components/ui/FloatingMetadata";
import GlassPanel from "@/components/ui/GlassPanel";

const team = [
  {
    name: "Asif Alam",
    firstName: "ASIF",
    role: "Co-Founder & Lead Engineer",
    unit: "UNIT 01 // CO-FOUNDER & LEAD ENGINEER",
    spec: "SPEC 1.0 // ARCH_LEAD",
    image: "/images/team/asif.jpeg",
    bio: "Writes the code, architects the systems, and makes sure every pixel works.",
  },
  {
    name: "Joseph Attieh",
    firstName: "JOSEPH",
    role: "Co-Founder & Business Development",
    unit: "UNIT 02 // BUSINESS DEVELOPMENT",
    spec: "PROTO / BIZ_TACTILE_V.4",
    image: "/images/team/joseph.jpeg",
    bio: "Finds the right clients, shapes the right projects, and makes sure every partnership creates real value.",
  },
  {
    name: "Karl Abou Jaoude",
    firstName: "KARL",
    role: "E-Commerce Expert",
    unit: "UNIT 03 // E-COMMERCE",
    spec: "SPEC 0.9 // COMMERCE_SYS",
    image: "/images/team/karl.jpeg",
    bio: "Turns online stores into revenue machines. Knows payments, inventory, and conversion inside out.",
  },
];

export default function TeamGallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const cards = sectionRef.current.querySelectorAll(".team-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          duration: DURATION.slow,
          ease: EASE.smooth,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-40 md:py-60 relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }}
    >
      <div className="max-w-[1600px] mx-auto px-8 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-40 gap-12">
          <div className="relative">
            <div className="absolute -top-12 left-0">
              <FloatingMetadata>
                MODULAR_CORE_FACULTY // V.2026
              </FloatingMetadata>
            </div>
            <h2 className="hidden md:block font-headline italic text-[8vw] leading-[0.75] tracking-tighter text-on-surface/5 absolute -top-16 -left-8 select-none pointer-events-none">
              THE FACULTY
            </h2>
            <h3 className="font-headline italic text-7xl md:text-9xl relative z-10">
              Collaborators
            </h3>
          </div>
          <div className="max-w-xs border-l border-white/10 pl-8 mb-4">
            <p className="font-label text-on-surface-variant text-[10px] uppercase tracking-widest leading-relaxed">
              A synthesis of engineering rigor and high-art aesthetic. Our team
              is our architecture.
            </p>
          </div>
        </div>

        {/* Non-Linear Asymmetric Gallery */}
        <div className="grid grid-cols-12 gap-y-32 md:gap-y-64">
          {/* Member 01: Asif */}
          <div className="team-card col-span-12 md:col-span-6 lg:col-span-5 relative group">
            <div className="absolute -top-6 left-0">
              <FloatingMetadata>{team[0].unit}</FloatingMetadata>
            </div>
            <div className="relative">
              {/* Giant name behind card */}
              <h4 className="hidden md:block absolute -bottom-16 -right-12 font-headline italic text-[8vw] leading-none text-white/10 group-hover:text-primary/20 transition-all duration-1000 select-none pointer-events-none z-20">
                {team[0].firstName}
              </h4>

              {/* Tactical Card */}
              <GlassPanel className="p-3 relative z-10 overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden relative">
                  <Image
                    src={team[0].image}
                    alt={team[0].name}
                    fill
                    className="object-cover grayscale contrast-[1.2] brightness-[0.85] group-hover:grayscale-[0.2] group-hover:brightness-100 transition-all duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  />
                </div>

                {/* Blueprint Annotation */}
                <div className="absolute bottom-6 right-6 flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity">
                  <div className="h-px w-24 bg-primary mb-2" />
                  <FloatingMetadata>{team[0].spec}</FloatingMetadata>
                </div>
              </GlassPanel>
            </div>

            <div className="mt-12">
              <h5 className="font-headline text-4xl italic mb-2">
                {team[0].name}
              </h5>
              <span className="font-label text-[10px] uppercase tracking-[0.4em] text-primary">
                {team[0].role}
              </span>
            </div>
          </div>

          {/* Member 02: Joseph (Shifted Right) */}
          <div className="team-card col-span-12 md:col-start-7 md:col-span-6 lg:col-start-8 lg:col-span-5 relative group md:-mt-32">
            <div className="absolute -top-6 right-0 text-right">
              <FloatingMetadata>{team[1].unit}</FloatingMetadata>
            </div>
            <div className="relative">
              {/* Vertical ghost text */}
              <h4
                className="hidden md:block absolute -top-24 -left-20 font-headline italic text-[10vw] leading-none text-white/5 group-hover:text-secondary/10 transition-all duration-1000 select-none pointer-events-none z-20"
                style={{ writingMode: "vertical-rl" }}
              >
                {team[1].firstName}
              </h4>

              <GlassPanel className="p-3 relative z-10 overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden relative">
                  <Image
                    src={team[1].image}
                    alt={team[1].name}
                    fill
                    className="object-cover grayscale contrast-[1.2] brightness-[0.85] group-hover:grayscale-[0.2] group-hover:brightness-100 transition-all duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  />
                </div>

                {/* Diagonal line accent */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -rotate-12 pointer-events-none" />
                <div className="absolute top-6 left-6 opacity-40">
                  <FloatingMetadata>{team[1].spec}</FloatingMetadata>
                </div>
              </GlassPanel>
            </div>

            <div className="mt-12 md:text-right">
              <h5 className="font-headline text-4xl italic mb-2">
                {team[1].name}
              </h5>
              <span className="font-label text-[10px] uppercase tracking-[0.4em] text-secondary">
                {team[1].role}
              </span>
            </div>
          </div>

          {/* Member 03: Karl (Central / Overlapping) */}
          <div className="team-card col-span-12 md:col-start-3 md:col-span-7 lg:col-start-4 lg:col-span-6 relative group md:-mt-20">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              <FloatingMetadata>{team[2].unit}</FloatingMetadata>
            </div>

            <GlassPanel className="p-4 relative flex flex-col md:flex-row items-center gap-12">
              {/* Image */}
              <div className="w-full md:w-1/2 aspect-square overflow-hidden relative">
                <Image
                  src={team[2].image}
                  alt={team[2].name}
                  fill
                  className="object-cover grayscale-0 group-hover:grayscale contrast-[1.2] brightness-[0.85] group-hover:brightness-100 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>

              {/* Text */}
              <div className="flex-1 space-y-6">
                <h4 className="font-headline italic text-5xl md:text-6xl leading-tight">
                  Karl <br /> Abou Jaoude
                </h4>
                <div className="h-px w-12 bg-primary" />
                <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                  {team[2].bio}
                </p>
                <span className="font-label text-[9px] uppercase tracking-[0.3em] text-outline block pt-4">
                  {team[2].spec}
                </span>
              </div>

              {/* Background ghost text */}
              <h4 className="hidden md:block absolute -right-20 top-1/2 -translate-y-1/2 font-headline italic text-[15vw] leading-none text-white/5 select-none pointer-events-none -z-10">
                LOGIC
              </h4>
            </GlassPanel>
          </div>
        </div>

        {/* Section Footer Metadata */}
        <div className="mt-40 pt-12 border-t border-white/5 flex justify-between items-center opacity-40">
          <FloatingMetadata>TOTAL_NODES: 03</FloatingMetadata>
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <div
              className="w-2 h-2 rounded-full bg-secondary animate-pulse"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
          <FloatingMetadata>SYNC_STATUS: OPERATIONAL</FloatingMetadata>
        </div>
      </div>
    </section>
  );
}
