"use client";

import KineticText from "@/components/ui/KineticText";
import AmbientBlob from "@/components/ui/AmbientBlob";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ContactHero() {
  return (
    <section className="py-32 md:py-40 px-6 md:px-12 text-center relative">
      {/* Ambient blobs behind text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <AmbientBlob
          color="rgba(249,115,22,0.12)"
          size="600px"
          className="absolute -translate-x-1/3 -translate-y-1/4"
        />
        <AmbientBlob
          color="rgba(37,99,235,0.10)"
          size="500px"
          className="absolute translate-x-1/3 translate-y-1/4"
          delay={3}
        />
      </div>

      <div className="relative z-10">
        <p className="font-label text-secondary uppercase tracking-[0.5em] text-xs mb-8">
          Get In Touch
        </p>

        <h1 style={{ fontSize: "clamp(3rem, 10vw, 8rem)", lineHeight: 1 }}>
          <KineticText className="text-on-surface">
            {"Let's Start"}
          </KineticText>
          <br />
          <KineticText className="text-primary" delay={0.3}>
            Something.
          </KineticText>
        </h1>

        <ScrollReveal delay={0.2}>
          <p className="text-on-surface-variant mt-8 text-body-lg max-w-md mx-auto">
            Currently accepting projects for Q3 2026
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
