"use client";

import Marquee from "react-fast-marquee";
import { cn } from "@/lib/utils";

interface TextMarqueeProps {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  outlined?: boolean;
}

export default function TextMarquee({
  children,
  speed = 50,
  pauseOnHover = true,
  className,
  outlined = false,
}: TextMarqueeProps) {
  return (
    <Marquee
      speed={speed}
      pauseOnHover={pauseOnHover}
      className={cn(className)}
      autoFill
    >
      <span
        className={cn(
          "mx-8",
          outlined &&
            "text-transparent [-webkit-text-stroke:1px_rgba(226,232,240,0.3)]"
        )}
      >
        {children}
      </span>
    </Marquee>
  );
}
