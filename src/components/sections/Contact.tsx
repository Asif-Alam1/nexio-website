"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import SectionHeader from "@/components/ui/SectionHeader";
import ContactForm from "@/components/ui/ContactForm";
import Button from "@/components/ui/Button";
import { WHATSAPP_URL, CONTACT_EMAIL } from "@/lib/constants";

export default function Contact() {
  return (
    <section id="contact" className="relative noise-overlay bg-midnight py-4xl overflow-hidden">
      {/* Radial gradient orb — positioned LEFT */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-40 hidden md:block"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle at center, rgba(37,99,235,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3xl">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <SectionHeader
              label="GET IN TOUCH"
              title="Let's Build Something Together."
              dark
              centered={false}
            />

            <p className="text-body-lg text-slate-light mb-xl -mt-m">
              Tell us about your project. We&apos;ll get back to you within 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-m">
              <Button
                variant="whatsapp"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={18} />
                Chat on WhatsApp
              </Button>
            </div>

            <div className="mt-l">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-mono text-caption text-slate hover:text-white transition-colors duration-hover"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </motion.div>

          {/* Right column — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
