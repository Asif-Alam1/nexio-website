import { Linkedin } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-midnight-deep">
      <div className="max-w-7xl mx-auto px-m lg:px-2xl py-3xl pb-xl">
        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
          {/* Left — brand */}
          <div className="flex flex-col gap-s">
            <img
              src="/images/logo/nexio-logo-transparent.svg"
              alt="Nexio Labs"
              className="h-8 w-auto"
            />
            <p className="font-body text-sm text-slate-light">
              Connect. Build. Grow.
            </p>
          </div>

          {/* Middle — navigation */}
          <div>
            <p className="font-mono text-label uppercase text-blue tracking-[0.14em] mb-m">
              NAVIGATION
            </p>
            <ul className="flex flex-col gap-s">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-body text-sm text-slate-light hover:text-white transition-colors duration-hover"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — connect */}
          <div>
            <p className="font-mono text-label uppercase text-blue tracking-[0.14em] mb-m">
              CONNECT
            </p>
            <ul className="flex flex-col gap-s">
              <li>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-light hover:text-blue transition-colors duration-hover"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-light hover:text-blue transition-colors duration-hover"
                >
                  <FaInstagram size={16} />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-light hover:text-blue transition-colors duration-hover"
                >
                  <FaWhatsapp size={16} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-midnight-deep mt-3xl pt-l">
          <p className="font-mono text-caption text-slate">
            © 2026 Nexio Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
