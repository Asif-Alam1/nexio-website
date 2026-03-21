"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/animations";

const processSteps = [
  {
    step: "01",
    title: "Connect",
    description:
      "We listen. Tell us about your business, your goals, and your challenges. Every great project starts with a real conversation.",
  },
  {
    step: "02",
    title: "Plan",
    description:
      "We map out your project — scope, timeline, technology. No surprises, no hidden costs. You'll know exactly what you're getting.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Our team designs and develops your product with weekly check-ins. You see progress in real time, not just at the end.",
  },
  {
    step: "04",
    title: "Launch",
    description:
      "We test everything, train your team, and go live together. Launch day should feel exciting, not stressful.",
  },
  {
    step: "05",
    title: "Grow",
    description:
      "We don't disappear after launch. We monitor, optimize, and help you scale — because digital growth never stops.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!stepsRef.current) return;

      const steps = stepsRef.current.querySelectorAll("[data-process-step]");

      gsap.set(steps, { opacity: 0, y: 40 });

      ScrollTrigger.batch(steps, {
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: EASE.smooth,
          });
        },
        start: "top 85%",
        once: true,
      });

      // Center-slit clip-path reveal — white section splits open from center
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (!prefersReduced && sectionRef.current) {
        gsap.fromTo(
          sectionRef.current,
          { clipPath: "inset(0 50% 0 50%)" },
          {
            clipPath: "inset(0 0% 0 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 95%",
              end: "top 30%",
              scrub: 0.5,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      data-navbar-theme="light"
      className="bg-white text-black py-24 md:py-48 relative overflow-hidden"
    >
      {/* Blueprint grid with black-tinted lines on white bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle at center, black, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black, transparent 80%)",
          opacity: 0.1,
        }}
        aria-hidden="true"
      />

      <div className="px-6 md:px-24 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-24">
          {/* Left: sticky headline */}
          <div className="max-w-2xl md:sticky md:top-24">
            <h2
              className="font-headline italic leading-[0.95] tracking-[-0.06em]"
              style={{
                fontSize: "clamp(3rem, 12vw, 10rem)",
              }}
            >
              LOGIC <br />
              <span className="pl-8 md:pl-24">MEETS</span> <br />
              LUXURY.
            </h2>
          </div>

          {/* Right: scrolling process steps */}
          <div ref={stepsRef} className="flex-1 space-y-16 md:space-y-32 py-12 md:py-24">
            {processSteps.map((step) => (
              <div
                key={step.step}
                data-process-step
                className="border-t border-black/10 pt-12"
              >
                <span className="font-label text-[11px] tracking-widest uppercase mb-4 block">
                  Process {step.step}
                </span>
                <h3 className="font-headline italic text-3xl md:text-5xl mb-6">
                  {step.title}
                </h3>
                <p className="font-body text-black/60 text-xl leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
