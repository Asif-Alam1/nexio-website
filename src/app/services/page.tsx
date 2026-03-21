import { Metadata } from "next";
import dynamic from "next/dynamic";
import ServicesHero from "@/components/services/ServicesHero";

const ServiceGrid = dynamic(() => import("@/components/services/ServiceGrid"));
const ProcessSection = dynamic(() => import("@/components/services/ProcessSection"));
const ServicesCTA = dynamic(() => import("@/components/services/ServicesCTA"));

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
