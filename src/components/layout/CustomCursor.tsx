"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";

/**
 * Custom cursor with editorial styling.
 * cursify is installed but is a Node.js image processing tool, not a React
 * cursor component — so we combine Framer Motion springs with custom styles
 * for the spotlight/magnetic cursor effect described in the design spec.
 */
export default function CustomCursor() {
  const { position, isTouch } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const springConfig = { stiffness: 250, damping: 24, mass: 0.5 };
  const springX = useSpring(position.x, springConfig);
  const springY = useSpring(position.y, springConfig);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button']")) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button']")) {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isTouch]);

  useEffect(() => {
    if (isTouch) return;
    document.body.classList.add("cursor-custom");
    return () => {
      document.body.classList.remove("cursor-custom");
    };
  }, [isTouch]);

  useEffect(() => {
    springX.set(position.x);
    springY.set(position.y);
  }, [position.x, position.y, springX, springY]);

  if (isTouch) return null;

  const size = isClicking ? 16 : isHovering ? 64 : 40;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        mixBlendMode: "difference",
        backgroundColor: "#F97316",
      }}
      animate={{
        width: size,
        height: size,
        opacity: isClicking ? 0.6 : isHovering ? 0.8 : 1,
      }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
