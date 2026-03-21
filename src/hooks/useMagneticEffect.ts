"use client";

import { useRef, useCallback, useEffect, useState } from "react";

interface MagneticValues {
  x: number;
  y: number;
}

export function useMagneticEffect(
  threshold: number = 150,
  strength: number = 0.3
) {
  const elementRef = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState<MagneticValues>({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = elementRef.current;
      if (!el) return;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < threshold) {
          setTransform({
            x: deltaX * strength,
            y: deltaY * strength,
          });
        } else {
          setTransform({ x: 0, y: 0 });
        }
      });
    },
    [threshold, strength]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return { elementRef, transform, handleMouseLeave };
}
