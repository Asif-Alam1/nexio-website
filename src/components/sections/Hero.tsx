"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { WHATSAPP_URL } from "@/lib/constants";

const WORDS_LINE1 = ["Connect", "Your", "Business"];
const WORD_LINE2 = "Online";

export default function Hero() {
  const { position, isTouch } = useMousePosition();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const subtextY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
      aria-label="Nexio Labs — Connect Your Business Online"
      className="noise-overlay relative bg-midnight flex flex-col justify-center overflow-hidden pt-32 pb-16 md:min-h-screen md:pt-20 md:pb-16"
    >
      {/* ── Atmosphere ── */}

      {/* Primary orb — mouse parallax + scroll scale */}
      <motion.div
        className="pointer-events-none absolute right-[-10%] top-[35%] -translate-y-1/2 w-[800px] h-[800px] hidden md:block"
        style={{
          x: orbX,
          y: orbY,
          scale: orbScale,
          opacity: orbOpacity,
          background:
            "radial-gradient(circle at center, rgba(37,99,235,0.06) 0%, rgba(21,29,51,0.5) 30%, transparent 60%)",
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Secondary orb — slow ambient drift */}
      <motion.div
        className="pointer-events-none absolute left-[10%] top-[20%] w-[300px] h-[300px] hidden lg:block"
        style={{
          background:
            "radial-gradient(circle at center, rgba(37,99,235,0.04) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 20, -10, 0],
          y: [0, -15, 10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating accent lines — subtle geometric depth */}
      <motion.div
        className="pointer-events-none absolute top-[25%] right-[20%] w-[100px] h-[1px] bg-white/[0.04] hidden lg:block"
        animate={{ x: [0, 30, 0], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[30%] right-[35%] w-[60px] h-[1px] bg-blue/[0.06] hidden lg:block rotate-45"
        animate={{ x: [0, -20, 0], opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 flex flex-col flex-1 justify-center">

        {/* Headline — CSS animation for instant FCP, scroll parallax on desktop */}
        <motion.h1
          className="font-display font-extrabold tracking-[-0.045em] leading-[0.9] text-white mb-8 md:mb-16 text-[clamp(2.5rem,10vw,7.5rem)]"
          style={{ y: headlineY }}
        >
          {WORDS_LINE1.map((word, i) => (
            <span key={word} className="inline-block overflow-hidden mr-[0.2em] pr-[0.04em]">
              <span
                className="inline-block hero-word"
                style={{ animationDelay: `${0.15 + i * 0.07}s` }}
              >
                {word}
              </span>
            </span>
          ))}
          <br className="hidden md:block" />
          <span className="inline-block overflow-hidden mr-[0.12em] pr-[0.04em]">
            <span
              className="inline-block hero-word"
              style={{ animationDelay: "0.36s" }}
            >
              {WORD_LINE2}
            </span>
          </span>
          <span className="inline-block overflow-hidden">
            <span
              className="inline-block text-blue hero-word"
              style={{ animationDelay: "0.43s" }}
            >
              .
            </span>
          </span>
        </motion.h1>

        {/* Mobile subtext */}
        <motion.p
          className="text-sm md:hidden text-slate-light leading-relaxed mb-5 max-w-[320px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        >
          Websites, apps, AI chatbots & automations for Lebanese businesses ready to grow.
        </motion.p>

        {/* Mobile CTAs */}
        <motion.div
          className="flex gap-3 mb-8 md:hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-orange text-white font-display font-semibold text-sm py-3.5 px-5 rounded-button transition-all duration-200 hover:brightness-[0.92] active:translate-y-[1px]"
          >
            Book a Call
            <ArrowRight size={14} />
          </a>
          <button
            onClick={scrollToServices}
            className="inline-flex items-center justify-center border border-white/20 text-white/80 font-display font-medium text-sm py-3.5 px-5 rounded-button transition-all duration-200 hover:border-white/40 hover:text-white active:translate-y-[1px]"
          >
            Services
          </button>
        </motion.div>

        {/* Stats — parallax at slower rate */}
        <motion.div
          className="flex items-center gap-4 md:gap-x-12 md:flex-wrap mb-0 md:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          style={{ y: subtextY }}
        >
          {[
            { value: "10+", label: "Projects" },
            { value: "5+", label: "Industries" },
            { value: "90%", label: "Retention" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-baseline gap-1.5 md:gap-2.5">
              {i > 0 && (
                <span className="block w-[1px] h-3 md:h-4 bg-white/10 -ml-2 md:-ml-6 mr-2 md:mr-6" />
              )}
              <span className="font-display font-bold text-base md:text-2xl text-white tabular-nums">
                {stat.value}
              </span>
              <span className="font-mono text-[11px] text-white/40 uppercase tracking-[0.08em] md:tracking-[0.1em]">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Desktop bottom row — divider draws, then content fades */}
        <div className="hidden md:block">
          <motion.div
            className="w-full h-[1px] bg-white/[0.08] origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
          />
          <motion.div
            className="flex items-end justify-between gap-12 pt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
            style={{ y: subtextY }}
          >
            <p className="text-body-lg text-slate-light max-w-[420px] leading-relaxed">
              Empowering Lebanese businesses with high-performance websites, cross-platform apps, and smart AI automations designed for growth.
            </p>

            <div className="flex gap-4 flex-shrink-0">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 bg-orange text-white font-display font-semibold text-[15px] py-3.5 px-7 rounded-button transition-all duration-200 hover:brightness-[0.92] active:translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-orange/50 focus:ring-offset-2 focus:ring-offset-midnight"
              >
                Book a Call
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
              <button
                onClick={scrollToServices}
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 font-display font-medium text-[15px] py-3.5 px-7 rounded-button transition-all duration-200 hover:border-white/40 hover:text-white hover:bg-white/[0.04] active:translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-midnight"
              >
                Our Services
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator — desktop only ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
      >
        <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.2em]">
          Scroll
        </span>
        <motion.span
          className="block w-[1px] h-5 bg-white/15 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
