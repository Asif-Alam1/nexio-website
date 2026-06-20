"use client";

import { useEffect } from "react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error to logs / monitoring so failures are diagnosable.
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-surface-dim flex flex-col items-center justify-center px-6">
      <h1 className="font-headline italic text-5xl md:text-7xl mb-6">
        The system hit a snag.
      </h1>
      <p className="font-body text-on-surface/80 mb-8 text-center max-w-md">
        Something went wrong on our end. Try again, or head back home — if it
        keeps happening, reach us at hello@nexiolabs.co.
      </p>
      {error?.digest && (
        <p className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant mb-8 -mt-4">
          Reference: {error.digest}
        </p>
      )}
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
