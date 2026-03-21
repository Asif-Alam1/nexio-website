"use client";

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
  "inline-flex items-center justify-center gap-2 font-label uppercase tracking-[0.14em] text-label cursor-pointer transition-all duration-hover active:translate-y-[1px]";

const variantStyles: Record<MagneticButtonVariant, string> = {
  gradient:
    "text-white px-8 py-4 hover:scale-[1.02] shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[0_0_30px_rgba(249,115,22,0.35)]",
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

  const magneticStyle = {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    transition: transform.x === 0 && transform.y === 0 ? "transform 0.4s ease-out" : "none",
    ...(variant === "gradient"
      ? { background: "linear-gradient(135deg, #F97316, #EA580C)" }
      : {}),
  };

  if (href) {
    return (
      <a
        ref={elementRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={styles}
        style={magneticStyle}
        onMouseLeave={handleMouseLeave}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
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
