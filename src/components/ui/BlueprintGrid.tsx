import { cn } from "@/lib/utils";

interface BlueprintGridProps {
  className?: string;
  opacity?: number;
}

export default function BlueprintGrid({
  className,
  opacity = 0.05,
}: BlueprintGridProps) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        backgroundImage: `linear-gradient(rgba(249,115,22,${opacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,${opacity}) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(circle at center, black, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(circle at center, black, transparent 80%)",
      }}
      aria-hidden="true"
    />
  );
}
