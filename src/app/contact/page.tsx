import { Metadata } from "next";
import dynamic from "next/dynamic";
import ContactHero from "@/components/contact/ContactHero";
import MagneticButton from "@/components/ui/MagneticButton";

const ContactForm = dynamic(() => import("@/components/contact/ContactForm"));

export const metadata: Metadata = {
  title: "Get In Touch | Nexio Labs",
  description:
    "Start a project with Nexio Labs. Currently accepting projects for Q3 2026.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      {/* Mini CTA */}
      <section className="py-20 px-8 text-center">
        <p className="font-label text-on-surface-variant text-xs uppercase tracking-widest mb-8">
          Prefer a conversation?
        </p>
        <MagneticButton variant="ghost" href="https://wa.me/96176423052">
          WhatsApp Us
        </MagneticButton>
      </section>
    </>
  );
}
