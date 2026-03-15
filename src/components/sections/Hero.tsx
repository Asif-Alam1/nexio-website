"use client";

import { useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import Button from "@/components/ui/Button";
import TextReveal from "@/components/ui/TextReveal";
import { useMousePosition } from "@/hooks/useMousePosition";
import { WHATSAPP_URL } from "@/lib/constants";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function Hero() {
  const { position, isTouch } = useMousePosition();

  const orbX = useSpring(0, { stiffness: 50, damping: 20 });
  const orbY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (isTouch) return;
    orbX.set((position.x - window.innerWidth / 2) * 0.02);
    orbY.set((position.y - window.innerHeight / 2) * 0.02);
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
      {/* Background gradient orbs */}
      <motion.div
        className="pointer-events-none absolute right-[-5%] top-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-0 md:opacity-100"
        style={{
          x: orbX,
          y: orbY,
          background: "radial-gradient(circle at center, rgba(37,99,235,0.08) 0%, #151D33 40%, transparent 70%)",
        }}
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      {/* Secondary subtle glow */}
      <div
        className="pointer-events-none absolute left-[-10%] bottom-[-20%] w-[400px] h-[400px] opacity-30 hidden lg:block"
        style={{
          background: "radial-gradient(circle at center, rgba(37,99,235,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-m lg:px-2xl w-full">
        <motion.div
          className="max-w-[640px] flex flex-col items-center lg:items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Label */}
          <motion.p
            className="font-mono text-label text-blue uppercase mb-m"
            variants={fadeUpVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            TECH AGENCY · LEBANON &amp; MENA
          </motion.p>

          {/* Headline */}
          <div className="mb-l text-center lg:text-left">
            <TextReveal
              text="Connect Your Business Online."
              className="font-display text-hero-mobile md:text-hero-tablet lg:text-hero text-white tracking-[-0.04em] leading-[1.0]"
            />
          </div>

          {/* Subtext */}
          <motion.p
            className="text-body-lg text-slate-light mb-xl text-center lg:text-left"
            variants={fadeUpVariants}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            We build websites, e-commerce platforms, AI chatbots, and automations for Lebanese
            businesses ready to grow.
          </motion.p>

          {/* CTA row */}
          <motion.div
            className="flex flex-col sm:flex-row gap-m"
            variants={containerVariants}
          >
            <motion.div variants={fadeUpVariants} transition={{ duration: 0.5, ease: "easeOut" }}>
              <Button
                variant="primary"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Call
              </Button>
            </motion.div>
            <motion.div variants={fadeUpVariants} transition={{ duration: 0.5, ease: "easeOut" }}>
              <Button variant="secondary" onClick={scrollToServices}>
                Our Services
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
