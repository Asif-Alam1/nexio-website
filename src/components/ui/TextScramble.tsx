"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTextScramble } from "@/hooks/useTextScramble";
import { useInView } from "@/hooks/useInView";

interface TextScrambleProps {
  text: string;
  className?: string;
  trigger?: "hover" | "mount" | "inView";
}

export default function TextScramble({
  text,
  className,
  trigger: triggerMode = "mount",
}: TextScrambleProps) {
  const { displayText, trigger } = useTextScramble(text);
  const { ref: inViewRef, isInView } = useInView({ threshold: 0.5 });
  const hasMountTriggered = useRef(false);
  const hasInViewTriggered = useRef(false);

  useEffect(() => {
    if (triggerMode === "mount" && !hasMountTriggered.current) {
      hasMountTriggered.current = true;
      trigger();
    }
  }, [triggerMode, trigger]);

  useEffect(() => {
    if (triggerMode === "inView" && isInView && !hasInViewTriggered.current) {
      hasInViewTriggered.current = true;
      trigger();
    }
  }, [triggerMode, isInView, trigger]);

  const handleMouseEnter = () => {
    if (triggerMode === "hover") {
      trigger();
    }
  };

  return (
    <span
      ref={triggerMode === "inView" ? inViewRef : undefined}
      className={cn("inline-block", className)}
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </span>
  );
}
