"use client";

import { useState } from "react";
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
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function BentoCard({ service }: { service: Service }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const Icon = service.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    setTilt({ x, y });
  };

  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn("h-full", service.span)}
      style={{ perspective: 800 }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => {
          setHovering(false);
          setTilt({ x: 0, y: 0 });
        }}
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transition: hovering ? "none" : "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
        className={cn(
          "h-full rounded-card border overflow-hidden transition-shadow duration-200 active:translate-y-[1px]",
          service.accent
            ? "bg-blue text-white border-blue p-8 md:p-10 flex flex-col justify-between shadow-md hover:shadow-xl"
            : "bg-white border-border p-6 md:p-8 shadow-sm hover:shadow-md"
        )}
      >
        {/* Icon */}
        <div
          className={cn(
            "w-11 h-11 rounded-full flex items-center justify-center mb-5 transition-transform duration-200",
            hovering && "scale-110",
            service.accent ? "bg-white/20 text-white" : "bg-blue-tint text-blue"
          )}
        >
          <Icon size={20} />
        </div>

        {/* Content */}
        <div className={service.accent ? "mt-auto" : ""}>
          <h3
            className={cn(
              "font-display font-bold tracking-[-0.01em] mb-2",
              service.accent ? "text-white text-h2 lg:text-h1" : "text-midnight text-h3"
            )}
          >
            {service.title}
          </h3>
          <p
            className={cn(
              "leading-relaxed",
              service.accent ? "text-white/80 text-body-lg max-w-md" : "text-slate text-body"
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
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {services.map((service) => (
            <BentoCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
