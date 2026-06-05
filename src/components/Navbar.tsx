"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Droplets, Phone } from "lucide-react";

const PHONE = "050-000-0000";
const PHONE_HREF = "tel:+972500000000";

const navLinks = [
  { label: "שירותים", href: "#services" },
  { label: "גלריה", href: "#gallery" },
  { label: "ביקורות", href: "#reviews" },
  { label: "אזור שירות", href: "#service-area" },
  { label: "צור קשר", href: "#cta" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 right-0 left-0 z-50 flex justify-center px-4"
      aria-label="ניווט ראשי"
    >
      <div
        className={`liquid-glass rounded-full flex items-center gap-4 px-5 py-2.5 transition-all duration-500 ${
          scrolled ? "shadow-[0_8px_40px_rgba(0,0,0,0.6)]" : ""
        }`}
        style={{
          background: scrolled
            ? "rgba(14,15,18,0.92)"
            : "rgba(255,255,255,0.04)",
        }}
      >
        {/* Brand */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <Droplets
            size={18}
            style={{ color: "var(--accent)" }}
            aria-hidden="true"
          />
          <span
            className="display text-sm font-bold"
            style={{ color: "var(--paper)" }}
          >
            שלומי אינסטלציה
          </span>
        </a>

        {/* Center links — desktop only */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-white/10"
              style={{ color: "var(--muted-d)", fontFamily: "var(--font-assistant)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2 shrink-0">
          <span
            className="hidden sm:inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full liquid-glass"
            style={{ color: "var(--accent)", border: "1px solid rgba(194,104,58,0.35)" }}
          >
            <span className="mono" dir="ltr">24/7</span>
            <span>זמין</span>
          </span>

          <a
            href={PHONE_HREF}
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 hover:scale-[1.04] hover:brightness-110 active:scale-[0.97]"
            style={{ background: "var(--accent)", color: "#fff" }}
            aria-label={`חייג עכשיו: ${PHONE}`}
          >
            <Phone size={13} aria-hidden="true" />
            <span>חייג עכשיו</span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
