"use client";

import { motion } from "framer-motion";
import { Monitor, ShoppingCart, MessageSquare, Zap, Smartphone, AppWindow } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceCard from "@/components/ui/ServiceCard";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const services = [
  {
    icon: <Monitor size={24} />,
    title: "Website Development",
    description:
      "Your online home, built right. We design and develop fast, beautiful websites that work on every device — and that you can actually update yourself.",
    colSpan: "md:col-span-1",
    decorative: false,
  },
  {
    icon: <ShoppingCart size={24} />,
    title: "E-Commerce",
    description:
      "Sell online with confidence. We build stores that handle payments, inventory, and shipping — so you can focus on your products.",
    colSpan: "md:col-span-1",
    decorative: false,
  },
  {
    icon: <Smartphone size={24} />,
    title: "Mobile Apps",
    description:
      "Your business in your customers' pockets. We build native iOS and Android apps that are fast, intuitive, and built to last.",
    colSpan: "md:col-span-1",
    decorative: false,
  },
  {
    icon: <AppWindow size={24} />,
    title: "Desktop Apps",
    description:
      "Powerful tools that run on Windows, Mac, and Linux. We build desktop applications for when your business needs more than a browser.",
    colSpan: "md:col-span-1",
    decorative: false,
  },
  {
    icon: <MessageSquare size={24} />,
    title: "AI Chatbots",
    description:
      "Answer questions 24/7. Our chatbots handle routine inquiries automatically, so your team can focus on what matters.",
    colSpan: "md:col-span-1",
    decorative: false,
  },
  {
    icon: <Zap size={24} />,
    title: "Automations",
    description:
      "Stop doing things twice. We connect your tools and automate repetitive workflows — saving hours every week.",
    colSpan: "md:col-span-1",
    decorative: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-cloud py-4xl">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          label="OUR SERVICES"
          title="What We Build"
          subtitle="Everything your business needs online, built with care and precision."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-l"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              className={service.colSpan}
              decorative={service.decorative}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
