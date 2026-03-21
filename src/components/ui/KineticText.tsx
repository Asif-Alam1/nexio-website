"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/animations";
import SplitText from "./SplitText";

interface KineticTextProps {
  children: string;
  className?: string;
  animate?: boolean;
  delay?: number;
  as?: React.ElementType;
}

export default function KineticText({
  children,
  className,
  animate = true,
  delay = 0,
  as: Tag = "span",
}: KineticTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!animate || !containerRef.current) return;

      const chars = containerRef.current.querySelectorAll(".split-char");
      if (!chars.length) return;

      gsap.set(chars, { y: "100%", opacity: 0 });
      gsap.to(chars, {
        y: "0%",
        opacity: 1,
        duration: 0.6,
        stagger: 0.03,
        ease: EASE.smooth,
        delay,
      });
    },
    { scope: containerRef, dependencies: [animate, delay, children] }
  );

  return (
    <Tag
      className={cn(
        "font-headline italic kinetic-text inline-block overflow-hidden",
        "transition-[font-variation-settings] duration-[600ms] ease-in-out",
        "py-[0.1em]", // prevent ascender/descender clipping from overflow-hidden
        className
      )}
    >
      <SplitText ref={containerRef} type="chars">
        {children}
      </SplitText>
    </Tag>
  );
}
