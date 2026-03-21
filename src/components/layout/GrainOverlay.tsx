"use client";

import { useEffect, useState } from "react";

export default function GrainOverlay() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const isHighPerf = !window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShouldRender(isHighPerf && !prefersReducedMotion);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.04]"
      style={{ willChange: "auto" }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves={3}
            stitchTiles="stitch"
          />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#grain-filter)"
          style={{ animation: "grain 8s steps(10) infinite" }}
        />
      </svg>
    </div>
  );
}
