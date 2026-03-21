"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for page to be fully loaded
    const handleLoad = () => {
      // Small delay so the animation feels intentional, not just a flash
      setTimeout(() => setIsLoading(false), 900);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-surface flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <span className="font-headline italic text-7xl md:text-8xl font-bold tracking-tighter select-none">
              NEXIO
              <span className="text-primary">.</span>
            </span>
          </motion.div>

          {/* Loading line */}
          <motion.div
            className="mt-10 h-px bg-outline-variant/30 overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          >
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>

          {/* Metadata */}
          <motion.span
            className="floating-metadata mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            LOADING
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
