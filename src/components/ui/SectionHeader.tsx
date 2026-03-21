"use client";

import { cn } from "@/lib/utils";
import KineticText from "./KineticText";
import FloatingMetadata from "./FloatingMetadata";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  metadata?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  metadata,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "relative mb-2xl",
        align === "center" && "text-center",
        className
      )}
    >
      {metadata && (
        <FloatingMetadata className="block mb-4">
          {metadata}
        </FloatingMetadata>
      )}

      <KineticText
        as="h2"
        className="text-hero-tablet md:text-hero leading-none"
      >
        {title}
      </KineticText>

      {subtitle && (
        <p
          className={cn(
            "mt-6 text-on-surface-variant text-body-lg font-light max-w-md border-l border-primary/30 pl-6",
            align === "center" && "mx-auto border-l-0 pl-0"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
