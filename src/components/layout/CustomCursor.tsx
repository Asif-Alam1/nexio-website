"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useIsTouch } from "@/hooks/useMousePosition";

export default function CustomCursor() {
  const isTouch = useIsTouch();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      setIsHovering(!!el?.closest("a, button, [role='button']"));
    };
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, [isTouch, x, y]);

  useEffect(() => {
    if (isTouch) return;
    document.body.classList.add("cursor-custom");
    return () => document.body.classList.remove("cursor-custom");
  }, [isTouch]);

  if (isTouch || !visible) return null;

  const size = isClicking ? 10 : isHovering ? 48 : 16;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-blue"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        mixBlendMode: "difference",
      }}
      animate={{
        width: size,
        height: size,
        opacity: isClicking ? 0.6 : 1,
      }}
      transition={{ duration: 0.12, ease: "easeOut" }}
    />
  );
}
