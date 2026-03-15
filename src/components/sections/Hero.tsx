"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { WHATSAPP_URL } from "@/lib/constants";

export default function Hero() {
  const { position, isTouch } = useMousePosition();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  const orbX = useSpring(0, { stiffness: 30, damping: 30 });
  const orbY = useSpring(0, { stiffness: 30, damping: 30 });

  useEffect(() => {
    if (isTouch) return;
    orbX.set((position.x - window.innerWidth / 2) * 0.012);
    orbY.set((position.y - window.innerHeight / 2) * 0.012);
  }, [position.x, position.y, orbX, orbY, isTouch]);

  function scrollToServices() {
    const el = document.getElementById("services");
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="noise-overlay relative min-h-screen bg-midnight flex flex-col justify-center overflow-hidden"
    >
      {/* ── Atmosphere ── */}
      <motion.div
        className="pointer-events-none absolute right-[-15%] top-[30%] -translate-y-1/2 w-[900px] h-[900px] hidden md:block"
        style={{
          x: orbX,
          y: orbY,
          background:
            "radial-gradient(circle at center, rgba(37,99,235,0.06) 0%, rgba(21,29,51,0.6) 30%, transparent 60%)",
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Act 1: Label — wipes in from left */}
        <motion.div
          className="flex items-center gap-4 mb-8 md:mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <motion.span
            className="block w-10 md:w-16 h-[1px] bg-blue origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          />
          <span className="font-mono text-label text-blue uppercase tracking-[0.14em]">
            Tech Agency · Lebanon & MENA
          </span>
        </motion.div>

        {/* Act 2: Headline — full width, the type IS the design */}
        <div className="mb-8 md:mb-14">
          <h1 className="font-display font-extrabold tracking-[-0.04em] leading-[0.95] text-white">
            {["Connect", "Your", "Business"].map((word, i) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.25em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={isInView ? { y: "0%" } : {}}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.3 + i * 0.06,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <br className="hidden md:block" />
            {["Online"].map((word) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.2em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={isInView ? { y: "0%" } : {}}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.3 + 3 * 0.06,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            {/* The dot — Nexio's signature */}
            <span className="inline-block overflow-hidden">
              <motion.span
                className="inline-block relative"
                initial={{ y: "110%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.3 + 4 * 0.06,
                }}
              >
                <span className="text-blue relative">
                  .
                  {/* Glow behind the dot */}
                  <span className="absolute inset-0 blur-xl bg-blue/30 rounded-full scale-[3]" />
                </span>
              </motion.span>
            </span>
          </h1>
          <style jsx>{`
            h1 {
              font-size: clamp(2.75rem, 8vw + 1rem, 7rem);
            }
          `}</style>
        </div>

        {/* Act 3: Divider draws across, then bottom row appears */}
        <motion.div
          className="w-full h-[1px] bg-white/[0.08] mb-8 md:mb-10 origin-left"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
        />

        {/* Bottom row: subtext left, CTAs right */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16">
          <motion.p
            className="text-body-lg text-slate-light max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
          >
            We build websites, e&#8209;commerce platforms, AI&nbsp;chatbots,
            and automations for Lebanese businesses ready to&nbsp;grow.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-shrink-0"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 bg-orange text-white font-display font-semibold text-[15px] py-3.5 px-7 rounded-button transition-all duration-200 hover:brightness-[0.92] focus:outline-none focus:ring-2 focus:ring-orange/50 focus:ring-offset-2 focus:ring-offset-midnight"
            >
              Book a Call
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
            <button
              onClick={scrollToServices}
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 font-display font-medium text-[15px] py-3.5 px-7 rounded-button transition-all duration-200 hover:border-white/40 hover:text-white hover:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-midnight"
            >
              Our Services
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll line indicator ── */}
      <motion.div
        className="absolute bottom-10 left-6 md:left-10 lg:left-16 flex items-center gap-3 z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        <motion.span
          className="block w-[1px] h-8 bg-white/20 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.16em]">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
