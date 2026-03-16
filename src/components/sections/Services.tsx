"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, ShoppingCart, Smartphone, AppWindow, MessageSquare, Zap } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const services = [
  {
    num: "01",
    title: "Website Development",
    description:
      "Your online home, built right. We design and develop fast, beautiful websites that work on every device — and that you can actually update yourself.",
    icon: Monitor,
  },
  {
    num: "02",
    title: "E-Commerce",
    description:
      "Sell online with confidence. We build stores that handle payments, inventory, and shipping — so you can focus on your products.",
    icon: ShoppingCart,
  },
  {
    num: "03",
    title: "Mobile Apps",
    description:
      "Your business in your customers' pockets. We build native iOS and Android apps that are fast, intuitive, and built to last.",
    icon: Smartphone,
  },
  {
    num: "04",
    title: "Desktop Apps",
    description:
      "Powerful tools that run on Windows, Mac, and Linux. We build desktop applications for when your business needs more than a browser.",
    icon: AppWindow,
  },
  {
    num: "05",
    title: "AI Chatbots",
    description:
      "Answer questions 24/7. Our chatbots handle routine inquiries automatically, so your team can focus on what matters.",
    icon: MessageSquare,
  },
  {
    num: "06",
    title: "Automations",
    description:
      "Stop doing things twice. We connect your tools and automate repetitive workflows — saving hours every week.",
    icon: Zap,
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="services" className="bg-cloud py-4xl">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          label="OUR SERVICES"
          title="What We Build"
          subtitle="Everything your business needs online, built with care and precision."
        />

        {/* Service list */}
        <div className="border-t border-border">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isActive = activeIndex === i;

            return (
              <motion.div
                key={service.num}
                className="border-b border-border group"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.05,
                }}
              >
                <button
                  className="w-full text-left py-6 md:py-8 flex items-center gap-4 md:gap-8 cursor-pointer"
                  onClick={() => setActiveIndex(isActive ? null : i)}
                  aria-expanded={isActive}
                >
                  {/* Number */}
                  <span className="font-mono text-caption text-slate shrink-0 w-8">
                    {service.num}
                  </span>

                  {/* Title */}
                  <h3
                    className={`font-display font-bold text-xl md:text-2xl lg:text-[28px] tracking-[-0.01em] transition-colors duration-200 flex-1 ${
                      isActive ? "text-blue" : "text-midnight group-hover:text-blue"
                    }`}
                  >
                    {service.title}
                  </h3>

                  {/* Icon */}
                  <div
                    className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isActive
                        ? "bg-blue text-white"
                        : "bg-blue-tint text-blue group-hover:bg-blue group-hover:text-white"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                </button>

                {/* Expandable description */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-body-lg text-slate leading-relaxed pl-12 md:pl-16 pb-6 md:pb-8 max-w-xl">
                        {service.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
