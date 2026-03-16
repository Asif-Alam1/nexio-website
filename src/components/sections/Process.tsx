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

        {/* Zigzag timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center vertical line — desktop only */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/[0.08]" />

          {/* Mobile vertical line — left side */}
          <div className="md:hidden absolute left-[23px] top-0 bottom-0 w-[1px] bg-white/[0.08]" />

          {steps.map((s, i) => {
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={s.step}
                className="relative pb-10 md:pb-16 last:pb-0"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.12,
                }}
              >
                {/* ── Desktop zigzag ── */}
                <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-start">
                  {/* Left content or empty */}
                  <div className={isLeft ? "text-right pr-4" : ""}>
                    {isLeft && (
                      <>
                        <h3 className="font-display text-h2 text-white font-bold mb-2">
                          {s.title}
                        </h3>
                        <p className="text-body text-slate-light leading-relaxed ml-auto max-w-sm">
                          {s.description}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Center node */}
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className="w-12 h-12 rounded-full border border-white/15 bg-midnight flex items-center justify-center relative z-10"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.3 + i * 0.14,
                      }}
                    >
                      <span className="font-mono text-[13px] text-blue font-medium">
                        {s.step}
                      </span>
                    </motion.div>
                  </div>

                  {/* Right content or empty */}
                  <div className={!isLeft ? "pl-4" : ""}>
                    {!isLeft && (
                      <>
                        <h3 className="font-display text-h2 text-white font-bold mb-2">
                          {s.title}
                        </h3>
                        <p className="text-body text-slate-light leading-relaxed max-w-sm">
                          {s.description}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* ── Mobile — straight vertical ── */}
                <div className="md:hidden flex gap-5">
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className="w-12 h-12 rounded-full border border-white/15 bg-midnight flex items-center justify-center relative z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    >
                      <span className="font-mono text-[13px] text-blue font-medium">
                        {s.step}
                      </span>
                    </motion.div>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-display text-h3 text-white font-semibold mb-2">
                      {s.title}
                    </h3>
                    <p className="text-body text-slate-light leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
