"use client";

import { useEffect, useRef } from "react";

export function useMagneticChars(
  containerRef: React.RefObject<HTMLElement | null>,
  options: { strength?: number; radius?: number } = {}
) {
  const { strength = 12, radius = 150 } = options;
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const chars = container.querySelectorAll<HTMLElement>(".split-char");
    if (!chars.length) return;

    // Add transition for smooth return
    chars.forEach((c) => {
      c.style.transition = "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)";
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        chars.forEach((char) => {
          const rect = char.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = cx - e.clientX;
          const dy = cy - e.clientY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius) {
            const factor = (1 - dist / radius) * strength;
            char.style.transform = `translate(${(dx / dist) * factor}px, ${(dy / dist) * factor}px)`;
          } else {
            char.style.transform = "";
          }
        });
        rafRef.current = undefined;
      });
    };

    const handleMouseLeave = () => {
      chars.forEach((c) => (c.style.transform = ""));
    };

    const section = container.closest("section") || container;
    section.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      chars.forEach((c) => (c.style.transform = ""));
    };
  }, [containerRef, strength, radius]);
}
