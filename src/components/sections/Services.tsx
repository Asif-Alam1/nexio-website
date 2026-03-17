"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Monitor, ShoppingCart, Smartphone, AppWindow, MessageSquare, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/ui/SectionHeader";

interface Service {
  title: string;
  description: string;
  icon: React.ElementType;
  span: string;
  accent?: boolean;
  wide?: boolean;
}

const services: Service[] = [
  {
    title: "Website Development",
    description:
      "Your online home, built right. We design and develop fast, beautiful websites that work on every device — and that you can actually update yourself.",
    icon: Monitor,
    span: "md:col-span-2 md:row-span-2",
    accent: true,
  },
  {
    title: "E-Commerce",
    description:
      "Sell online with confidence. Payments, inventory, and shipping — handled.",
    icon: ShoppingCart,
    span: "md:col-span-1",
  },
  {
    title: "Mobile Apps",
    description:
      "Your business in your customers' pockets. Native iOS and Android, built to last.",
    icon: Smartphone,
    span: "md:col-span-1",
  },
  {
    title: "Desktop Apps",
    description:
      "Powerful tools for Windows, Mac, and Linux — for when you need more than a browser.",
    icon: AppWindow,
    span: "md:col-span-1",
  },
  {
    title: "AI Chatbots",
    description:
      "Answer questions 24/7. Your chatbot handles the routine so your team handles what matters.",
    icon: MessageSquare,
    span: "md:col-span-1",
  },
  {
    title: "Automations",
    description:
      "Stop doing things twice. We connect your tools and save you hours every week.",
    icon: Zap,
    span: "md:col-span-4",
    wide: true,
  },
];

function BentoCard({ service, index }: { service: Service; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = service.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    el.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    el.style.transition = "none";
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 0.4s cubic-bezier(0.16,1,0.3,1)";
    el.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={cn("h-full", service.span)}
      style={{ perspective: 800 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "group h-full rounded-card border overflow-hidden transition-shadow duration-200 active:translate-y-[1px]",
          service.accent
            ? "bg-white md:bg-blue text-midnight md:text-white border-border md:border-blue p-6 md:p-10 flex flex-col justify-between shadow-sm md:shadow-md hover:shadow-md md:hover:shadow-xl"
            : service.wide
              ? "bg-white border-border p-6 md:p-8 shadow-sm hover:shadow-md md:flex-row md:items-center"
              : "bg-white border-border p-6 md:p-8 shadow-sm hover:shadow-md"
        )}
      >
        {/* Icon */}
        <div
          className={cn(
            "w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110",
            service.accent ? "bg-blue-tint md:bg-white/20 text-blue md:text-white" : "bg-blue-tint text-blue",
            service.wide ? "mb-5 md:mb-0" : "mb-5"
          )}
        >
          <Icon size={20} />
        </div>

        {/* Decorative browser mockup for featured card */}
        {service.accent && (
          <div className="hidden md:block my-6 pointer-events-none select-none" aria-hidden="true">
            <div className="rounded-lg border border-white/20 overflow-hidden w-full max-w-[320px]">
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10">
                <span className="w-2 h-2 rounded-full bg-white/30" />
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="w-2 h-2 rounded-full bg-white/15" />
                <span className="ml-3 h-2.5 w-24 rounded bg-white/10" />
              </div>
              <div className="p-4 space-y-2.5">
                <div className="h-2.5 w-3/4 rounded bg-white/12" />
                <div className="h-2.5 w-full rounded bg-white/8" />
                <div className="h-2.5 w-5/6 rounded bg-white/8" />
                <div className="mt-4 h-7 w-24 rounded bg-white/15" />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className={cn(service.accent && "mt-auto", service.wide && "mt-5 md:mt-0 md:ml-5")}>
          <h3
            className={cn(
              "font-display font-bold tracking-[-0.01em] mb-2",
              service.accent ? "text-midnight md:text-white text-h3 md:text-h2 lg:text-h1" : "text-midnight text-h3"
            )}
          >
            {service.title}
          </h3>
          <p
            className={cn(
              "leading-relaxed",
              service.accent ? "text-slate md:text-white/80 text-body md:text-body-lg max-w-md" : "text-slate text-body"
            )}
          >
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-cloud py-4xl">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          label="OUR SERVICES"
          title="What We Build"
          subtitle="Everything your business needs online, built with care and precision."
          animateOnView={true}
        />

        <div
          data-services-grid=""
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5"
        >
          {services.map((service, index) => (
            <BentoCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
