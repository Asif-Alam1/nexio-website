import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export default function Logo({ variant = "dark", className }: LogoProps) {
  return (
    <span
      className={cn(
        "font-display font-extrabold tracking-[-0.04em] select-none inline-flex items-baseline leading-none",
        className
      )}
    >
      <span className={variant === "light" ? "text-white" : "text-midnight"}>
        Nexio
      </span>
      <span className="text-blue">.</span>
    </span>
  );
}
