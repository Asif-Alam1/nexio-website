"use client";

import { cn } from "@/lib/utils";

interface AmbientBlobProps {
  color: string;
  size?: string;
  className?: string;
  delay?: number;
}

export default function AmbientBlob({
  color,
  size = "500px",
  className,
  delay = 0,
}: AmbientBlobProps) {
  return (
    <div
      className={cn("rounded-full blur-[100px] pointer-events-none", className)}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        animation: "float 20s infinite alternate",
        animationDelay: `${delay}s`,
      }}
      aria-hidden="true"
    />
  );
}
