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
        The system hit a snag.
      </h1>
      <p className="font-body text-on-surface/60 mb-2 text-center max-w-md">
        An unexpected error occurred. You can try again or head back home.
      </p>
      <p className="font-label text-[11px] uppercase tracking-widest text-on-surface/30 mb-10">
        Our engineers have been notified.
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
