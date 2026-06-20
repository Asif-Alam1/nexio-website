import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * SSR-safe check for the user's reduced-motion preference.
 * GSAP/Framer animate inline styles via JS, so the CSS `prefers-reduced-motion`
 * override in globals.css does NOT cover them — every JS animation must gate
 * on this and ensure its target's final, visible state is applied when skipped.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
