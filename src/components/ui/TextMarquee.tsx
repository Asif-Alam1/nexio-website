"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { cn } from "@/lib/utils";
import { ScrollTrigger } from "@/lib/gsap";

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
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetSpeedRef = useRef(speed);
  const rafRef = useRef<number>(0);

  // Smooth lerp loop to ease between speed changes
  const lerpLoop = useCallback(() => {
    setCurrentSpeed((prev) => {
      const diff = targetSpeedRef.current - prev;
      if (Math.abs(diff) < 0.5) return targetSpeedRef.current;
      return prev + diff * 0.08;
    });
    rafRef.current = requestAnimationFrame(lerpLoop);
  }, []);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    rafRef.current = requestAnimationFrame(lerpLoop);

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        const boost = velocity / 200;
        const maxSpeed = speed * 5;
        targetSpeedRef.current = Math.min(speed + boost, maxSpeed);
      },
      onLeave: () => {
        targetSpeedRef.current = speed;
      },
      onLeaveBack: () => {
        targetSpeedRef.current = speed;
      },
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      trigger.kill();
    };
  }, [speed, lerpLoop]);

  return (
    <div ref={containerRef}>
      <Marquee
        speed={currentSpeed}
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
    </div>
  );
}
