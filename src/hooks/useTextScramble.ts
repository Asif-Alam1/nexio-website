"use client";

import { useState, useRef, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

interface UseTextScrambleOptions {
  speed?: number; // ms per character resolve
  tick?: number; // ms per scramble tick
}

export function useTextScramble(
  text: string,
  options: UseTextScrambleOptions = {}
) {
  const { speed = 50, tick = 30 } = options;
  const [displayText, setDisplayText] = useState(text);
  const rafRef = useRef<number>(0);
  const isRunningRef = useRef(false);

  const trigger = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    let resolvedCount = 0;
    const length = text.length;
    let lastResolve = performance.now();
    let lastTick = performance.now();

    const step = (now: number) => {
      if (resolvedCount >= length) {
        setDisplayText(text);
        isRunningRef.current = false;
        return;
      }

      // Advance resolved chars based on speed
      if (now - lastResolve >= speed) {
        resolvedCount++;
        lastResolve = now;
      }

      // Scramble unresolved portion on each tick
      if (now - lastTick >= tick) {
        const resolved = text.slice(0, resolvedCount);
        const scrambled = text
          .slice(resolvedCount)
          .split("")
          .map((ch) =>
            ch === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]
          )
          .join("");
        setDisplayText(resolved + scrambled);
        lastTick = now;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafRef.current);
      isRunningRef.current = false;
    };
  }, [text, speed, tick]);

  return { displayText, trigger };
}
