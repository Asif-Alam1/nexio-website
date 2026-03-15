import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "whatsapp" | "submit";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-orange text-white hover:brightness-[0.92] rounded-button py-3 px-6 font-semibold focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-midnight",
  secondary:
    "border border-white/30 text-white hover:bg-white/10 rounded-button py-3 px-6 font-semibold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-midnight",
  ghost:
    "border border-border text-midnight hover:bg-blue-tint rounded-button py-3 px-6 font-medium focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2",
  whatsapp:
    "bg-green text-white hover:brightness-[0.92] rounded-button py-3 px-6 font-semibold focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2 focus:ring-offset-midnight",
  submit:
    "bg-blue text-white hover:brightness-[0.92] rounded-button py-3 px-6 font-semibold w-full focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 focus:ring-offset-midnight",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", href, target, rel, className, children, ...props }, ref) => {
    const styles = cn(
      "inline-flex items-center justify-center gap-2 transition-all duration-hover text-body font-display cursor-pointer active:translate-y-[1px]",
      variantStyles[variant],
      className
    );

    if (href) {
      return (
        <a href={href} target={target} rel={rel} className={styles}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={styles} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
