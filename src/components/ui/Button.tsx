import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "ghost";

type ButtonProps = {
  variant?: ButtonVariant;
  href?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "children"
>;

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-label uppercase tracking-[0.14em] text-label cursor-pointer transition-all duration-hover active:translate-y-[1px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dim focus-visible:outline-none";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "text-white px-8 py-4 hover:scale-[1.02]",
  ghost:
    "border border-outline-variant px-8 py-4 text-on-surface hover:bg-white hover:text-surface-dim hover:border-white",
};

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", href, className, children, ...props }, ref) => {
    const styles = cn(baseStyles, variantStyles[variant], className);

    const inlineStyle =
      variant === "primary"
        ? { background: "linear-gradient(135deg, #F97316, #EA580C)" }
        : undefined;

    if (href) {
      const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={styles}
            style={inlineStyle}
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
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={styles}
          style={inlineStyle}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={styles}
        style={inlineStyle}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
