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
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-midnight flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.8 }}
      onAnimationComplete={() => {
        sessionStorage.setItem("nexio-loaded", "true");
        setIsLoading(false);
      }}
    >
      <motion.img
        src="/images/logo/nexio-monogram.svg"
        alt=""
        className="w-16 h-16"
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
