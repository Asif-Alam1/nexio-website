"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { EASE, STAGGER } from "@/lib/animations";
import KineticText from "@/components/ui/KineticText";

import GlassPanel from "@/components/ui/GlassPanel";

interface ServiceCard {
  code: string;
  title: string;
  description: string;
  hoverBg: string;
  hoverText: string;
  hoverLine: string;
}

const SERVICES: ServiceCard[] = [
  {
    code: "01_WEB",
    title: "Strategic Architecture",
    description: "Building resilient web foundations for ambitious brands.",
    hoverBg: "hover:bg-primary",
    hoverText: "group-hover:text-[#3a0b00]",
    hoverLine: "group-hover:bg-[#3a0b00]",
  },
  {
    code: "02_COMMERCE",
    title: "Digital Boutique",
    description: "Commerce experiences that convert browsers to believers.",
    hoverBg: "hover:bg-secondary",
    hoverText: "group-hover:text-[#001f24]",
    hoverLine: "group-hover:bg-[#001f24]",
  },
  {
    code: "03_MOBILE",
    title: "Mobile Craft",
    description: "Native-feel applications that live in the user's hand.",
    hoverBg: "hover:bg-white",
    hoverText: "group-hover:text-black",
    hoverLine: "group-hover:bg-black",
  },
  {
    code: "04_DESKTOP",
    title: "Desktop Systems",
    description: "Powerful desktop experiences built for productivity.",
    hoverBg: "hover:bg-primary",
    hoverText: "group-hover:text-[#3a0b00]",
    hoverLine: "group-hover:bg-[#3a0b00]",
  },
  {
    code: "05_AI",
    title: "Neural Systems",
    description: "Intelligent interfaces powered by modern AI pipelines.",
    hoverBg: "hover:bg-secondary",
    hoverText: "group-hover:text-[#001f24]",
    hoverLine: "group-hover:bg-[#001f24]",
  },
  {
    code: "06_AUTO",
    title: "Process Automation",
    description: "Eliminating friction with smart, automated workflows.",
    hoverBg: "hover:bg-white",
    hoverText: "group-hover:text-black",
    hoverLine: "group-hover:bg-black",
  },
];

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll(".capability-card");
      if (!cards.length) return;

      gsap.set(cards, { y: 60, opacity: 0 });

      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(cards, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: STAGGER.normal,
            ease: EASE.smooth,
          });
        },
        once: true,
      });

      // Clip-path viewport reveal — section expands from a smaller frame
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (!prefersReduced && sectionRef.current) {
        gsap.fromTo(
          sectionRef.current,
          { clipPath: "inset(5% 3% 5% 3%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
              end: "top 20%",
              scrub: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-20 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-32 gap-12">
          <div>
            <h2 className="font-headline italic text-5xl md:text-8xl leading-none">
              <KineticText as="span">Capabilities</KineticText>
            </h2>
          </div>
          <div className="border-l border-white/10 pl-8">
            <p className="font-body text-on-surface-variant max-w-xs text-sm leading-relaxed">
              Specialized focus areas where design meets high-performance
              engineering.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6"
        >
          {SERVICES.map((service, index) => {
            const spanClasses = [
              "col-span-12 md:col-span-8 min-h-[320px] md:min-h-[400px]",
              "col-span-12 md:col-span-4 min-h-[280px] md:min-h-[360px]",
              "col-span-12 md:col-span-4 min-h-[280px] md:min-h-[360px]",
              "col-span-12 md:col-span-4 min-h-[280px] md:min-h-[360px]",
              "col-span-12 md:col-span-4 min-h-[280px] md:min-h-[360px]",
              "col-span-12 md:col-span-8 min-h-[320px] md:min-h-[400px]",
            ][index];

            return (
              <GlassPanel
                key={service.code}
                className={cn(
                  "capability-card p-8 md:p-12 flex flex-col justify-between group transition-all duration-700 relative overflow-hidden",
                  spanClasses,
                  service.hoverBg
                )}
              >
                <div
                  className={cn(
                    "font-headline italic text-4xl md:text-5xl font-light transition-colors duration-500",
                    service.hoverText
                  )}
                >
                  {service.title}
                </div>
                <div className="flex flex-col gap-6">
                  <p
                    className={cn(
                      "text-on-surface-variant text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-all duration-500",
                      service.hoverText
                    )}
                  >
                    {service.description}
                  </p>
                  <div
                    className={cn(
                      "w-12 h-px bg-white/20 group-hover:w-full transition-all duration-700",
                      service.hoverLine
                    )}
                  />
                </div>
              </GlassPanel>
            );
          })}
        </div>
      </div>
    </section>
  );
}
