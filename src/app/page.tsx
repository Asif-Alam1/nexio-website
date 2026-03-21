import HeroSection from "@/components/home/HeroSection";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";
import CTASection from "@/components/home/CTASection";
import TextMarquee from "@/components/ui/TextMarquee";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CapabilitiesSection />

      {/* Marquee band */}
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

      <CTASection />
    </>
  );
}
