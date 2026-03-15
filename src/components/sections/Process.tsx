"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

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
  return (
    <section id="process" className="noise-overlay relative bg-midnight py-4xl overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          label="HOW WE WORK"
          title="From Vision to Digital Reality."
          dark
          centered={false}
        />

        {/* Process grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              className="relative group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.08,
              }}
            >
              {/* Connector line — between cards on desktop, below on mobile */}
              {i < steps.length - 1 && (
                <>
                  {/* Desktop: horizontal line to next card */}
                  <div className="hidden md:block absolute top-6 right-0 w-full h-[1px] bg-white/[0.06] -z-0" />
                  {/* Mobile: vertical line to next card */}
                  <div className="md:hidden absolute left-[15px] top-12 bottom-0 w-[1px] bg-white/[0.06]" />
                </>
              )}

              <div className="relative z-10 py-6 md:py-0 md:pr-8 lg:pr-10">
                {/* Step number */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-shrink-0 w-[32px] h-[32px] rounded-full border border-blue/30 flex items-center justify-center bg-midnight">
                    <span className="font-mono text-[11px] text-blue font-medium">
                      {s.step}
                    </span>
                  </div>
                  <div className="hidden md:block flex-1 h-[1px] bg-white/[0.06]" />
                </div>

                {/* Title */}
                <h3 className="font-display text-h3 text-white font-semibold mb-2 pl-0 md:pl-0">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-light leading-relaxed pl-0 md:pl-0">
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
