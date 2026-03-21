import { Metadata } from "next";
import ServicesHero from "@/components/services/ServicesHero";
import ServiceGrid from "@/components/services/ServiceGrid";
import ProcessSection from "@/components/services/ProcessSection";
import ServicesCTA from "@/components/services/ServicesCTA";

export const metadata: Metadata = {
  title: "Our Craft | Nexio Labs",
  description:
    "Web architecture, e-commerce, mobile apps, AI systems, and automations. Engineering precision meets editorial design.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServiceGrid />
      <ProcessSection />
      <ServicesCTA />
    </>
  );
}
