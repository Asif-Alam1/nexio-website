"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { WHATSAPP_URL } from "@/lib/constants";

export default function FloatingWhatsApp() {
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsContactVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-none glass-panel flex items-center justify-center"
      animate={
        isContactVisible
          ? { opacity: 0, scale: 0.8 }
          : { opacity: 1, scale: 1 }
      }
      transition={{ duration: 0.2 }}
      style={{ pointerEvents: isContactVisible ? "none" : "auto" }}
      whileHover={{ scale: isContactVisible ? 0.8 : 1.05 }}
    >
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : { scale: [1, 1.05, 1] }
        }
        transition={
          prefersReducedMotion
            ? {}
            : { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }
        className="flex items-center justify-center"
      >
        <FaWhatsapp className="text-green" size={24} />
      </motion.div>
    </motion.a>
  );
}
