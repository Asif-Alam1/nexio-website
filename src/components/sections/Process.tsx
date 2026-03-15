"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/ui/SectionHeader";
import ProcessPanel from "@/components/ui/ProcessPanel";

gsap.registerPlugin(ScrollTrigger);

const steps = [
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

export default function Process() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const container = containerRef.current;
      const wrapper = wrapperRef.current;

      if (!container || !wrapper) return;

      const totalWidth = container.scrollWidth - wrapper.clientWidth;

      const st = gsap.to(container, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (steps.length - 1));
            setActiveIndex(index);
          },
        },
      });

      return () => {
        st.scrollTrigger?.kill();
        st.kill();
      };
    });

    return () => mm.revert();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const panelWidth = window.innerWidth * 0.8;

    if (e.key === "ArrowRight" && activeIndex < steps.length - 1) {
      e.preventDefault();
      const nextIndex = activeIndex + 1;
      // Scroll the page by one panel-worth of scroll distance
      const scrollAmount = (nextIndex / (steps.length - 1)) * panelWidth * (steps.length - 1);
      window.scrollBy({ top: panelWidth, behavior: "smooth" });
    }

    if (e.key === "ArrowLeft" && activeIndex > 0) {
      e.preventDefault();
      window.scrollBy({ top: -panelWidth, behavior: "smooth" });
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
  };

  return (
    <section id="process" className="bg-midnight noise-overlay overflow-hidden">
      {/* Header — sits above the pinned scroll area */}
      <div className="max-w-7xl mx-auto px-m lg:px-2xl pt-4xl">
        <SectionHeader
          label="HOW WE WORK"
          title="From Vision to Digital Reality."
          dark
          centered={false}
        />
      </div>

      {/* ── Desktop horizontal scroll (md+) ── */}
      <div
        ref={wrapperRef}
        className="hidden md:block relative overflow-hidden"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Our process"
        onKeyDown={handleKeyDown}
      >
        {/* Flex strip of panels */}
        <div
          ref={containerRef}
          className="flex flex-nowrap will-change-transform"
          style={{ paddingLeft: "max(2rem, calc((100vw - 80vw) / 2))" }}
        >
          {steps.map((s, i) => (
            <ProcessPanel
              key={s.step}
              step={s.step}
              title={s.title}
              description={s.description}
              isActive={i === activeIndex}
            />
          ))}
          {/* Trailing spacer so last panel can fully scroll into view */}
          <div className="flex-shrink-0 w-[10vw]" aria-hidden="true" />
        </div>

        {/* Progress dots */}
        <div
          className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-s z-10"
          aria-hidden="true"
        >
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === activeIndex ? "#2563EB" : "transparent",
                border: i === activeIndex ? "none" : "1px solid rgba(37,99,235,0.3)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Mobile stacked cards (< md) ── */}
      <div className="md:hidden px-m pb-4xl pt-l">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            className="flex flex-col gap-m border border-blue/10 rounded-panel p-2xl mb-l last:mb-0 bg-midnight-deep/50"
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-5%" }}
          >
            <span className="font-mono text-label uppercase tracking-[0.14em] text-blue">
              STEP {s.step}
            </span>
            <div className="flex items-center gap-m">
              <span className="font-display text-[56px] font-extrabold text-blue opacity-[0.08] leading-none select-none">
                {s.step}
              </span>
              <div className="w-[2px] h-8 bg-blue flex-shrink-0" />
              <h3 className="font-display text-h2 text-white font-bold">{s.title}</h3>
            </div>
            <p className="text-body text-slate-light leading-relaxed">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
