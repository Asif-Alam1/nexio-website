import { Metadata } from "next";
import dynamic from "next/dynamic";
import AboutHero from "@/components/about/AboutHero";
import MagneticButton from "@/components/ui/MagneticButton";
import ScrollReveal from "@/components/ui/ScrollReveal";

const NarrativeSection = dynamic(() => import("@/components/about/NarrativeSection"));
const PhilosophyScroller = dynamic(() => import("@/components/about/PhilosophyScroller"));
const TeamGallery = dynamic(() => import("@/components/about/TeamGallery"));

export const metadata: Metadata = {
  title: "The Collective | Nexio Labs",
  description:
    "Meet the curators, engineers, and dreamers behind Nexio Labs. Born in Beirut, building for the world.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <NarrativeSection />
      <PhilosophyScroller />
      <TeamGallery />

      {/* About CTA section */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-8 md:px-10 relative z-10 text-center">
          <ScrollReveal>
            <h2 className="font-headline text-6xl md:text-9xl italic font-black leading-tight mb-12">
              Ready to build the{" "}
              <span
                style={{
                  WebkitTextStroke: "1px currentColor",
                  color: "transparent",
                }}
              >
                impossible?
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <MagneticButton variant="gradient" href="/contact">
                Inquire Now
              </MagneticButton>
              <a
                href="/services"
                className="font-label text-xs uppercase tracking-[0.2em] text-on-surface hover:text-secondary transition-colors border-b border-outline/20 pb-2"
              >
                View our services
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
