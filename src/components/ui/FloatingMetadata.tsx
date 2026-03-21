import { cn } from "@/lib/utils";

interface FloatingMetadataProps {
  children: string;
  className?: string;
}

export default function FloatingMetadata({
  children,
  className,
}: FloatingMetadataProps) {
  return (
    <span className={cn("floating-metadata", className)}>
      {children}
    </span>
  );
}
