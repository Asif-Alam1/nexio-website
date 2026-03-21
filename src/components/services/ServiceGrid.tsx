"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { EASE, STAGGER } from "@/lib/animations";
import FloatingMetadata from "@/components/ui/FloatingMetadata";
import GlassPanel from "@/components/ui/GlassPanel";

const services = [
  {
    id: "web",
    label: "001 // CORE",
    labelColor: "text-primary/40",
    title: (
      <>
        Web <br /> Archi-
        <br />
        tecture
      </>
    ),
    description:
      "Computational rigor meeting editorial fluidity. High-frequency performance for global systems.",
    chips: ["Headless Stack", "Next.js 16", "React 19", "TypeScript"],
    span: "col-span-12 lg:col-span-7 lg:row-span-2",
    variant: "core" as const,
  },
  {
    id: "ecommerce",
    label: "002 // COMMERCE",
    labelColor: "text-secondary/40",
    title: (
      <>
        Digital <br /> Boutique
      </>
    ),
    description:
      "Curation of the transaction. We bridge the gap between desire and acquisition.",
    chips: [],
    span: "col-span-12 lg:col-span-5",
    variant: "commerce" as const,
  },
  {
    id: "ai",
    label: "003 // SYNTH",
    labelColor: "text-primary/40",
    title: (
      <>
        Neural <br /> Systems
      </>
    ),
    description:
      "Autonomous logic patterns for hyper-scaled operations. Intelligent systems that learn and adapt.",
    chips: [],
    span: "col-span-12 lg:col-span-5",
    variant: "synth" as const,
  },
  {
    id: "mobile",
    label: "004 // MOBILE",
    labelColor: "text-on-surface/30",
    title: (
      <>
        Pocket <br /> Machines
      </>
    ),
    description:
      "Native experiences engineered for touch. Your business lives in every pocket, every moment.",
    chips: ["React Native", "iOS", "Android"],
    span: "col-span-12 lg:col-span-6",
    variant: "glass" as const,
  },
  {
    id: "desktop",
    label: "005 // DESKTOP",
    labelColor: "text-on-surface/30",
    title: (
      <>
        Power <br /> Tools
      </>
    ),
    description:
      "Cross-platform desktop applications built for heavy lifting. Windows, Mac, Linux — one codebase.",
    chips: ["Electron", "Tauri"],
    span: "col-span-12 lg:col-span-6",
    variant: "glass" as const,
  },
  {
    id: "automation",
    label: "006 // FLOW",
    labelColor: "text-primary/40",
    title: <>Automated Futures</>,
    description:
      "Connect your tools, eliminate friction, reclaim hours. Custom workflows that scale your operations without scaling your team.",
    chips: [],
    span: "col-span-12",
    variant: "wide" as const,
  },
];

const cardStyles: Record<string, string> = {
  core: "bg-surface-low border border-white/5",
  commerce: "bg-surface-container border border-white/5",
  synth: "bg-primary/5 border border-primary/20",
  glass: "",
  wide: "bg-surface-container border border-white/5",
};

export default function ServiceGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll("[data-service-card]");

      gsap.set(cards, { opacity: 0, y: 60 });

      ScrollTrigger.batch(cards, {
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: STAGGER.normal,
            ease: EASE.smooth,
          });
        },
        start: "top 85%",
        once: true,
      });
    },
    { scope: gridRef }
  );

  return (
    <section className="py-24 md:py-48 px-6 md:px-24">
      <div
        ref={gridRef}
        className="grid grid-cols-12 gap-4"
        style={{ gridAutoFlow: "dense" }}
      >
        {services.map((service) => {
          if (service.variant === "glass") {
            return (
              <GlassPanel
                key={service.id}
                data-service-card
                className={cn(
                  service.span,
                  "group relative overflow-hidden p-6 md:p-12 transition-all duration-500"
                )}
                style={{
                  boxShadow:
                    "0 20px 80px -20px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.1)",
                }}
              >
                <FloatingMetadata
                  className={cn(
                    "absolute top-0 right-0 p-8",
                    service.labelColor
                  )}
                >
                  {service.label}
                </FloatingMetadata>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <h2 className="font-headline italic text-4xl md:text-7xl mb-6 leading-none">
                      {service.title}
                    </h2>
                    <p className="font-body text-on-surface-variant text-sm max-w-xs leading-relaxed mb-8">
                      {service.description}
                    </p>
                  </div>
                  {service.chips.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {service.chips.map((chip) => (
                        <span
                          key={chip}
                          className="px-4 py-2 border border-white/10 text-[11px] font-label uppercase text-white/60 group-hover:border-primary/50 group-hover:text-primary transition-colors"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </GlassPanel>
            );
          }

          return (
            <div
              key={service.id}
              data-service-card
              className={cn(
                service.span,
                cardStyles[service.variant],
                "group relative overflow-hidden p-6 md:p-12 [transform:perspective(1000px)_rotateX(2deg)] hover:[transform:perspective(1000px)_rotateX(0deg)] hover:-translate-y-1 transition-transform duration-500"
              )}
              style={{
                boxShadow:
                  "0 20px 80px -20px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.1)",
              }}
            >
              <FloatingMetadata
                className={cn(
                  "absolute top-0 right-0 p-8",
                  service.labelColor
                )}
              >
                {service.label}
              </FloatingMetadata>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h2
                    className={cn(
                      "font-headline italic mb-6 leading-none",
                      service.variant === "core"
                        ? "text-5xl md:text-9xl mb-8"
                        : service.variant === "wide"
                          ? "text-4xl md:text-8xl mb-8"
                          : "text-4xl md:text-6xl"
                    )}
                  >
                    {service.title}
                  </h2>
                  <p
                    className={cn(
                      "font-body text-on-surface-variant leading-relaxed",
                      service.variant === "core"
                        ? "text-lg max-w-sm mb-8"
                        : service.variant === "wide"
                          ? "text-lg max-w-lg mb-8"
                          : "text-sm max-w-xs mb-8"
                    )}
                  >
                    {service.description}
                  </p>
                </div>
                {service.chips.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {service.chips.map((chip) => (
                      <span
                        key={chip}
                        className="px-4 py-2 border border-white/10 text-[11px] font-label uppercase text-white/60 group-hover:border-primary/50 group-hover:text-primary transition-colors"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
