import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";
import AmbientBlob from "@/components/ui/AmbientBlob";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-dim flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <AmbientBlob
          color="rgba(249, 115, 22, 0.15)"
          size="600px"
          className="absolute -top-40 -left-40 opacity-40"
          delay={0}
        />
        <AmbientBlob
          color="rgba(59, 130, 246, 0.1)"
          size="400px"
          className="absolute -bottom-20 -right-20 opacity-30"
          delay={5}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1
          className="font-headline italic leading-none select-none"
          style={{
            fontSize: "clamp(8rem, 20vw, 16rem)",
            WebkitTextStroke: "1px var(--color-on-surface, #E2E8F0)",
            color: "transparent",
          }}
        >
          404
        </h1>
        <p className="font-body text-lg text-on-surface/60 mt-6 mb-10 max-w-md">
          This page doesn&apos;t exist yet.
        </p>
        <MagneticButton variant="gradient" href="/">
          Return Home
        </MagneticButton>
      </div>
    </div>
  );
}
