"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  decorative?: boolean;
}

export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ServiceCard({
  icon,
  title,
  description,
  className,
  decorative = false,
}: ServiceCardProps) {
  const [transform, setTransform] = useState(
    "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)"
  );
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    setTransform(
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`
    );
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)");
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <motion.div
      variants={cardVariants}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn("h-full", className)}
      style={{ perspective: "800px" }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          transform,
          transition: isHovering ? "none" : "transform 250ms ease",
          willChange: "transform",
        }}
        className={cn(
          "relative h-full overflow-hidden rounded-card border bg-white p-xl",
          "transition-shadow duration-hover active:translate-y-[1px]",
          isHovering
            ? "border-blue/30 shadow-lg"
            : "border-border shadow-sm"
        )}
      >
        {/* Decorative browser-window outline for large cards */}
        {decorative && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-0 h-32 w-48 translate-x-6 translate-y-6 rounded-card border-2 border-blue-tint opacity-60 hidden md:block"
          >
            <div className="flex items-center gap-1 border-b border-blue-tint px-3 py-2">
              <span className="h-2 w-2 rounded-full border border-blue-tint" />
              <span className="h-2 w-2 rounded-full border border-blue-tint" />
              <span className="h-2 w-2 rounded-full border border-blue-tint" />
            </div>
          </div>
        )}

        {/* Icon */}
        <div className="mb-l flex h-12 w-12 items-center justify-center rounded-full bg-blue-tint text-blue">
          {icon}
        </div>

        {/* Title */}
        <h3 className="font-display text-h3 text-midnight mb-s">{title}</h3>

        {/* Description */}
        <p className="text-body text-slate">{description}</p>
      </div>
    </motion.div>
  );
}
