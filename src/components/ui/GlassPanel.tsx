import { cn } from "@/lib/utils";

type GlassPanelProps<T extends React.ElementType = "div"> = {
  as?: T;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export default function GlassPanel<T extends React.ElementType = "div">({
  as,
  className,
  children,
  ...props
}: GlassPanelProps<T>) {
  const Component = as || "div";
  return (
    <Component className={cn("glass-panel", className)} {...props}>
      {children}
    </Component>
  );
}
