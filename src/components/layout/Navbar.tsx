"use client";

import { useState, useEffect } from "react";
import { NAV_ITEMS, WHATSAPP_URL } from "@/lib/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setIsScrolled(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-64px 0px 0px 0px" }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const top =
        target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={[
          "fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300",
          isScrolled
            ? "bg-cloud/95 backdrop-blur-xl border-b border-border"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex-shrink-0"
          >
            <img
              src={
                isScrolled
                  ? "/images/logo/nexio-logo-light-bg.svg"
                  : "/images/logo/nexio-logo-transparent.svg"
              }
              alt="Nexio Labs"
              className="h-8 w-auto"
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={[
                  "font-display font-semibold text-sm transition-colors duration-hover",
                  isScrolled
                    ? "text-midnight hover:text-blue"
                    : "text-white/90 hover:text-white",
                ].join(" ")}
              >
                {item.label}
              </a>
            ))}

            {/* Book a Call pill */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange rounded-pill text-white font-display font-semibold text-sm py-2 px-5 transition-all duration-hover hover:brightness-90"
            >
              Book a Call
            </a>
          </div>

          {/* Hamburger button — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] focus:outline-none"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={[
                "block h-[2px] w-6 transition-all duration-300",
                isScrolled || mobileMenuOpen ? "bg-midnight" : "bg-white",
                mobileMenuOpen ? "translate-y-[7px] rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-[2px] w-6 transition-all duration-300",
                isScrolled || mobileMenuOpen ? "bg-midnight" : "bg-white",
                mobileMenuOpen ? "opacity-0" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-[2px] w-6 transition-all duration-300",
                isScrolled || mobileMenuOpen ? "bg-midnight" : "bg-white",
                mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : "",
              ].join(" ")}
            />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className={[
          "fixed inset-0 z-40 bg-midnight flex flex-col items-center justify-center md:hidden transition-all duration-300",
          mobileMenuOpen
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 translate-x-full pointer-events-none",
        ].join(" ")}
      >
        <nav className="flex flex-col items-center gap-8 mb-12">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="font-display font-semibold text-2xl text-white hover:text-orange transition-colors duration-hover"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange rounded-pill text-white font-display font-semibold text-base py-3 px-8 transition-all duration-hover hover:brightness-90"
        >
          Book a Call
        </a>
      </div>
    </>
  );
}
