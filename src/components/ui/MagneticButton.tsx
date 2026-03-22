"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";

type MagneticButtonVariant = "gradient" | "ghost";

type MagneticButtonProps = {
  variant?: MagneticButtonVariant;
  href?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "children"
>;

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-label uppercase tracking-[0.14em] text-label cursor-pointer transition-all duration-hover active:translate-y-[2px] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dim focus-visible:outline-none";

const variantStyles: Record<MagneticButtonVariant, string> = {
  gradient:
    "text-white px-8 py-4 hover:scale-[1.02] gradient-animated",
  ghost:
    "border border-outline-variant px-8 py-4 text-on-surface hover:bg-white hover:text-surface-dim hover:border-white",
};

export default function MagneticButton({
  variant = "gradient",
  href,
  className,
  children,
  ...props
}: MagneticButtonProps) {
  const { elementRef, transform, handleMouseLeave } = useMagneticEffect(150, 0.3);

  const styles = cn(baseStyles, variantStyles[variant], className);

  const magneticStyle: React.CSSProperties = {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    transition: transform.x === 0 && transform.y === 0 ? "transform 0.4s ease-out" : "none",
  };

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

    if (isExternal) {
      return (
        <a
          ref={elementRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          className={styles}
          style={magneticStyle}
          onMouseLeave={handleMouseLeave}
          target="_blank"
          rel="noopener noreferrer"
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        ref={elementRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={styles}
        style={magneticStyle}
        onMouseLeave={handleMouseLeave}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={elementRef as React.RefObject<HTMLButtonElement>}
      className={styles}
      style={magneticStyle}
      onMouseLeave={handleMouseLeave}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
