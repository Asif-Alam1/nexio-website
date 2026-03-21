"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import KineticText from "@/components/ui/KineticText";
import FloatingMetadata from "@/components/ui/FloatingMetadata";
import AmbientBlob from "@/components/ui/AmbientBlob";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FluidBackground from "@/components/ui/FluidBackground";
import MagneticButton from "@/components/ui/MagneticButton";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const targets = [blob1Ref.current, blob2Ref.current, visualRef.current].filter(Boolean);

      targets.forEach((el) => {
        gsap.to(el, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh flex flex-col justify-center px-6 md:px-12 pt-28 md:pt-40 pb-20"
    >
      {/* Ambient Blobs */}
      <div ref={blob1Ref} className="absolute top-[10%] right-[15%] -z-10 parallax-slow">
        <AmbientBlob color="rgba(249,115,22,0.10)" size="384px" />
      </div>
      <div ref={blob2Ref} className="absolute bottom-[20%] left-[10%] -z-10 parallax-medium">
        <AmbientBlob color="rgba(37,99,235,0.10)" size="500px" delay={-5} />
      </div>

      {/* Floating metadata top-right */}
      <div className="absolute top-40 right-12 text-right hidden lg:block">
        <FloatingMetadata className="block">
          LOC / 33.8938° N, 35.5018° E
        </FloatingMetadata>
      </div>

      {/* Headline */}
      <div className="z-10 max-w-7xl">
        <h1
          className="font-headline italic kinetic-text"
          style={{ fontSize: "clamp(3rem, 13vw, 12rem)" }}
        >
          <KineticText as="span" className="block text-on-surface" delay={0}>
            Curating
          </KineticText>
          <KineticText
            as="span"
            className="block ml-[12vw] text-outline-variant/40"
            delay={0.3}
          >
            The Future
          </KineticText>
          <KineticText as="span" className="block text-primary" delay={0.6}>
            of Code.
          </KineticText>
        </h1>
      </div>

      {/* Right side abstract visual (desktop only) */}
      <div
        ref={visualRef}
        className="absolute right-[5%] top-[15%] w-[45vw] h-[70vh] z-0 pointer-events-none hidden lg:block parallax-fast"
      >
        <FluidBackground
          className="absolute inset-0 opacity-70 mix-blend-screen"
          fallback={
            <Image
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80"
              alt="Abstract visual"
              fill
              className="object-cover grayscale brightness-125 contrast-75 mix-blend-screen opacity-60"
              sizes="(max-width: 1024px) 0px, 45vw"
              priority
              fetchPriority="high"
            />
          }
        />
        <div className="absolute bottom-10 right-0 w-px h-32 bg-gradient-to-b from-primary/0 to-primary/40" />
      </div>

      {/* Bottom section: manifesto + CTAs + explore link */}
      <div className="mt-12 md:mt-20 flex flex-col md:flex-row gap-10 md:gap-20 items-end w-full">
        <ScrollReveal className="relative max-w-md" delay={0}>
          <FloatingMetadata className="absolute -top-6 -left-4 hidden md:block">
            01_MANIFESTO
          </FloatingMetadata>
          <p className="font-body text-on-surface-variant text-lg leading-relaxed font-light">
            We bridge the chasm between{" "}
            <span className="text-on-surface font-medium">
              raw technical power
            </span>{" "}
            and high-end craftsmanship. No templates. No shortcuts. Just intent.
          </p>
          <div className="flex items-center gap-8 mt-8">
            <MagneticButton variant="gradient" href="/contact">
              Start a Project
            </MagneticButton>
            <Link
              href="/services"
              className="font-label text-[11px] uppercase tracking-widest text-on-surface/60 hover:text-on-surface hover-underline transition-colors"
            >
              Explore Services
            </Link>
          </div>
        </ScrollReveal>
        <div className="flex-grow" />
        <ScrollReveal delay={0.15}>
          <Link
            href="/services"
            className="flex flex-col items-end gap-6 group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-px bg-secondary group-hover:w-32 transition-all duration-700" />
              <span className="font-label uppercase tracking-widest text-[11px] text-secondary">
                Explore Works
              </span>
            </div>
            <FloatingMetadata>
              SCROLL TO NAVIGATE (AUTO_DYNAMICS ON)
            </FloatingMetadata>
          </Link>
        </ScrollReveal>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-label text-[11px] uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-px h-8 bg-on-surface/30 relative overflow-hidden">
          <div className="w-full h-full bg-primary animate-[scrollDown_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
