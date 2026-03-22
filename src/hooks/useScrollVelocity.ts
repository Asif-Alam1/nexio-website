"use client";

import { useState, useEffect, useRef } from "react";

export function useScrollVelocity(maxVelocity: number = 500) {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(performance.now());
  const rafRef = useRef<number>(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const now = performance.now();
        const dt = now - lastTime.current;
        if (dt === 0) return;

        const dy = Math.abs(window.scrollY - lastScrollY.current);
        const rawVelocity = (dy / dt) * 1000; // px/s
        const normalized = Math.min(rawVelocity / maxVelocity, 1);

        setVelocity(normalized);
        lastScrollY.current = window.scrollY;
        lastTime.current = now;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [maxVelocity]);

  return velocity;
}
