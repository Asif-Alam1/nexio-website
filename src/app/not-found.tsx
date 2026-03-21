import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";
import AmbientBlob from "@/components/ui/AmbientBlob";

import BlueprintGrid from "@/components/ui/BlueprintGrid";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-dim flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Blueprint grid background */}
      <BlueprintGrid opacity={0.03} />

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
        <p className="font-body text-lg text-on-surface/60 mt-6 mb-4 max-w-md">
          This page wandered off the grid.
        </p>
        <MagneticButton variant="gradient" href="/">
          Return Home
        </MagneticButton>
        <div className="mt-12 flex flex-wrap gap-6 justify-center">
          <Link href="/services" className="font-label text-[11px] uppercase tracking-widest text-on-surface/60 hover:text-on-surface hover-underline transition-colors">Our Services</Link>
          <Link href="/about" className="font-label text-[11px] uppercase tracking-widest text-on-surface/60 hover:text-on-surface hover-underline transition-colors">About Us</Link>
          <Link href="/contact" className="font-label text-[11px] uppercase tracking-widest text-on-surface/60 hover:text-on-surface hover-underline transition-colors">Get In Touch</Link>
        </div>
      </div>
    </div>
  );
}
