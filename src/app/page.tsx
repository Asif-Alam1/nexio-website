import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import TextMarquee from "@/components/ui/TextMarquee";
import ScrollReveal from "@/components/ui/ScrollReveal";

const CapabilitiesSection = dynamic(() => import("@/components/home/CapabilitiesSection"));
const CTASection = dynamic(() => import("@/components/home/CTASection"));

export const metadata: Metadata = {
  title: "Nexio Labs — Curating the Future of Code",
  description:
    "We bridge raw technical power and high-end craftsmanship. Website development, mobile apps, AI chatbots, and automations for ambitious brands.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CapabilitiesSection />

      {/* Marquee band */}
      <ScrollReveal>
        <div className="py-12 md:py-20 bg-surface/50 overflow-hidden space-y-4">
          <TextMarquee
            speed={40}
            pauseOnHover
            outlined
            className="font-headline italic"
          >
            <span style={{ fontSize: "clamp(2rem, 6vw, 6rem)" }}>
              DESIGN — ENGINEERING — CRAFT — STRATEGY — INNOVATION —
            </span>
          </TextMarquee>
          <TextMarquee
            speed={25}
            pauseOnHover
            outlined
            className="font-headline italic opacity-30"
            direction="right"
          >
            <span style={{ fontSize: "clamp(1.5rem, 4vw, 4rem)" }}>
              WEBSITES — MOBILE APPS — AI SYSTEMS — E-COMMERCE — AUTOMATIONS —
            </span>
          </TextMarquee>
        </div>
      </ScrollReveal>

      <CTASection />
    </>
  );
}
