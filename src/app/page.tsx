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
        <div className="py-16 border-y border-white/5 overflow-hidden">
          <TextMarquee
            speed={40}
            pauseOnHover
            outlined
            className="font-headline italic"
          >
            <span style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}>
              DESIGN — ENGINEERING — CRAFT — STRATEGY — INNOVATION —
            </span>
          </TextMarquee>
        </div>
      </ScrollReveal>

      <CTASection />
    </>
  );
}
