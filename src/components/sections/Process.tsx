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

        {/* Timeline */}
        <div className="relative max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-[23px] md:left-[39px] top-0 bottom-0 w-[1px] bg-white/[0.06]" />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              className="relative flex gap-6 md:gap-10 pb-12 last:pb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.08,
              }}
            >
              {/* Step number */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/10 bg-midnight flex items-center justify-center">
                  <span className="font-display font-bold text-lg md:text-2xl text-white/20">
                    {s.step}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="pt-1 md:pt-4">
                <h3 className="font-display text-h2 text-white font-bold mb-2">
                  {s.title}
                </h3>
                <p className="text-body text-slate-light leading-relaxed max-w-md">
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
