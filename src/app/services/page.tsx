import { Metadata } from "next";
import dynamic from "next/dynamic";
import ServicesHero from "@/components/services/ServicesHero";
import { BASE_URL } from "@/lib/constants";

const ServiceGrid = dynamic(() => import("@/components/services/ServiceGrid"));
const ProcessSection = dynamic(() => import("@/components/services/ProcessSection"));
const ServicesCTA = dynamic(() => import("@/components/services/ServicesCTA"));

const description =
  "Web architecture, e-commerce, mobile apps, AI systems, and automations. Engineering precision meets editorial design.";

export const metadata: Metadata = {
  title: "Our Craft | Nexio Labs",
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Our Craft | Nexio Labs",
    description,
    url: `${BASE_URL}/services`,
  },
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
