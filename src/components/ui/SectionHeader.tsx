"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
  centered?: boolean;
  animateOnView?: boolean;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  dark = false,
  centered = true,
  animateOnView = true,
}: SectionHeaderProps) {
  const animationProps = animateOnView
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "200px" },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
      }
    : {};

  return (
    <motion.div
      className={cn("mb-2xl", centered && "text-center")}
      {...animationProps}
    >
      {!centered && (
        <div className="w-8 h-[2px] bg-blue mb-s" aria-hidden="true" />
      )}
      <p
        className={cn(
          "font-mono text-label uppercase tracking-[0.14em] mb-s",
          dark ? "text-blue" : "text-blue-dark"
        )}
      >
        {label}
      </p>
      <h2
        className={cn(
          "font-display text-h1 mb-m",
          dark ? "text-white" : "text-midnight"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-body-lg max-w-2xl",
            centered && "mx-auto",
            dark ? "text-slate-light" : "text-slate"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
