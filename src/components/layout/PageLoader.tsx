"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Respect prefers-reduced-motion — skip animation immediately
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced || sessionStorage.getItem("nexio-loaded")) {
      setIsLoading(false);
      return;
    }

    // Mark as seen immediately so back-navigation skips the loader
    sessionStorage.setItem("nexio-loaded", "true");

    // Safety valve: force-hide after 2s in case onAnimationComplete never fires
    const timeout = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-midnight flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.8 }}
      onAnimationComplete={() => {
        setIsLoading(false);
      }}
    >
      <motion.span
        className="font-display font-extrabold text-5xl text-white tracking-[-0.04em] select-none"
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        N<span className="text-blue">.</span>
      </motion.span>
    </motion.div>
  );
}
