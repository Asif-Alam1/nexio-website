"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ScrollTextRevealProps {
  children: string;
  className?: string;
  tag?: "p" | "h2" | "h3" | "span";
}

export default function ScrollTextReveal({
  children,
  className,
  tag: Tag = "p",
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Check reduced motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const words = containerRef.current.querySelectorAll(".scroll-word");
      if (!words.length) return;

      // Set initial state - all words faded
      gsap.set(words, { opacity: 0.15 });

      // Create a timeline that reveals words as user scrolls
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: 1,
        },
      });

      // Stagger each word's opacity from 0.15 to 1
      tl.to(words, {
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "none",
      });
    },
    { scope: containerRef }
  );

  // Split text into words
  const words = children.split(" ");

  return (
    <Tag
      ref={containerRef as any}
      className={cn("scroll-text-reveal", className)}
    >
      {words.map((word, i) => (
        <span key={i} className="scroll-word inline-block" style={{ marginRight: "0.3em" }}>
          {word}
        </span>
      ))}
    </Tag>
  );
}
