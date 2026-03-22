"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MagneticTextProps {
  children: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "span" | "div";
  strength?: number;
  radius?: number;
}

export default function MagneticText({
  children,
  className,
  tag: Tag = "span",
  strength = 15,
  radius = 150,
}: MagneticTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const rafRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsTouch(true);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        charsRef.current.forEach((char) => {
          if (!char) return;
          const rect = char.getBoundingClientRect();
          const charCenterX = rect.left + rect.width / 2;
          const charCenterY = rect.top + rect.height / 2;

          const dx = charCenterX - mouseRef.current.x;
          const dy = charCenterY - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < radius) {
            const factor = (1 - distance / radius) * strength;
            const moveX = (dx / distance) * factor;
            const moveY = (dy / distance) * factor;
            char.style.transform = `translate(${moveX}px, ${moveY}px)`;
          } else {
            char.style.transform = "translate(0, 0)";
          }
        });
        rafRef.current = undefined;
      });
    },
    [radius, strength]
  );

  const handleMouseLeave = useCallback(() => {
    charsRef.current.forEach((char) => {
      if (char) char.style.transform = "translate(0, 0)";
    });
  }, []);

  useEffect(() => {
    if (isTouch) return;
    const container = containerRef.current;
    if (!container) return;

    const parent = container.closest("section") || document;
    parent.addEventListener("mousemove", handleMouseMove as any);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parent.removeEventListener("mousemove", handleMouseMove as any);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch, handleMouseMove, handleMouseLeave]);

  if (isTouch) {
    return <Tag className={className}>{children}</Tag>;
  }

  const chars = children.split("");

  return (
    <Tag ref={containerRef as any} className={cn("inline-block", className)}>
      {chars.map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el) charsRef.current[i] = el;
          }}
          className="inline-block transition-transform duration-200 ease-out"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
}
