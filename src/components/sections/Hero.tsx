"use client";

import { useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import TextReveal from "@/components/ui/TextReveal";
import { useMousePosition } from "@/hooks/useMousePosition";
import { WHATSAPP_URL } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

export default function Hero() {
  const { position, isTouch } = useMousePosition();

  const orbX = useSpring(0, { stiffness: 40, damping: 25 });
  const orbY = useSpring(0, { stiffness: 40, damping: 25 });

  useEffect(() => {
    if (isTouch) return;
    orbX.set((position.x - window.innerWidth / 2) * 0.015);
    orbY.set((position.y - window.innerHeight / 2) * 0.015);
  }, [position.x, position.y, orbX, orbY, isTouch]);

  function scrollToServices() {
    const el = document.getElementById("services");
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <section
      id="hero"
      className="noise-overlay relative min-h-screen bg-midnight flex items-center overflow-hidden"
    >
      {/* ── Atmospheric background layers ── */}

      {/* Primary orb — large, right-shifted, blue-tinted center */}
      <motion.div
        className="pointer-events-none absolute right-[-10%] top-[40%] -translate-y-1/2 w-[800px] h-[800px] hidden md:block"
        style={{
          x: orbX,
          y: orbY,
          background:
            "radial-gradient(circle at center, rgba(37,99,235,0.07) 0%, rgba(21,29,51,0.8) 35%, transparent 65%)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Secondary accent glow — bottom-left, warmer */}
      <div
        className="pointer-events-none absolute left-[-5%] bottom-[5%] w-[500px] h-[500px] hidden lg:block opacity-40"
        style={{
          background:
            "radial-gradient(circle at center, rgba(37,99,235,0.05) 0%, transparent 60%)",
        }}
      />

      {/* ── Large decorative watermark "N." — editorial brand presence ── */}
      <motion.div
        className="pointer-events-none select-none absolute right-[5%] top-1/2 -translate-y-1/2 hidden lg:flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: orbX, y: orbY }}
      >
        <span className="font-display font-extrabold text-[280px] xl:text-[360px] leading-none tracking-[-0.04em] text-white/[0.03]">
          N<span className="text-blue/[0.06]">.</span>
        </span>
      </motion.div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-4xl">
        <motion.div
          className="max-w-[680px] flex flex-col items-center lg:items-start"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Accent line + label */}
          <motion.div
            className="flex items-center gap-3 mb-6 lg:mb-8"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hidden lg:block w-8 h-[1.5px] bg-blue" />
            <span className="font-mono text-label text-blue uppercase tracking-[0.14em]">
              Tech Agency · Lebanon & MENA
            </span>
          </motion.div>

          {/* Headline */}
          <div className="mb-6 lg:mb-8 text-center lg:text-left">
            <TextReveal
              text="Connect Your Business Online."
              className="font-display text-hero-mobile md:text-hero-tablet lg:text-hero text-white tracking-[-0.04em] leading-[1.0]"
            />
          </div>

          {/* Subtext */}
          <motion.p
            className="text-body-lg text-slate-light max-w-[540px] text-center lg:text-left mb-10 lg:mb-12 leading-relaxed"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            We build websites, e-commerce platforms, AI chatbots, and
            automations for Lebanese businesses ready to grow.
          </motion.p>

          {/* CTA row */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Button
                variant="primary"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                Book a Call
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
            </motion.div>
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Button variant="secondary" onClick={scrollToServices}>
                Our Services
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="font-mono text-[10px] text-slate-light/60 uppercase tracking-[0.2em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-slate-light/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
