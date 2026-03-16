"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/lib/constants";
import Logo from "@/components/ui/Logo";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) {
    const top = target.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function Footer() {
  return (
    <footer className="bg-midnight-deep">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-3xl pb-xl">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-xl"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
        >
          {/* Left — brand */}
          <motion.div
            className="flex flex-col gap-s"
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Logo variant="light" className="text-2xl" />
            <p className="font-body text-sm text-slate-light">
              Connect. Build. Grow.
            </p>
          </motion.div>

          {/* Middle — navigation */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-label uppercase text-blue tracking-[0.14em] mb-m">
              NAVIGATION
            </p>
            <ul className="flex flex-col gap-s">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="font-body text-sm text-slate-light hover:text-white hover:translate-x-1 inline-block transition-all duration-hover py-1"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — connect */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-label uppercase text-blue tracking-[0.14em] mb-m">
              CONNECT
            </p>
            <ul className="flex flex-col gap-s">
              <li>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-slate-light hover:text-blue transition-all duration-hover py-1.5"
                >
                  <Linkedin size={16} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-slate-light hover:text-blue transition-all duration-hover py-1.5"
                >
                  <FaInstagram size={16} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-slate-light hover:text-blue transition-all duration-hover py-1.5"
                >
                  <FaWhatsapp size={16} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-white/10 mt-4xl pt-l"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="font-mono text-caption text-slate">
            © 2026 Nexio Labs. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
