"use client";

import MagneticButton from "@/components/ui/MagneticButton";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-surface-dim flex flex-col items-center justify-center px-6">
      <h1 className="font-headline italic text-5xl md:text-7xl mb-6">
        Something went wrong.
      </h1>
      <p className="font-body text-on-surface/60 mb-10 text-center max-w-md">
        An unexpected error occurred. You can try again or head back home.
      </p>
      <div className="flex items-center gap-4">
        <MagneticButton variant="ghost" onClick={() => reset()}>
          Try Again
        </MagneticButton>
        <MagneticButton variant="gradient" href="/">
          Go Home
        </MagneticButton>
      </div>
    </div>
  );
}
