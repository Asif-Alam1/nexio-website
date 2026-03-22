"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type RevealDirection = "left" | "right" | "top" | "bottom";

interface ImageRevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  className?: string;
}

const clipPaths: Record<RevealDirection, { from: string; to: string }> = {
  left: {
    from: "inset(0 100% 0 0)",
    to: "inset(0 0% 0 0)",
  },
  right: {
    from: "inset(0 0 0 100%)",
    to: "inset(0 0 0 0%)",
  },
  top: {
    from: "inset(0 0 100% 0)",
    to: "inset(0 0 0% 0)",
  },
  bottom: {
    from: "inset(100% 0 0 0)",
    to: "inset(0% 0 0 0)",
  },
};

export default function ImageReveal({
  children,
  direction = "left",
  className,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const { from, to } = clipPaths[direction];

      gsap.fromTo(
        containerRef.current,
        { clipPath: from },
        {
          clipPath: to,
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [direction] }
  );

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden", className)}
      style={{ clipPath: clipPaths[direction].from }}
    >
      {children}
    </div>
  );
}
