"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [darkTint, setDarkTint] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prevScrollY = useRef(0);

  // Hide/reveal on scroll direction + track scroll position for bg opacity
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 100 && currentY > prevScrollY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setScrolled(currentY > 50);
      prevScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Context-aware: watch for data-navbar-theme="light" sections
  useEffect(() => {
    const sections = document.querySelectorAll('[data-navbar-theme="light"]');
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isAnyLight = entries.some((e) => e.isIntersecting);
        setDarkTint(isAnyLight);
      },
      { threshold: 0.1, rootMargin: "-80px 0px 0px 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      closeMobileMenu();
      if (pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [pathname, closeMobileMenu]
  );

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop + Mobile Bar */}
      <nav
        className={[
          "fixed top-8 left-1/2 -translate-x-1/2 z-[100] flex justify-between items-center mx-auto max-w-6xl w-[calc(100%-4rem)]",
          "glass-panel transition-[transform,background-color,backdrop-filter] duration-500",
          "h-16 px-8 max-md:h-14 max-md:px-6",
          "navbar-fixed",
          darkTint ? "bg-black/20" : scrolled ? "bg-surface/60 backdrop-blur-xl" : "bg-surface/40 backdrop-blur-md",
        ].join(" ")}
        style={{
          transform: hidden && !mobileMenuOpen
            ? "translate(-50%, -120%)"
            : "translate(-50%, 0%)",
          transition: "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-headline italic font-bold tracking-tighter text-xl select-none"
          onClick={handleLogoClick}
        >
          NEXIO LABS
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "font-label uppercase tracking-widest text-[11px] transition-all duration-300 flex items-center gap-2 hover-underline",
                isActive(item.href)
                  ? "text-primary"
                  : "text-on-surface/60 hover:text-on-surface",
              ].join(" ")}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              <span
                className={[
                  "w-1 h-1 bg-primary rounded-full transition-transform duration-300",
                  isActive(item.href) ? "scale-100" : "scale-0",
                ].join(" ")}
              />
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <MagneticButton variant="gradient" href="/contact">
            Start a Project
          </MagneticButton>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-[5px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={[
              "block h-[2px] w-6 bg-on-surface transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
              mobileMenuOpen ? "translate-y-[7px] rotate-45" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block h-[2px] w-6 bg-on-surface transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
              mobileMenuOpen ? "opacity-0" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block h-[2px] w-6 bg-on-surface transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
              mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : "",
            ].join(" ")}
          />
        </button>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-surface-dim z-[200] flex flex-col items-center px-8 pt-28 pb-12 md:hidden entry-animate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav
              className="flex flex-col items-center gap-8 mb-12"
              aria-label="Mobile navigation"
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={[
                      "font-headline text-4xl italic transition-colors",
                      isActive(item.href)
                        ? "text-primary"
                        : "text-on-surface/60 hover:text-on-surface",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticButton
                variant="gradient"
                href="/contact"
                onClick={closeMobileMenu}
              >
                Start a Project
              </MagneticButton>
            </motion.div>
            <div className="mt-auto pt-12 border-t border-white/5 text-center">
              <p className="font-body text-on-surface-variant text-sm mb-4">
                Web development, mobile apps, and AI systems for ambitious brands.
              </p>
              <a href="mailto:hello@nexiolabs.co" className="font-label text-[11px] uppercase tracking-widest text-primary hover-underline">
                hello@nexiolabs.co
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
